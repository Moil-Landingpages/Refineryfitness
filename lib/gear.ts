/**
 * The gear Jeff recommends, with his Amazon Associates links.
 *
 * Two rules govern this list and both are load-bearing:
 *
 * 1. **Every link is `rel="sponsored"`.** These are paid affiliate links, and
 *    Google requires them to be qualified as such. `nofollow` rides along so no
 *    ranking signal is passed to the merchant either way.
 * 2. **No claims.** The client supplied product names and links, nothing more.
 *    Nothing here says what a supplement does, and nothing should be added that
 *    does without Jeff's own words behind it — this is a fitness site, and an
 *    invented benefit claim is the kind of statement the audit exists to keep
 *    off the site.
 *
 * `vendor` is shown so a visitor knows where the link goes before clicking.
 */
export type GearItem = {
  name: string;
  vendor: string;
  url: string;
};

export const gear: GearItem[] = [
  { name: "Amazon Basics Creatine", vendor: "Amazon Basics", url: "https://amzn.to/3PKArpA" },
  { name: "Amazon Basics Collagen", vendor: "Amazon Basics", url: "https://amzn.to/4nVf9T3" },
  { name: "Grass-Fed Whey Protein Isolate", vendor: "Transparent Labs", url: "https://amzn.to/4nHw9vW" },
  { name: "Energy Drink", vendor: "Gorilla Mind", url: "https://amzn.to/49alXWz" },
  { name: "Nitric Stimulant-Free Pre-Workout", vendor: "Gorilla Mode", url: "https://amzn.to/49amacj" },
];

/** The disclosure the FTC requires, in one place so every use says the same thing. */
export const AFFILIATE_DISCLOSURE =
  "Some links on this page are affiliate links. As an Amazon Associate, Refinery Fitness earns from qualifying purchases — at no extra cost to you.";
