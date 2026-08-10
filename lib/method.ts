/**
 * The four halves of the RPMS Method.
 *
 * `copy` is the single line on the card face. `detail` and `practice` only
 * appear once the card is turned over, which is what Jeff asked for on the
 * 7 Aug review call: "click on it, then you could flip over and have some
 * verbiage that talks about the relational."
 *
 * TODO — Jeff owes us his own write-ups for all four pillars. `detail` and
 * `practice` below are drafted in the site's voice as a stand-in so the
 * interaction could be designed and approved; they are not meant to survive.
 * When his copy lands, replace those two fields here and nothing else changes.
 */

export type Pillar = {
  letter: string;
  title: string;
  copy: string;
  detail: [string, string];
  practice: string[];
  src: string;
  alt: string;
};

export const pillars: Pillar[] = [
  {
    letter: "R",
    title: "Relational",
    copy: "Coaching that makes room for real life.",
    detail: [
      "Nobody gets strong in isolation. The people around you either make the work sustainable or quietly undo it, and most programs never mention them.",
      "Relational means training built to fit the life you already share—and a coach who knows the difference between a hard week and a lost one.",
    ],
    practice: ["A coach who notices when you go quiet", "Training that flexes around family and work", "Progress you can keep without disappearing"],
    src: "/images/refinery-rpms-relational.jpg",
    alt: "Jeff Mensing standing shoulder to shoulder with a training partner on the gym floor",
  },
  {
    letter: "P",
    title: "Physical",
    copy: "Strength and nutrition with a clear why.",
    detail: [
      "The part everyone expects: lifting, moving, eating in a way that holds up. Kinesiology-trained programming, scaled to where you actually are.",
      "The difference is that the work has a reason behind it. You will know what a movement is building toward, and what it changes outside the gym.",
    ],
    practice: ["Programming matched to your experience", "Nutrition you can keep on a normal week", "Form coaching, not just a workout list"],
    src: "/images/refinery-cable-work.jpg",
    alt: "A client pulling through a cable crossover rep on the gym floor",
  },
  {
    letter: "M",
    title: "Mental",
    copy: "Habits that survive your hardest week.",
    detail: [
      "Motivation is not a plan. What carries people through month four is habits small enough to survive a bad week and clear enough to make the next decision obvious.",
      "Mental means building that system on purpose, so consistency stops depending on how you feel when the alarm goes off.",
    ],
    practice: ["A standing weekly check-in", "Habits sized to the week you actually have", "A restart that doesn’t cost you a month"],
    src: "/images/refinery-rpms-mental.jpg",
    alt: "Jeff Mensing set and focused between sets on the gym floor",
  },
  {
    letter: "S",
    title: "Spiritual",
    copy: "Health as stewardship—not self-worship.",
    detail: [
      "Fitness culture asks the body to carry meaning it was never built to hold. Refinery starts elsewhere: your body is worth caring for because it was given to you.",
      "Spiritual means training as stewardship. It takes the shame out of starting late—and it is offered, never imposed.",
    ],
    practice: ["Faith-first coaching, offered not imposed", "No guilt about the years you didn’t train", "A reason to keep going that isn’t the mirror"],
    src: "/images/refinery-rpms-spiritual.jpg",
    alt: "Jeff Mensing and a client sitting with open Bibles in the garage gym",
  },
];
