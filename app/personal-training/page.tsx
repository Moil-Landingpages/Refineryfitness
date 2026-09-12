import type { Metadata } from "next";
import Link from "next/link";
import Page from "@/components/Page";
import PageHero from "@/components/PageHero";
import { BookButton } from "@/components/Booking";
import { ArrowUpRight } from "@/components/icons";
import { openGraph } from "@/lib/seo";
import { programs } from "@/lib/programs";
import { pillars } from "@/lib/method";
import { PROGRAM_PATHS, pagesInGroup } from "@/lib/pages";
import { COVERAGE_STATEMENT, listPlaces } from "@/lib/market";

const PATH = "/personal-training";

export const metadata: Metadata = {
  title: "Personal Training in Buda, TX | Refinery Fitness",
  description:
    "Personal training built around your life, not the other way around. In-person, mobile, and virtual coaching across Buda, Kyle, and Hays County, using the RPMS Method.",
  alternates: { canonical: PATH },
  openGraph: openGraph({
    title: "Personal Training Built Around Your Life | Refinery Fitness",
    description: "In-person, mobile, and virtual coaching across Buda, Kyle, and Hays County.",
    url: PATH,
  }),
};

export default function PersonalTrainingPage() {
  const locations = pagesInGroup("location");

  return (
    <Page
      path={PATH}
      topic="Free intro session"
      ctaHeading={<>START WHERE<br />YOU <em>ARE.</em></>}
      ctaBody="A free intro is a conversation, not a commitment. Twenty minutes to work out what you actually need."
    >
      <PageHero
        kicker="PERSONAL TRAINING · BUDA, TEXAS"
        heading={<>PERSONAL TRAINING<br />BUILT AROUND <em>YOUR LIFE</em></>}
        lede={
          <>
            Not a program you have to rearrange your week around. Coaching that meets
            your goals, your schedule, your experience, and the season you are actually
            in — delivered in person, at your place, or over video.
          </>
        }
        facts={[
          ["Formats", "In person · Mobile · Virtual"],
          ["Service area", listPlaces()],
          ["Coach", "Jeff Mensing, kinesiology-trained"],
          ["Approach", "The RPMS Method"],
          ["First step", "A free intro session"],
        ]}
        actions={
          <>
            <BookButton className="button lime" topic="Free intro session">
              Book your free intro <span><ArrowUpRight /></span>
            </BookButton>
            <Link className="under-link" href="/about">Meet Jeff <span><ArrowUpRight /></span></Link>
          </>
        }
      />

      <section className="page-section">
        <div className="page-split">
          <h2>WHO THIS IS <em>FOR</em></h2>
          <div className="page-prose">
            <p>
              For people who want a practical, values-aligned way to get strong, feel
              capable, and stay consistent. <strong>You do not need to be fit to
              begin.</strong> Most people who start here are not.
            </p>
            <p>
              The common thread is not a fitness level — it is being done with starting
              over. People arrive having tried the app, the class pack, the six-week
              challenge, and each time the plan survived right up until the week got
              difficult. The problem was never effort. It was that nothing was built to
              bend.
            </p>
            <p>
              Coaching here is designed to strengthen the rest of your life rather than
              take it over. That is a deliberate constraint, and it is what makes the
              consistency possible.
            </p>
          </div>
        </div>
      </section>

      <section className="page-section soft">
        <p className="kicker"><b /> THE METHOD</p>
        <h2>FOUR THINGS THAT<br />MAKE IT <em>HOLD</em></h2>
        <div className="page-grid two">
          {pillars.map((pillar) => (
            <article className="page-card" key={pillar.title}>
              <h3>{pillar.letter} — {pillar.title}</h3>
              <p>{pillar.copy}</p>
            </article>
          ))}
        </div>
        <p style={{ marginTop: 30 }}>
          <Link className="under-link" href="/#method">See the RPMS Method in full <span><ArrowUpRight /></span></Link>
        </p>
      </section>

      <section className="page-section">
        <p className="kicker"><b /> PROGRAMS</p>
        <h2>FOUR WAYS TO<br /><em>TRAIN</em></h2>
        <div className="page-links">
          {programs.map((program) => (
            <Link className="page-link" key={program.id} href={PROGRAM_PATHS[program.id]}>
              <strong>{program.name}</strong>
              <span>{program.line}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="page-section dark">
        <p className="kicker"><b /> WHERE</p>
        <h2>SESSIONS HAPPEN<br /><em>WHERE YOU ARE</em></h2>
        <div className="page-prose">
          <p>{COVERAGE_STATEMENT}</p>
        </div>
        <div className="page-links" style={{ marginTop: 34 }}>
          {locations.map((page) => (
            <Link className="page-link" key={page.path} href={page.path}>
              <strong>{page.label}</strong>
              <span>{page.blurb}</span>
            </Link>
          ))}
        </div>
      </section>
    </Page>
  );
}
