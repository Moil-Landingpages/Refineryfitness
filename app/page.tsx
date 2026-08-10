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
      <VisualBreak src="/images/refinery-coaching-garage.jpg" alt="Jeff Mensing spotting a young client through a lat pulldown in his garage gym" tag="REFINERY FITNESS / THE WHOLE PERSON" quote={<>“The work is physical.<br />The <em>change</em> is bigger.”</>} />
      <Programs />
      <CheckIn />
      <About />
      <Proof />
      <VisualBreak flip src="/images/refinery-coached.jpg" alt="A client pulling down on a lat bar while his coach watches the lift in the mirror" tag="REFINERY FITNESS / COACHED, NOT ALONE" quote={<>“Show up willing.<br />Leave <em>stronger.</em>”</>} />
      <Faq />
      <FinalCta />
      <Footer />
      <BookButton className="mobile-book" topic="Free intro session">BOOK FREE INTRO <b><ArrowUpRight /></b></BookButton>
      <Motion />
    </main>
  </BookingProvider>;
}
