import Image from "next/image";
import type { ReactNode } from "react";

type Props = { src: string; quote: ReactNode; tag: string; flip?: boolean };

export default function VisualBreak({ src, quote, tag, flip }: Props) {
  return <section className={flip ? "visual-break flip" : "visual-break"}>
    <div className="photo-frame" aria-hidden="true">
      <div className="photo-coaching"><Image src={src} alt="" fill sizes="(max-width: 760px) 100vw, 62vw" /></div>
    </div>
    <div className="visual-quote">
      <p data-split>{quote}</p>
      <span data-reveal>{tag}</span>
    </div>
  </section>;
}
