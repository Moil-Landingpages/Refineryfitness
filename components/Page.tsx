import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import Motion from "@/components/Motion";
import Nav from "@/components/Nav";
import { BookButton, BookingProvider } from "@/components/Booking";
import { ArrowUpRight } from "@/components/icons";

/**
 * The shell every subpage renders inside: the nav with its anchors resolved
 * against the homepage, a breadcrumb trail, the page body, a closing intro CTA,
 * and the footer.
 *
 * The booking provider wraps the whole thing so any CTA on a subpage opens the
 * same modal the homepage uses, already pointed at whatever the visitor was
 * reading about.
 */
export default function Page({
  path,
  topic,
  children,
  ctaKicker = "YOUR NEXT REP",
  ctaHeading,
  ctaBody,
}: {
  path: string;
  topic: string;
  children: React.ReactNode;
  ctaKicker?: string;
  ctaHeading: React.ReactNode;
  ctaBody: string;
}) {
  return <BookingProvider>
    <main id="top">
      <Nav prefix="/" />
      <Breadcrumbs path={path} />
      {children}
      <section className="page-cta">
        <p className="kicker dark"><b /> {ctaKicker}</p>
        <h2>{ctaHeading}</h2>
        <p>{ctaBody}</p>
        <BookButton className="button lime" topic={topic}>
          Book your free intro <span><ArrowUpRight /></span>
        </BookButton>
      </section>
      <Footer />
      <BookButton className="mobile-book" topic={topic}>
        BOOK FREE INTRO <b><ArrowUpRight /></b>
      </BookButton>
      <Motion />
    </main>
  </BookingProvider>;
}
