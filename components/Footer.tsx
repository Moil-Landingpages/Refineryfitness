import { EMAIL, mailto } from "@/lib/site";

export default function Footer() {
  return <footer>
    <a className="logo" href="#top"><b>R</b><span>REFINERY</span><i>FITNESS / BUDA</i></a>
    <p>Faith-first, science-backed personal training &amp; health coaching.</p>
    <a href={mailto("Hello from the website")}>{EMAIL}</a>
    <small>BUDA · KYLE · HAYS COUNTY · TEXAS</small>
  </footer>;
}
