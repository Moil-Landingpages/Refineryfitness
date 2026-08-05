import Image from "next/image";

export default function VisualBreak() {
  return <section className="visual-break">
    <div className="photo-frame" aria-hidden="true">
      <div className="photo-coaching"><Image src="/images/refinery-coaching.png" alt="" fill sizes="(max-width: 760px) 100vw, 62vw" /></div>
    </div>
    <div className="visual-quote">
      <p data-split>“The work is physical.<br />The <em>change</em> is bigger.”</p>
      <span data-reveal>REFINERY FITNESS / THE WHOLE PERSON</span>
    </div>
  </section>;
}
