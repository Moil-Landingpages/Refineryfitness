> **Status note — read this first.**
>
> This plan was written against the live site. Part of its Sprint 1 foundation has
> since shipped on this branch, so some items are already done. The table below
> reconciles the plan with the repository; everything not listed is still open.
>
> | Plan item | Status in this repo |
> |---|---|
> | Sitemap (§17) | Done — `app/sitemap.ts`, pinned `lastmod` |
> | Robots (§17) | Done — `app/robots.ts` |
> | Canonicals (§17) | Done — self-canonical via the Metadata API |
> | Homepage metadata (§5) | Done — title, description, OG, Twitter, robots directive |
> | Business structured data (§15) | Done — `lib/schema.ts`: LocalBusiness, Person, WebSite, FAQPage, linked by `@id` |
> | `areaServed` (§16) | Done — `lib/market.ts`; Buda, Kyle, Hays County published, San Marcos gated |
> | Custom 404 (§17) | Open |
> | Image alt text (§19) | Largely done; audit on each new page |
> | Heading hierarchy (§20) | Done on the homepage — one `<h1>`, one `<main>`; enforced by `npm run check:seo` |
> | Breadcrumbs (§14) | Open — no nested pages exist yet |
> | Everything in Sprints 2–4 | Open |
>
> Two constraints named in the audit gate this plan and need owner input before the
> location pages can be written honestly: there is **no published telephone number**
> and **no contact page** (every CTA is a `mailto:`), and the **Google Business
> Profile eligibility decision** has not been made. See
> [`docs/local-seo-aeo-plan.md`](local-seo-aeo-plan.md).
>
> `npm run check:seo` enforces the technical acceptance criteria in §25 on every
> build. Extend its `ROUTES` array as each new page ships.

---

# Refinery Fitness — SEO Developer Implementation Plan

## Purpose

This document is a developer-focused SEO implementation plan for **Refinery Fitness**.

Primary goal:

> Improve Refinery Fitness's organic and local search visibility for personal-training and fitness searches in **Buda, Kyle, and Hays County, Texas**, without damaging the existing brand, design, conversion flow, or user experience.

Primary target themes:

- personal trainer Buda TX
- personal training Buda TX
- fitness trainer Buda TX
- personal trainer Kyle TX
- personal training Kyle TX
- fitness trainer Kyle TX
- personal trainer Hays County TX
- personal training Hays County TX
- fitness trainer Hays County TX
- related service + location searches

This document is intended to be handed directly to Claude/code agents working on the Refinery Fitness website.

---

# 1. Current Website Audit

## Current site

https://www.refineryfitness.biz/

The current website is already strongly positioned around:

- Personal training
- Buda, Texas
- Kyle
- Hays County
- In-person training
- Mobile training
- Virtual coaching
- Strength
- Nutrition
- The RPMS Method
- Jeff Mensing as the trainer/health coach

The current homepage explicitly identifies the business as:

> PERSONAL TRAINING · BUDA, TEXAS

and states:

> BUDA · KYLE · HAYS COUNTY IN PERSON / MOBILE / VIRTUAL

The homepage also identifies Jeff Mensing as a Kinesiology-trained personal trainer and health coach in Buda, Texas and says he coaches around Buda and Kyle and across Hays County.

### Important conclusion

The site already contains many of the geographic and service concepts we need.

The problem is primarily **architecture and search targeting**, not a lack of relevant business information.

Google currently has one primary page to interpret all of these topics.

We should therefore NOT replace the current homepage with a giant keyword-stuffed page.

Instead, preserve the homepage as the primary brand/conversion page and add focused, useful landing pages underneath it.

---

# 2. Current Information Architecture

The current navigation appears to be primarily section/anchor based rather than a multi-page SEO architecture.

Current navigation concepts include:

- Method
- Programs
- About
- Book an intro

The homepage contains sections covering:

1. Hero / Personal Training — Buda
2. RPMS Method
3. Relational
4. Physical
5. Mental
6. Spiritual
7. Strong Start
8. 1:1 Training
9. Mobile Training
10. Virtual Coaching
11. 90-second check-in
12. Jeff Mensing / About
13. Positioning / brand story
14. Client result
15. FAQ
16. Contact / free intro

This is good for a high-conversion single-page marketing site.

It is not ideal for capturing multiple distinct search intents.

---

# 3. What We Should NOT Do

Do NOT:

- Replace the existing homepage with generic SEO copy.
- Stuff "Buda", "Kyle", or "Hays County" repeatedly into paragraphs.
- Create dozens of nearly identical location pages.
- Create fake locations where Refinery does not actually serve clients.
- Copy the Buda page and merely replace "Buda" with "Kyle".
- Add hidden keyword text.
- Add fake reviews.
- Add fabricated business addresses.
- Add fabricated local landmarks.
- Add irrelevant schema.
- Create doorway pages whose only purpose is to rank.
- Remove the existing RPMS/brand positioning.
- Turn the site into a generic gym website.

The current brand is differentiated. SEO should strengthen the existing positioning rather than flatten it.

---

# 4. Target Information Architecture

Implement the following structure gradually.

```text
/
├── /personal-training/
├── /personal-trainer-buda-tx/
├── /personal-trainer-kyle-tx/
├── /personal-trainer-hays-county-tx/
├── /programs/
│   ├── /programs/strong-start/
│   ├── /programs/one-on-one-training/
│   ├── /programs/mobile-training/
│   └── /programs/virtual-coaching/
├── /method/
├── /about/
└── /contact/
```

Do not create every URL in one deployment if some pages do not have enough unique content.

The minimum first release should be:

```text
/
 /personal-training/
 /personal-trainer-buda-tx/
 /personal-trainer-kyle-tx/
 /personal-trainer-hays-county-tx/
 /about/
 /contact/
```

Then expand into service/program pages.

---

# 5. Homepage Strategy

## Keep the homepage

Do not migrate the existing homepage to another URL.

Keep:

```text
/
```

as the main brand page.

## Homepage SEO target

Primary concept:

**Personal Training in Buda, TX**

Secondary concepts:

- Personal trainer in Buda
- Personal training in Buda
- Fitness trainer in Buda
- Kyle personal training
- Hays County personal training
- Strength training
- Health coaching

## Recommended metadata

Title:

```text
Personal Trainer in Buda, TX | Refinery Fitness
```

Alternative if the current title already performs well:

```text
Personal Training in Buda, TX | Refinery Fitness
```

Meta description:

```text
Refinery Fitness provides science-backed personal training and health coaching in Buda, Kyle, and Hays County, TX. Train in person, at home, or virtually.
```

Do not change metadata blindly if Search Console data shows the current version is performing well. Record the current metadata before changing it.

## Homepage H1

The current visual hero is:

> MORE THAN MOTION.

Do not remove this as a brand element.

However, the semantic HTML should have a clear H1 communicating the business/service/location.

Preferred structure:

```html
<h1>Personal Training in Buda, TX</h1>
```

Then preserve:

```text
MORE THAN MOTION.
```

as a visual supporting headline if desired.

If changing the visible design is undesirable, use an accessible, semantically correct heading structure rather than adding hidden text.

---

# 6. New Page: Personal Training

## URL

```text
/personal-training/
```

## Primary intent

General personal training / fitness coaching.

## Suggested title

```text
Personal Training in Buda, TX | Refinery Fitness
```

## Suggested H1

```text
Personal Training Built Around Your Life
```

## Content

Explain:

- What Refinery personal training is
- Who it is for
- How the training works
- 1:1 coaching
- Programming
- Strength
- Nutrition
- Accountability
- RPMS Method
- In-person/mobile/virtual options
- Service locations

Include internal links to:

- Buda page
- Kyle page
- Hays County page
- Strong Start
- 1:1 training
- Mobile training
- Virtual coaching

---

# 7. New Page: Buda

## URL

```text
/personal-trainer-buda-tx/
```

## Primary keyword

```text
personal trainer Buda TX
```

## Secondary keywords

```text
personal training Buda TX
fitness trainer Buda TX
personal fitness trainer Buda
strength training Buda TX
fitness coach Buda TX
```

## Title

```text
Personal Trainer in Buda, TX | Refinery Fitness
```

## H1

```text
Personal Trainer in Buda, TX
```

## Page purpose

Create the strongest dedicated local landing page for the business's primary location.

## Content requirements

The page should contain genuinely useful local/service content.

Suggested structure:

```text
H1 Personal Trainer in Buda, TX

Introduction
- Refinery Fitness
- Jeff Mensing
- Personal training
- Buda service area

H2 Personal Training in Buda
- What the service includes
- Who it is for
- How sessions work

H2 Training Options
- 1:1
- Mobile
- Strong Start
- Virtual if appropriate

H2 The RPMS Method
- Relational
- Physical
- Mental
- Spiritual

H2 Why Train With Refinery Fitness in Buda?
- Kinesiology-trained coaching
- Science-backed programming
- Individualized coaching
- Accountability
- Local service

H2 Areas We Serve
- Only list real service areas

H2 Frequently Asked Questions

CTA
- Book free intro
```

Do not manufacture neighborhood claims.

---

# 8. New Page: Kyle

## URL

```text
/personal-trainer-kyle-tx/
```

## Primary keyword

```text
personal trainer Kyle TX
```

## Secondary keywords

```text
personal training Kyle TX
fitness trainer Kyle TX
personal fitness trainer Kyle
strength training Kyle TX
fitness coach Kyle TX
```

## Title

```text
Personal Trainer in Kyle, TX | Refinery Fitness
```

## H1

```text
Personal Trainer in Kyle, TX
```

## Critical requirement

This page must NOT be a duplicate of the Buda page.

It needs original copy that explains:

- Refinery's service availability in Kyle
- Why the mobile/in-person model works for Kyle clients
- Training options actually available in Kyle
- Relevant local service context
- Client needs
- Travel/service model where accurate

Use the same brand voice, but create unique content.

---

# 9. New Page: Hays County

## URL

```text
/personal-trainer-hays-county-tx/
```

## Primary keyword

```text
personal trainer Hays County TX
```

## Secondary keywords

```text
personal training Hays County TX
fitness trainer Hays County TX
mobile personal trainer Hays County
fitness coach Hays County
```

## Title

```text
Personal Trainer in Hays County, TX | Refinery Fitness
```

## H1

```text
Personal Training in Hays County, TX
```

## Content

This page should focus especially on the fact that Refinery offers mobile/home/garage-gym training across the county where actually available.

Do not imply a physical gym location throughout Hays County.

Be precise about:

- In-person
- Mobile
- Virtual
- Actual service area

---

# 10. Program Pages

The current homepage already contains four strong program concepts:

- Strong Start
- 1:1 Training
- Mobile Training
- Virtual Coaching

These should eventually become crawlable pages.

## Strong Start

```text
/programs/strong-start/
```

Title:

```text
Strong Start Fitness Program | Refinery Fitness
```

## 1:1 Training

```text
/programs/one-on-one-training/
```

Title:

```text
1:1 Personal Training | Refinery Fitness
```

## Mobile Training

```text
/programs/mobile-training/
```

Title:

```text
Mobile Personal Training in Buda, Kyle & Hays County
```

## Virtual Coaching

```text
/programs/virtual-coaching/
```

Title:

```text
Virtual Fitness Coaching | Refinery Fitness
```

Only create these pages when enough unique content exists.

---

# 11. About Page

## URL

```text
/about/
```

The homepage already contains strong founder information.

Move or expand this into a dedicated About page.

Primary concepts:

- Jeff Mensing
- Kinesiology
- Personal trainer
- Health coach
- Refinery Fitness
- RPMS Method
- Buda / Kyle / Hays County

Suggested H1:

```text
Meet Jeff Mensing, Founder of Refinery Fitness
```

This page should strengthen entity trust and demonstrate who is actually delivering the service.

---

# 12. Contact Page

## URL

```text
/contact/
```

Include:

- Business/contact information that is accurate
- Service area
- Contact form
- Email
- Booking CTA
- Relevant social profiles

Do not invent a street address.

If Refinery is a service-area/mobile business, represent it accurately.

---

# 13. Internal Linking Strategy

Every new page must participate in a clear internal linking system.

## Homepage → locations

Add contextual links:

```text
Personal training in Buda
Personal training in Kyle
Personal training throughout Hays County
```

## Location pages → services

Example:

```text
Buda
 ├── 1:1 Training
 ├── Mobile Training
 ├── Strong Start
 └── Personal Training
```

## Service pages → locations

Example:

```text
Mobile Training
 ├── Buda
 ├── Kyle
 └── Hays County
```

## About → locations

Link to:

- Buda
- Kyle
- Hays County

Use natural anchor text.

Do not force exact-match anchors everywhere.

---

# 14. Breadcrumbs

Implement breadcrumbs on all new pages except where the design genuinely does not need them.

Example:

```text
Home
→ Personal Training
→ Personal Trainer in Buda, TX
```

Use semantic markup.

Where appropriate, implement `BreadcrumbList` structured data.

---

# 15. Structured Data

Implement JSON-LD carefully.

Potential schema:

- `Organization`
- Appropriate `LocalBusiness` subtype
- `Person` for Jeff where useful
- `Service`
- `BreadcrumbList`

Do NOT select a schema type simply because it contains keywords.

The schema must accurately describe the real business.

## Business information

Where accurate, include:

```text
name
url
telephone
email
logo
image
sameAs
areaServed
service
```

If there is no public physical location, do not fabricate one.

Validate structured data after deployment.

---

# 16. Area Served

The site should clearly establish:

```text
Buda, Texas
Kyle, Texas
Hays County, Texas
```

Use `areaServed` only where it accurately reflects the actual service area.

If other towns are added, confirm with the business first.

---

# 17. Technical SEO Requirements

Implement:

### Sitemap

Generate:

```text
/sitemap.xml
```

Include only canonical, indexable URLs.

### Robots

Ensure important pages are crawlable.

### Canonicals

Every indexable page should have a self-referencing canonical unless there is a deliberate canonical target.

### Metadata

Every indexable page needs unique:

- `<title>`
- meta description
- canonical

### Open Graph

Add unique OG title/description/image where appropriate.

### Twitter/X metadata

Add if useful for social sharing.

### 404

Maintain a useful custom 404 page.

### Redirects

Use 301 redirects when URLs change.

Do not create redirect chains.

---

# 18. Performance

Do not sacrifice the current visual design for SEO.

Audit:

- LCP
- CLS
- INP
- image sizes
- image formats
- lazy loading
- font loading
- JavaScript bundles
- third-party scripts
- animation cost

The current site is visually rich, so be especially careful with:

- large hero imagery
- animated sections
- video
- custom fonts
- client-side effects

Use optimized responsive images.

Do not lazy-load the primary above-the-fold hero image if doing so harms LCP.

---

# 19. Image SEO

Every meaningful image should have descriptive alt text.

Avoid:

```text
image1.jpg
DSC_2938.jpg
```

Use meaningful alt text such as:

```text
Jeff Mensing coaching a personal training client in Buda, Texas
```

Only describe what is actually visible.

Do not stuff keywords into alt text.

Decorative images should use appropriate empty alt attributes.

---

# 20. Heading Structure

Each page should have:

```text
1 H1
↓
H2 sections
↓
H3 subsections
```

Do not use headings purely for visual styling.

The existing brand can retain its dramatic typography while the HTML heading hierarchy becomes more search-accessible.

---

# 21. FAQ Strategy

The homepage already has useful FAQ content.

For location pages, create genuinely location-relevant questions.

Examples:

### Buda

- Where does personal training in Buda take place?
- What does a first session look like?
- Is personal training suitable for beginners?
- Does Refinery Fitness offer mobile training in Buda?

### Kyle

- Does Refinery Fitness offer personal training in Kyle?
- Can you train clients at home in Kyle?
- What training programs are available?

### Hays County

- What areas of Hays County does Refinery Fitness serve?
- Does Refinery offer mobile personal training?
- Can I train virtually if I live outside the immediate service area?

Only include questions that have real answers.

---

# 22. SEO Content Rules

All new content must follow these rules:

1. Write for humans first.
2. Use the primary keyword naturally.
3. Use related terms naturally.
4. Avoid keyword stuffing.
5. Do not duplicate location pages.
6. Do not invent local information.
7. Maintain Refinery's existing brand voice.
8. Keep faith-first positioning authentic and non-coercive.
9. Make every page useful even without Google traffic.
10. Include a clear conversion path.

---

# 23. URL Rules

Use lowercase, descriptive URLs.

Preferred:

```text
/personal-trainer-buda-tx/
/personal-trainer-kyle-tx/
/personal-trainer-hays-county-tx/
/personal-training/
/programs/mobile-training/
```

Avoid:

```text
/page?id=123
/services2
/buda
/location1
/kyle-personal-training-final-v2
```

Do not change URLs unnecessarily once indexed.

---

# 24. Search Console Setup

Developer must verify:

- Domain/property ownership
- Sitemap submission
- Index coverage
- URL inspection
- Core Web Vitals
- HTTPS
- Mobile usability
- Search queries

After deployment:

1. Submit sitemap.
2. Inspect new URLs.
3. Request indexing for priority pages if appropriate.
4. Monitor indexing.
5. Monitor query impressions.
6. Compare performance before/after changes.

---

# 25. SEO Acceptance Criteria

A task is not complete until:

### Technical

- [ ] URL returns 200
- [ ] Page is indexable
- [ ] Canonical is correct
- [ ] Title exists
- [ ] Meta description exists
- [ ] H1 exists
- [ ] No accidental `noindex`
- [ ] No broken internal links
- [ ] Page is included in sitemap
- [ ] Mobile layout works
- [ ] Images are optimized

### Content

- [ ] Content is unique
- [ ] Location is accurate
- [ ] Service is accurately described
- [ ] Primary keyword is naturally addressed
- [ ] Internal links exist
- [ ] CTA exists
- [ ] Content matches actual Refinery services

### Structured data

- [ ] JSON-LD is valid
- [ ] Business information is accurate
- [ ] No fabricated address
- [ ] No misleading schema
- [ ] Breadcrumb schema validates where implemented

---

# 26. Recommended Development Order

## Sprint 1 — Foundation

```text
1. Audit current metadata
2. Audit technical SEO
3. Confirm sitemap
4. Confirm robots.txt
5. Confirm Search Console
6. Fix heading hierarchy
7. Optimize homepage metadata
8. Optimize images/performance
```

## Sprint 2 — Location architecture

```text
1. Create /personal-training/
2. Create /personal-trainer-buda-tx/
3. Create /personal-trainer-kyle-tx/
4. Create /personal-trainer-hays-county-tx/
5. Add internal links
6. Add breadcrumbs
7. Add structured data
8. Add pages to sitemap
```

## Sprint 3 — Services

```text
1. Create Strong Start page
2. Create 1:1 Training page
3. Create Mobile Training page
4. Create Virtual Coaching page
5. Connect services ↔ locations
```

## Sprint 4 — Authority

```text
1. Expand About page
2. Improve FAQ content
3. Add local proof/testimonials where legitimate
4. Improve conversion tracking
5. Monitor Search Console
6. Expand pages based on actual search queries
```

---

# 27. Developer Ticket List

## P0 — Must do

- [ ] Preserve existing homepage
- [ ] Audit current metadata
- [ ] Ensure homepage H1 communicates personal training + Buda
- [ ] Create `/personal-training/`
- [ ] Create `/personal-trainer-buda-tx/`
- [ ] Create `/personal-trainer-kyle-tx/`
- [ ] Create `/personal-trainer-hays-county-tx/`
- [ ] Add internal linking
- [ ] Add canonical tags
- [ ] Add XML sitemap
- [ ] Verify robots.txt
- [ ] Implement accurate business structured data
- [ ] Implement breadcrumbs
- [ ] Optimize images
- [ ] Verify mobile performance
- [ ] Connect pages to Search Console

## P1 — Next

- [ ] Create Strong Start page
- [ ] Create 1:1 Training page
- [ ] Create Mobile Training page
- [ ] Create Virtual Coaching page
- [ ] Create About page
- [ ] Create Contact page
- [ ] Add Service schema where appropriate
- [ ] Improve FAQ architecture
- [ ] Add local proof/case studies where legitimate

## P2 — Growth

- [ ] Local content strategy
- [ ] Local citations
- [ ] Local partnerships
- [ ] Local backlinks
- [ ] Review acquisition system
- [ ] Monthly Search Console analysis
- [ ] Expand pages based on real search demand

---

# 28. Important Claude Instructions

When implementing this plan:

### First inspect the existing codebase.

Do not assume the framework, routing structure, metadata implementation, or component architecture.

Before changing anything:

- identify the framework
- identify the routing system
- identify current SEO/metadata utilities
- identify sitemap generation
- identify robots generation
- identify image handling
- identify current schema
- identify reusable layout/components
- identify current navigation
- identify current deployment configuration

### Reuse existing components.

Do not duplicate:

- headers
- footers
- buttons
- cards
- CTA components
- typography
- image components
- navigation
- layout wrappers

Create reusable SEO/location components where appropriate.

### Preserve design.

The current site has a deliberate editorial/brand identity.

SEO implementation should not turn the website into a generic SEO landing-page template.

### Before writing copy

Use the current site content and business facts as the source of truth.

Do not invent:

- prices
- addresses
- neighborhoods
- testimonials
- qualifications
- certifications
- services
- locations
- client results

If information is required but unavailable, flag it for the site owner.

---

# 29. Final Target Architecture

The desired end state is:

```text
                         REFINERY FITNESS
                                |
                +---------------+---------------+
                |                               |
             SERVICES                        LOCATIONS
                |                               |
      +---------+---------+           +---------+---------+
      |         |         |           |         |         |
  Personal   Strength   Mobile      Buda      Kyle     Hays
  Training   Training   Training     TX        TX      County
      |         |         |           |         |         |
      +---------+---------+-----------+---------+---------+
                                |
                       INTERNAL LINKING
                                |
                    GOOGLE / SEARCH CONSOLE
                                |
                +---------------+---------------+
                |                               |
          ORGANIC SEARCH                 LOCAL SEARCH
                |                               |
      Personal trainer Buda            Google Maps / Local
      Personal trainer Kyle            Personal trainer searches
      Personal trainer Hays            Fitness searches
      Fitness trainer Buda             Service + location searches
      etc.
```

---

# 30. Success Measurement

Do not judge the project solely by ranking for one keyword.

Track:

### Organic

- Organic clicks
- Organic impressions
- CTR
- Average position
- Indexed pages
- Non-branded clicks

### Location queries

- Personal trainer Buda TX
- Personal trainer Kyle TX
- Personal trainer Hays County TX
- Personal training Buda TX
- Personal training Kyle TX
- Fitness trainer Buda TX
- Fitness trainer Kyle TX

### Conversion

- Free intro submissions
- Contact submissions
- Booking clicks
- Phone/email clicks
- Conversion rate from organic traffic

### Local

- Google Business Profile visibility
- Discovery searches
- Calls
- Website clicks
- Direction requests where applicable
- Review volume/rating
- Local pack visibility

The ultimate objective is not simply:

> "Rank #1 for personal trainer Buda."

It is:

> **Increase qualified local traffic and free-intro conversions from people looking for personal training and fitness coaching across Buda, Kyle, and Hays County.**

---

# Final Implementation Principle

The current Refinery Fitness site already has a strong brand and a surprisingly strong amount of relevant local/service copy.

The next SEO step is **not to rewrite everything**.

It is to turn the current single-page brand experience into a structured website where Google can independently understand:

```text
Refinery Fitness
    ↓
Personal Training
    ↓
Buda
Kyle
Hays County
    ↓
1:1 Training
Mobile Training
Strong Start
Virtual Coaching
    ↓
Jeff Mensing
RPMS Method
    ↓
Book a Free Intro
```

Build the architecture first, then expand content based on actual Search Console data.

Do not sacrifice the brand experience for SEO.

---

# Developer checklist — being read correctly by Google **and** by AI assistants

Everything above targets Google. This section targets the second audience: ChatGPT,
Claude, Perplexity, Copilot, and Gemini. They overlap with Google but they are not
the same problem, and a page can rank well while being invisible to all of them.

Three differences drive the whole checklist:

1. **Most AI crawlers do not execute JavaScript.** Googlebot renders, on a delay and
   within a budget. The AI retrieval crawlers largely fetch the raw HTML and read
   what is there. Anything painted by the client is, to them, not on the page.
2. **They retrieve fragments, not pages.** A section is pulled out of context and
   summarised on its own. A paragraph that says "we serve the whole area from here"
   is useless once separated from the page that said who "we" are.
3. **Access is decided at the edge, not in `robots.txt`.** A CDN bot rule, a WAF, or
   a hosting "block AI scrapers" toggle will return 403 to these agents no matter
   what the robots file permits.

---

## A. Crawler access

Sort agents into three groups and decide each group deliberately. They are not
interchangeable, and treating them as one bucket is the most common mistake.

### A1. Search crawlers — allow

| Agent | Feeds |
|---|---|
| `Googlebot` | Google Search, AI Overviews, AI Mode |
| `Bingbot` | Bing, and Microsoft Copilot |
| `Applebot` | Siri and Spotlight |

### A2. AI retrieval and citation crawlers — allow if you want to be cited

These fetch a page to answer a question a user is asking *right now*, and they are
the mechanism by which the business gets named and linked in an answer. Blocking
them does not protect anything; it removes the business from the answer.

| Agent | Purpose |
|---|---|
| `OAI-SearchBot` | Builds ChatGPT's search index |
| `ChatGPT-User` | Fetches a page when a ChatGPT user asks it to visit one |
| `Claude-SearchBot` | Builds Claude's search index |
| `Claude-User` | Fetches a page when a Claude user asks it to visit one |
| `PerplexityBot` | Builds Perplexity's index |
| `Perplexity-User` | Fetches on a Perplexity user's behalf |

### A3. Model-training crawlers — a business decision, not an SEO one

Allowing these has no effect on whether the business is cited today. They govern
whether the content may be used to train future models. Decide it as an owner, not
as a default.

| Agent | Controls |
|---|---|
| `GPTBot` | OpenAI model training |
| `ClaudeBot` | Anthropic model training |
| `Google-Extended` | Gemini training and grounding — a control token, not a crawler |
| `Applebot-Extended` | Apple model training |
| `CCBot` | Common Crawl, which many models train on |
| `meta-externalagent` | Meta model training |

``app/robots.ts`` names the A1 and A2 agents explicitly. A blanket `User-agent: *`
already permits them, so this changes no behaviour — it records the intent, so a
future change cannot quietly remove citation access without someone noticing.

### A4. Checklist

- [ ] ``app/robots.ts`` explicitly allows every A1 and A2 agent.
- [ ] The A3 decision is made by the owner and written down.
- [ ] No CDN, WAF, or hosting bot rule blocks the A1/A2 agents. **Check this at the
      edge — a correct robots file proves nothing here.** On Vercel, confirm Bot
      Protection or Attack Challenge Mode is not challenging them. On Cloudflare,
      confirm "Block AI Scrapers and Crawlers" is off, or scoped so it does not
      catch A1/A2.
- [ ] No rate limit trips on a normal crawl of the sitemap.
- [ ] Verify by user agent, not just by eye:

```bash
for ua in "Googlebot" "Bingbot" "OAI-SearchBot" "ChatGPT-User" \
          "Claude-SearchBot" "Claude-User" "PerplexityBot"; do
  printf "%-20s " "$ua"
  curl -s -o /dev/null -w "%{http_code}\n" -A "$ua" https://refineryfitness.biz/
done
```

Every line must print `200`. A `403` or `503` on any of them means the edge is
blocking a crawler the business wants.

---

## B. The content must be in the HTML

The single highest-impact item in this section.

- [ ] Primary content is server-rendered. In the App Router that means server
      components by default; push `"use client"` down to the leaves that genuinely
      need interactivity.
- [ ] **Accordion, tab, and carousel content is in the DOM when collapsed.** Hide it
      with CSS or the `hidden` attribute, never by conditionally mounting it. A FAQ
      that mounts its answer on click has no answers as far as a retrieval crawler
      is concerned — which is exactly backwards, since FAQs are the most
      citation-ready content on the site.
- [ ] No content requires a scroll, a hover, or an animation to enter the DOM.
- [ ] No substantive text lives only inside an image.
- [ ] Nothing important is fetched client-side after load.

Verify the way a crawler sees it — raw HTML, no JavaScript:

```bash
# Does the fact actually exist in the delivered HTML?
curl -s https://refineryfitness.biz/ | grep -o "BUDA · KYLE · HAYS COUNTY"

# How much text is really there? A number far below what the page shows
# means the page is being painted client-side.
curl -s https://refineryfitness.biz/ | sed 's/<[^>]*>//g' | tr -s '[:space:]' ' ' | wc -w
```

---

## C. Write so a fragment survives on its own

Retrieval pulls a chunk and summarises it without the rest of the page.

- [ ] **Answer first.** The first one or two sentences under a heading answer the
      heading's question outright. Context, nuance, and the sales argument follow.
- [ ] **Every section names its subject.** Write "Refinery Fitness in Buda, Texas", not "we" and
      not "here". A chunk that only says "we" is unattributable and will not be
      cited with a business name.
- [ ] **State facts literally.** Price, duration, service area, hours, and contact
      details as plain text, in the copy — not implied by a design element, an icon,
      or a badge.
- [ ] **Use tables and lists** for anything comparable. They survive extraction far
      better than prose.
- [ ] **Headings are descriptive and stable.** "What a Personal Training Session in Buda Includes" beats "The Details".
- [ ] One `<h1>` per page; a logical `<h2>`/`<h3>` hierarchy under it; no heading
      chosen for its font size.
- [ ] Dates are machine-readable — `<time datetime="...">` — wherever recency matters.

---

## D. Make the entity unambiguous

An assistant has to decide that the page, the Google listing, and the directory
entry are all the same business before it will state a fact about it.

- [ ] One canonical origin; every alternate host and protocol redirects to it in one
      hop.
- [ ] One exact business name everywhere — site, schema, Google Business Profile,
      every directory.
- [ ] JSON-LD uses stable `@id` values, and the nodes reference each other rather
      than sitting as disconnected blocks.
- [ ] `sameAs` lists every official profile the owner controls.
- [ ] Every fact in the schema is visible on the page. Schema that says something the
      page does not is a contradiction, and it is resolved against you.
- [ ] Name, address or service area, and phone match across site, Google Business
      Profile, and every listing. Inconsistent details are the main reason an
      assistant hedges instead of answering.

---

## E. Measure whether any of it worked

AI referrals arrive as ordinary traffic and disappear into "direct" unless they are
looked for.

- [ ] Track `utm_source=chatgpt.com` — ChatGPT appends it to outbound links.
- [ ] Track these referrer hosts as an AI channel: `chatgpt.com`, `perplexity.ai`,
      `claude.ai`, `copilot.microsoft.com`, `gemini.google.com`.
- [ ] Run a fixed prompt set monthly, same wording and same locale each time, and
      record for each: was the business mentioned, was there a clickable citation,
      which URL was cited, was the answer accurate, and what was the sentiment.
      Sample repeatedly — these answers vary run to run, so a single check tells you
      nothing.
- [ ] Correct inaccurate representations at the source — the site, the listing, the
      directory — rather than trying to argue with a given answer.

---

## F. What not to do

- **Do not treat `llms.txt` as a priority.** No major assistant consumes it today.
  It is cheap to add and harmless, but it is not a substitute for anything above,
  and it should never be scheduled ahead of items A through D.
- **Do not block A1 or A2 crawlers** and then wonder why the business is absent from
  AI answers.
- **Do not serve different content to crawlers.** Cloaking is a search violation and
  produces citations the user cannot verify when they click through.
- **Do not add FAQ markup as a citation trick.** Mark up questions genuinely visible
  and genuinely answered on the page; nothing else.
- **Do not publish a claim in structured data that the business cannot evidence.**
  Assistants repeat these back to customers as fact.
