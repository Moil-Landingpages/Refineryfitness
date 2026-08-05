import { mailto } from "@/lib/site";
import { ArrowUpRight } from "@/components/icons";

const methodMap = [
  ["R", "Relational", "Coaching that makes room for real life."],
  ["P", "Physical", "Strength and nutrition with a clear why."],
  ["M", "Mental", "Habits that survive your hardest week."],
  ["S", "Spiritual", "Health as stewardship—not self-worship."],
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
      <a className="under-link" href={mailto("The RPMS Method")}>Talk through the RPMS Method <span><ArrowUpRight size={13} /></span></a>
    </div>
    <div className="method-map" data-reveal-group>
      {methodMap.map(([letter, title, copy], index) => <article key={letter}><span>{letter}</span><h3>{title}</h3><p>{copy}</p><i>0{index + 1}</i></article>)}
    </div>
  </section>;
}
