import { BookButton } from "@/components/Booking";
import MethodCards from "@/components/MethodCards";
import { ArrowUpRight } from "@/components/icons";
import SectionMark from "@/components/SectionMark";

/**
 * The RPMS Method section.
 *
 * The four pillars live in lib/method.ts and render through <MethodCards />,
 * which owns the turn-over behaviour behind each card.
 */
export default function Method() {
  return <section className="intro section" id="method" aria-labelledby="method-heading">
    <SectionMark index="01" side="right" />
    <div className="intro-head">
      <p className="kicker dark" data-reveal><b /> THE RPMS METHOD</p>
      <h2 id="method-heading" data-split>THE BODY IS<br />PART OF THE<br /><em>STORY.</em></h2>
      <span className="sec-rule" aria-hidden="true" />
    </div>
    <div className="intro-copy" data-reveal>
      <p>Most programs ask, <strong>“How hard can you go?”</strong> We start somewhere better: <strong>“What would it look like to become whole?”</strong></p>
      <p>The RPMS Method helps you train the physical, without ignoring the relational, mental, and spiritual habits that make progress stick.</p>
      <BookButton className="under-link" topic="The RPMS Method">Talk through the RPMS Method <span><ArrowUpRight size={13} /></span></BookButton>
    </div>
    <MethodCards />
  </section>;
}
