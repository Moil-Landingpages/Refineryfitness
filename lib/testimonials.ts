/**
 * Client testimonials, supplied by Jeff with the client's name attached.
 *
 * Deliberately not marked up as `Review` or `AggregateRating`. Reviews about a
 * business, published on that business's own site, are self-serving and are not
 * an eligible source for a rating snippet — the same rule applied to the SQUIRE
 * rating on the Barber Addy build. These are visible, attributed testimonial
 * copy and nothing more.
 *
 * `stars` records what the client submitted; it is rendered as a visible mark,
 * never as structured data.
 */
export type Testimonial = {
  quote: string;
  name: string;
  /** Enough context to read the result honestly, in the client's own framing. */
  context: string;
  stars: number;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "I am a 52yr old female that struggled with my weight. No matter what I did, I kept gaining. I started his program Christmas 2024. Currently (7/25), I am down 60lbs! He listens and designs a plan to fit your needs. I will always recommend him to anyone looking to change their life.",
    name: "Charlie Lootens",
    context: "Started December 2024 · result reported July 2025",
    stars: 5,
  },
];
