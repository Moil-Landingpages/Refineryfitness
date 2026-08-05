import Image from "next/image";
import type { ReactNode } from "react";

type Props = { src: string; alt: string; quote: ReactNode; tag: string; flip?: boolean };

export default function VisualBreak({ src, alt, quote, tag, flip }: Props) {
  return <section className={flip ? "visual-break flip" : "visual-break"}>
    <div className="photo-frame">
      <div className="photo-coaching"><Image src={src} alt={alt} fill sizes="(max-width: 760px) 100vw, 62vw" /></div>
    </div>
    <div className="visual-quote">
      <p data-split>{quote}</p>
      <span data-reveal>{tag}</span>
    </div>
  </section>;
}
