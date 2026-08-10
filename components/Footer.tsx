import { EMAIL, SOCIALS, mailto } from "@/lib/site";
import { SOCIAL_ICONS } from "@/components/icons";
import Logo from "@/components/Logo";

export default function Footer() {
  return <footer>
    <a className="logo" href="#top"><Logo height={42} /></a>
    <p>Faith-first, science-backed personal training &amp; health coaching.</p>
    <a href={mailto("Hello from the website")}>{EMAIL}</a>
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
    <small>BUDA · KYLE · HAYS COUNTY · TEXAS</small>
  </footer>;
}
