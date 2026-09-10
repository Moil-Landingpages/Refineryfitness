import Link from "next/link";
import { COVERAGE_SHORT } from "@/lib/market";
import { pagesInGroup, shortLabel } from "@/lib/pages";
import { EMAIL, SOCIALS, mailto } from "@/lib/site";
import { SOCIAL_ICONS } from "@/components/icons";
import Logo from "@/components/Logo";

/**
 * The site footer.
 *
 * Structured in two parts rather than as one flat row: a brand column on the
 * left and the link columns on the right, then a rule and a credit strip.
 *
 * The previous version made the footer itself a four-column grid whose direct
 * children were the logo, the tagline, the email and the nav, so all four were
 * strung across a single line and `align-items: center` pushed the column
 * headings out of alignment with everything else. Grouping the brand items into
 * their own element is what lets the two halves align to a shared top edge.
 */
export default function Footer() {
  // The footer is where the location and program pages get an internal link on
  // every page of the site. A page nothing links to is an orphan, however well
  // it is written.
  const columns = [
    { label: "Train", pages: [{ path: "/personal-training", label: "Personal training" }, ...pagesInGroup("program")] },
    { label: "Areas served", pages: pagesInGroup("location").map((page) => ({ path: page.path, label: shortLabel(page) })) },
    // `/gear` is appended by hand rather than added to the registry: it is a
    // `noindex` page, so it must stay out of the sitemap, but it still needs a
    // link from every page or nobody but Jeff will ever find it.
    { label: "Refinery", pages: [...pagesInGroup("company"), { path: "/gear", label: "Recommended gear" }] },
  ];

  return <footer>
    <div className="footer-top">
      <div className="footer-brand">
        <a className="logo" href="#top" aria-label="Refinery Fitness of Buda, home"><Logo height={42} /></a>
        <p>Faith-first, science-backed personal training &amp; health coaching.</p>

        <div className="footer-contact">
          <span className="footer-label">Get in touch</span>
          <a className="footer-email" href={mailto("Hello from the website")}>{EMAIL}</a>
        </div>

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
      </div>

      <nav className="footer-nav" aria-label="Site">
        {columns.map((column) => (
          <div key={column.label}>
            <strong className="footer-label">{column.label}</strong>
            {column.pages.map((page) => (
              <Link key={page.path} href={page.path}>{page.label}</Link>
            ))}
          </div>
        ))}
      </nav>
    </div>

    <small>
      <span>{COVERAGE_SHORT}</span>
      <a className="built-with" href="https://moilapp.com" target="_blank" rel="noopener noreferrer">
        Built with <b>Moil</b>
      </a>
    </small>
  </footer>;
}
