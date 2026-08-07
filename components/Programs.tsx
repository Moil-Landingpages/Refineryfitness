"use client";

import { useState } from "react";
import { useBooking } from "@/components/Booking";
import { programs } from "@/lib/programs";
import { ArrowUpRight } from "@/components/icons";

export default function Programs() {
  const [active, setActive] = useState(0);
  const { open } = useBooking();
  return <section className="programs section" id="programs" aria-labelledby="programs-heading">
    <div className="program-title">
      <p className="kicker dark" data-reveal><b /> FIND YOUR START</p>
      <h2 id="programs-heading" data-split>DON’T JUST<br />START.<br /><em>STAY WITH IT.</em></h2>
      <p data-reveal>A pathway for your schedule. A system for your life.</p>
    </div>
    <div className="program-console" data-reveal>
      <div className="program-tabs" role="tablist" aria-label="Training programs">
        {programs.map((item, index) => <button key={item.id} role="tab" id={`tab-${item.id}`} aria-selected={active === index} aria-controls={`panel-${item.id}`} className={active === index ? "active" : ""} onClick={() => setActive(index)}><small>{item.number}</small>{item.name}<span><ArrowUpRight /></span></button>)}
      </div>
      {/* Every panel stays in the markup so crawlers see all three programs;
          inactive ones are hidden, which also re-runs the reveal animation. */}
      {programs.map((program, index) => <div className="program-detail" key={program.id} hidden={active !== index} role="tabpanel" id={`panel-${program.id}`} aria-labelledby={`tab-${program.id}`}>
        <div>
          <p className="program-label">{program.label}</p>
          <h3>{program.name}</h3>
          <p className="program-line">{program.line}</p>
          <p className="program-copy">{program.copy}</p>
          <button type="button" className="button orange" onClick={() => open(program.name)}>{program.action} <span><ArrowUpRight /></span></button>
        </div>
        <ul>{program.includes.map((item) => <li key={item}><b>+</b>{item}</li>)}</ul>
        <div className="program-index">0{index + 1}<i>/</i>03</div>
      </div>)}
    </div>
  </section>;
}
