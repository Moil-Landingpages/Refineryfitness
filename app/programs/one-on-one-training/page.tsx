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

const PATH = "/programs/one-on-one-training";
const PROGRAM = programs.find((program) => program.id === "one")!;

export const metadata: Metadata = {
  title: "1:1 Personal Training | Refinery Fitness",
  description: "One-to-one personal training in Buda, Kyle and Hays County. A program built around your goals, schedule, experience and season — coached in person by Jeff Mensing.",
  alternates: { canonical: PATH },
  openGraph: openGraph({
    title: "1:1 Personal Training | Refinery Fitness",
    description: "A program built around your life, not the other way around.",
    url: PATH,
  }),
};

export default function ProgramPage() {
  const others = programs.filter((program) => program.id !== PROGRAM.id);

  return (
    <Page
      path={PATH}
      topic={PROGRAM.name}
      ctaHeading={<>YOUR PLAN.<br />YOUR <em>SEASON.</em></>}
      ctaBody="A free intro to talk through your goals, your history, and what a realistic week actually looks like."
    >
      <ProgramSchema name={PROGRAM.name} description={PROGRAM.copy} path={PATH} />

      <PageHero
        kicker="PROGRAM 02 · HIGH-TOUCH COACHING"
        heading={<>1:1<br /><em>TRAINING</em></>}
        lede={<>{PROGRAM.copy}</>}
        facts={[
          ["Program", "02 — High-touch coaching"],
          ["Format", "In person, one to one"],
          ["Built around", "Your goals, schedule, and experience"],
          ["Where", "Buda · Kyle · Hays County"],
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
          <h2>COACHING THAT<br />ADAPTS <em>TO YOU</em></h2>
          <div className="page-prose">
            <p>
              A written plan is a guess about a future week. One-to-one coaching is the
              correction that happens when the guess turns out to be wrong — which it
              usually does, because life moves.
            </p>
            <p>
              <strong>This is the high-touch option.</strong> Programming is built for
              your goals, your training history, your schedule, and the season you are
              actually in, then adjusted in the room as your body and your week give
              feedback.
            </p>
            <p>
              Jeff is kinesiology-trained, which matters most here: movement gets watched
              and corrected in real time rather than diagnosed from a video after the
              fact.
            </p>
          </div>
        </div>
      </section>

      <section className="page-section soft">
        <p className="kicker"><b /> WHAT IT INCLUDES</p>
        <h2>WHAT YOU<br />ACTUALLY <em>GET</em></h2>
        <div className="page-grid">
          {PROGRAM.includes.map((item, index) => (
            <article className="page-card" key={item}>
              <h3>{item}</h3>
              <p>{["Programming built for your goals and history, not selected from a library of templates.",
            "Form watched, corrected, and progressed in the room, session by session.",
            "A plan that changes when your week does, rather than one you fall off."][index]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section">
        <div className="page-split">
          <h2>WHERE IT<br /><em>HAPPENS</em></h2>
          <div className="page-prose">
            <p>
              In-person sessions across Buda, Kyle, and Hays County. If travelling to a
              session is the obstacle,{" "}
              <Link href="/programs/mobile-training">mobile training</Link> brings the
              same coaching to your home or garage gym.
            </p>
            <p>
              If you are newer to training and want structure before intensity,{" "}
              <Link href="/programs/strong-start">Strong Start</Link> is usually the
              better first block.
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
