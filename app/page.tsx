import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Method from "@/components/Method";
import VisualBreak from "@/components/VisualBreak";
import Programs from "@/components/Programs";
import CheckIn from "@/components/CheckIn";
import About from "@/components/About";
import Proof from "@/components/Proof";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import Motion from "@/components/Motion";
import { BookButton, BookingProvider } from "@/components/Booking";
import { schema } from "@/lib/schema";
import { ArrowUpRight } from "@/components/icons";

export default function Home() {
  return <BookingProvider>
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Nav />
      <Hero />
      <Marquee />
      <Method />
      {/* The two breaks mirror each other; index follows their order down the page. */}
      <VisualBreak
        index="02"
        colour
        src="/images/refinery-coaching-garage.jpg"
        // Sits above centre so Jeff's head stays in frame, not just the lift.
        focus="center 25%"
        alt="Jeff Mensing spotting a young client through a lat pulldown in his garage gym"
        quote={<>The work is physical.<br />The <em>change</em> is bigger.</>}
        body="Strength isn’t just in the weights. It’s in the mindset, the habits, and the choices you make every day."
        label="The whole person"
        icon="person"
      />
      <Programs />
      <CheckIn />
      <About />
      <Proof />
      <VisualBreak
        flip
        index="07"
        src="/images/refinery-coached.jpg"
        alt="A client pulling down on a lat bar while his coach watches the lift in the mirror"
        quote={<>Show up willing.<br />Leave <em>stronger.</em></>}
        body="We meet you where you are and build you into who you’re meant to be."
        label="Coached, not alone"
        icon="dumbbell"
      />
      <Faq />
      <FinalCta />
      <Footer />
      <BookButton className="mobile-book" topic="Free intro session">BOOK FREE INTRO <b><ArrowUpRight /></b></BookButton>
      <Motion />
    </main>
  </BookingProvider>;
}
