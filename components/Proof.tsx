import Image from "next/image";
import { BookButton } from "@/components/Booking";
import { ArrowUpRight } from "@/components/icons";

/**
 * Who the coaching is for, and one documented result.
 *
 * Jeff's own story used to live here; it now has its own section, so this one
 * stays on the visitor and what changing actually looks like.
 *
 * The photo sits in the showcase row beside the result card rather than under
 * the copy. In the two-column arrangement the heading column ran out of content
 * long before the story column did, which left a tall empty block on the left;
 * pairing the photo with the card closes it and gives the section a floor.
 */
export default function Proof() {
  return <section className="proof section" id="proof" aria-labelledby="proof-heading">
    <div className="proof-head">
      <p className="kicker dark" data-reveal><b /> A DIFFERENT KIND OF COACHING</p>
      <h2 id="proof-heading" data-split>YOU’RE NOT<br />BEHIND.<br />YOU’RE <em>HERE.</em></h2>
    </div>

    <div className="proof-story" data-reveal>
      <p>Refinery Fitness is built for the person tired of fitness culture that demands more than life can give. No guilt about the years you did not train. No pretending your week is somebody else’s. Just a plan that fits the schedule you actually have—and a coach who notices when you go quiet.</p>
      <p className="proof-note">NO ONE IS TOO FAR GONE.</p>
      <BookButton className="under-link" topic="Free intro session">Start with a free intro <span><ArrowUpRight size={13} /></span></BookButton>
    </div>

    <div className="proof-showcase" data-reveal-group>
      <div className="proof-photo">
        <Image src="/images/refinery-training-floor.jpg" alt="A client lowering a pair of dumbbells through a Romanian deadlift on the gym floor" fill sizes="(max-width: 760px) 100vw, 46vw" />
      </div>
      <div className="result-card">
        <span className="result-tag"><b />REAL PROGRESS,<br />NOT EMPTY PROMISES</span>
        <div className="result-stats">
          <div className="stat"><strong>+5<i>LB</i></strong><em>Lean muscle gained</em></div>
          <div className="stat"><strong>−4<i>%</i></strong><em>Body fat lost</em></div>
        </div>
        <small>Documented client result over approximately four months.</small>
      </div>
    </div>
  </section>;
}
