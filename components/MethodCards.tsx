"use client";

import Image from "next/image";
import { useState } from "react";
import { pillars, type Pillar } from "@/lib/method";
import { useBooking } from "@/components/Booking";
import { ArrowUpRight, Flip } from "@/components/icons";

/**
 * The four RPMS cards, each of which turns over to explain its pillar.
 *
 * The trigger is a click or tap — not hover. A hover flip has no answer on
 * touch, and on a pointer it snatches the copy away the moment you drift off
 * the card while reading it.
 *
 * Headings and paragraphs are not valid inside a <button>, so each face holds
 * its own small button whose ::after stretches across the face. The card stays
 * clickable edge to edge and the markup stays honest.
 */
export default function MethodCards() {
  return <div className="method-map" data-reveal-group>
    {pillars.map((pillar, index) => <Card key={pillar.letter} pillar={pillar} index={index} />)}
  </div>;
}

function Card({ pillar, index }: { pillar: Pillar; index: number }) {
  const [open, setOpen] = useState(false);
  const { open: openBooking } = useBooking();

  return <article className="pillar" data-open={open}>
    <div className="pillar-inner">
      <div className="pillar-face">
        <div className="method-photo">
          <Image src={pillar.src} alt={pillar.alt} fill sizes="(max-width: 760px) 46vw, 21vw" />
          <span aria-hidden="true">{pillar.letter}</span>
        </div>
        <h3>{pillar.title}</h3>
        <p>{pillar.copy}</p>
        <button type="button" className="pillar-open" aria-expanded={open}
                onClick={() => setOpen(true)}
                aria-label={`Read more about ${pillar.title}`}>
          <em aria-hidden="true">Read more</em><Flip size={13} />
        </button>
        <i aria-hidden="true">0{index + 1}</i>
      </div>

      <div className="pillar-face pillar-back">
        <h3>{pillar.title}</h3>
        {pillar.detail.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <ul>{pillar.practice.map((item) => <li key={item}><b>+</b>{item}</li>)}</ul>
        <div className="pillar-actions">
          <button type="button" className="pillar-cta"
                  onClick={() => openBooking(`The RPMS Method — ${pillar.title}`)}>
            Talk about this <ArrowUpRight size={12} />
          </button>
          <button type="button" className="pillar-close" onClick={() => setOpen(false)}
                  aria-label={`Close ${pillar.title}`}>
            <em aria-hidden="true">Back</em><Flip size={13} />
          </button>
        </div>
      </div>
    </div>
  </article>;
}
