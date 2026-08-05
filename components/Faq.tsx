"use client";

import { useState } from "react";
import { faqs } from "@/lib/faqs";
import { Minus, Plus } from "@/components/icons";

export default function Faq() {
  const [open, setOpen] = useState(0);
  return <section className="faq section" aria-labelledby="faq-heading">
    <div>
      <p className="kicker" data-reveal><b /> CLEAR ANSWERS</p>
      <h2 id="faq-heading" data-split>LESS<br />GUESSING.<br /><em>MORE GOING.</em></h2>
    </div>
    <div className="faq-list" data-reveal-group>
      {faqs.map(([question, response], index) => <article className={open === index ? "open" : ""} key={question}>
        <button aria-expanded={open === index} aria-controls={`faq-${index}`} onClick={() => setOpen(open === index ? -1 : index)}><span>0{index + 1}</span>{question}<b aria-hidden="true">{open === index ? <Minus /> : <Plus />}</b></button>
        <div id={`faq-${index}`}><p>{response}</p></div>
      </article>)}
    </div>
  </section>;
}
