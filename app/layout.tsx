import type { Metadata, Viewport } from "next";
import { DM_Mono, Instrument_Sans, Oswald } from "next/font/google";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const display = Oswald({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-display" });
const body = Instrument_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body" });
const mono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Personal Trainer in Buda, TX | Refinery Fitness",
  description: "Faith-first, science-backed personal training and health coaching in Buda, Kyle, and Hays County. Build strength that carries into the rest of your life.",
  keywords: ["personal trainer Buda TX", "mobile personal trainer Buda", "faith based fitness coach Texas", "personal trainer Kyle TX", "health coaching Hays County"],
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon.ico", sizes: "32x32" }],
    apple: "/apple-touch-icon.png",
  },
  openGraph: { title: "Refinery Fitness of Buda | Train with more in mind", description: "Faith-first, science-backed coaching for people who are done starting over.", type: "website", locale: "en_US", url: "/", siteName: SITE_NAME, images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Train with more in mind — Refinery Fitness of Buda" }] },
  twitter: { card: "summary_large_image", title: "Refinery Fitness of Buda", description: "Train with more in mind.", images: ["/og.jpg"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
};

export const viewport: Viewport = { themeColor: "#10100e" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-US" className={`${display.variable} ${body.variable} ${mono.variable}`}><body>{children}</body></html>;
}
