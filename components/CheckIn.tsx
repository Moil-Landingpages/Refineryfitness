"use client";

import Image from "next/image";
import { useState } from "react";
import { mailto } from "@/lib/site";
import { CHECK_IN_STEPS as steps } from "@/lib/check-in";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@/components/icons";

/**
 * The 90-second check-in.
 *
 * The three picks are followed by name and email, then posted to /api/enquiry,
 * which hands them to the Moil Email Gateway for delivery to Jeff's inbox. If
 * that route is unconfigured or the gateway refuses, the same summary opens in
 * the visitor's own mail client instead, so nothing is lost.
 *
 * The email field is required: server-side delivery has no other way to learn
 * the sender's address, where the old mailto: flow got it from their mail app.
 * The questions live in lib/check-in.ts because the API route validates the
 * answers against the same list.
 */
export default function CheckIn() {
  const [picks, setPicks] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "mailto">("idle");
  const step = picks.length;
  const done = step >= steps.length;

  const body = `Hi Jeff,\n\nHere is my 90-second check-in:\n${steps.map((s, i) => `• ${s.short}: ${picks[i]}`).join("\n")}\n\nWhat is my best next step?\n\nReach me at ${email}`;

  const openMailFallback = () => {
    window.location.href = mailto("My Refinery Check-In", body);
    setStatus("mailto");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "check-in", name, email, picks }),
      });
      if (!response.ok) throw new Error(String(response.status));
      setStatus("sent");
    } catch {
      openMailFallback();
    }
  };

  const restart = () => {
    setPicks([]);
    setStatus("idle");
  };

  return <section className="assessment" aria-labelledby="checkin-heading">
    <div className="assessment-bg" aria-hidden="true"><Image src="/images/refinery-cable-work.jpg" alt="" fill sizes="100vw" /></div>
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
      </> : status === "sent" || status === "mailto" ? <>
        <p className="step">ON ITS WAY</p>
        <h3>{status === "sent"
          ? "That's with Jeff. He'll come back to you with your next right step."
          : "Almost there—press send in the email we just opened."}</h3>
        <button className="reset" onClick={restart}>Start over</button>
      </> : <>
        <p className="step">YOUR DIRECTION</p>
        <h3>A plan is waiting on the other side of one honest conversation.</h3>
        <ul className="picks">{steps.map((s, i) => <li key={s.short}><b>+</b>{s.short}: <span>{picks[i]}</span></li>)}</ul>
        <form className="check-in-form" onSubmit={submit}>
          <label htmlFor="checkin-name">Your name</label>
          <input id="checkin-name" name="name" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="First name is plenty" />
          <label htmlFor="checkin-email">Your email</label>
          <input id="checkin-email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="So Jeff can get back to you" />
          <button className="button lime" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : <>Send Jeff my check-in <span><ArrowUpRight /></span></>}
          </button>
        </form>
        <button className="reset" onClick={restart}>Start over</button>
      </>}
    </div>
  </section>;
}
