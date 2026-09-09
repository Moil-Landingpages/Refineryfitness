import type { Metadata } from "next";
import Link from "next/link";
import Page from "@/components/Page";
import PageHero from "@/components/PageHero";
import ProgramSchema from "@/components/ProgramSchema";
import { BookButton } from "@/components/Booking";
import { ArrowUpRight } from "@/components/icons";
import { openGraph } from "@/lib/seo";
import { programs } from "@/lib/programs";
import { PROGRAM_PATHS } from "@/lib/pages";

const PATH = "/programs/virtual-coaching";
const PROGRAM = programs.find((program) => program.id === "virtual")!;

export const metadata: Metadata = {
  title: "Virtual Fitness Coaching | Refinery Fitness",
  description: "Live one-to-one virtual fitness and health coaching over video, for anyone outside Hays County or working around a schedule that will not sit still.",
  alternates: { canonical: PATH },
  openGraph: openGraph({
    title: "Virtual Fitness Coaching | Refinery Fitness",
    description: "The same coach, on a schedule that travels with you.",
    url: PATH,
  }),
};

export default function ProgramPage() {
  const others = programs.filter((program) => program.id !== PROGRAM.id);

  return (
    <Page
      path={PATH}
      topic={PROGRAM.name}
      ctaHeading={<>SAME COACH.<br />ANY <em>POSTCODE.</em></>}
      ctaBody="A free intro over video, to see whether coaching this way fits how you actually train."
    >
      <ProgramSchema name={PROGRAM.name} description={PROGRAM.copy} path={PATH} />

      <PageHero
        kicker="PROGRAM 04 · ANYWHERE YOU ARE"
        heading={<>VIRTUAL<br /><em>COACHING</em></>}
        lede={<>{PROGRAM.copy}</>}
        facts={[
          ["Program", "04 — Anywhere you are"],
          ["Format", "Live 1:1 over video"],
          ["Built for", "Outside Hays County, or a moving schedule"],
          ["Includes", "Form review from your own space"],
          ["First step", "A free intro session"],
        ]}
        actions={
          <>
            <BookButton className="button lime" topic={PROGRAM.name}>
              {PROGRAM.action} <span><ArrowUpRight /></span>
            </BookButton>
            <Link className="under-link" href="/personal-training">All programs <span><ArrowUpRight /></span></Link>
          </>
        }
      />

      <section className="page-section">
        <div className="page-split">
          <h2>COACHING THAT<br /><em>TRAVELS</em></h2>
          <div className="page-prose">
            <p>
              Virtual is not the discount version. It is the format that solves a
              specific problem: you are outside the travel radius, or your week refuses
              to sit still long enough for a fixed appointment in a fixed place.
            </p>
            <p>
              <strong>Sessions are live and one to one</strong>, not a video library and
              a chat window. Form gets reviewed from your own space, and coaching
              continues between calls.
            </p>
            <p>
              It works best when you have somewhere consistent to train and enough
              equipment for the plan. Establishing whether that is true is part of the
              free intro.
            </p>
          </div>
        </div>
      </section>

      <section className="page-section soft">
        <p className="kicker"><b /> WHAT IT INCLUDES</p>
        <h2>WHAT VIRTUAL<br /><em>INCLUDES</em></h2>
        <div className="page-grid">
          {PROGRAM.includes.map((item, index) => (
            <article className="page-card" key={item}>
              <h3>{item}</h3>
              <p>{["Live one-to-one sessions over video, coached in real time rather than pre-recorded.",
            "Form reviewed from your own space, so technique still gets corrected.",
            "Health and fitness coaching that continues between the calls."][index]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section">
        <div className="page-split">
          <h2>WHO IT<br /><em>SUITS</em></h2>
          <div className="page-prose">
            <p>
              People outside Hays County, people who travel for work, and people whose
              schedule changes week to week. It is also a sensible supplement for
              existing in-person clients during a stretch when getting to a session is
              not realistic.
            </p>
            <p>
              If you are inside Buda or Kyle and the obstacle is the drive rather than
              the schedule,{" "}
              <Link href="/programs/mobile-training">mobile training</Link> is usually
              the better answer.
            </p>
          </div>
        </div>
      </section>

      <section className="page-section dark">
        <p className="kicker"><b /> OTHER PROGRAMS</p>
        <h2>NOT QUITE <em>IT?</em></h2>
        <div className="page-links">
          {others.map((program) => (
            <Link className="page-link" key={program.id} href={PROGRAM_PATHS[program.id]}>
              <strong>{program.name}</strong>
              <span>{program.line}</span>
            </Link>
          ))}
        </div>
      </section>
    </Page>
  );
}
