/**
 * The 90-second check-in questions.
 *
 * Shared by the component that asks them and the API route that emails the
 * answers, so the two cannot drift: the browser posts the *indices* it picked
 * and the server rebuilds the question text from this list, which also means a
 * caller cannot invent an answer that was never offered.
 */
export const CHECK_IN_STEPS = [
  {
    short: "What ends a good routine",
    question: "What usually ends a good routine?",
    choices: ["Time gets away from me", "I do not know what to do", "I lose momentum"],
  },
  {
    short: "Support that would change the game",
    question: "What kind of support would change the game?",
    choices: ["A plan built for me", "Someone who checks in", "Training that fits my values"],
  },
  {
    short: "Where training needs to fit",
    question: "Where does training need to fit?",
    choices: ["In person", "At home / mobile", "Virtually"],
  },
] as const;
