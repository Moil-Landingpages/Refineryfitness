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

const PATH = "/programs/mobile-training";
const PROGRAM = programs.find((program) => program.id === "mobile")!;

export const metadata: Metadata = {
  title: "Mobile Personal Training in Buda, Kyle & Hays County",
  description: "Mobile personal training across Buda, Kyle and Hays County. Coached sessions at your home, garage gym or preferred local setting — no drive to a facility.",
  alternates: { canonical: PATH },
  openGraph: openGraph({
    title: "Mobile Personal Training | Refinery Fitness",
    description: "Exceptional coaching, right where life happens.",
    url: PATH,
  }),
};

export default function ProgramPage() {
  const others = programs.filter((program) => program.id !== PROGRAM.id);

  return (
    <Page
      path={PATH}
      topic={PROGRAM.name}
      ctaHeading={<>NO DRIVE.<br />NO <em>EXCUSE.</em></>}
      ctaBody="A free intro to work out what your space needs and whether mobile is the right format for your week."
    >
      <ProgramSchema name={PROGRAM.name} description={PROGRAM.copy} path={PATH} />

      <PageHero
        kicker="PROGRAM 03 · BUDA + KYLE"
        heading={<>MOBILE<br /><em>TRAINING</em></>}
        lede={<>{PROGRAM.copy}</>}
        facts={[
          ["Program", "03 — Mobile"],
          ["Where", "Your home, garage gym, or local setting"],
          ["Coverage", "Buda, Kyle + Hays County"],
          ["Built for", "Busy schedules"],
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
          <h2>THE SESSION<br />COMES <em>TO YOU</em></h2>
          <div className="page-prose">
            <p>
              For a lot of people the barrier was never willingness. It was the twenty
              minutes each way, landing on the exact part of the evening that was
              already spoken for.
            </p>
            <p>
              <strong>Mobile training removes the drive entirely.</strong> Jeff brings
              the session to your home, garage gym, or preferred local setting, and it
              is coached exactly as it would be anywhere else — same programming, same
              attention to form, same progression.
            </p>
            <p>
              You do not need a fitted-out home gym to start. What equipment makes sense
              depends on the plan and your space, and working out the realistic version
              is part of the free intro rather than a prerequisite for it.
            </p>
          </div>
        </div>
      </section>

      <section className="page-section soft">
        <p className="kicker"><b /> WHAT IT INCLUDES</p>
        <h2>WHAT MOBILE<br /><em>INCLUDES</em></h2>
        <div className="page-grid">
          {PROGRAM.includes.map((item, index) => (
            <article className="page-card" key={item}>
              <h3>{item}</h3>
              <p>{["Coached sessions in your own space, on whatever equipment makes sense for the plan.",
            "Buda and Kyle are inside the standard travel radius, alongside the wider county.",
            "Scheduling built around the week you actually have, not the one a template assumes."][index]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section">
        <div className="page-split">
          <h2>WHERE IT<br /><em>REACHES</em></h2>
          <div className="page-prose">
            <p>
              Mobile coverage is Buda and Kyle today. Elsewhere in Hays County is worth
              asking about rather than assuming either way — see the{" "}
              <Link href="/personal-trainer-hays-county-tx">Hays County page</Link> for
              exactly where things stand.
            </p>
            <p>
              Outside the travel radius,{" "}
              <Link href="/programs/virtual-coaching">virtual coaching</Link> is a real
              program rather than a fallback.
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
