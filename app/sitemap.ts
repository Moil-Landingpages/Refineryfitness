import type { MetadataRoute } from "next";
import { PAGES } from "@/lib/pages";
import { SITE_URL } from "@/lib/site";

// Bump when page content meaningfully changes. A build-time `new Date()` would
// claim the page changed on every deploy and teach crawlers to ignore lastmod.
const LAST_CONTENT_UPDATE = "2026-09-09";

/**
 * The homepage plus every entry in the page registry, so a page cannot be added
 * to the site without also being submitted for crawling.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: LAST_CONTENT_UPDATE, changeFrequency: "monthly", priority: 1 },
    ...PAGES.map((page) => ({
      url: `${SITE_URL}${page.path}`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "monthly" as const,
      priority: page.priority,
    })),
  ];
}
