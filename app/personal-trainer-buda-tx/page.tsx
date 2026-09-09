import type { Metadata } from "next";
import Link from "next/link";
import Page from "@/components/Page";
import PageHero from "@/components/PageHero";
import { BookButton } from "@/components/Booking";
import { ArrowUpRight } from "@/components/icons";
import { openGraph } from "@/lib/seo";
import { programs } from "@/lib/programs";
import { PROGRAM_PATHS } from "@/lib/pages";
import { HOME_MARKET, listPlaces } from "@/lib/market";

const PATH = "/personal-trainer-buda-tx";

export const metadata: Metadata = {
  // The homepage already holds the exact phrase "Personal Trainer in Buda, TX"
  // as its title. Two pages competing for one query with an identical title is
  // cannibalisation, so this one leads with the formats that distinguish it.
  // The H1 still reads "PERSONAL TRAINER IN BUDA, TX".
  title: "Personal Trainer in Buda, TX — In-Person, Mobile & Virtual",
  description:
    "A personal trainer in Buda, TX. Faith-first, science-backed strength and health coaching with Jeff Mensing — in person, at your home or garage gym, or over video.",
  alternates: { canonical: PATH },
  openGraph: openGraph({
    title: "Personal Trainer in Buda, TX | Refinery Fitness",
    description: "Faith-first, science-backed coaching in Buda — in person, mobile, or virtual.",
    url: PATH,
  }),
};

export default function BudaPage() {
  return (
    <Page
      path={PATH}
      topic="Free intro session"
      ctaHeading={<>BUDA, LET&rsquo;S<br />GET <em>STARTED.</em></>}
      ctaBody="A free intro is a clear, no-pressure conversation about what you want to change and the best next step."
    >
      <PageHero
        kicker="PERSONAL TRAINER · BUDA, TEXAS"
        heading={<>PERSONAL TRAINER<br />IN <em>BUDA, TX</em></>}
        lede={
          <>
            Refinery Fitness of Buda is based here. Jeff Mensing coaches strength,
            habits, and health for people in {HOME_MARKET.city} who are done starting
            over — in person, at your home or garage gym, or over video when the week
            will not cooperate.
          </>
        }
        facts={[
          ["Based in", `${HOME_MARKET.city}, ${HOME_MARKET.regionLong}`],
          ["Also serving", "Kyle · Hays County"],
          ["Formats", "In person · Mobile · Virtual"],
          ["Coach", "Jeff Mensing, kinesiology-trained"],
          ["First step", "A free intro session"],
        ]}
        actions={
          <>
            <BookButton className="button lime" topic="Free intro session">
              Book your free intro <span><ArrowUpRight /></span>
            </BookButton>
            <Link className="under-link" href="/personal-training">What training involves <span><ArrowUpRight /></span></Link>
          </>
        }
      />

      <section className="page-section">
        <div className="page-split">
          <h2>A COACH WHO<br />LIVES <em>HERE</em></h2>
          <div className="page-prose">
            <p>
              Buda is the home market, and that is not a marketing line — it is where
              the sessions happen, where the garage gym is, and where the schedule is
              built around the same school runs and commutes as yours.
            </p>
            <p>
              <strong>Jeff Mensing is kinesiology-trained</strong>, which shapes how the
              programming works: movement first, load second, and progression that
              accounts for what your body is actually ready for rather than what a
              template says week four should look like.
            </p>
            <p>
              The approach is faith-first and science-backed. In practice that means
              coaching treats the whole person — relational, physical, mental,
              spiritual — rather than treating you as a set of numbers to move.
            </p>
          </div>
        </div>
      </section>

      <section className="page-section soft">
        <p className="kicker"><b /> HOW IT RUNS</p>
        <h2>THREE WAYS TO TRAIN<br /><em>IN BUDA</em></h2>
        <ol className="page-list">
          <li>
            <span>01</span>
            <div>
              <h3>In person</h3>
              <p>Coached sessions where form gets watched, corrected, and progressed in real time. The fastest way to build technique you can trust under load.</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>Mobile — at your place</h3>
              <p>Jeff comes to your home, garage gym, or preferred local setting. For people whose barrier was never willingness, only the drive there.</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>Virtual</h3>
              <p>Live one-to-one over video, with form review from your own space. Useful for travel weeks rather than as a replacement for the in-person work.</p>
            </div>
          </li>
        </ol>
      </section>

      <section className="page-section">
        <p className="kicker"><b /> PROGRAMS</p>
        <h2>WHERE PEOPLE<br /><em>USUALLY START</em></h2>
        <div className="page-links">
          {programs.slice(0, 3).map((program) => (
            <Link className="page-link" key={program.id} href={PROGRAM_PATHS[program.id]}>
              <strong>{program.name}</strong>
              <span>{program.line}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="page-section dark">
        <div className="page-split">
          <h2>QUESTIONS BUDA<br />CLIENTS <em>ASK</em></h2>
          <div>
            <ol className="page-list">
              <li>
                <span>Q</span>
                <div>
                  <h3>Where do sessions happen in Buda?</h3>
                  <p>In person, at your own home or garage gym, or over video. Which one suits depends on your plan and your schedule, and it gets decided at the free intro.</p>
                </div>
              </li>
              <li>
                <span>Q</span>
                <div>
                  <h3>Do I need to be fit to start?</h3>
                  <p>No. Most people who begin here are not, and the first block is built around that rather than in spite of it.</p>
                </div>
              </li>
              <li>
                <span>Q</span>
                <div>
                  <h3>What happens in a free intro?</h3>
                  <p>A clear, no-pressure conversation about what you want to change, what has gotten in the way before, and the best next step. No obligation either way.</p>
                </div>
              </li>
              <li>
                <span>Q</span>
                <div>
                  <h3>Do you train outside Buda?</h3>
                  <p>Yes — {listPlaces()}. See the <Link href="/personal-trainer-kyle-tx">Kyle</Link> and <Link href="/personal-trainer-hays-county-tx">Hays County</Link> pages for how coverage works there.</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>
    </Page>
  );
}
