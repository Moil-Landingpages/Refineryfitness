import { BookButton } from "@/components/Booking";
import { ArrowUpRight } from "@/components/icons";
import Logo from "@/components/Logo";

export default function Nav() {
  return <nav>
    <a className="logo" href="#top"><Logo height={38} /></a>
    <div className="nav-links"><a href="#method">Method</a><a href="#programs">Programs</a><a href="#about">About</a></div>
    <BookButton className="nav-book" topic="Free intro session">Book an intro <em><ArrowUpRight size={13} /></em></BookButton>
  </nav>;
}
