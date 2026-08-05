import Image from "next/image";
import { mailto } from "@/lib/site";
import { ArrowUpRight } from "@/components/icons";

export default function Proof() {
  return <section className="proof section" id="about">
    <div>
      <p className="kicker dark" data-reveal><b /> A DIFFERENT KIND OF COACHING</p>
      <h2 data-split>YOU’RE NOT<br />BEHIND.<br />YOU’RE <em>HERE.</em></h2>
    </div>
    <div className="proof-story" data-reveal>
      <p>Refinery Fitness is built for the person tired of fitness culture that demands more than life can give. Jeff Mensing brings a Kinesiology-trained, faith-first approach to strength, health, and confidence—without the noise or the guilt.</p>
      <p className="proof-note">NO ONE IS TOO FAR GONE.</p>
      <a className="under-link" href={mailto("Meet Jeff")}>Meet Jeff in a free intro <span><ArrowUpRight size={13} /></span></a>
      <div className="proof-photo" data-reveal>
        <Image src="/images/refinery-proof.jpg" alt="Two training partners fist-bumping on the gym floor after a hard workout" fill sizes="(max-width: 760px) 100vw, 42vw" />
      </div>
    </div>
    <div className="result-card" data-reveal>
      <span className="result-tag"><b />REAL PROGRESS,<br />NOT EMPTY PROMISES</span>
      <div className="result-stats">
        <div className="stat"><strong>+5<i>LB</i></strong><em>Lean muscle gained</em></div>
        <div className="stat"><strong>−4<i>%</i></strong><em>Body fat lost</em></div>
      </div>
      <small>Documented client result over approximately four months.</small>
    </div>
  </section>;
}
