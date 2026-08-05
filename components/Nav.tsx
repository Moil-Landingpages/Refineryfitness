import { mailto } from "@/lib/site";
import { ArrowUpRight } from "@/components/icons";
import Logo from "@/components/Logo";

export default function Nav() {
  return <nav>
    <a className="logo" href="#top"><Logo height={38} /></a>
    <div className="nav-links"><a href="#method">Method</a><a href="#programs">Programs</a><a href="#about">Story</a></div>
    <a className="nav-book" href={mailto("Free Intro Session")}>Book an intro <em><ArrowUpRight size={13} /></em></a>
  </nav>;
}
