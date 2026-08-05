import { EMAIL, mailto } from "@/lib/site";
import Logo from "@/components/Logo";

export default function Footer() {
  return <footer>
    <a className="logo" href="#top"><Logo height={42} markBg="#f35b37" markFg="#efede6" accent="#d8ff51" /></a>
    <p>Faith-first, science-backed personal training &amp; health coaching.</p>
    <a href={mailto("Hello from the website")}>{EMAIL}</a>
    <small>BUDA · KYLE · HAYS COUNTY · TEXAS</small>
  </footer>;
}
