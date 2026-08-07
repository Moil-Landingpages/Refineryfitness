import Image from "next/image";
import { BookButton } from "@/components/Booking";
import { ArrowUpRight } from "@/components/icons";

/**
 * Who Jeff is, and why the training is shaped the way it is.
 *
 * Everything stated here is already claimed elsewhere on the site — Kinesiology
 * training, the faith-first and science-backed pairing, the RPMS Method, and the
 * three ways he coaches. Nothing about his history, certifications, or years in
 * the job is asserted, because the site does not know them.
 */

const facts = [
  "Kinesiology-trained personal trainer & health coach",
  "Faith-first coaching, science-backed programming",
  "Buda, Kyle & Hays County, Texas",
  "In person, mobile, or virtual",
];

export default function About() {
  return <section className="about section pb-0" id="about" aria-labelledby="about-heading">
    <div className="about-head">
      <p className="kicker dark" data-reveal><b /> MEET JEFF MENSING</p>
      <h2 id="about-heading" data-split>TRAINED IN<br />THE SCIENCE.<br />ANCHORED IN<br /><em>SOMETHING MORE.</em></h2>
    </div>

    <div className="about-portrait" data-reveal>
      <Image src="/images/refinery-jeff.jpg" alt="Jeff Mensing, founder of Refinery Fitness, flexing in a training gym in Buda, Texas" fill sizes="(max-width: 760px) 100vw, 34vw" />
    </div>

    <div className="about-copy" data-reveal>
      <p className="about-lede">Jeff Mensing is a Kinesiology-trained personal trainer and health coach in Buda, Texas. He built Refinery Fitness for the people fitness culture tends to lose—the ones who are tired, busy, starting over, or quietly convinced they already missed their window.</p>
      <p>The name carries the idea. A refinery does not throw material away. It takes what is already there and works out what is not useful. That is the job here: not remaking you into somebody else, but building the strength that was always yours to build.</p>
      <p>So the programming is science-backed and the coaching is faith-first, and neither apologises for the other. Jeff trains strength and nutrition the way the evidence says to, then coaches the relational, mental, and spiritual habits that decide whether any of it survives a hard week. That is the <strong>RPMS Method</strong>.</p>
      <p>He coaches in person around Buda and Kyle, drives out to home and garage gyms across Hays County, and works virtually when that is what the schedule allows.</p>
      <ul className="about-facts">{facts.map((fact) => <li key={fact}><b>+</b>{fact}</li>)}</ul>
      <BookButton className="under-link" topic="Meet Jeff">Book a consultation with Jeff <span><ArrowUpRight size={13} /></span></BookButton>
    </div>
  </section>;
}
