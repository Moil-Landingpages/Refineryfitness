/**
 * The training programs, in the order they appear in the console.
 *
 * They read as a widening radius — a fixed starting program, then in person,
 * then mobile across Hays County, then anywhere at all. Virtual sits last
 * because it is the only one with no geography attached.
 */
export const programs = [
  { id: "strong", number: "01", label: "Signature reset", name: "Strong Start", line: "Build the system before you chase the result.", copy: "Four weekly workouts, habit coaching, and a standing check-in make your next right decision obvious.", includes: ["4 workouts every week", "Weekly coaching check-in", "Mindset + habit system"], action: "Ask about Strong Start" },
  { id: "one", number: "02", label: "High-touch coaching", name: "1:1 Training", line: "A program built around your life, not the other way around.", copy: "Train in person with coaching that meets your goals, schedule, experience, and the season you are in.", includes: ["Personalized training plan", "In-person movement coaching", "Accountability that adapts"], action: "Explore 1:1 coaching" },
  { id: "mobile", number: "03", label: "Buda + Kyle", name: "Mobile Training", line: "Exceptional coaching, right where life happens.", copy: "Bring the focus of a thoughtful training session to your home, garage gym, or preferred local setting.", includes: ["At-home or garage-gym sessions", "Buda, Kyle + Hays County", "Built for busy schedules"], action: "Ask about mobile training" },
  // TODO: Jeff to confirm whether virtual includes a written plan between calls —
  // that decides the third line below.
  { id: "virtual", number: "04", label: "Anywhere you are", name: "Virtual Coaching", line: "The same coach, on a schedule that travels with you.", copy: "One-on-one training and health coaching over video, for anyone outside Hays County or working around a schedule that will not sit still.", includes: ["Live 1:1 video sessions", "Form review from your own space", "Health + fitness coaching between calls"], action: "Ask about virtual coaching" },
];
