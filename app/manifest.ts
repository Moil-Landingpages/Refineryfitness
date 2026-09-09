import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Refinery Fitness",
    description: "Train with more in mind.",
    start_url: "/",
    display: "standalone",
    background_color: "#10100e",
    theme_color: "#10100e",
    icons: [
      { src: "/logo-512.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
