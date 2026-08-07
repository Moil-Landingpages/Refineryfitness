import { programs } from "@/lib/programs";

/**
 * The consultation request opened by every "book" button on the site.
 *
 * Topic and format are picked from these lists rather than typed, so the API
 * route can check what the browser sent against the same source the buttons
 * were built from. Anything it does not recognise is normalised away instead of
 * rejected: the visitor cannot cause a mismatch, so one can only mean our own
 * markup has drifted, and losing the enquiry would be the worse failure.
 */

export const DEFAULT_TOPIC = "Free intro session";

/** What the visitor clicked, used to open the modal already pointed at that thing. */
export const CONSULTATION_TOPICS: readonly string[] = [
  DEFAULT_TOPIC,
  "The RPMS Method",
  ...programs.map((program) => program.name),
  "Meet Jeff",
];

/** Mirrors how Jeff actually trains people — in person, mobile, or virtual. */
export const CONSULTATION_FORMATS: readonly string[] = [
  "In person",
  "Mobile — come to me",
  "Virtual",
  "Not sure yet",
];

/** Caps on the free-text fields, so a submission cannot balloon the email. */
export const LIMITS = { name: 120, email: 200, phone: 40, message: 2000 } as const;
