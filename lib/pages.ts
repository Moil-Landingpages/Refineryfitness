import { SITE_URL } from "@/lib/site";

/**
 * The site's page registry.
 *
 * One list drives the sitemap, the footer's link columns, and the breadcrumb
 * trails, so a page cannot ship indexable but unlinked — an orphan page is the
 * most common way a location architecture quietly fails.
 */
export type PageEntry = {
  path: string;
  label: string;
  blurb: string;
  parent: string | null;
  group: "location" | "program" | "company" | "hub";
  priority: number;
};

export const PAGES: readonly PageEntry[] = [
  { path: "/personal-training", label: "Personal training", blurb: "What coaching with Refinery actually involves.", parent: null, group: "hub", priority: 0.9 },

  { path: "/personal-trainer-buda-tx", label: "Personal trainer in Buda", blurb: "The home market — in person, mobile, or virtual.", parent: null, group: "location", priority: 0.9 },
  { path: "/personal-trainer-kyle-tx", label: "Personal trainer in Kyle", blurb: "Coaching that comes to you, minutes down I-35.", parent: null, group: "location", priority: 0.8 },
  { path: "/personal-trainer-hays-county-tx", label: "Personal trainer in Hays County", blurb: "Mobile training across the county, plus virtual anywhere.", parent: null, group: "location", priority: 0.8 },

  { path: "/programs/strong-start", label: "Strong Start", blurb: "The signature reset — build the system before the result.", parent: "/personal-training", group: "program", priority: 0.8 },
  { path: "/programs/one-on-one-training", label: "1:1 Training", blurb: "High-touch coaching built around your life.", parent: "/personal-training", group: "program", priority: 0.8 },
  { path: "/programs/mobile-training", label: "Mobile Training", blurb: "Coaching at your home or garage gym across Hays County.", parent: "/personal-training", group: "program", priority: 0.8 },
  { path: "/programs/virtual-coaching", label: "Virtual Coaching", blurb: "The same coach, on a schedule that travels with you.", parent: "/personal-training", group: "program", priority: 0.7 },

  { path: "/about", label: "About Jeff", blurb: "Kinesiology-trained, faith-first, and coaching in Buda.", parent: null, group: "company", priority: 0.7 },
  { path: "/contact", label: "Contact", blurb: "Book a free intro, or just ask a question first.", parent: null, group: "company", priority: 0.7 },
];

/** Maps a program id in lib/programs.ts to its page. */
export const PROGRAM_PATHS: Record<string, string> = {
  strong: "/programs/strong-start",
  one: "/programs/one-on-one-training",
  mobile: "/programs/mobile-training",
  virtual: "/programs/virtual-coaching",
};

/**
 * Labels for paths outside the registry. `/gear` is deliberately not a registry
 * entry — it is `noindex`, so it must stay out of the sitemap — but it still
 * needs a readable crumb rather than its own URL.
 */
const LABELS: Record<string, string> = { "/": "Home", "/gear": "Recommended gear" };

/**
 * The label for a place, without the service prefix its page title carries.
 * "Personal trainer in Buda" is the right title for that page and the wrong
 * thing to read in a column already headed "Areas served".
 */
export const shortLabel = (page: PageEntry) => page.label.replace(/^Personal trainer in /, "");

export const pageByPath = (path: string) => PAGES.find((page) => page.path === path);

export const pagesInGroup = (group: PageEntry["group"]) => PAGES.filter((page) => page.group === group);

export const absolute = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

/**
 * Breadcrumb trail for a path, root first, including the page itself. Feeds
 * both the visible trail and the `BreadcrumbList` markup, so the two cannot
 * disagree — the condition Google states for the markup.
 */
export function trail(path: string): Array<{ name: string; path: string }> {
  const crumbs: Array<{ name: string; path: string }> = [];
  let current: string | null = path;
  while (current) {
    const page = pageByPath(current);
    if (page) {
      crumbs.unshift({ name: page.label, path: page.path });
      current = page.parent;
    } else {
      crumbs.unshift({ name: LABELS[current] ?? current, path: current });
      current = null;
    }
  }
  return crumbs[0]?.path === "/" ? crumbs : [{ name: "Home", path: "/" }, ...crumbs];
}
