export const EMAIL = "jeff@refineryfitness.biz";
export const SITE_URL = "https://refineryfitness.biz";
export const SITE_NAME = "Refinery Fitness of Buda";

/**
 * Jeff's public profiles. Rendered in the footer and emitted as `sameAs` in the
 * structured data, so the two cannot drift apart.
 *
 * TODO: Jeff named LinkedIn on the 7 Aug review call but has not sent the URL.
 * Add `{ id: "linkedin", name: "LinkedIn", url: "…" }` here plus a matching
 * icon in components/icons.tsx and the footer picks it up with no layout change.
 */
export const SOCIALS = [
  { id: "facebook", name: "Facebook", url: "https://www.facebook.com/p/Refinery-Fitness-of-Buda-61576662147080/" },
  { id: "instagram", name: "Instagram", url: "https://www.instagram.com/refineryfitnessofbuda/" },
] as const;

export const mailto = (subject: string, body?: string) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;
