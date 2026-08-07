import Image from "next/image";
import { BookButton } from "@/components/Booking";
import { ArrowUpRight } from "@/components/icons";

/**
 * The four halves of the RPMS Method.
 *
 * Each card used to lead with its initial set in the display face. The letters
 * are now badges over a photograph of the thing itself, which is the point the
 * section is making: these are not four abstractions, they are four parts of
 * the same week.
 */

const methodMap = [
  {
    letter: "R",
    title: "Relational",
    copy: "Coaching that makes room for real life.",
    src: "/images/refinery-rpms-relational.jpg",
    alt: "Jeff Mensing standing shoulder to shoulder with a training partner on the gym floor",
  },
  {
    letter: "P",
    title: "Physical",
    copy: "Strength and nutrition with a clear why.",
    src: "/images/refinery-cable-work.jpg",
    alt: "A client pulling through a cable crossover rep on the gym floor",
  },
  {
    letter: "M",
    title: "Mental",
    copy: "Habits that survive your hardest week.",
    src: "/images/refinery-rpms-mental.jpg",
    alt: "Jeff Mensing set and focused between sets on the gym floor",
  },
  {
    letter: "S",
    title: "Spiritual",
    copy: "Health as stewardship—not self-worship.",
    src: "/images/refinery-rpms-spiritual.jpg",
    alt: "Jeff Mensing and a client sitting with open Bibles in the garage gym",
  },
];

export default function Method() {
  return <section className="intro section" id="method" aria-labelledby="method-heading">
    <div className="intro-head">
      <p className="kicker dark" data-reveal><b /> THE RPMS METHOD</p>
      <h2 id="method-heading" data-split>THE BODY IS<br />PART OF THE<br /><em>STORY.</em></h2>
    </div>
    <div className="intro-copy" data-reveal>
      <p>Most programs ask, <strong>“How hard can you go?”</strong> We start somewhere better: <strong>“What would it look like to become whole?”</strong></p>
      <p>The RPMS Method helps you train the physical, without ignoring the relational, mental, and spiritual habits that make progress stick.</p>
      <BookButton className="under-link" topic="The RPMS Method">Talk through the RPMS Method <span><ArrowUpRight size={13} /></span></BookButton>
    </div>
    <div className="method-map" data-reveal-group>
      {methodMap.map((item, index) => <article key={item.letter}>
        <div className="method-photo">
          <Image src={item.src} alt={item.alt} fill sizes="(max-width: 760px) 46vw, 21vw" />
          <span aria-hidden="true">{item.letter}</span>
        </div>
        <h3>{item.title}</h3>
        <p>{item.copy}</p>
        <i>0{index + 1}</i>
      </article>)}
    </div>
  </section>;
}
