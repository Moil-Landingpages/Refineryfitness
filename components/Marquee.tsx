/**
 * The orange values band under the hero.
 *
 * It used to hold the four words twice and slide the track left by half its
 * width. That loops seamlessly only when one copy is wider than the screen, and
 * it is not — one copy measures about 700px against a 1280px viewport, so for
 * most of every cycle the band was showing empty orange. That gap is what Jeff
 * read as the band "starting halfway there" on the review call.
 *
 * Each half now repeats the sequence until it clears any viewport we care
 * about, and the two halves stay identical so -50% still lands exactly one half
 * along. The duration scales with the repeat count, so the words cross the
 * screen at the pace they always did.
 */

const WORDS = ["RELATIONAL", "PHYSICAL", "MENTAL", "SPIRITUAL"] as const;

/** One sequence sets about 700px, so five clears a 3400px display. */
const REPEATS = 5;

/** Seconds per sequence, preserving the original 23s-for-one-copy crawl. */
const PACE = 21;

const half = Array.from({ length: REPEATS }, (_, copy) =>
  WORDS.map((word) => <span key={`${copy}-${word}`}>{word} <i>✦</i> </span>)).flat();

export default function Marquee() {
  return <section className="marquee" aria-label="Refinery Fitness values">
    <div className="marquee-track" style={{ animationDuration: `${REPEATS * PACE}s` }}>
      {/* The first half carries the words; the second exists only so the loop
          has something to scroll into, and is hidden from screen readers. */}
      <div>{half}</div>
      <div aria-hidden="true">{half}</div>
    </div>
  </section>;
}
