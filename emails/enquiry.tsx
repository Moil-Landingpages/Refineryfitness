import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

/**
 * A website enquiry as it lands in Jeff's inbox — either a free-intro request
 * or a completed 90-second check-in, which differ only in what they carry.
 *
 * Preview it while editing with `pnpm email` — the react-email dev server
 * renders every file in this folder, using the `PreviewProps` at the bottom.
 *
 * Two constraints shape the markup. Mail clients ignore linked stylesheets and
 * much of the cascade, so every family, colour and size is an inline style on a
 * table rather than something inherited. And Outlook and Gmail block remote
 * images until the reader opts in, so the accent rule is drawn in CSS and the
 * logo carries alt text with the gym name set as live text beside it.
 */

/**
 * Where the logo is fetched from.
 *
 * Mail clients cannot read the app's `public/` folder — they issue a plain HTTP
 * request from the reader's machine — so the mark needs a publicly reachable
 * absolute URL. Override with `SITE_URL` to point at a staging deploy; the
 * default is the live domain.
 */
const SITE = (process.env.SITE_URL || "https://refineryfitness.biz").replace(/\/+$/, "");

/** Brand tokens, mirroring `--ink`/`--cream`/`--lime`/`--orange` in globals.css. */
const c = {
  ink: "#10100e",
  cream: "#efede6",
  soft: "#d9d5ca",
  lime: "#d8ff51",
  orange: "#f35b37",
  dim: "#85837c",
  muted: "#5d5b54",
  line: "#c8c4b8",
};

/** Oswald / Instrument Sans / DM Mono, each with the fallback the brand degrades to. */
const display = 'Oswald, "Arial Narrow", "Helvetica Neue Condensed", Impact, sans-serif';
const sans = '"Instrument Sans", -apple-system, "Segoe UI", Helvetica, Arial, sans-serif';
const mono = '"DM Mono", ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace';

export type EnquiryEmailProps = {
  /** Which form this came from — they read very differently and are triaged differently. */
  kind: "intro" | "check-in";
  name: string;
  email: string;
  /** Free-intro requests only. */
  message?: string;
  /** Check-ins only: the three questions and what was picked. */
  answers?: { question: string; answer: string }[];
  /** Already formatted in gym time by the caller. */
  submittedAt: string;
};

export function EnquiryEmail({ kind, name, email, message, answers, submittedAt }: EnquiryEmailProps) {
  const isIntro = kind === "intro";
  const accent = isIntro ? c.lime : c.orange;
  const eyebrow = isIntro ? "Free intro request" : "90-second check-in";

  return (
    <Html lang="en">
      <Head />
      <Preview>{`${eyebrow} — ${name} (${email})`}</Preview>
      <Body style={{ margin: 0, padding: "0 0 40px", backgroundColor: c.soft, fontFamily: sans, color: c.ink }}>
        <Container style={{ width: "100%", maxWidth: "600px", margin: "0 auto", padding: "0 16px" }}>
          {/* Masthead — the ink nav bar from the top of the site. */}
          <Section style={{ backgroundColor: c.ink, padding: "26px 30px 24px", marginTop: "28px" }}>
            <Row>
              <Column style={{ width: "58px", verticalAlign: "middle" }}>
                <Img
                  src={`${SITE}/logo-512.png`}
                  width="46"
                  height="46"
                  alt="Refinery Fitness"
                  style={{ display: "block", border: 0, outline: "none", textDecoration: "none" }}
                />
              </Column>
              <Column style={{ verticalAlign: "middle" }}>
                <Text
                  style={{
                    margin: 0,
                    fontFamily: display,
                    fontSize: "24px",
                    fontWeight: 600,
                    letterSpacing: "-0.035em",
                    textTransform: "uppercase" as const,
                    color: c.cream,
                    lineHeight: 1.05,
                  }}
                >
                  Refinery Fitness
                </Text>
                <Text style={{ margin: "4px 0 0", fontFamily: mono, fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase" as const, color: c.dim }}>
                  Buda, Texas
                </Text>
              </Column>
            </Row>
          </Section>
          <Section style={{ backgroundColor: accent, height: "4px", lineHeight: "4px", fontSize: 0 }}>&nbsp;</Section>

          <Section style={{ backgroundColor: c.cream, padding: "32px 30px 30px" }}>
            <Text style={{ margin: 0, fontFamily: mono, fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase" as const, color: c.orange }}>
              {eyebrow}
            </Text>
            <Heading
              as="h1"
              style={{
                margin: "14px 0 0",
                fontFamily: display,
                fontSize: "42px",
                lineHeight: 0.9,
                fontWeight: 600,
                letterSpacing: "-0.045em",
                textTransform: "uppercase" as const,
                color: c.ink,
              }}
            >
              {name}
            </Heading>
            <Text style={{ margin: "14px 0 0", fontFamily: sans, fontSize: "15px", lineHeight: 1.6, color: c.muted }}>
              {isIntro
                ? "wants to book a free intro session."
                : "worked through the check-in and is ready for a next step."}
            </Text>

            {/* Reply path, kept above the detail so it never needs hunting for. */}
            <Section style={{ marginTop: "22px", backgroundColor: "#ffffff", borderLeft: `3px solid ${c.ink}`, padding: "16px 20px" }}>
              <Text style={labelStyle}>Reply to</Text>
              <Link href={`mailto:${email}`} style={{ ...valueStyle, fontSize: "18px", color: c.ink, textDecoration: "underline" }}>
                {email}
              </Link>
            </Section>

            {message ? (
              <Section style={{ paddingTop: "26px" }}>
                <Text style={{ ...labelStyle, color: c.dim }}>What they want to change</Text>
                <Hr style={{ margin: "6px 0 0", border: "none", borderTop: `1px solid ${c.line}` }} />
                <Text style={{ ...valueStyle, whiteSpace: "pre-wrap" as const, marginTop: "12px" }}>{message}</Text>
              </Section>
            ) : null}

            {answers?.length ? (
              <Section style={{ paddingTop: "26px" }}>
                <Text style={{ ...labelStyle, color: c.dim }}>Their answers</Text>
                <Hr style={{ margin: "6px 0 0", border: "none", borderTop: `1px solid ${c.line}` }} />
                {answers.map((item, index) => (
                  <Row key={item.question}>
                    <Column style={{ verticalAlign: "top", paddingTop: "14px" }}>
                      <Text style={{ margin: 0, fontFamily: mono, fontSize: "10px", letterSpacing: "0.12em", color: c.orange }}>
                        {String(index + 1).padStart(2, "0")}
                      </Text>
                      <Text style={{ margin: "4px 0 0", fontFamily: sans, fontSize: "13px", lineHeight: 1.5, color: c.muted }}>
                        {item.question}
                      </Text>
                      <Text style={{ ...valueStyle, fontWeight: 600 }}>{item.answer}</Text>
                    </Column>
                  </Row>
                ))}
              </Section>
            ) : null}

            <Section style={{ paddingTop: "26px" }}>
              <Text style={{ ...labelStyle, color: c.dim }}>Submitted</Text>
              <Text style={{ ...valueStyle, fontSize: "14px" }}>{submittedAt}</Text>
            </Section>
          </Section>

          <Section style={{ backgroundColor: c.ink, padding: "18px 30px" }}>
            <Text style={{ margin: 0, fontFamily: mono, fontSize: "10px", lineHeight: 1.9, letterSpacing: "0.06em", color: c.dim }}>
              Sent by the website form at{" "}
              <Link href={SITE} style={{ color: c.lime, textDecoration: "underline" }}>
                refineryfitness.biz
              </Link>
              <br />
              Delivered through the Moil Email Gateway.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const labelStyle = {
  margin: 0,
  fontFamily: mono,
  fontSize: "10px",
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  color: c.dim,
};

const valueStyle = {
  margin: "5px 0 0",
  fontFamily: sans,
  fontSize: "16px",
  lineHeight: 1.5,
  color: c.ink,
};

EnquiryEmail.PreviewProps = {
  kind: "check-in",
  name: "Dana Whitfield",
  email: "dana.whitfield@gmail.com",
  submittedAt: "August 7, 2026 at 9:14 AM CDT",
  answers: [
    { question: "What usually ends a good routine?", answer: "I lose momentum" },
    { question: "What kind of support would change the game?", answer: "Someone who checks in" },
    { question: "Where does training need to fit?", answer: "In person" },
  ],
} satisfies EnquiryEmailProps;

export default EnquiryEmail;
