# Local SEO & AEO audit and implementation plan

**Client:** Refinery Fitness of Buda
**Audit date:** 9 September 2026
**Scope:** the `refineryfitness.biz` repository at commit time, and the Buda / Kyle / Hays County service area.

This plan applies the method used for the Empowered Wellness engagement to Refinery Fitness. The structure is deliberately the same so the engagements can be compared; the findings and the market model are Refinery's own.

## Decision summary

Refinery Fitness arrived in the best technical shape of the three clients in this group, and it is worth stating plainly because it is rarer than it sounds: **there was no critical defect to recover from.** One canonical origin, centralised in `lib/site.ts`. Working `robots.ts` and `sitemap.ts`, the sitemap using a pinned `lastmod` rather than a build-time `new Date()` — a detail most sites get wrong. A truthful, linked entity graph with business, founder, website, and FAQ nodes joined by stable `@id`s. `areaServed` already naming Buda, Kyle, and Hays County. No street address claimed, correctly, because sessions run in person, mobile, or virtually. No unsupported rating anywhere.

The constraint is **architecture and proof**, not indexability.

Four genuinely different offers — Strong Start, 1:1 training, mobile training, and virtual coaching — live as sections of a single URL. "Mobile personal trainer Buda" and "online fitness coach Texas" are different searches, with different intent and different price expectations, and they compete for the same page. That is the ceiling on this site, and no amount of additional homepage copy raises it.

The second constraint is contact. A prospect who reaches the page and wants to book has an email link and nothing else: no telephone number in the schema or on the page, no contact page, no booking flow. For a local service business, that discards a meaningful share of the qualified local traffic the rest of the site is built to earn.

**What was deliberately not done:** San Marcos was *not* added to the published service area. It is the Hays County seat, and the site already claims Hays County, which makes it a reasonable inference — but inference is exactly what erodes local entity trust. It is wired into the market model as one boolean, waiting on Jeff's confirmation. No city pages were created either, for the same reason they were not created for the other two clients: near-identical pages built by swapping a city name are doorway-page behaviour under Google's spam policies.

## Method and limits

The audit reviewed every route, component, library module, metadata export, and asset in the repository.

**Verification limits.** The session's network policy blocks outbound requests to `refineryfitness.biz`, so no production HTTP check, rendered-HTML check, or indexed-search check could be run. Every claim below about the *live* site is inferred from the repository, not observed. Search Console, Google Business Profile, Bing Webmaster Tools, analytics, review access, server logs, rank tracking, backlink data, and field Core Web Vitals were all unavailable and must be baselined before Phase 4.

The local production build **was** run, and the new `npm run check:seo` suite passes against it. That verifies the code; it does not verify the deployment. In particular: `SITE_URL` is the apex `refineryfitness.biz`, so confirm on production that the `www` variant redirects to the apex in one hop rather than serving a duplicate.

## Geographic target model

Codified in `lib/market.ts`, which the entity graph, the footer strip, and the keyword set all read.

Refinery is a **service-area business**: sessions run in person, at the client's home or garage gym, or over video. The model therefore publishes a locality with no street address — which is correct, and which also means the business is not eligible for a *storefront* Google Business Profile without a staffed, customer-facing location.

| Tier | Places | Role in the plan | Published? |
|---|---|---|---|
| Primary home market | **Buda, TX** (Hays County) | In the business name, the page title, and the footer. Published as `addressLocality` with no street address, deliberately. | Yes |
| Core service area | **Buda, Kyle, Hays County** | Named in the coverage statement, the hero meta, the mobile-training program, the FAQ, and `areaServed`. | Yes |
| Core — pending | **San Marcos, TX** | The Hays County seat, inside the county already claimed. Plausible, unconfirmed, unpublished. | No — owner gate |
| Secondary area | Dripping Springs, Wimberley, South Austin | Add only where mobile training genuinely reaches and Jeff confirms it. | No — owner gate |
| Virtual reach | United States | A real program — Virtual Coaching, 04 in `lib/programs.ts`, explicitly for people outside Hays County. Kept as a qualifier after the local claim, never in place of it. | Yes |

Flipping `published: true` on San Marcos in `lib/market.ts` propagates it to the coverage statement, the footer strip, the schema `areaServed`, and the keyword set in one commit. No other file changes.

## Findings

### Healthy — verified, no action

1. **Identity and indexability are correct.** One canonical origin, working discovery files, a linked and truthful entity graph. Nothing needed recovery.
2. **No unsupported claims are marked up.** The Proof section carries client outcomes as visible testimonial copy and — correctly — does not mark them up as an `aggregateRating`.
3. **The service-area model is honest.** Omitting the street address is the right call for a business with no storefront, and most sites in this position get it wrong in one direction or the other.

### P0 — resolved in this release

4. **Place names lived in two files.** `areaServed` was a literal array in `lib/schema.ts`, and the footer strip was a hard-coded `BUDA · KYLE · HAYS COUNTY · TEXAS` string. Either could be updated without the other. → both now read `lib/market.ts`.

5. **Nothing verified the signals stayed true.** → `npm run check:seo` checks the route, the discovery files, the canonical, the landmark structure (one `<header>`, one `<main>`, exactly one `<h1>`), and the graph — including that every `@id` reference resolves to a node that actually exists, and that no `aggregateRating` has appeared. It exits non-zero, so it can gate CI.

6. **No web manifest.** → `app/manifest.ts` added, declaring icons that exist in `public/`.

### P0 — owner-gated, not started

7. **Email is the only way to make contact.** No telephone number in the schema or on the page, no contact page, no booking flow. Every CTA is a `mailto:`.

8. **No Google Business Profile decision.** As a service-area business with no staffed location, Refinery may still register a service-area profile with a hidden address — but only if Jeff has an eligible business address. This decision has not been made, and it determines whether local map visibility is available at all.

9. **No proof behind the outcome claims.** The Proof section's client outcomes have no documented permission or methodology on file. They are correctly not marked up; the underlying evidence still needs to exist before they carry weight with a careful reader or an answer engine.

### P1 — architecture and trust

10. **One indexable URL for four distinct offers.** The largest ceiling on the site. See the decision summary.

11. **No trust or legal pages.** No About page for Jeff beyond a homepage section, no privacy page, no terms page — while the site collects enquiry and check-in submissions through `app/api/enquiry/route.ts`.

12. **`sameAs` is incomplete.** `lib/site.ts` records, in a comment, that Jeff named LinkedIn on the 7 August review call but never sent the URL. The profile set is Facebook and Instagram only.

13. **Image- and animation-heavy templates are unmeasured.** The page carries large photography and scroll animation with no field Core Web Vitals data behind it.

## Implementation plan

### Phase 0 — supply the facts the site is missing (owner, 1–2 days)

1. Provide a public telephone number, or confirm that email-only contact is a deliberate policy.
2. Confirm whether San Marcos, Dripping Springs, Wimberley, or South Austin are genuinely served by mobile training.
3. Decide the Google Business Profile question: is there an eligible business address for a service-area profile with a hidden address?
4. Send the LinkedIn URL noted as outstanding in `lib/site.ts`, plus any other official profile.
5. Confirm which client outcomes in the Proof section have written permission, and what evidence supports them.
6. Confirm the kinesiology training and any certifications, with verification links where they exist.

**Gate:** no listing work, no city page, and no `published: true` flip happens before this is signed off.

### Phase 1 — hold the foundations in place (engineering) — **shipped**

Delivered in this release; see "What shipped" below.

### Phase 2 — make the business contactable and accountable (engineering + owner, 2–4 days)

1. Add `/contact` with the confirmed phone number, email, service area, and one booking path — and add `telephone` to the business node.
2. Add `/about-jeff-mensing` as a real practitioner page: training, credentials with verification links, scope, and approach. Point the `Person` node's `url` at it.
3. Add `/privacy` and `/terms`, and link them globally.
4. Complete `sameAs` once the profile URLs arrive.
5. Replace every `mailto:` CTA with the booking or contact flow, and track the click.

**Acceptance:** a prospect can reach Jeff by more than one route, and every credential shown on the site can be checked.

### Phase 3 — give each program its own destination (content + engineering, 1–2 weeks)

1. Create canonical program pages: `/programs/strong-start`, `/programs/personal-training`, `/programs/mobile-training`, `/programs/virtual-coaching`.
2. Each answers the primary intent in its first paragraph, names who it is and is not for, explains the RPMS method as it applies there, states how pricing and scheduling work, renders `COVERAGE_STATEMENT`, and offers one CTA.
3. **The mobile-training page is the strongest local asset in the set** — it is the one offer whose value is inherently geographic. Give it the real logistics: travel radius, what equipment Jeff brings, what a garage or home session needs, how scheduling works around traffic.
4. Add each page to `app/sitemap.ts`, and build hub-and-spoke internal links with descriptive anchors.
5. **Do not** create Buda and Kyle pages by swapping a city name. The mobile-training page already carries the geographic intent honestly, which is the difference between a useful local page and a doorway.

**Acceptance:** every program intent has one canonical URL; no near-duplicate page is indexed.

### Phase 4 — local profiles and genuine authority (owner + marketing, 2–6 weeks)

1. If eligible, create the service-area Google Business Profile with the approved name, category, hidden address, service area covering the confirmed cities, hours, and service list.
2. Keep one approved name, phone, email, and service-area record across Google, Bing Places, Apple Business Connect, Facebook, and Instagram.
3. Build Central Texas authority the way this business actually earns it: churches, schools, local sports programmes, and Hays County community organisations. A faith-first practice earns local authority through the community it already serves, not through directory volume.
4. Create a permission-based review process. Never gate reviews, solicit only positive ones, or mark testimonials up as an aggregate rating.

**Acceptance:** the controlled-profile inventory has no unresolved name, phone, email, or service-model conflict.

### Phase 5 — verify, measure, iterate (engineering, ongoing)

1. Run `npm run check:seo -- https://refineryfitness.biz` after deploy, and wire it into CI as a gate.
2. Confirm the `www` variant redirects to the apex in one hop.
3. Submit the sitemap in Google Search Console and Bing Webmaster Tools once the program pages are live.
4. Consider naming `OAI-SearchBot` explicitly in `app/robots.ts` for ChatGPT search visibility. The current blanket allow covers it, but naming it documents the intent. Treat `GPTBot` (model training) as a separate business decision.
5. Measure hero and LCP media with field Core Web Vitals — the page is image- and animation-heavy, and `@vercel/speed-insights` is already installed.
6. Record the baseline **before** the traffic from these changes arrives.

| Outcome | Measurement | Geography |
|---|---|---|
| Organic visibility | Search Console impressions, clicks, CTR, indexed/canonical coverage, landing pages for city and program queries | Buda, Kyle, Hays County (San Marcos once published) |
| Local visibility | Incognito and location-simulated checks for the fixed query set; Google Business Profile performance if eligible | One representative ZIP per city |
| Conversions | Free-intro enquiries, check-in submissions, CTA clicks, qualified consultations, source/UTM | All |
| Entity consistency | Monthly controlled-profile audit: name, phone, email, URL, service-area model | Site + Google + Facebook + Instagram + LinkedIn |
| AEO | Fixed prompt set: brand mention, citation URL, accuracy, referred sessions (including `utm_source=chatgpt.com`) | Central Texas and city prompts |
| Performance | Field Core Web Vitals by template via Speed Insights | All |

Initial query set — a tracking list, not promised rankings:

- `personal trainer Buda TX`, `gym Buda TX`
- `personal trainer Kyle TX`, `strength coach Kyle TX`
- `mobile personal trainer Buda`, `in home personal trainer Hays County`
- `faith based personal trainer Texas`, `Christian fitness coach Austin area`
- `online personal training Texas`, `virtual health coach Hays County`
- Brand queries: `Refinery Fitness of Buda`, `Jeff Mensing trainer`

Track the same queries, locations, and devices every time; record the date; distinguish organic results from map results.

## Release order and approval gates

```text
Owner supplies phone, service-area confirmation, profiles, and claim evidence
              ↓
Market model + smoke test holding the foundations (SHIPPED in this release)
              ↓
Contact, About, Privacy, Terms — make the business reachable
              ↓
Program pages + internal links (mobile training first)
              ↓
Google Business Profile decision + listing consistency + community authority
              ↓
Production verification, Search Console, AEO baseline, monthly iteration
```

## What shipped in this release

| File | Change |
|---|---|
| `lib/market.ts` | New. The geographic target model: tiers, publish gates, coverage statements, `areaServed`. |
| `lib/schema.ts` | `areaServed`, the business description, and the address locality now read the market model instead of literals. |
| `components/Footer.tsx` | The place strip renders `COVERAGE_SHORT` instead of a hard-coded string. |
| `app/layout.tsx` | Keywords generated from the published cities; web manifest declared. |
| `app/manifest.ts` | New. Icons resolve to real assets in `public/`. |
| `scripts/check-seo.mjs` | New. Rendered-metadata smoke test covering status, metadata, canonical, landmark structure, graph integrity including dangling `@id` references, and the discovery files. `npm run check:seo`. |
| `docs/` | This plan and the HTML implementation brief. |

## Sources consulted

- [Google Business Profile eligibility and guidelines](https://support.google.com/business/answer/3038177)
- [Google guidance on doorway abuse](https://developers.google.com/search/docs/essentials/spam-policies#doorway-abuse)
- [Google Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Google structured-data general policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Google canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google AI features and your website](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a)
- [Schema.org `areaServed`](https://schema.org/areaServed)
- [OpenAI publisher and developer FAQ](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq)

These are the references the recommendations rest on. The session's network policy blocked outbound fetches, so they are cited from the engagement's established source list rather than re-fetched on 9 September 2026.

## Dependencies the owner must supply

A public telephone number or a confirmed email-only policy; the service-area confirmation; the Google Business Profile eligibility decision; the outstanding LinkedIn and any other profile URLs; written permission and supporting evidence for the client outcomes; credential-verification links; and access or exports for Search Console, Google Business Profile, and analytics. Without these, implementation stops at truthful site architecture — which is where this release deliberately stops.
