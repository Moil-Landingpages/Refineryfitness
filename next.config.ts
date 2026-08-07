import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first, WebP for the clients that cannot take it. Photographs of a
    // dim gym compress hard in AVIF, and every image on this site is one.
    formats: ["image/avif", "image/webp"],
    // The layout's widest photo is the full-bleed hero; nothing needs a
    // variant past 2048, so the extra 3840 build cost buys nothing.
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2048],
    // A year: filenames change whenever the photo does.
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
