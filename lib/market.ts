/**
 * The geographic target model for Refinery Fitness of Buda.
 *
 * One source of truth for every place name the site publishes: the footer strip,
 * the mobile-training copy, `areaServed` in the entity graph, and the local
 * query set the plan measures against. Keeping them in one file is what stops
 * the site, the structured data, and the Facebook/Instagram profiles from
 * drifting apart.
 *
 * `published: false` marks a place that is plausible but unconfirmed. Nothing
 * unpublished reaches the page or the schema — the practice already claims
 * Hays County, and San Marcos, Dripping Springs, and Wimberley all sit inside
 * it, but "inside a county we serve" is an inference, not a confirmed service
 * commitment. Flip the flag once Jeff confirms and it propagates everywhere.
 */

export type Place = {
  /** Exact city name as it should appear in copy and in `areaServed`. */
  readonly name: string;
  readonly county: string;
  readonly published: boolean;
};

/**
 * The home market. Buda is in the business name, the footer, and the page
 * title. There is deliberately no street address: sessions run in person, at
 * the client's home or garage gym, or over video, which makes this a
 * service-area business rather than a storefront.
 */
export const HOME_MARKET = {
  city: "Buda",
  region: "TX",
  regionLong: "Texas",
  county: "Hays County",
  country: "US",
} as const;

/** Cities named in first-party content today. */
export const CORE_SERVICE_AREA: readonly Place[] = [
  { name: "Buda", county: "Hays County", published: true },
  { name: "Kyle", county: "Hays County", published: true },
  { name: "San Marcos", county: "Hays County", published: false },
];

/** Candidates inside the claimed county, pending confirmation. */
export const SECONDARY_AREA: readonly Place[] = [
  { name: "Dripping Springs", county: "Hays County", published: false },
  { name: "Wimberley", county: "Hays County", published: false },
  { name: "South Austin", county: "Travis County", published: false },
];

/**
 * Virtual coaching is a real program, not a ranking claim — it is program 04 in
 * `lib/programs.ts`, explicitly for people outside Hays County. It supplements
 * the local message; it does not replace it.
 */
export const REMOTE_REACH = "anywhere in the United States" as const;

/** Published cities, in the order they should be read aloud. */
export const publishedCities = CORE_SERVICE_AREA.filter((p) => p.published).map((p) => p.name);

/** Every published place, cities plus the containing county. */
export const publishedPlaces = [...publishedCities, HOME_MARKET.county];

/** Joins names the way a person writes them: "Buda, Kyle, and Hays County". */
export function listPlaces(names: readonly string[] = publishedPlaces): string {
  if (names.length <= 1) return names[0] ?? "";
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
}

/** The one coverage sentence, so copy and schema cannot disagree. */
export const COVERAGE_STATEMENT =
  `In-person, mobile, and virtual personal training and health coaching for ` +
  `${listPlaces()}, Texas — with virtual coaching ${REMOTE_REACH}.`;

/** The short form for the footer strip. */
export const COVERAGE_SHORT = [...publishedCities, HOME_MARKET.county, HOME_MARKET.regionLong]
  .map((place) => place.toUpperCase())
  .join(" · ");

/**
 * `areaServed` for the entity graph: descriptive data that helps an engine
 * understand who the business is. It is not a map-ranking switch.
 */
export const areaServed = [
  ...CORE_SERVICE_AREA.filter((p) => p.published).map((place) => ({
    "@type": "City" as const,
    name: place.name,
    containedInPlace: { "@type": "AdministrativeArea" as const, name: `${place.county}, Texas` },
  })),
  { "@type": "AdministrativeArea" as const, name: `${HOME_MARKET.county}, Texas` },
];
