import type { Metadata } from "next";
import Link from "next/link";
import Page from "@/components/Page";
import PageHero from "@/components/PageHero";
import { BookButton } from "@/components/Booking";
import { ArrowUpRight } from "@/components/icons";
import { openGraph } from "@/lib/seo";
import { CORE_SERVICE_AREA, HOME_MARKET, REMOTE_REACH } from "@/lib/market";
import { pagesInGroup } from "@/lib/pages";

const PATH = "/personal-trainer-hays-county-tx";

export const metadata: Metadata = {
  title: "Personal Trainer in Hays County, TX | Refinery Fitness",
  description:
    "Mobile and virtual personal training across Hays County, Texas. Sessions at your home or garage gym in Buda and Kyle, and live video coaching anywhere else.",
  alternates: { canonical: PATH },
  openGraph: openGraph({
    title: "Personal Training in Hays County, TX | Refinery Fitness",
    description: "Mobile sessions across the county, and virtual coaching wherever you are.",
    url: PATH,
  }),
};

export default function HaysCountyPage() {
  const pending = CORE_SERVICE_AREA.filter((place) => !place.published);
  const locations = pagesInGroup("location").filter((page) => page.path !== PATH);

  return (
    <Page
      path={PATH}
      topic="Free intro session"
      ctaHeading={<>ANYWHERE IN<br />THE <em>COUNTY.</em></>}
      ctaBody="Tell us where you are and what your week looks like. We will tell you honestly whether the format works."
    >
      <PageHero
        kicker="PERSONAL TRAINER · HAYS COUNTY"
        heading={<>PERSONAL TRAINING<br />IN <em>HAYS COUNTY</em></>}
        lede={
          <>
            Refinery Fitness is a service-area practice, not a gym. There is no building
            to drive to — sessions happen in person, at your own home or garage gym
            across the county, or over video.
          </>
        }
        facts={[
          ["Base", `${HOME_MARKET.city}, ${HOME_MARKET.regionLong}`],
          ["Mobile coverage", "Buda and Kyle today"],
          ["Virtual", `Available ${REMOTE_REACH}`],
          ["No gym", "There is no facility to travel to"],
          ["First step", "A free intro session"],
        ]}
        actions={
          <>
            <BookButton className="button lime" topic="Free intro session">
              Book your free intro <span><ArrowUpRight /></span>
            </BookButton>
            <Link className="under-link" href="/programs/mobile-training">How mobile works <span><ArrowUpRight /></span></Link>
          </>
        }
      />

      <section className="page-section">
        <div className="page-split">
          <h2>WHAT &ldquo;SERVICE<br />AREA&rdquo; <em>MEANS HERE</em></h2>
          <div className="page-prose">
            <p>
              It is worth being precise, because a lot of local fitness pages are not.{" "}
              <strong>Refinery Fitness does not operate a gym anywhere in Hays
              County.</strong> There is no facility with an address and opening hours,
              and no page here will imply otherwise.
            </p>
            <p>
              What exists is a coach based in {HOME_MARKET.city} who travels to clients,
              trains people in person, and coaches over video for anyone outside the
              travel radius. That is a genuinely different model, and it is the honest
              description of it.
            </p>
            <p>
              Mobile training currently covers Buda and Kyle. If you are elsewhere in the
              county, the conversation is worth having — but virtual is often the
              realistic answer, and it is a real program rather than a consolation
              prize.
            </p>
          </div>
        </div>
      </section>

      <section className="page-section soft">
        <p className="kicker"><b /> COVERAGE</p>
        <h2>WHERE THINGS<br />STAND <em>TODAY</em></h2>
        <ol className="page-list">
          <li>
            <span>01</span>
            <div>
              <h3>Buda — in person, mobile, virtual</h3>
              <p>The home market. All three formats are available, and most clients start here in person.</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>Kyle — mobile, in person, virtual</h3>
              <p>Inside the standard travel radius. Mobile is the format most Kyle clients choose.</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>{pending.map((place) => place.name).join(", ")} and the rest of the county — ask</h3>
              <p>Not currently listed as a confirmed mobile area, which is why no page claims it. Virtual coaching is available now, and travel is worth asking about rather than assuming either way.</p>
            </div>
          </li>
          <li>
            <span>04</span>
            <div>
              <h3>Outside Hays County — virtual</h3>
              <p>Live one-to-one video coaching, {REMOTE_REACH}. Built for people outside the radius or working around a schedule that will not sit still.</p>
            </div>
          </li>
        </ol>
      </section>

      <section className="page-section">
        <p className="kicker"><b /> NEARBY</p>
        <h2>CLOSER TO <em>HOME</em></h2>
        <div className="page-links">
          {locations.map((page) => (
            <Link className="page-link" key={page.path} href={page.path}>
              <strong>{page.label}</strong>
              <span>{page.blurb}</span>
            </Link>
          ))}
          <Link className="page-link" href="/programs/virtual-coaching">
            <strong>Virtual Coaching</strong>
            <span>The same coach, wherever you are in the county or beyond.</span>
          </Link>
        </div>
      </section>
    </Page>
  );
}
