import type { Metadata } from "next";
import Link from "next/link";
import Page from "@/components/Page";
import PageHero from "@/components/PageHero";
import { BookButton } from "@/components/Booking";
import { ArrowUpRight } from "@/components/icons";
import { openGraph } from "@/lib/seo";
import { EMAIL, SOCIALS, mailto } from "@/lib/site";
import { COVERAGE_STATEMENT, HOME_MARKET, REMOTE_REACH, listPlaces } from "@/lib/market";

const PATH = "/contact";

/**
 * NOTE — no telephone number is published anywhere on this site, so none appears
 * here. The developer plan asks for a contact page with a phone number; that is
 * an owner-supplied fact and is listed as a Phase 0 gate in
 * docs/local-seo-aeo-plan.md. When Jeff supplies one, add it to lib/site.ts, put
 * it in the facts list below, and add `telephone` to the business node in
 * lib/schema.ts. Do not invent one to fill the gap.
 */
export const metadata: Metadata = {
  title: "Contact Refinery Fitness of Buda",
  description:
    "Get in touch with Refinery Fitness of Buda. Book a free intro session, or email Jeff Mensing directly. Serving Buda, Kyle and Hays County in person, mobile and virtually.",
  alternates: { canonical: PATH },
  openGraph: openGraph({
    title: "Contact Refinery Fitness of Buda",
    description: "Book a free intro, or just ask a question first.",
    url: PATH,
  }),
};

export default function ContactPage() {
  return (
    <Page
      path={PATH}
      topic="Free intro session"
      ctaHeading={<>ONE CONVERSATION.<br />NO <em>PRESSURE.</em></>}
      ctaBody="The free intro is exactly that — a conversation about what you want to change and the best next step."
    >
      <PageHero
        kicker="CONTACT · REFINERY FITNESS OF BUDA"
        heading={<>GET IN<br /><em>TOUCH</em></>}
        lede={
          <>
            The quickest route is the free intro — it books a real conversation rather
            than starting an email chain. If you would rather just ask something first,
            email works too.
          </>
        }
        facts={[
          ["Email", <a key="email" href={mailto("Hello from the website")}>{EMAIL}</a>],
          ["Based in", `${HOME_MARKET.city}, ${HOME_MARKET.regionLong}`],
          ["Serving", listPlaces()],
          ["Formats", "In person · Mobile · Virtual"],
          ["Virtual reach", REMOTE_REACH.replace(/^anywhere in /, "")],
          ["Social", SOCIALS.map((social) => social.name).join(" · ")],
        ]}
        actions={
          <>
            <BookButton className="button lime" topic="Free intro session">
              Book your free intro <span><ArrowUpRight /></span>
            </BookButton>
            <a className="under-link" href={mailto("Hello from the website")}>
              Email Jeff <span><ArrowUpRight /></span>
            </a>
          </>
        }
      />

      <section className="page-section">
        <div className="page-split">
          <h2>WHERE TRAINING<br /><em>HAPPENS</em></h2>
          <div className="page-prose">
            <p>{COVERAGE_STATEMENT}</p>
            <p>
              <strong>There is no gym to visit.</strong> Refinery Fitness is a
              service-area practice: sessions run in person, at your own home or garage
              gym, or over video. That is why no street address is published — there
              isn&rsquo;t one to publish, and claiming otherwise would waste your time
              and ours.
            </p>
            <p>
              Which format suits you gets decided at the intro, based on your schedule
              and where you are. See the{" "}
              <Link href="/personal-trainer-buda-tx">Buda</Link>,{" "}
              <Link href="/personal-trainer-kyle-tx">Kyle</Link>, and{" "}
              <Link href="/personal-trainer-hays-county-tx">Hays County</Link> pages for
              how coverage works in each.
            </p>
          </div>
        </div>
      </section>

      <section className="page-section soft">
        <p className="kicker"><b /> BEFORE YOU WRITE</p>
        <h2>THE THINGS PEOPLE<br />ASK <em>FIRST</em></h2>
        <ol className="page-list">
          <li>
            <span>Q</span>
            <div>
              <h3>What happens in a free intro?</h3>
              <p>A clear, no-pressure conversation about what you want to change, what has gotten in the way, and the best next step. There is no assessment to pass and nothing to prepare.</p>
            </div>
          </li>
          <li>
            <span>Q</span>
            <div>
              <h3>Do I need to be fit to begin?</h3>
              <p>No. Most people starting here are not, and the first block is built around that rather than in spite of it.</p>
            </div>
          </li>
          <li>
            <span>Q</span>
            <div>
              <h3>Do you train outside Hays County?</h3>
              <p>Virtual coaching is available {REMOTE_REACH} — it is a real program built for people outside the travel radius, not a consolation prize.</p>
            </div>
          </li>
        </ol>
      </section>

      <section className="page-section">
        <div className="page-split">
          <h2>ELSEWHERE <em>ONLINE</em></h2>
          <div className="page-prose">
            <p>
              {SOCIALS.map((social, index) => (
                <span key={social.id}>
                  {index > 0 ? " · " : ""}
                  <a href={social.url} target="_blank" rel="noopener noreferrer">{social.name}</a>
                </span>
              ))}
            </p>
            <p>
              Or read more about <Link href="/about">Jeff</Link> and{" "}
              <Link href="/personal-training">how training works</Link> before getting in
              touch.
            </p>
          </div>
        </div>
      </section>
    </Page>
  );
}
