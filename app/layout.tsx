import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://refineryfitness.biz"),
  title: "Personal Trainer in Buda, TX | Refinery Fitness",
  description: "Faith-first, science-backed personal training and health coaching in Buda, Kyle, and Hays County. Build strength that carries into the rest of your life.",
  keywords: ["personal trainer Buda TX", "mobile personal trainer Buda", "faith based fitness coach Texas", "personal trainer Kyle TX", "health coaching Hays County"],
  openGraph: { title: "Refinery Fitness of Buda | Train with more in mind", description: "Faith-first, science-backed coaching for people who are done starting over.", type: "website", locale: "en_US", url: "/" },
  twitter: { card: "summary_large_image", title: "Refinery Fitness of Buda", description: "Train with more in mind." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
