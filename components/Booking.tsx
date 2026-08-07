"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { CONSULTATION_FORMATS, DEFAULT_TOPIC, LIMITS } from "@/lib/consultation";
import { EMAIL, mailto } from "@/lib/site";
import { ArrowUpRight, Close } from "@/components/icons";

/**
 * The consultation booking modal, and the plumbing that lets any button on the
 * page open it.
 *
 * Every "book"/"ask about" CTA used to be a `mailto:` link, which asked the
 * visitor to own the hard part — knowing what to write — and lost anyone
 * browsing without a configured mail client. They now all open this one form.
 * The button that was clicked passes its own `topic`, so the modal opens
 * already pointed at the thing the visitor was reading about, and Jeff can see
 * in the subject line which part of the site sent them.
 *
 * Delivery matches the other two forms: post to /api/enquiry, and if that route
 * is unconfigured or the gateway refuses, compose the same details in the
 * visitor's own mail client so the enquiry is never silently lost.
 */

type BookingContextValue = { open: (topic?: string) => void };

const BookingContext = createContext<BookingContextValue | null>(null);

/** Throws rather than no-ops, so a CTA rendered outside the provider is caught in dev. */
export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) throw new Error("useBooking must be used inside <BookingProvider>");
  return context;
}

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [topic, setTopic] = useState<string | null>(null);
  const open = useCallback((next?: string) => setTopic(next || DEFAULT_TOPIC), []);
  const close = useCallback(() => setTopic(null), []);

  // `open` is stable, so the value only changes when the modal opens or closes.
  const [value] = useState<BookingContextValue>(() => ({ open }));

  return <BookingContext.Provider value={value}>
    {children}
    {topic !== null && <BookingModal topic={topic} onClose={close} />}
  </BookingContext.Provider>;
}

/**
 * A CTA that opens the modal.
 *
 * Rendered from server components, so it takes only serialisable props. It is a
 * real `<button>` rather than an anchor: it goes nowhere, and a screen reader
 * should not announce it as a link.
 */
export function BookButton({
  topic,
  className,
  children,
}: {
  topic?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { open } = useBooking();
  return <button type="button" className={className} onClick={() => open(topic)}>{children}</button>;
}

const FOCUSABLE = 'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])';

function BookingModal({ topic, onClose }: { topic: string; onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [format, setFormat] = useState<string>(CONSULTATION_FORMATS[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "mailto">("idle");

  const dialog = useRef<HTMLDivElement>(null);
  const firstField = useRef<HTMLInputElement>(null);

  // Whatever had focus before the modal opened, so it can be handed back on close.
  const opener = useRef<HTMLElement | null>(null);
  useEffect(() => {
    opener.current = document.activeElement as HTMLElement | null;
    firstField.current?.focus();
    return () => opener.current?.focus?.();
  }, []);

  // The page behind the modal must not scroll with it.
  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = overflow; };
  }, []);

  // Escape closes; Tab cycles inside the dialog rather than escaping into the page.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") return onClose();
      if (event.key !== "Tab" || !dialog.current) return;

      const items = [...dialog.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
      if (!items.length) return;
      const [first] = items;
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const body = `Hi Jeff,\n\nI'd like to book a consultation about ${topic}.\n\nName: ${name}\nEmail: ${email}${phone ? `\nPhone: ${phone}` : ""}\nI'd prefer to train: ${format}\n\n${message}`;

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "consultation", name, email, phone, topic, format, message }),
      });
      if (!response.ok) throw new Error(String(response.status));
      setStatus("sent");
    } catch {
      window.location.href = mailto(`Consultation — ${topic}`, body);
      setStatus("mailto");
    }
  };

  return <div className="modal-scrim" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="booking-heading" ref={dialog}>
      <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
        <Close size={16} />
      </button>

      <p className="kicker"><b /> {topic}</p>
      <h2 id="booking-heading">BOOK YOUR<br /><em>CONSULTATION.</em></h2>

      {status === "sent" || status === "mailto" ? <div className="modal-done" role="status">
        <p>{status === "sent"
          ? "That's with Jeff. He'll be in touch to set up a time that works."
          : "Almost there—press send in the email we just opened."}</p>
        <button type="button" className="button lime" onClick={onClose}>Close <span><ArrowUpRight /></span></button>
      </div> : <>
        <p className="modal-lede">A consultation is a conversation—not a commitment. Tell Jeff where you are and he&apos;ll come back with your next right step.</p>
        <form className="modal-form" onSubmit={submit}>
          <div className="modal-row">
            <div>
              <label htmlFor="book-name">Your name</label>
              <input id="book-name" name="name" ref={firstField} autoComplete="name" required maxLength={LIMITS.name} value={name} onChange={(event) => setName(event.target.value)} placeholder="First name is plenty" />
            </div>
            <div>
              <label htmlFor="book-phone">Phone <i>(optional)</i></label>
              <input id="book-phone" name="phone" type="tel" autoComplete="tel" maxLength={LIMITS.phone} value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="If a call is easier" />
            </div>
          </div>

          <label htmlFor="book-email">Your email</label>
          <input id="book-email" name="email" type="email" autoComplete="email" required maxLength={LIMITS.email} value={email} onChange={(event) => setEmail(event.target.value)} placeholder="So Jeff can get back to you" />

          <label htmlFor="book-format">Where would you like to train?</label>
          <select id="book-format" name="format" value={format} onChange={(event) => setFormat(event.target.value)}>
            {CONSULTATION_FORMATS.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>

          <label htmlFor="book-message">What would you like to change?</label>
          <textarea id="book-message" name="message" rows={3} maxLength={LIMITS.message} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Strength, energy, consistency, getting back after a long break…" />

          <button className="button lime" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : <>Send my request <span><ArrowUpRight /></span></>}
          </button>
          <small>Goes straight to Jeff — or write directly to <a href={mailto(`Consultation — ${topic}`)}>{EMAIL}</a></small>
        </form>
      </>}
    </div>
  </div>;
}
