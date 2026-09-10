"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookButton } from "@/components/Booking";
import { ArrowUpRight, Chevron } from "@/components/icons";
import Logo from "@/components/Logo";
import { REMOTE_REACH, listPlaces } from "@/lib/market";
import { PROGRAM_PATHS, pagesInGroup } from "@/lib/pages";
import { programs } from "@/lib/programs";

/**
 * The site header.
 *
 * Before this, the bar held three homepage anchors and nothing else: the ten
 * location and program pages were reachable only from the footer, and below
 * 760px `.nav-links` was set to `display: none`, which removed navigation
 * entirely rather than replacing it. Both are fixed here.
 *
 * Two decisions worth keeping:
 *
 * 1. **Disclosure, not the ARIA menu pattern.** These panels contain links to
 *    pages, not commands, so a `<button aria-expanded>` controlling a labelled
 *    region is the honest markup. The menu/menuitem pattern would promise
 *    application semantics the header does not have, and it breaks the
 *    browser's own link affordances (open in new tab, copy address).
 *
 * 2. **Panels stay in the DOM.** They are hidden with the `hidden` attribute
 *    rather than conditionally mounted, so every link is present in the
 *    server-rendered HTML. Most AI retrieval crawlers do not execute
 *    JavaScript, and a nav that mounts on click is a nav they never see —
 *    the rule `docs/seo-developer-plan.md` sets out for accordions applies
 *    just as much to navigation.
 *
 * `prefix` resolves the remaining hash anchor against the homepage: "" on the
 * homepage where it is same-page, "/" on a subpage where it must travel home
 * first.
 */

type MenuItem = { href: string; label: string; note: string; index: string };
type Menu = { id: string; label: string; intro: string; items: MenuItem[]; out: { href: string; label: string } };

/** How long a pointer may leave the trigger before the panel closes. */
const CLOSE_GRACE_MS = 180;

function buildMenus(): Menu[] {
  const locations = pagesInGroup("location");

  return [
    {
      id: "training",
      label: "Training",
      intro: "Four ways to train, one coach.",
      out: { href: "/personal-training", label: "How training works" },
      items: [
        {
          href: "/personal-training",
          label: "All personal training",
          note: "How coaching works, and who it is for.",
          index: "00",
        },
        ...programs.map((program) => ({
          href: PROGRAM_PATHS[program.id],
          label: program.name,
          note: program.line,
          index: program.number,
        })),
      ],
    },
    {
      id: "areas",
      label: "Areas",
      intro: `In person and mobile across ${listPlaces()} — virtual ${REMOTE_REACH}.`,
      out: { href: "/contact", label: "Ask about your area" },
      items: locations.map((page, index) => ({
        href: page.path,
        label: page.label.replace(/^Personal trainer in /, ""),
        note: page.blurb,
        index: `0${index + 1}`,
      })),
    },
  ];
}

export default function Nav({ prefix = "" }: { prefix?: "" | "/" } = {}) {
  const menus = buildMenus();
  const pathname = usePathname();

  /** Which dropdown is open on desktop, by id. */
  const [open, setOpen] = useState<string | null>(null);
  /** Whether the mobile drawer is showing. */
  const [drawer, setDrawer] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  /**
   * Closing is delayed so the diagonal travel from a trigger to the panel
   * beneath it does not dismiss what the pointer is heading for.
   */
  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(null), CLOSE_GRACE_MS);
  }, [cancelClose]);

  useEffect(() => cancelClose, [cancelClose]);

  // Escape closes the innermost thing, and hands focus back to what opened it.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (drawer) {
        setDrawer(false);
        return;
      }
      if (open) {
        triggers.current[open]?.focus();
        setOpen(null);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [drawer, open]);

  // A pointer or a focus landing outside the header closes the dropdown.
  useEffect(() => {
    if (!open) return;
    const onOutside = (event: Event) => {
      if (!navRef.current?.contains(event.target as Node)) setOpen(null);
    };
    document.addEventListener("pointerdown", onOutside);
    document.addEventListener("focusin", onOutside);
    return () => {
      document.removeEventListener("pointerdown", onOutside);
      document.removeEventListener("focusin", onOutside);
    };
  }, [open]);

  // The drawer is full-height, so the page behind it must not scroll with it.
  useEffect(() => {
    if (!drawer) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [drawer]);

  /** Hover opens, but only for a mouse — a touch "hover" is really a tap. */
  const hoverOpen = (id: string) => (event: React.PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    cancelClose();
    setOpen(id);
  };

  const focusItem = (id: string, index: number) => {
    const panel = document.getElementById(`menu-${id}`);
    const links = panel?.querySelectorAll<HTMLAnchorElement>("li a");
    if (!links?.length) return;
    const wrapped = (index + links.length) % links.length;
    links[wrapped].focus();
  };

  const onTriggerKey = (id: string) => (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(id);
      // Wait for the panel to be revealed before moving focus into it.
      requestAnimationFrame(() => focusItem(id, 0));
    }
  };

  const onPanelKey = (id: string) => (event: React.KeyboardEvent) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    const panel = document.getElementById(`menu-${id}`);
    const links = [...(panel?.querySelectorAll<HTMLAnchorElement>("li a") ?? [])];
    const current = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (current === -1) return;
    event.preventDefault();
    focusItem(id, current + (event.key === "ArrowDown" ? 1 : -1));
  };

  const isCurrent = (href: string) => pathname === href;

  return (
    <nav ref={navRef} className={`site-nav${drawer ? " drawer-open" : ""}`} aria-label="Primary">
      <a className="logo" href={`${prefix}#top`} aria-label="Refinery Fitness of Buda, home">
        <Logo height={38} />
      </a>

      <div className="nav-links">
        <a href={`${prefix}#method`}>Method</a>

        {menus.map((menu) => (
          <div
            className={`nav-menu${open === menu.id ? " open" : ""}`}
            key={menu.id}
            onPointerEnter={hoverOpen(menu.id)}
            onPointerLeave={scheduleClose}
          >
            <button
              type="button"
              className="nav-trigger"
              aria-expanded={open === menu.id}
              aria-controls={`menu-${menu.id}`}
              ref={(node) => {
                triggers.current[menu.id] = node;
              }}
              onClick={() => setOpen(open === menu.id ? null : menu.id)}
              onKeyDown={onTriggerKey(menu.id)}
            >
              {menu.label}
              <i aria-hidden="true"><Chevron size={13} /></i>
            </button>

            <div
              className="nav-panel"
              id={`menu-${menu.id}`}
              hidden={open !== menu.id}
              onKeyDown={onPanelKey(menu.id)}
            >
              <div className="nav-panel-rail">
                <p className="nav-panel-label">{menu.label}</p>
                <p className="nav-panel-intro">{menu.intro}</p>
                <Link className="nav-panel-out" href={menu.out.href} onClick={() => setOpen(null)}>
                  {menu.out.label}
                  <i aria-hidden="true"><ArrowUpRight size={12} /></i>
                </Link>
              </div>
              <ul>
                {menu.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isCurrent(item.href) ? "page" : undefined}
                      onClick={() => setOpen(null)}
                    >
                      <span className="nav-item-index">{item.index}</span>
                      <span className="nav-item-body">
                        <strong>{item.label}</strong>
                        <small>{item.note}</small>
                      </span>
                      <i aria-hidden="true"><ArrowUpRight size={13} /></i>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        <Link href="/about" aria-current={isCurrent("/about") ? "page" : undefined}>About</Link>
        <Link href="/contact" aria-current={isCurrent("/contact") ? "page" : undefined}>Contact</Link>
      </div>

      <BookButton className="nav-book" topic="Free intro session">
        Book an intro <em><ArrowUpRight size={13} /></em>
      </BookButton>

      <button
        type="button"
        className="nav-burger"
        aria-expanded={drawer}
        aria-controls="nav-drawer"
        aria-label={drawer ? "Close menu" : "Open menu"}
        onClick={() => setDrawer(!drawer)}
      >
        <span /><span />
      </button>

      {/* Rendered at all widths and hidden by CSS above the breakpoint, so its
          links are in the HTML for crawlers regardless of viewport. */}
      <div className="nav-drawer" id="nav-drawer" hidden={!drawer}>
        <div className="nav-drawer-scroll">
          <a className="nav-drawer-link" href={`${prefix}#method`} onClick={() => setDrawer(false)}>
            Method
          </a>

          {menus.map((menu) => (
            <section key={menu.id}>
              <p className="nav-drawer-label">{menu.label}</p>
              <ul>
                {menu.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isCurrent(item.href) ? "page" : undefined}
                      onClick={() => setDrawer(false)}
                    >
                      <span className="nav-item-index">{item.index}</span>
                      <span className="nav-item-body">
                        <strong>{item.label}</strong>
                        <small>{item.note}</small>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <div className="nav-drawer-tail">
            <Link className="nav-drawer-link" href="/about" onClick={() => setDrawer(false)}>About Jeff</Link>
            <Link className="nav-drawer-link" href="/contact" onClick={() => setDrawer(false)}>Contact</Link>
          </div>

          <BookButton className="button lime nav-drawer-book" topic="Free intro session">
            Book your free intro <span><ArrowUpRight /></span>
          </BookButton>
        </div>
      </div>
    </nav>
  );
}
