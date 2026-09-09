import type { Metadata } from "next";
import Link from "next/link";
import Page from "@/components/Page";
import PageHero from "@/components/PageHero";
import { BookButton } from "@/components/Booking";
import { ArrowUpRight } from "@/components/icons";
import { openGraph } from "@/lib/seo";
import { PROGRAM_PATHS } from "@/lib/pages";
import { programs } from "@/lib/programs";

const PATH = "/personal-trainer-kyle-tx";

export const metadata: Metadata = {
  title: "Personal Trainer in Kyle, TX | Refinery Fitness",
  description:
    "A personal trainer serving Kyle, TX. Mobile sessions at your home or garage gym, in-person coaching, and virtual options — faith-first, science-backed coaching from Refinery Fitness of Buda.",
  alternates: { canonical: PATH },
  openGraph: openGraph({
    title: "Personal Trainer in Kyle, TX | Refinery Fitness",
    description: "Mobile, in-person, and virtual coaching for Kyle — from a Buda-based coach.",
    url: PATH,
  }),
};

export default function KylePage() {
  const mobile = programs.find((program) => program.id === "mobile")!;

  return (
    <Page
      path={PATH}
      topic="Mobile Training"
      ctaHeading={<>KYLE, THE GYM<br />COMES TO <em>YOU.</em></>}
      ctaBody="A free intro to work out which format actually fits your week — and whether mobile is the right call."
    >
      <PageHero
        kicker="PERSONAL TRAINER · KYLE, TEXAS"
        heading={<>PERSONAL TRAINER<br />IN <em>KYLE, TX</em></>}
        lede={
          <>
            Refinery Fitness is based in Buda, minutes up the road, and Kyle is a core
            part of the service area. For most Kyle clients the answer is mobile
            training: the session comes to your home or garage gym instead of adding a
            drive to a week that is already full.
          </>
        }
        facts={[
          ["Serving", "Kyle, Texas"],
          ["Based in", "Buda — minutes away"],
          ["Most common format", "Mobile training"],
          ["Also available", "In person · Virtual"],
          ["First step", "A free intro session"],
        ]}
        actions={
          <>
            <BookButton className="button lime" topic="Mobile Training">
              Ask about mobile training <span><ArrowUpRight /></span>
            </BookButton>
            <Link className="under-link" href="/programs/mobile-training">How mobile works <span><ArrowUpRight /></span></Link>
          </>
        }
      />

      <section className="page-section">
        <div className="page-split">
          <h2>THE DRIVE IS<br />THE <em>DROP-OFF</em></h2>
          <div className="page-prose">
            <p>
              Ask most people in Kyle why the last gym membership stopped getting used
              and the answer is rarely the training. It is the twenty minutes each way,
              stacked on top of a commute that already eats the same part of the
              evening.
            </p>
            <p>
              <strong>Mobile training removes that entirely.</strong> {mobile.copy} The
              session happens where you already are, which turns a ninety-minute
              commitment into a sixty-minute one — and that difference is usually what
              decides whether week six happens.
            </p>
            <p>
              You do not need a fitted-out home gym. What equipment is needed depends on
              the plan, and working out the realistic version for your space is part of
              the free intro rather than something you sort out first.
            </p>
          </div>
        </div>
      </section>

      <section className="page-section soft">
        <p className="kicker"><b /> WHAT MOBILE INCLUDES</p>
        <h2>SAME COACHING.<br />DIFFERENT <em>POSTCODE.</em></h2>
        <div className="page-grid">
          {mobile.includes.map((item) => (
            <article className="page-card" key={item}>
              <h3>{item}</h3>
              <p>
                {item.startsWith("At-home") && "Sessions run in your own space, on your own equipment, coached exactly as they would be anywhere else."}
                {item.startsWith("Buda") && "Kyle sits inside the standard service area alongside Buda and the wider county."}
                {item.startsWith("Built") && "Scheduled around the week you actually have, rather than the one a template assumes."}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section">
        <div className="page-split">
          <h2>IF MOBILE ISN&rsquo;T<br />THE <em>RIGHT FIT</em></h2>
          <div className="page-prose">
            <p>
              Mobile is the common answer in Kyle, not the only one. Some people
              genuinely train better away from home, where the space itself signals that
              the next hour is for something specific — in-person sessions suit that.
            </p>
            <p>
              And if your schedule travels, <Link href="/programs/virtual-coaching">virtual coaching</Link>{" "}
              keeps the same coach on a schedule that moves with you.
            </p>
            <p>
              Which format fits is a conversation, not a form. That is what the free
              intro is for.
            </p>
          </div>
        </div>
      </section>

      <section className="page-section dark">
        <p className="kicker"><b /> PROGRAMS</p>
        <h2>WAYS TO <em>TRAIN</em></h2>
        <div className="page-links">
          {programs.map((program) => (
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
