import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Crawler policy.
 *
 * Three groups of agent, decided separately — see the "being read correctly by
 * Google and by AI assistants" section of `docs/seo-developer-plan.md`.
 *
 *  1. Search crawlers (Googlebot, Bingbot, Applebot) feed Google, Copilot, and
 *     Siri. Allowed.
 *  2. AI retrieval crawlers fetch a page to answer a question a user is asking
 *     right now, and are how the business gets named and linked in an answer.
 *     Allowed, and named explicitly below.
 *  3. Model-training crawlers (GPTBot, ClaudeBot, Google-Extended, CCBot,
 *     Applebot-Extended) govern whether the content trains future models. That
 *     is a business decision with no effect on being cited today, so no rule is
 *     written for them here — the blanket allow covers them until the owner
 *     decides otherwise.
 *
 * The `*` rule already permits every agent, so naming groups 1 and 2 changes no
 * behaviour. It records the intent, so a later edit cannot quietly remove
 * citation access without someone noticing in review.
 *
 * robots.txt is not the only gate: a CDN or WAF bot rule will return 403 to
 * these agents regardless of what this file says. Verify at the edge with the
 * user-agent loop in the developer plan.
 */
const AI_SEARCH_AGENTS = [
  // OpenAI: search index, and fetches on a user's behalf.
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic: search index, and fetches on a user's behalf.
  "Claude-SearchBot",
  "Claude-User",
  // Perplexity.
  "PerplexityBot",
  "Perplexity-User",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: ["Googlebot", "Bingbot", "Applebot"], allow: "/" },
      { userAgent: AI_SEARCH_AGENTS, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
