export const EMAIL = "jeff@refineryfitness.biz";
export const SITE_URL = "https://refineryfitness.biz";
export const SITE_NAME = "Refinery Fitness of Buda";

export const mailto = (subject: string, body?: string) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;
