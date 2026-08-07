"use client";

import { useState } from "react";
import { EMAIL, mailto } from "@/lib/site";
import { ArrowUpRight } from "@/components/icons";

/**
 * Free-intro request.
 *
 * Posts to /api/enquiry, which hands the details to the Moil Email Gateway for
 * delivery to Jeff's inbox. If that route is unconfigured or the gateway
 * refuses, it falls back to composing the same message in the visitor's own
 * mail client, so no enquiry is lost either way.
 *
 * The email field is required: server-side delivery has no other way to learn
 * the sender's address, where the old mailto: flow got it from their mail app.
 */
export default function FinalCta() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "mailto">("idle");

  const body = `Hi Jeff,\n\nI'm ${name || "reaching out"} and I'd like to book a free intro.\n\n${message}\n\nReach me at ${email}`;

  const openMailFallback = () => {
    window.location.href = mailto("Free Intro Session", body);
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
        body: JSON.stringify({ kind: "intro", name, email, message }),
      });
      if (!response.ok) throw new Error(String(response.status));
      setStatus("sent");
    } catch {
      openMailFallback();
    }
  };

  return <section className="final" aria-labelledby="cta-heading">
    <p className="kicker dark" data-reveal><b /> YOUR NEXT REP</p>
    <h2 id="cta-heading" data-split>BUILD A BODY.<br /><em>RECLAIM</em> YOUR LIFE.</h2>
    <p data-reveal>A free intro is a conversation—not a commitment.</p>
    {status === "sent" || status === "mailto"
      ? <div className="intro-form intro-done" data-reveal role="status">
          <p>{status === "sent"
            ? "That's with Jeff. He'll be in touch to set up your free intro."
            : "Almost there—press send in the email we just opened."}</p>
          <small>Or write directly to <a href={mailto("Free Intro Session")}>{EMAIL}</a></small>
        </div>
      : <form className="intro-form" data-reveal onSubmit={submit}>
          <label htmlFor="cta-name">Your name</label>
          <input id="cta-name" name="name" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="First name is plenty" />
          <label htmlFor="cta-email">Your email</label>
          <input id="cta-email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="So Jeff can get back to you" />
          <label htmlFor="cta-message">What would you like to change?</label>
          <textarea id="cta-message" name="message" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Strength, energy, consistency, getting back after a long break…" />
          <button className="button dark-button" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : <>Book your free intro <span><ArrowUpRight /></span></>}
          </button>
          <small>Goes straight to Jeff — or write directly to <a href={mailto("Free Intro Session")}>{EMAIL}</a></small>
        </form>}
  </section>;
}
