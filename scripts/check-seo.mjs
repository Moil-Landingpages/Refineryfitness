#!/usr/bin/env node
/**
 * Rendered-metadata smoke test.
 *
 * The release gate is that every indexable route returns 200 with a unique
 * title, a unique description, one self-canonical, and a parseable entity graph
 * — and that the discovery files exist. Two checks are specific to this site:
 * the graph must name every published city, and it must not publish an
 * `aggregateRating`, because no documented review data supports one.
 *
 *   npm run check:seo                       # against http://localhost:3000
 *   npm run check:seo -- https://example.com
 *
 * Start the server first (`npm run build && npm run start`). Exits non-zero on
 * failure so CI can gate on it.
 */

const BASE = (process.argv[2] ?? process.env.SEO_BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
// Every indexable route. Keep in step with lib/pages.ts — a page missing here
// is a page nobody is checking. `/gear` is deliberately absent: it is `noindex`
// by design, so it fails these assertions on purpose and gets its own set
// below.
const ROUTES = [
  "/",
  "/personal-training",
  "/personal-trainer-buda-tx",
  "/personal-trainer-kyle-tx",
  "/personal-trainer-hays-county-tx",
  "/programs/strong-start",
  "/programs/one-on-one-training",
  "/programs/mobile-training",
  "/programs/virtual-coaching",
  "/about",
  "/contact",
];
const REQUIRED_PLACES = ["Buda", "Kyle", "Hays County"];

const failures = [];
const seen = { title: new Map(), description: new Map(), canonical: new Map() };

const fail = (route, message) => failures.push(`${route} — ${message}`);
const pick = (html, re) => html.match(re)?.[1]?.trim();

function decode(value) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

async function checkRoute(route) {
  const res = await fetch(`${BASE}${route}`, { redirect: "manual" });

  if (res.status !== 200) {
    fail(route, `expected 200, got ${res.status}${res.headers.get("location") ? ` -> ${res.headers.get("location")}` : ""}`);
    return;
  }

  const html = await res.text();

  const title = pick(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const description = pick(html, /<meta name="description" content="([^"]*)"/i);
  const canonical = pick(html, /<link rel="canonical" href="([^"]*)"/i);
  const robots = pick(html, /<meta name="robots" content="([^"]*)"/i);
  const ogImage = pick(html, /<meta property="og:image" content="([^"]*)"/i);
  const h1Count = (html.match(/<h1[\s>]/gi) ?? []).length;
  const headerCount = (html.match(/<header[\s>]/gi) ?? []).length;
  const mainCount = (html.match(/<main[\s>]/gi) ?? []).length;

  if (!title) fail(route, "no <title>");
  if (!description) fail(route, "no meta description");
  if (!canonical) fail(route, "no canonical link");
  if (robots && /noindex/i.test(robots)) fail(route, `robots says "${robots}" — this route must be indexable`);
  if (!ogImage) fail(route, "no og:image");
  if (h1Count !== 1) fail(route, `expected exactly 1 <h1>, found ${h1Count}`);
  // One header and one main landmark: duplicated landmarks confuse assistive
  // technology and the readers that parse page structure.
  if (headerCount > 1) fail(route, `expected at most 1 <header> landmark, found ${headerCount}`);
  if (mainCount !== 1) fail(route, `expected exactly 1 <main> landmark, found ${mainCount}`);

  if (canonical) {
    let path;
    try {
      path = new URL(canonical).pathname.replace(/\/$/, "") || "/";
    } catch {
      fail(route, `canonical is not an absolute URL: ${canonical}`);
    }
    const expected = route.replace(/\/$/, "") || "/";
    if (path && path !== expected) fail(route, `canonical points at ${path}, expected ${expected}`);
  }

  for (const [key, value] of [["title", title], ["description", description], ["canonical", canonical]]) {
    if (!value) continue;
    const previous = seen[key].get(value);
    if (previous) fail(route, `${key} duplicates ${previous}`);
    else seen[key].set(value, route);
  }

  const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  if (!blocks.length) fail(route, "no JSON-LD found");
  let sawBreadcrumbs = false;

  for (const [, raw] of blocks) {
    let parsed;
    try {
      parsed = JSON.parse(decode(raw));
    } catch (error) {
      fail(route, `JSON-LD does not parse: ${error.message}`);
      continue;
    }
    const text = JSON.stringify(parsed);

    if (/aggregateRating/i.test(text)) {
      fail(route, "JSON-LD publishes an aggregateRating — none is documented");
    }
    if (route === "/") {
      if (!/Refinery Fitness/i.test(text)) fail(route, "JSON-LD does not name Refinery Fitness");
      for (const place of REQUIRED_PLACES) {
        if (!text.includes(place)) fail(route, `JSON-LD areaServed is missing ${place}`);
      }
    }
    if (parsed["@type"] === "BreadcrumbList") sawBreadcrumbs = true;
    // Every node in the homepage graph should be reachable: a dangling @id there
    // means an engine reads disconnected fragments instead of one entity.
    //
    // Subpages are exempt by design. A service node's provider points at the
    // business @id defined in the homepage graph, which is how the pieces are
    // meant to join up — flagging it here would be flagging correct markup.
    if (route === "/") {
      const graph = parsed["@graph"] ?? [];
      const ids = new Set(graph.map((node) => node["@id"]).filter(Boolean));
      for (const referenced of text.matchAll(/"@id":"([^"]+)"/g)) {
        const id = referenced[1];
        if (id.includes("#") && !ids.has(id)) fail(route, `JSON-LD references ${id}, which no node defines`);
      }
    }
  }
  // Every subpage must place itself in the hierarchy.
  if (route !== "/" && !sawBreadcrumbs) {
    fail(route, "no BreadcrumbList — every subpage needs one");
  }
}

/**
 * The affiliate page, which is checked for the opposite of everything above.
 *
 * It must stay out of the index and out of the sitemap — it is a thin list of
 * outbound links, and this site's whole position rests on not publishing thin
 * pages. Every link must carry `rel="sponsored nofollow"`, which Google
 * requires for paid links and which is the easiest thing in the file for a
 * later edit to drop, and the FTC disclosure must be in the rendered HTML
 * rather than behind a click.
 */
async function checkAffiliatePage(route) {
  const res = await fetch(`${BASE}${route}`, { redirect: "manual" });
  if (res.status !== 200) {
    fail(route, `expected 200, got ${res.status}`);
    return;
  }
  const html = await res.text();

  const robots = pick(html, /<meta name="robots" content="([^"]*)"/i);
  if (!robots || !/noindex/i.test(robots)) {
    fail(route, `robots says "${robots ?? "nothing"}" — this route must be noindex`);
  }

  // Outbound links only: internal navigation on the page is not sponsored.
  const outbound = [...html.matchAll(/<a\b[^>]*href="(https?:\/\/[^"]+)"[^>]*>/gi)]
    .filter(([tag]) => !/refineryfitness\.biz|moilapp\.com|facebook\.com|instagram\.com|linkedin\.com/i.test(tag));

  if (!outbound.length) fail(route, "no outbound affiliate links found — is the list still rendering?");
  for (const [tag, href] of outbound) {
    const rel = tag.match(/rel="([^"]*)"/i)?.[1] ?? "";
    if (!/\bsponsored\b/.test(rel)) fail(route, `${href} is missing rel="sponsored"`);
    if (!/\bnofollow\b/.test(rel)) fail(route, `${href} is missing rel="nofollow"`);
    if (/target="_blank"/i.test(tag) && !/\bnoopener\b/.test(rel)) {
      fail(route, `${href} opens in a new tab without rel="noopener"`);
    }
  }

  if (!/affiliate links/i.test(html)) {
    fail(route, "no affiliate disclosure in the rendered HTML — the FTC asks for it clear and conspicuous");
  }

  const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
  if (sitemap.includes(route)) fail(route, "appears in sitemap.xml, but it is noindex");
}

async function checkDiscoveryFile(path, expectations) {
  const res = await fetch(`${BASE}${path}`);
  if (res.status !== 200) {
    fail(path, `expected 200, got ${res.status}`);
    return;
  }
  const body = await res.text();
  for (const [label, re] of expectations) {
    if (!re.test(body)) fail(path, `missing ${label}`);
  }
}

console.log(`Checking ${BASE}\n`);

for (const route of ROUTES) {
  await checkRoute(route);
  console.log(`  checked ${route}`);
}
await checkAffiliatePage("/gear");
console.log("  checked /gear (noindex + affiliate rel attributes)");
// The AI retrieval crawlers must stay named in robots.txt. A blanket allow
// covers them, so this guards the intent: nobody can remove citation access
// for ChatGPT, Claude, or Perplexity without this check going red.
await checkDiscoveryFile("/robots.txt", [
  ["a declared sitemap", /Sitemap:/i],
  ["Googlebot", /Googlebot/],
  ["OAI-SearchBot (ChatGPT search)", /OAI-SearchBot/],
  ["ChatGPT-User", /ChatGPT-User/],
  ["Claude-SearchBot", /Claude-SearchBot/],
  ["Claude-User", /Claude-User/],
  ["PerplexityBot", /PerplexityBot/],
]);
console.log("  checked /robots.txt");
await checkDiscoveryFile("/sitemap.xml", [["a urlset", /<urlset/i]]);
console.log("  checked /sitemap.xml");
await checkDiscoveryFile("/manifest.webmanifest", [["a name", /"name"/]]);
console.log("  checked /manifest.webmanifest");

if (failures.length) {
  console.error(`\n${failures.length} SEO check${failures.length === 1 ? "" : "s"} failed:\n`);
  for (const failure of failures) console.error(`  ✗ ${failure}`);
  process.exit(1);
}

console.log("\n✓ All SEO checks passed.");
