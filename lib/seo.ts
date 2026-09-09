import type { Metadata } from "next";

/**
 * The shared Open Graph image.
 *
 * Next's Metadata API replaces a parent `openGraph` block rather than merging
 * with it, so a page that sets its own title and description silently loses the
 * image the root layout contributes. Every page therefore names it here.
 */
export const OG_IMAGE = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: "Train with more in mind — Refinery Fitness of Buda",
};

export function openGraph({
  title,
  description,
  url,
  type = "website",
}: {
  title: string;
  description: string;
  url: string;
  type?: "website" | "profile";
}): Metadata["openGraph"] {
  return { title, description, url, type, locale: "en_US", siteName: "Refinery Fitness of Buda", images: [OG_IMAGE] };
}
