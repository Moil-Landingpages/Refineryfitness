import { render } from "@react-email/render";
import { EnquiryEmail, type EnquiryEmailProps } from "@/emails/enquiry";
import { CHECK_IN_STEPS } from "@/lib/check-in";
import { CONSULTATION_FORMATS, CONSULTATION_TOPICS, DEFAULT_TOPIC, LIMITS } from "@/lib/consultation";
import { EmailGatewayError, readGatewayConfig, sendViaGateway } from "@/lib/email-gateway";

/**
 * Receives every website form — the free-intro request, the 90-second check-in,
 * and the consultation booking behind the "book" buttons — and hands them to
 * the email gateway.
 *
 * The status codes matter to the forms: 503 means "nothing is configured", and
 * 502 means "configured but the gateway refused". Both tell the browser to fall
 * back to opening a prefilled mail client, so an enquiry is never silently lost.
 */

type Payload = {
  kind?: unknown;
  name?: unknown;
  email?: unknown;
  message?: unknown;
  picks?: unknown;
  phone?: unknown;
  topic?: unknown;
  format?: unknown;
};

const asText = (value: unknown, max = 500) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

/** Keeps a value only when it is one the site actually offers. */
const oneOf = (value: unknown, allowed: readonly string[]) => {
  const text = asText(value, 120);
  return allowed.includes(text) ? text : "";
};

/**
 * Rebuilds the check-in from the choices the browser reported, rejecting
 * anything that was not actually on offer.
 */
function toAnswers(picks: unknown): { question: string; answer: string }[] | null {
  if (!Array.isArray(picks) || picks.length !== CHECK_IN_STEPS.length) return null;
  const answers = CHECK_IN_STEPS.map((step, index) => {
    const answer = asText(picks[index]);
    return (step.choices as readonly string[]).includes(answer) ? { question: step.question, answer } : null;
  });
  return answers.every((item) => item !== null) ? (answers as { question: string; answer: string }[]) : null;
}

export async function POST(request: Request) {
  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return Response.json({ error: "Malformed request body." }, { status: 400 });
  }

  const kind =
    payload.kind === "check-in" ? "check-in" : payload.kind === "consultation" ? "consultation" : "intro";
  const name = asText(payload.name, LIMITS.name);
  const email = asText(payload.email, LIMITS.email);
  const message = asText(payload.message, LIMITS.message);

  if (!name) return Response.json({ error: "A name is required." }, { status: 422 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "A valid email address is required." }, { status: 422 });
  }

  let answers: EnquiryEmailProps["answers"];
  if (kind === "check-in") {
    const parsed = toAnswers(payload.picks);
    if (!parsed) return Response.json({ error: "Please answer all three questions." }, { status: 422 });
    answers = parsed;
  }

  const phone = kind === "consultation" ? asText(payload.phone, LIMITS.phone) : "";
  const topic = kind === "consultation" ? oneOf(payload.topic, CONSULTATION_TOPICS) || DEFAULT_TOPIC : "";
  const format = kind === "consultation" ? oneOf(payload.format, CONSULTATION_FORMATS) : "";

  const settings = readGatewayConfig();
  if ("missing" in settings) {
    console.error(`[enquiry] email gateway not configured; missing ${settings.missing.join(", ")}`);
    return Response.json({ error: "Email delivery is not configured." }, { status: 503 });
  }

  const submittedAt = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
    timeZone: "America/Chicago",
  }).format(new Date());

  const email_ = EnquiryEmail({
    kind,
    name,
    email,
    message: message || undefined,
    answers,
    phone: phone || undefined,
    topic: topic || undefined,
    format: format || undefined,
    submittedAt,
  });
  const [html, text] = await Promise.all([render(email_), render(email_, { plainText: true })]);

  const subject =
    kind === "check-in"
      ? `Check-in from ${name}`
      : kind === "consultation"
        ? `Consultation request — ${name} (${topic})`
        : `Free intro request — ${name}`;

  try {
    const id = await sendViaGateway(settings.config, { subject, html, text });
    return Response.json({ ok: true, id });
  } catch (error) {
    console.error("[enquiry] gateway send failed:", error instanceof EmailGatewayError ? error.message : error);
    return Response.json({ error: "The message could not be sent." }, { status: 502 });
  }
}
