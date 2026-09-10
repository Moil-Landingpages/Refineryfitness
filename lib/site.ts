export const EMAIL = "jeff@refineryfitness.biz";
export const SITE_URL = "https://refineryfitness.biz";
export const SITE_NAME = "Refinery Fitness of Buda";

/**
 * Jeff's public profiles. Rendered in the footer and emitted as `sameAs` in the
 * structured data and on the practitioner page, so the three cannot drift apart.
 */
export const SOCIALS = [
  { id: "facebook", name: "Facebook", url: "https://www.facebook.com/p/Refinery-Fitness-of-Buda-61576662147080/" },
  { id: "instagram", name: "Instagram", url: "https://www.instagram.com/refineryfitnessofbuda/" },
  { id: "linkedin", name: "LinkedIn", url: "https://www.linkedin.com/in/jeffmensing/" },
] as const;

export const mailto = (subject: string, body?: string) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;
