/**
 * Client for the Moil Email Gateway (`POST /emails/send`).
 *
 * Server only. Nothing here is exported to a client component, and every value
 * it reads is an unprefixed environment variable, so the SMTP password cannot
 * reach the browser bundle.
 *
 * The gateway replaces talking to a relay directly: it records the email,
 * enqueues it, and a worker delivers it with retries (5s → 30s → 5min) and
 * per-mailbox rate limiting. A relay that is slow or briefly unreachable
 * therefore delays delivery rather than failing the visitor's submission.
 *
 * Credentials travel inline with the send (`auth`) instead of via a one-off
 * `POST /providers/smtp/connect`, so the deployment needs no manual setup step
 * and the gateway's stored copy of the mailbox stays in step with this app's.
 */

/** Everything the sender needs, resolved once so failures surface as config errors. */
type GatewayConfig = {
  baseUrl: string;
  apiKey: string;
  from: string;
  fromName?: string;
  to: string;
  smtp: { host: string; port: number; username: string; password: string; encryption: string };
};

export class EmailGatewayError extends Error {}

const trimmed = (value: string | undefined) => value?.trim() || undefined;

/**
 * Reads configuration, or returns the names of what is missing.
 *
 * Returning the gaps rather than throwing lets the route answer "not
 * configured" distinctly from "the gateway rejected this", which is what tells
 * the form whether falling back to the visitor's mail client is worthwhile.
 */
export function readGatewayConfig(): { config: GatewayConfig } | { missing: string[] } {
  const baseUrl = trimmed(process.env.EMAIL_GATEWAY_URL);
  const apiKey = trimmed(process.env.EMAIL_GATEWAY_API_KEY);
  const host = trimmed(process.env.SMTP_HOST);
  const username = trimmed(process.env.SMTP_USERNAME);
  // Gmail prints App Passwords in four groups of four; people paste them as
  // shown and the relay rejects the spaces.
  const password = process.env.SMTP_PASSWORD?.replace(/\s+/g, "") || undefined;
  const to = trimmed(process.env.MAIL_TO);
  const from = trimmed(process.env.MAIL_FROM) ?? username;

  const missing = Object.entries({
    EMAIL_GATEWAY_URL: baseUrl,
    EMAIL_GATEWAY_API_KEY: apiKey,
    SMTP_HOST: host,
    SMTP_USERNAME: username,
    SMTP_PASSWORD: password,
    MAIL_TO: to,
  })
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (missing.length || !baseUrl || !apiKey || !host || !username || !password || !to || !from) {
    return { missing };
  }

  return {
    config: {
      baseUrl: baseUrl.replace(/\/+$/, ""),
      apiKey,
      from,
      fromName: trimmed(process.env.MAIL_FROM_NAME),
      to,
      smtp: {
        host,
        port: Number(process.env.SMTP_PORT ?? 587),
        username,
        password,
        encryption: trimmed(process.env.SMTP_ENCRYPTION) ?? "starttls",
      },
    },
  };
}

/** Sends one email and resolves with the gateway's id for it. */
export async function sendViaGateway(
  config: GatewayConfig,
  message: { subject: string; html: string; text: string; to?: string },
): Promise<string> {
  const response = await fetch(`${config.baseUrl}/emails/send`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: message.to ?? config.to,
      subject: message.subject,
      html: message.html,
      text: message.text,
      // `from` is the sending mailbox and is required whenever `auth` is present.
      from: config.from,
      auth: {
        provider: "smtp",
        host: config.smtp.host,
        port: config.smtp.port,
        username: config.smtp.username,
        password: config.smtp.password,
        encryption: config.smtp.encryption,
      },
    }),
    // A hung relay must not hold the visitor's request open indefinitely.
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    // The body carries the gateway's own message ("smtp requires host, port,
    // …", "invalid recipient address"); it is the only useful diagnostic, and
    // it never contains the credentials we sent.
    const detail = await response.text().catch(() => "");
    throw new EmailGatewayError(`gateway responded ${response.status}${detail ? `: ${detail.slice(0, 400)}` : ""}`);
  }

  const body = (await response.json()) as { id?: string };
  return body.id ?? "";
}
