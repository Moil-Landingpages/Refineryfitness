import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Page from "@/components/Page";
import PageHero from "@/components/PageHero";
import { BookButton } from "@/components/Booking";
import { ArrowUpRight } from "@/components/icons";
import { openGraph } from "@/lib/seo";
import { pillars } from "@/lib/method";
import { absolute } from "@/lib/pages";
import { SITE_URL, SOCIALS } from "@/lib/site";
import { listPlaces } from "@/lib/market";

const PATH = "/about";

export const metadata: Metadata = {
  title: "Meet Jeff Mensing | Refinery Fitness of Buda",
  description:
    "Jeff Mensing is a kinesiology-trained personal trainer and health coach in Buda, Texas, bringing a faith-first, science-backed approach to strength, health, and confidence.",
  alternates: { canonical: PATH },
  openGraph: openGraph({
    title: "Meet Jeff Mensing | Refinery Fitness",
    description: "Kinesiology-trained, faith-first, and coaching across Buda, Kyle and Hays County.",
    url: PATH,
    type: "profile",
  }),
};

/**
 * The same `Person` node the homepage graph defines, given a `url` now that a
 * practitioner page exists for it to point at. Nothing new is claimed.
 */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#jeff`,
  name: "Jeff Mensing",
  jobTitle: "Personal Trainer & Health Coach",
  url: absolute(PATH),
  worksFor: { "@id": `${SITE_URL}/#business` },
  knowsAbout: ["Kinesiology", "Strength training", "Health coaching"],
  sameAs: SOCIALS.map((social) => social.url),
};

export default function AboutPage() {
  return (
    <Page
      path={PATH}
      topic="Meet Jeff"
      ctaHeading={<>COME AS<br />YOU <em>ARE.</em></>}
      ctaBody="A free intro is a conversation. No assessment to pass, and nothing to prepare beforehand."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />

      <PageHero
        kicker="ABOUT · REFINERY FITNESS OF BUDA"
        heading={<>MEET<br />JEFF <em>MENSING</em></>}
        lede={
          <>
            Kinesiology-trained personal trainer and health coach, bringing a faith-first,
            science-backed approach to strength, health, and confidence — in Buda, Kyle,
            and across Hays County.
          </>
        }
        facts={[
          ["Coach", "Jeff Mensing"],
          ["Trained in", "Kinesiology"],
          ["Coaches", "Strength · Habits · Health"],
          ["Serving", listPlaces()],
          ["Approach", "The RPMS Method"],
        ]}
        actions={
          <>
            <BookButton className="button lime" topic="Meet Jeff">
              Book a free intro <span><ArrowUpRight /></span>
            </BookButton>
            <Link className="under-link" href="/personal-training">How training works <span><ArrowUpRight /></span></Link>
          </>
        }
      />

      <section className="page-section">
        <div className="page-split">
          <div>
            <Image
              src="/images/refinery-jeff.jpg"
              alt="Jeff Mensing, personal trainer and health coach at Refinery Fitness of Buda"
              width={900}
              height={1125}
              priority
              sizes="(max-width: 960px) 100vw, 34vw"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
          <div className="page-prose">
            <h2>MORE THAN <em>MOTION</em></h2>
            <p>
              The name is not decorative. Refining is what happens to something already
              valuable — heat applied deliberately, over time, to bring out what was
              always there. That is a more honest description of coaching than
              transformation is.
            </p>
            <p>
              <strong>Jeff is kinesiology-trained</strong>, and that training shapes the
              work: movement understood before load is added, progression built on what
              your body is actually ready for, and technique corrected in the room rather
              than diagnosed afterwards.
            </p>
            <p>
              The faith-first part is not a bolt-on either. It is why coaching here
              treats the whole person rather than a set of numbers — and it is offered
              as an invitation, never a requirement.
            </p>
          </div>
        </div>
      </section>

      <section className="page-section soft">
        <p className="kicker"><b /> THE METHOD</p>
        <h2>WHY RPMS<br /><em>EXISTS</em></h2>
        <div className="page-grid two">
          {pillars.map((pillar) => (
            <article className="page-card" key={pillar.title}>
              <h3>{pillar.letter} — {pillar.title}</h3>
              <p>{pillar.copy}</p>
            </article>
          ))}
        </div>
        <p style={{ marginTop: 30 }}>
          <Link className="under-link" href="/#method">See the method in full <span><ArrowUpRight /></span></Link>
        </p>
      </section>

      <section className="page-section">
        <div className="page-split">
          <h2>FIND JEFF<br /><em>ELSEWHERE</em></h2>
          <div className="page-prose">
            <p>
              Day-to-day coaching, client work, and what training in Buda actually looks
              like turn up here first:
            </p>
            <p>
              {SOCIALS.map((social, index) => (
                <span key={social.id}>
                  {index > 0 ? " · " : ""}
                  <a href={social.url} target="_blank" rel="noopener noreferrer">{social.name}</a>
                </span>
              ))}
            </p>
            <p>
              To ask something directly, the <Link href="/contact">contact page</Link> has
              every way to reach him.
            </p>
          </div>
        </div>
      </section>
    </Page>
  );
}
