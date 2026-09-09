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
const ROUTES = ["/"];
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
    if (!/Refinery Fitness/i.test(text)) fail(route, "JSON-LD does not name Refinery Fitness");
    for (const place of REQUIRED_PLACES) {
      if (!text.includes(place)) fail(route, `JSON-LD areaServed is missing ${place}`);
    }
    // Every node in the graph should be reachable: a dangling @id reference
    // means an engine reads disconnected fragments instead of one entity.
    const graph = parsed["@graph"] ?? [];
    const ids = new Set(graph.map((node) => node["@id"]).filter(Boolean));
    for (const referenced of text.matchAll(/"@id":"([^"]+)"/g)) {
      const id = referenced[1];
      if (id.includes("#") && !ids.has(id)) fail(route, `JSON-LD references ${id}, which no node defines`);
    }
  }
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
