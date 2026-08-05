"use client";

import { useState } from "react";
import { mailto } from "@/lib/site";
import { ArrowUpRight } from "@/components/icons";

const programs = [
  { id: "strong", number: "01", label: "Signature reset", name: "Strong Start", line: "Build the system before you chase the result.", copy: "Four weekly workouts, habit coaching, and a standing check-in make your next right decision obvious.", includes: ["4 workouts every week", "Weekly coaching check-in", "Mindset + habit system"], action: "Ask about Strong Start" },
  { id: "one", number: "02", label: "High-touch coaching", name: "1:1 Training", line: "A program built around your life, not the other way around.", copy: "Train in person with coaching that meets your goals, schedule, experience, and the season you are in.", includes: ["Personalized training plan", "In-person movement coaching", "Accountability that adapts"], action: "Explore 1:1 coaching" },
  { id: "mobile", number: "03", label: "Buda + Kyle", name: "Mobile Training", line: "Exceptional coaching, right where life happens.", copy: "Bring the focus of a thoughtful training session to your home, garage gym, or preferred local setting.", includes: ["At-home or garage-gym sessions", "Buda, Kyle + Hays County", "Built for busy schedules"], action: "Ask about mobile training" },
];

export default function Programs() {
  const [active, setActive] = useState(0);
  const program = programs[active];
  return <section className="programs section" id="programs">
    <div className="program-title">
      <p className="kicker dark" data-reveal><b /> FIND YOUR START</p>
      <h2 data-split>DON’T JUST<br />START.<br /><em>STAY WITH IT.</em></h2>
      <p data-reveal>A pathway for your schedule. A system for your life.</p>
    </div>
    <div className="program-console" data-reveal>
      <div className="program-tabs" role="tablist" aria-label="Training programs">
        {programs.map((item, index) => <button key={item.id} role="tab" id={`tab-${item.id}`} aria-selected={active === index} aria-controls="program-panel" className={active === index ? "active" : ""} onClick={() => setActive(index)}><small>{item.number}</small>{item.name}<span><ArrowUpRight /></span></button>)}
      </div>
      <div className="program-detail" key={program.id} role="tabpanel" id="program-panel" aria-labelledby={`tab-${program.id}`}>
        <div>
          <p className="program-label">{program.label}</p>
          <h3>{program.name}</h3>
          <p className="program-line">{program.line}</p>
          <p className="program-copy">{program.copy}</p>
          <a className="button orange" href={mailto(program.action)}>{program.action} <span><ArrowUpRight /></span></a>
        </div>
        <ul>{program.includes.map((item) => <li key={item}><b>+</b>{item}</li>)}</ul>
        <div className="program-index">0{active + 1}<i>/</i>03</div>
      </div>
    </div>
  </section>;
}
