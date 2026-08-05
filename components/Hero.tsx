import Image from "next/image";
import { mailto } from "@/lib/site";
import { ArrowDown, ArrowUpRight } from "@/components/icons";

const dust = [
  { l: 8, t: 70, s: 3 }, { l: 16, t: 40, s: 2 }, { l: 24, t: 82, s: 4 }, { l: 31, t: 55, s: 2 },
  { l: 38, t: 30, s: 3 }, { l: 45, t: 66, s: 2 }, { l: 52, t: 44, s: 4 }, { l: 58, t: 78, s: 2 },
  { l: 64, t: 36, s: 3 }, { l: 71, t: 58, s: 2 }, { l: 78, t: 47, s: 3 }, { l: 84, t: 72, s: 2 },
  { l: 90, t: 38, s: 3 }, { l: 47, t: 25, s: 2 },
];

export default function Hero() {
  return <header className="hero" id="top">
    <div className="hero-media" aria-hidden="true">
      <Image className="hero-img" src="/images/refinery-hero.jpg" alt="" fill priority sizes="100vw" />
    </div>
    <div className="hero-shade" aria-hidden="true" />
    <div className="hero-grid" aria-hidden="true" />
    <div className="hero-grain" aria-hidden="true" />
    <div className="dust" aria-hidden="true">{dust.map(({ l, t, s }, i) => <span key={i} style={{ left: `${l}%`, top: `${t}%`, width: s, height: s }} />)}</div>
    <div className="hero-copy">
      <p className="kicker"><b /> PERSONAL TRAINING · BUDA, TEXAS</p>
      <h1>MORE THAN<br /><strong>MOTION.</strong></h1>
      <p className="hero-summary">Science-backed coaching for people who are ready to become strong enough for the life they are called to live.</p>
      <div className="hero-actions">
        <a className="button lime" href={mailto("Free Intro Session")}>Book your free intro <span><ArrowUpRight /></span></a>
        <a className="watch" href="#method"><i><ArrowDown size={13} /></i> See what makes this different</a>
      </div>
    </div>
    <div className="hero-meta"><span>BUDA · KYLE · HAYS COUNTY</span><span>IN PERSON / MOBILE / VIRTUAL</span></div>
    <div className="hero-scroll" aria-hidden="true">SCROLL TO BUILD <b><ArrowDown size={13} /></b></div>
  </header>;
}
