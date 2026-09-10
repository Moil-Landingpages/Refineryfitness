import type { Metadata } from "next";
import Link from "next/link";
import Page from "@/components/Page";
import PageHero from "@/components/PageHero";
import { BookButton } from "@/components/Booking";
import { ArrowUpRight } from "@/components/icons";
import { AFFILIATE_DISCLOSURE, gear } from "@/lib/gear";
import { openGraph } from "@/lib/seo";

const PATH = "/gear";

export const metadata: Metadata = {
  title: "Recommended Gear | Refinery Fitness",
  description:
    "The supplements and gear Jeff Mensing recommends to Refinery Fitness clients, with affiliate links. Refinery Fitness earns from qualifying purchases at no extra cost to you.",
  alternates: { canonical: PATH },
  openGraph: openGraph({
    title: "Recommended Gear | Refinery Fitness",
    description: "The supplements and gear Jeff recommends to Refinery Fitness clients.",
    url: PATH,
  }),
  // A short list of affiliate links is thin by definition, and this site's whole
  // strategy rests on not publishing thin pages. It stays out of the index and
  // out of the sitemap while remaining fully usable from a profile bio or the
  // footer. Flip to index once each item carries Jeff's own reason for
  // recommending it.
  robots: { index: false, follow: true },
};

export default function GearPage() {
  return (
    <Page
      path={PATH}
      topic="Free intro session"
      ctaHeading={<>GEAR HELPS.<br />COACHING <em>CHANGES THINGS.</em></>}
      ctaBody="No supplement replaces a plan that fits your week. Start with a free intro and we will build one."
    >
      <PageHero
        kicker="RECOMMENDED GEAR"
        heading={<>WHAT JEFF<br /><em>RECOMMENDS</em></>}
        lede={
          <>
            The supplements clients ask about most, with links to the exact products.
            Nothing here is required to train with Refinery Fitness — it is simply what
            gets recommended when someone asks.
          </>
        }
        facts={[
          ["Sold by", "Amazon"],
          ["Disclosure", "Affiliate links — see below"],
          ["Required?", "No. Training comes first."],
        ]}
        actions={
          <BookButton className="button lime" topic="Free intro session">
            Book your free intro <span><ArrowUpRight /></span>
          </BookButton>
        }
      />

      {/* Disclosure sits above the links, not buried in a footer: the FTC asks
          for it clear and conspicuous, before the reader acts on them. */}
      <section className="page-section">
        <div className="page-split">
          <h2>THE <em>LIST</em></h2>
          <div>
            <p className="gear-disclosure">{AFFILIATE_DISCLOSURE}</p>

            <ul className="gear-list">
              {gear.map((item) => (
                <li key={item.url}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="sponsored nofollow noopener noreferrer"
                  >
                    <span className="gear-body">
                      <strong>{item.name}</strong>
                      <small>{item.vendor}</small>
                    </span>
                    <i aria-hidden="true"><ArrowUpRight size={15} /></i>
                  </a>
                </li>
              ))}
            </ul>

            <p className="gear-note">
              Supplements are not a substitute for training, food, or sleep, and nothing
              here is medical advice. If you take medication or have a health condition,
              talk to your doctor before starting anything new.
            </p>
          </div>
        </div>
      </section>

      <section className="page-section soft">
        <div className="page-split">
          <h2>START WITH THE<br /><em>TRAINING</em></h2>
          <div className="page-prose">
            <p>
              Gear is the last five per cent. The part that moves the needle is a plan
              built around the week you actually have, and someone who notices when you
              go quiet.
            </p>
            <p>
              See <Link href="/personal-training">how training works</Link>, or the four{" "}
              <Link href="/programs/strong-start">programs</Link> Refinery runs across
              Buda, Kyle, and Hays County.
            </p>
          </div>
        </div>
      </section>
    </Page>
  );
}
