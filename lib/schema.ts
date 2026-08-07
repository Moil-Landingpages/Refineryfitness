import { faqs } from "@/lib/faqs";
import { programs } from "@/lib/programs";
import { EMAIL, SITE_NAME, SITE_URL } from "@/lib/site";

const BUSINESS = `${SITE_URL}/#business`;
const WEBSITE = `${SITE_URL}/#website`;
const WEBPAGE = `${SITE_URL}/#webpage`;
const FOUNDER = `${SITE_URL}/#jeff`;

const areaServed = [
  { "@type": "City", name: "Buda", containedInPlace: { "@type": "AdministrativeArea", name: "Hays County, Texas" } },
  { "@type": "City", name: "Kyle", containedInPlace: { "@type": "AdministrativeArea", name: "Hays County, Texas" } },
  { "@type": "AdministrativeArea", name: "Hays County, Texas" },
];

export const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["HealthClub", "LocalBusiness"],
      "@id": BUSINESS,
      name: SITE_NAME,
      alternateName: "Refinery Fitness",
      description: "Faith-first, science-backed personal training and health coaching in Buda, Kyle, and Hays County, Texas.",
      slogan: "More than motion.",
      url: SITE_URL,
      email: EMAIL,
      priceRange: "$$",
      image: `${SITE_URL}/og.jpg`,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-512.png`, width: 512, height: 512 },
      // Service-area business: locality is accurate, street address intentionally
      // omitted because sessions happen in-person, mobile, or virtually.
      address: { "@type": "PostalAddress", addressLocality: "Buda", addressRegion: "TX", addressCountry: "US" },
      areaServed,
      knowsAbout: ["Personal training", "Strength training", "Health coaching", "Habit coaching", "Nutrition coaching", "Faith-based wellness"],
      founder: { "@id": FOUNDER },
      employee: { "@id": FOUNDER },
      sameAs: [
        "https://www.instagram.com/refineryfitnessofbuda/",
        "https://www.facebook.com/p/Refinery-Fitness-of-Buda-61576662147080/",
      ],
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
      description: "Faith-first, science-backed personal training and health coaching in Buda, Kyle, and Hays County.",
      isPartOf: { "@id": WEBSITE },
      about: { "@id": BUSINESS },
      primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}/images/refinery-hero.jpg` },
      inLanguage: "en-US",
      mainEntity: faqs.map(([name, text]) => ({
        "@type": "Question",
        name,
        acceptedAnswer: { "@type": "Answer", text },
      })),
    },
  ],
};
