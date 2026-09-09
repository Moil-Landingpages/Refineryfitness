import Link from "next/link";
import { COVERAGE_SHORT } from "@/lib/market";
import { pagesInGroup } from "@/lib/pages";
import { EMAIL, SOCIALS, mailto } from "@/lib/site";
import { SOCIAL_ICONS } from "@/components/icons";
import Logo from "@/components/Logo";

export default function Footer() {
  // The footer is where the location and program pages get an internal link on
  // every page of the site. A page nothing links to is an orphan, however well
  // it is written.
  const locations = pagesInGroup("location");
  const programs = pagesInGroup("program");
  const company = pagesInGroup("company");

  return <footer>
    <a className="logo" href="#top"><Logo height={42} /></a>
    <p>Faith-first, science-backed personal training &amp; health coaching.</p>
    <a href={mailto("Hello from the website")}>{EMAIL}</a>
    <nav className="footer-nav" aria-label="Site">
      <div>
        <strong>Train</strong>
        <Link href="/personal-training">Personal training</Link>
        {programs.map((page) => <Link key={page.path} href={page.path}>{page.label}</Link>)}
      </div>
      <div>
        <strong>Areas served</strong>
        {locations.map((page) => <Link key={page.path} href={page.path}>{page.label}</Link>)}
      </div>
      <div>
        <strong>Refinery</strong>
        {company.map((page) => <Link key={page.path} href={page.path}>{page.label}</Link>)}
      </div>
    </nav>
    <ul className="socials">
      {SOCIALS.map((social) => {
        const Icon = SOCIAL_ICONS[social.id];
        // Icon and label, not a bare glyph — at this size a lone mark is a guess.
        return <li key={social.id}>
          <a href={social.url} target="_blank" rel="noopener noreferrer"
             aria-label={`Refinery Fitness on ${social.name}`}>
            {Icon ? <Icon size={16} /> : null}<span>{social.name}</span>
          </a>
        </li>;
      })}
    </ul>
    <small>
      <span>{COVERAGE_SHORT}</span>
      <a className="built-with" href="https://moilapp.com" target="_blank" rel="noopener noreferrer">
        Built with <b>Moil</b>
      </a>
    </small>
  </footer>;
}
