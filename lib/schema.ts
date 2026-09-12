import { faqs } from "@/lib/faqs";
import { programs } from "@/lib/programs";
import { COVERAGE_STATEMENT, HOME_MARKET, areaServed } from "@/lib/market";
import { EMAIL, SITE_NAME, SITE_URL, SOCIALS } from "@/lib/site";

const BUSINESS = `${SITE_URL}/#business`;
const WEBSITE = `${SITE_URL}/#website`;
const WEBPAGE = `${SITE_URL}/#webpage`;
const FOUNDER = `${SITE_URL}/#jeff`;

export const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["HealthClub", "LocalBusiness"],
      "@id": BUSINESS,
      name: SITE_NAME,
      alternateName: "Refinery Fitness",
      description: COVERAGE_STATEMENT,
      slogan: "More than motion.",
      url: SITE_URL,
      email: EMAIL,
      priceRange: "$$",
      image: `${SITE_URL}/og.jpg`,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-512.png`, width: 512, height: 512 },
      // Service-area business: locality is accurate, street address intentionally
      // omitted because sessions happen in-person, mobile, or virtually.
      address: {
        "@type": "PostalAddress",
        addressLocality: HOME_MARKET.city,
        addressRegion: HOME_MARKET.region,
        addressCountry: HOME_MARKET.country,
      },
      areaServed,
      knowsAbout: ["Personal training", "Strength training", "Health coaching", "Habit coaching", "Nutrition coaching", "Faith-based wellness"],
      founder: { "@id": FOUNDER },
      employee: { "@id": FOUNDER },
      sameAs: SOCIALS.map((social) => social.url),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Training programs",
        itemListElement: programs.map((p) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: p.name, description: p.copy, serviceType: p.label, provider: { "@id": BUSINESS }, areaServed },
        })),
      },
    },
    {
      "@type": "Person",
      "@id": FOUNDER,
      name: "Jeff Mensing",
      jobTitle: "Personal Trainer & Health Coach",
      description: "Kinesiology-trained personal trainer bringing a faith-first, science-backed approach to strength, health, and confidence.",
      image: { "@type": "ImageObject", url: `${SITE_URL}/images/refinery-jeff.jpg` },
      worksFor: { "@id": BUSINESS },
      knowsAbout: ["Kinesiology", "Strength training", "Health coaching"],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "en-US",
      publisher: { "@id": BUSINESS },
    },
    {
      "@type": ["WebPage", "FAQPage"],
      "@id": WEBPAGE,
      url: SITE_URL,
      name: "Personal Trainer in Buda, TX | Refinery Fitness",
      description: COVERAGE_STATEMENT,
      isPartOf: { "@id": WEBSITE },
      about: { "@id": BUSINESS },
      primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}/images/refinery-hero-cable.jpg` },
      inLanguage: "en-US",
      mainEntity: faqs.map(([name, text]) => ({
        "@type": "Question",
        name,
        acceptedAnswer: { "@type": "Answer", text },
      })),
    },
  ],
};
