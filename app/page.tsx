import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Method from "@/components/Method";
import VisualBreak from "@/components/VisualBreak";
import Programs from "@/components/Programs";
import CheckIn from "@/components/CheckIn";
import Proof from "@/components/Proof";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import Motion from "@/components/Motion";
import { mailto } from "@/lib/site";
import { schema } from "@/lib/schema";
import { ArrowUpRight } from "@/components/icons";

export default function Home() {
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <Nav />
    <Hero />
    <section className="marquee" aria-label="Refinery Fitness values">
      <div>RELATIONAL <i aria-hidden="true">✦</i> PHYSICAL <i aria-hidden="true">✦</i> MENTAL <i aria-hidden="true">✦</i> SPIRITUAL <i aria-hidden="true">✦</i> <span aria-hidden="true">RELATIONAL <i>✦</i> PHYSICAL <i>✦</i> MENTAL <i>✦</i> SPIRITUAL <i>✦</i> </span></div>
    </section>
    <Method />
    <VisualBreak src="/images/refinery-coaching.jpg" alt="Personal trainer coaching a client through a dumbbell lift during a one-on-one strength session" tag="REFINERY FITNESS / THE WHOLE PERSON" quote={<>“The work is physical.<br />The <em>change</em> is bigger.”</>} />
    <Programs />
    <CheckIn />
    <Proof />
    <VisualBreak flip src="/images/refinery-break-2.jpg" alt="Personal trainer guiding a client through push-ups in a mobile training session" tag="REFINERY FITNESS / COACHED, NOT ALONE" quote={<>“Show up willing.<br />Leave <em>stronger.</em>”</>} />
    <Faq />
    <FinalCta />
    <Footer />
    <a className="mobile-book" href={mailto("Free Intro Session")}>BOOK FREE INTRO <b><ArrowUpRight /></b></a>
    <Motion />
  </main>;
}
