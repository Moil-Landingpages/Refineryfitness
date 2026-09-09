# Refinery Fitness — design system

The vocabulary the site already uses, written down so new pages extend it rather
than inventing a second look. Everything here was read off the existing homepage
and `app/globals.css`; nothing was invented for the subpages.

## Tokens

Defined once on `:root` in `app/globals.css`.

| Token | Value | Role |
|---|---|---|
| `--ink` | `#10100e` | Text, and the ground for inverted sections |
| `--cream` | `#efede6` | Page ground |
| `--soft` | `#d9d5ca` | Alternating section tint |
| `--lime` | `#d8ff51` | Accent on dark grounds — CTA fill, emphasis |
| `--orange` | `#f35b37` | Accent on light grounds — kicker rules, emphasis, numerals |
| `--dim` | `#85837c` | Muted metadata |
| `--line` | `rgba(16,16,14,.18)` | Hairline separators |
| `--display` | Oswald | Headings, uppercase, tight tracking |
| `--body` | Instrument Sans | Body copy |
| `--mono` | DM Mono | Kickers, buttons, labels |

**The accent rule matters.** Orange on cream and soft grounds, lime on ink ones.
`SectionMark` already encodes it via its `tone` prop, and the subpage classes
follow the same logic through `.page-section.dark`.

## Type

- Headings are Oswald, uppercase, with heavy negative tracking and sub-1
  line-height. Emphasis uses `<em>` with `font-style: normal` and the accent
  colour — never italics.
- Kickers are DM Mono, 10px, `.16em` tracking, uppercase, preceded by a 26×2px
  accent rule rendered as `<b />`.
- Buttons are DM Mono, 10px, uppercase, with a `translateY(-3px)` hover.

## Layout

- `.section` is `padding: 128px 9vw`. Subpages use the same 9vw gutter at a
  slightly tighter 104px rhythm.
- Sections carry their own background; pages never set one.
- Alternating grounds: cream → soft → cream → ink.
- `SectionMark` floats a dotted rail and an oversized numeral in the section's
  own padding, so it decorates without shifting content.

## Homepage

Kept exactly as designed. The subpages borrow its patterns; they do not alter it.

```text
nav → hero → marquee → method → visual break → programs → check-in
→ about → proof → visual break → faq → final CTA → footer
```

The only homepage change made for the search architecture is in the **footer**,
which gained three link columns so the new pages carry an internal link from
every page on the site. Everything above it renders exactly as it did —
verified by diffing the rendered HTML before and after; the diff is additions
only, nothing removed.

## Subpage vocabulary

New class names only, appended to `globals.css` under a `Subpages` banner. No
existing rule was modified.

| Class | Role |
|---|---|
| `.crumbs` | Breadcrumb trail, DM Mono scale, clears the fixed nav |
| `.page-hero` | Hero: kicker, H1, lede, fact list |
| `.page-facts` | The `<dl>` of labelled facts, opened by a hairline |
| `.page-section` (`.soft`, `.dark`) | Section wrapper on the 9vw gutter |
| `.page-split` | 0.85fr / 1.15fr two-column layout |
| `.page-prose` | 66ch measure for running copy |
| `.page-grid` (`.two`) | Cards opened by a 2px orange rule |
| `.page-list` | Numbered or Q-marked rows with Oswald numerals |
| `.page-links` / `.page-link` | Internal-link cards |
| `.page-cta` | Closing ink CTA band, lime button |
| `.footer-nav` | The footer's three link columns |

## Components

| File | Purpose |
|---|---|
| `components/Page.tsx` | Nav, breadcrumbs, closing CTA, footer, booking provider — the shell every subpage renders inside |
| `components/PageHero.tsx` | The hero block and its labelled fact list |
| `components/Breadcrumbs.tsx` | Visible trail and `BreadcrumbList` from one source |
| `components/ProgramSchema.tsx` | `Service` markup for a program page |
| `lib/pages.ts` | Page registry driving sitemap, footer columns, breadcrumbs |
| `lib/seo.ts` | Open Graph helper that re-attaches the shared social image |

`Nav` takes a `prefix` prop: `""` on the homepage where its anchors are
same-page, `"/"` on a subpage where they must travel home first. The default
keeps the homepage output unchanged.

Every CTA on a subpage is a `BookButton` inside the shell's `BookingProvider`,
so it opens the same modal the homepage uses, already pointed at whatever the
visitor was reading.

## Rules for the next page

- Reuse the classes above. A genuinely new one goes under the `Subpages` banner
  and into this table.
- One `<h1>`, then `<h2>`s. Never pick a heading level for its size.
- Emphasis is `<em>` in the accent for the ground it sits on. Orange on light,
  lime on dark.
- Place names come from `lib/market.ts`; programs from `lib/programs.ts`.
  Nothing about coverage or programs is typed into a page.
- **No prices and no telephone number.** Neither exists anywhere on this site.
  See `app/contact/page.tsx` for what to do when Jeff supplies a number.
- Every new page gets an entry in `lib/pages.ts` and a route in
  `scripts/check-seo.mjs`.
