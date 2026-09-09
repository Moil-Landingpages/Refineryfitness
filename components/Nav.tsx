import { BookButton } from "@/components/Booking";
import { ArrowUpRight } from "@/components/icons";
import Logo from "@/components/Logo";

/**
 * `prefix` resolves the nav's hash anchors against the homepage: "" on the
 * homepage where they are same-page, "/" on a subpage where they must travel
 * home first. The default keeps the homepage output byte-identical.
 */
export default function Nav({ prefix = "" }: { prefix?: "" | "/" } = {}) {
  return <nav>
    <a className="logo" href={`${prefix}#top`}><Logo height={38} /></a>
    <div className="nav-links"><a href={`${prefix}#method`}>Method</a><a href={`${prefix}#programs`}>Programs</a><a href={`${prefix}#about`}>About</a></div>
    <BookButton className="nav-book" topic="Free intro session">Book an intro <em><ArrowUpRight size={13} /></em></BookButton>
  </nav>;
}
