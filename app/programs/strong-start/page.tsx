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

const PATH = "/programs/strong-start";
const PROGRAM = programs.find((program) => program.id === "strong")!;

export const metadata: Metadata = {
  title: "Strong Start Fitness Program | Refinery Fitness",
  description: "Strong Start is the signature reset from Refinery Fitness of Buda: four weekly workouts, habit coaching, and a standing check-in that make the next right decision obvious.",
  alternates: { canonical: PATH },
  openGraph: openGraph({
    title: "Strong Start | Refinery Fitness",
    description: "Build the system before you chase the result.",
    url: PATH,
  }),
};

export default function ProgramPage() {
  const others = programs.filter((program) => program.id !== PROGRAM.id);

  return (
    <Page
      path={PATH}
      topic={PROGRAM.name}
      ctaHeading={<>BUILD THE SYSTEM.<br />THE RESULT <em>FOLLOWS.</em></>}
      ctaBody="A free intro to see whether Strong Start is the right first block for where you are now."
    >
      <ProgramSchema name={PROGRAM.name} description={PROGRAM.copy} path={PATH} />

      <PageHero
        kicker="PROGRAM 01 · SIGNATURE RESET"
        heading={<>STRONG<br /><em>START</em></>}
        lede={<>{PROGRAM.copy}</>}
        facts={[
          ["Program", "01 — Signature reset"],
          ["Training", "4 workouts every week"],
          ["Coaching", "A weekly check-in"],
          ["Built for", "Starting properly, not starting over"],
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
          <h2>WHY START WITH<br />A <em>SYSTEM</em></h2>
          <div className="page-prose">
            <p>
              Most people do not fail at training because the plan was wrong. They fail
              because the plan assumed a week they did not have, and the first difficult
              week ended it.
            </p>
            <p>
              <strong>Strong Start inverts the order.</strong> Before chasing a number,
              it builds the structure that makes training survive a bad week: a fixed
              schedule, a coach who notices when you go quiet, and habits small enough
              to hold when everything else is loud.
            </p>
            <p>
              Four workouts a week sounds like a lot until you see the rest of it. The
              habit coaching and the standing check-in are what make the fourth workout
              happen in week seven.
            </p>
          </div>
        </div>
      </section>

      <section className="page-section soft">
        <p className="kicker"><b /> WHAT IT INCLUDES</p>
        <h2>THREE THINGS,<br />EVERY <em>WEEK</em></h2>
        <div className="page-grid">
          {PROGRAM.includes.map((item, index) => (
            <article className="page-card" key={item}>
              <h3>{item}</h3>
              <p>{["A fixed weekly rhythm — the schedule is decided once, so the decision is not relitigated every morning.",
            "A standing conversation with your coach about what worked, what did not, and what changes next week.",
            "The mindset and habit work that decides whether the training survives a difficult week."][index]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section">
        <div className="page-split">
          <h2>WHO IT SUITS,<br />AND WHO <em>IT DOESN&rsquo;T</em></h2>
          <div className="page-prose">
            <p>
              Strong Start suits someone returning after a long break, or starting for
              the first time, who wants structure rather than intensity. You do not need
              to be fit to begin.
            </p>
            <p>
              It is a poorer fit if you already train consistently and want technical
              coaching on specific lifts — that is closer to{" "}
              <Link href="/programs/one-on-one-training">1:1 training</Link>. If getting
              to a session is the obstacle rather than the training itself,{" "}
              <Link href="/programs/mobile-training">mobile training</Link> is worth
              asking about.
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
