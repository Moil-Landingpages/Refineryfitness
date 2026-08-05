import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Bump when page content meaningfully changes. A build-time `new Date()` would
// claim the page changed on every deploy and teach crawlers to ignore lastmod.
const LAST_CONTENT_UPDATE = "2026-08-05";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE_URL, lastModified: LAST_CONTENT_UPDATE, changeFrequency: "monthly", priority: 1 }];
}
