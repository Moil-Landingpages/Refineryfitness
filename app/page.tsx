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
import { faqs } from "@/lib/faqs";
import { mailto } from "@/lib/site";
import { ArrowUpRight } from "@/components/icons";

const schema = { "@context": "https://schema.org", "@graph": [
  { "@type": "HealthClub", name: "Refinery Fitness of Buda", description: "Faith-first, science-backed personal training and health coaching in Buda, Texas.", url: "https://refineryfitness.biz", email: "jeff@refineryfitness.biz", priceRange: "$$", areaServed: ["Buda, TX", "Kyle, TX", "Hays County, TX"], founder: { "@type": "Person", name: "Jeff Mensing", jobTitle: "Personal Trainer & Health Coach" }, sameAs: ["https://www.instagram.com/refineryfitnessofbuda/", "https://www.facebook.com/p/Refinery-Fitness-of-Buda-61576662147080/"] },
  { "@type": "FAQPage", mainEntity: faqs.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) }
] };

export default function Home() {
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <Nav />
    <Hero />
    <section className="marquee" aria-label="Refinery Fitness values">
      <div>RELATIONAL <i>✦</i> PHYSICAL <i>✦</i> MENTAL <i>✦</i> SPIRITUAL <i>✦</i> RELATIONAL <i>✦</i> PHYSICAL <i>✦</i> MENTAL <i>✦</i> SPIRITUAL <i>✦</i> </div>
    </section>
    <Method />
    <VisualBreak />
    <Programs />
    <CheckIn />
    <Proof />
    <Faq />
    <FinalCta />
    <Footer />
    <a className="mobile-book" href={mailto("Free Intro Session")}>BOOK FREE INTRO <b><ArrowUpRight /></b></a>
    <Motion />
  </main>;
}
