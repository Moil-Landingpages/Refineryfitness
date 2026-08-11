import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { BREAK_ICONS } from "@/components/icons";

type Props = {
  src: string;
  alt: string;
  /** Headline. One word wrapped in <em> takes the lime. */
  quote: ReactNode;
  /** Supporting lines under the rule. */
  body: string;
  /** Second line of the badge — the first is always the brand. */
  label: string;
  /** Key into BREAK_ICONS. */
  icon: string;
  /** Ghosted numeral, following the order these appear down the page. */
  index: string;
  /** Photo to the right, and every mirrored element with it. */
  flip?: boolean;
  /** object-position for the crop. Both these photos put faces high in frame,
   *  so the window has to sit above centre to keep heads in. */
  focus?: string;
  /** Drop the near-monochrome grade and let the photograph keep its colour. */
  colour?: boolean;
};

/**
 * A quote and a photograph, mirrored between the two placements on the page.
 *
 * The photo is a clipped panel rather than a rectangle: its inner edge — the one
 * facing the copy — is slanted, and a lime wedge sits behind its outer edge. The
 * decoration around it (dotted rail, ghosted numeral, ghosted quote glyph) all
 * hangs off the copy column's outer side, so the whole composition reads as one
 * mirrored pair rather than two unrelated bands.
 */
export default function VisualBreak({ src, alt, quote, body, label, icon, index, flip, focus = "center", colour }: Props) {
  const Icon = BREAK_ICONS[icon] ?? BREAK_ICONS.person;
  const media = { "--focus": focus, ...(colour ? { "--grade": "saturate(1.02) contrast(1.05) brightness(.97)" } : null) } as CSSProperties;

  return <section className={flip ? "visual-break flip" : "visual-break"}>
    <span className="vb-rail" aria-hidden="true"><i className="rail-mark" /></span>
    <span className="vb-index" aria-hidden="true">{index}</span>

    <figure className="photo-frame">
      <div className="photo-coaching" style={media}><Image src={src} alt={alt} fill sizes="(max-width: 760px) 100vw, 52vw" /></div>
      <span className="vb-edge" aria-hidden="true" />
      <span className="vb-dots" aria-hidden="true" />
    </figure>

    <div className="vb-copy">
      <span className="vb-mark" aria-hidden="true">&rdquo;</span>
      <p className="vb-eyebrow" data-reveal><i />REFINERY FITNESS</p>
      <p className="vb-head" data-split>{quote}</p>
      <span className="vb-rule" aria-hidden="true" />
      <p className="vb-body" data-reveal>{body}</p>
      <div className="vb-badge" data-reveal>
        <span className="vb-badge-ring"><Icon size={17} /></span>
        <span className="vb-badge-text">
          <b>REFINERY FITNESS</b>
          <em>{label}</em>
        </span>
      </div>
    </div>
  </section>;
}
