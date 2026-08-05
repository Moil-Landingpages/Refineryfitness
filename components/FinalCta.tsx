"use client";

import { useState } from "react";
import { EMAIL, mailto } from "@/lib/site";
import { ArrowUpRight } from "@/components/icons";

export default function FinalCta() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // Composes the intro request in the visitor's own mail client. Swap this for a
  // POST to Formspree/Resend once the client wants server-side email delivery.
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Hi Jeff,\n\nI'm ${name || "reaching out"} and I'd like to book a free intro.\n\n${message}`;
    window.location.href = mailto("Free Intro Session", body);
  };

  return <section className="final">
    <p className="kicker dark" data-reveal><b /> YOUR NEXT REP</p>
    <h2 data-split>BUILD A BODY.<br /><em>RECLAIM</em> YOUR LIFE.</h2>
    <p data-reveal>A free intro is a conversation—not a commitment.</p>
    <form className="intro-form" data-reveal onSubmit={submit}>
      <label htmlFor="cta-name">Your name</label>
      <input id="cta-name" name="name" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="First name is plenty" />
      <label htmlFor="cta-message">What would you like to change?</label>
      <textarea id="cta-message" name="message" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Strength, energy, consistency, getting back after a long break…" />
      <button className="button dark-button" type="submit">Book your free intro <span><ArrowUpRight /></span></button>
      <small>Opens your email — or write directly to <a href={mailto("Free Intro Session")}>{EMAIL}</a></small>
    </form>
  </section>;
}
