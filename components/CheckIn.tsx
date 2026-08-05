"use client";

import Image from "next/image";
import { useState } from "react";
import { mailto } from "@/lib/site";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@/components/icons";

const steps = [
  { short: "What ends a good routine", question: "What usually ends a good routine?", choices: ["Time gets away from me", "I do not know what to do", "I lose momentum"] },
  { short: "Support that would change the game", question: "What kind of support would change the game?", choices: ["A plan built for me", "Someone who checks in", "Training that fits my values"] },
  { short: "Where training needs to fit", question: "Where does training need to fit?", choices: ["In person", "At home / mobile", "Virtually"] },
];

export default function CheckIn() {
  const [picks, setPicks] = useState<string[]>([]);
  const step = picks.length;
  const done = step >= steps.length;

  const body = `Hi Jeff,\n\nHere is my 90-second check-in:\n${steps.map((s, i) => `• ${s.short}: ${picks[i]}`).join("\n")}\n\nWhat is my best next step?`;

  return <section className="assessment" aria-labelledby="checkin-heading">
    <div className="assessment-bg" aria-hidden="true"><Image src="/images/refinery-chalk.jpg" alt="" fill sizes="100vw" /></div>
    <div className="assessment-copy">
      <p className="kicker" data-reveal><b /> 90-SECOND CHECK-IN</p>
      <h2 id="checkin-heading" data-split>WHAT WOULD<br />MAKE YOU<br /><em>UNSTOPPABLE?</em></h2>
      <p data-reveal>There is no perfect plan. There is a next right step. Find yours.</p>
    </div>
    <div className="check-in" data-reveal>
      <div className="progress" aria-hidden="true"><b style={{ width: `${(step / steps.length) * 100}%` }} /></div>
      {!done ? <>
        <p className="step">0{step + 1} <span>/ 03</span></p>
        <h3>{steps[step].question}</h3>
        <div className="choices">{steps[step].choices.map((item) => <button onClick={() => setPicks([...picks, item])} key={item}>{item}<b><ArrowRight /></b></button>)}</div>
        {step > 0 && <button className="back" onClick={() => setPicks(picks.slice(0, -1))}><ArrowLeft size={11} /> Back</button>}
      </> : <>
        <p className="step">YOUR DIRECTION</p>
        <h3>A plan is waiting on the other side of one honest conversation.</h3>
        <ul className="picks">{steps.map((s, i) => <li key={s.short}><b>+</b>{s.short}: <span>{picks[i]}</span></li>)}</ul>
        <a className="button lime" href={mailto("My Refinery Check-In", body)}>Send Jeff my check-in <span><ArrowUpRight /></span></a>
        <button className="reset" onClick={() => setPicks([])}>Start over</button>
      </>}
    </div>
  </section>;
}
