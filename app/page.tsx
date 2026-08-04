"use client";

import { useState } from "react";

const faqs = [
  ["Where do you train?", "Refinery Fitness serves Buda, Kyle, and Hays County. Training can happen at your home, in a garage gym, at a commercial gym, or virtually—depending on the plan that fits your life."],
  ["Is this only for people who are already fit?", "No. Strong Start is built for the person ready to begin again, build consistency, and be coached without intimidation or guesswork."],
  ["What is the RPMS Method?", "RPMS means Relational, Physical, Mental, and Spiritual. It is a whole-person coaching framework: better health should strengthen the way you live, not consume it."],
  ["What happens in an intro session?", "You will talk through your goals, your schedule, your training history, and the kind of support you need. Then you will leave with a clear next step—no pressure."],
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "HealthClub", name: "Refinery Fitness of Buda", description: "Faith-first, science-backed personal training and health coaching in Buda, Texas.", url: "https://refineryfitness.biz", email: "jeff@refineryfitness.biz", areaServed: ["Buda, TX", "Kyle, TX", "Hays County, TX"], priceRange: "$$", founder: { "@type": "Person", name: "Jeff Mensing", jobTitle: "Personal Trainer & Health Coach" }, sameAs: ["https://www.instagram.com/refineryfitnessofbuda/", "https://www.facebook.com/p/Refinery-Fitness-of-Buda-61576662147080/", "https://www.linkedin.com/in/jeffmensing/"] },
    { "@type": "FAQPage", mainEntity: faqs.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) },
  ],
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const questions = [
    ["Your biggest friction right now?", "I don’t have time", "I don’t know what to do", "I can’t stay consistent"],
    ["The support you want most?", "A plan that is mine", "Someone to check in", "Training that fits my values"],
    ["How do you want to train?", "In person", "At home / mobile", "Virtually"],
  ];
  const choose = (answer: string) => {
    setAnswers([...answers, answer]);
    setQuizStep(quizStep + 1);
  };
  const scrollTo = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <nav className="nav" aria-label="Main navigation">
        <a className="brand" href="#top" onClick={() => scrollTo("top")}><span>R</span> REFINERY <i>FITNESS · BUDA</i></a>
        <button className="menu" aria-expanded={menuOpen} aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>MENU</button>
        <div className={`navlinks ${menuOpen ? "open" : ""}`}>
          <button onClick={() => scrollTo("method")}>Method</button><button onClick={() => scrollTo("programs")}>Programs</button><button onClick={() => scrollTo("about")}>About</button><button onClick={() => scrollTo("faq")}>FAQ</button>
          <a className="nav-cta" href="mailto:jeff@refineryfitness.biz?subject=Free%20Intro%20Session">Book your intro</a>
        </div>
      </nav>

      <header id="top" className="hero">
        <div className="grid-noise" /><div className="orb orb-one" /><div className="orb orb-two" />
        <div className="hero-copy">
          <p className="eyebrow"><span /> Personal training · Buda, Texas</p>
          <h1>TRAIN WITH<br /><em>MORE</em> IN MIND.</h1>
          <p className="hero-lede">Faith-first, science-backed coaching for people who are done starting over. Build strength that carries into the rest of your life.</p>
          <div className="hero-actions"><a className="button primary" href="mailto:jeff@refineryfitness.biz?subject=Free%20Intro%20Session">Book a free intro <b>↗</b></a><button className="text-link" onClick={() => scrollTo("method")}>Explore the method <b>↓</b></button></div>
          <div className="trust"><span>BUDA · KYLE · HAYS COUNTY</span><span>IN PERSON + VIRTUAL</span></div>
        </div>
        <div className="hero-art" aria-label="Abstract illustration of strength and momentum"><div className="ring r1" /><div className="ring r2" /><div className="ring r3" /><div className="art-label top">THE WHOLE PERSON</div><div className="art-label bottom">REFINED / 01</div><div className="bar b1" /><div className="bar b2" /><div className="bar b3" /></div>
      </header>

      <section className="proof"><p>“No one is too far gone.”</p><div><span>RELATIONAL</span><span>PHYSICAL</span><span>MENTAL</span><span>SPIRITUAL</span></div></section>

      <section id="method" className="section method">
        <div className="section-head"><p className="eyebrow"><span /> THE RPMS METHOD</p><h2>YOUR BODY ISN’T<br />THE <em>WHOLE</em> STORY.</h2></div>
        <div className="method-intro"><p>More workouts won’t fix a life that has no margin. Refinery Fitness builds a practical plan around the four things that make change last.</p><a href="mailto:jeff@refineryfitness.biz?subject=Tell%20me%20about%20RPMS">Talk through your goals <b>↗</b></a></div>
        <div className="pillars">
          {[['01','Relational','Build a stronger life with people who help you show up.'],['02','Physical','Train intelligently. Fuel simply. Move with purpose.'],['03','Mental','Replace all-or-nothing with habits that hold.'],['04','Spiritual','Treat health as stewardship, not self-worship.']].map(([num,title,text]) => <article className="pillar" key={title}><span>{num}</span><h3>{title}</h3><p>{text}</p><i>↗</i></article>)}
        </div>
      </section>

      <section id="programs" className="section programs">
        <div className="program-header"><p className="eyebrow"><span /> START HERE</p><h2>CONSISTENCY,<br /><em>ENGINEERED.</em></h2><p>Choose the level of coaching that makes your next right step obvious.</p></div>
        <article className="featured-program"><div className="program-number">01</div><div><p className="tag">SIGNATURE PROGRAM</p><h3>STRONG START</h3><p className="program-copy">A coached reset for the person who wants a plan, accountability, and a foundation that will not disappear after a hard week.</p><ul><li>4 workouts each week</li><li>Weekly check-ins</li><li>Mindset + habit coaching</li></ul></div><a className="button light" href="mailto:jeff@refineryfitness.biz?subject=Strong%20Start%20Program">Ask about Strong Start <b>↗</b></a></article>
        <div className="program-list"><article><span>02</span><h3>1:1 COACHING</h3><p>Personal training built around your goals and real calendar.</p><a href="mailto:jeff@refineryfitness.biz?subject=1%3A1%20Coaching">Learn more ↗</a></article><article><span>03</span><h3>MOBILE TRAINING</h3><p>Expert coaching that comes to your home or garage gym.</p><a href="mailto:jeff@refineryfitness.biz?subject=Mobile%20Training">Learn more ↗</a></article><article><span>04</span><h3>VIRTUAL COACHING</h3><p>A clear plan and a coach in your corner—wherever you are.</p><a href="mailto:jeff@refineryfitness.biz?subject=Virtual%20Coaching">Learn more ↗</a></article></div>
      </section>

      <section className="section assessment"><div><p className="eyebrow"><span /> 90-SECOND CHECK-IN</p><h2>WHAT KIND OF<br /><em>SUPPORT</em> DO YOU NEED?</h2><p className="assessment-copy">Answer three quick questions. We’ll point you toward a better starting line.</p></div><div className="quiz">{quizStep < questions.length ? <><p className="quiz-count">0{quizStep + 1} / 03</p><h3>{questions[quizStep][0]}</h3>{questions[quizStep].slice(1).map((option) => <button key={option} onClick={() => choose(option)}>{option}<b>→</b></button>)}</> : <><p className="quiz-count">YOUR NEXT STEP</p><h3>You don’t need more noise. You need a plan.</h3><p>Let’s turn your answers into a simple starting point.</p><a className="button primary" href="mailto:jeff@refineryfitness.biz?subject=My%20RPMS%20Check-In">Get my recommendation <b>↗</b></a><button className="restart" onClick={() => { setQuizStep(0); setAnswers([]); }}>Start again</button></>}</div></section>

      <section id="about" className="section founder"><div className="portrait-card"><div className="portrait-mark">J<br />M</div><p>BUDA, TX<br />EST. 2025</p></div><div><p className="eyebrow"><span /> MEET YOUR COACH</p><h2>THE GOAL ISN’T<br />JUST <em>STRONGER.</em></h2><p className="founder-copy">Refinery Fitness was founded by Jeff Mensing to help people rebuild their mind, body, and soul—through relational coaching, intelligent training, and the belief that a healthier tomorrow is built one honest decision at a time.</p><p className="founder-note">Kinesiology-trained · Coaching in Buda, Kyle &amp; Hays County</p><a className="text-link" href="mailto:jeff@refineryfitness.biz?subject=Coaching%20Question">Meet Jeff in an intro session <b>↗</b></a></div></section>

      <section id="faq" className="section faq"><div className="section-head"><p className="eyebrow"><span /> CLEAR ANSWERS</p><h2>LET’S MAKE<br />THIS <em>SIMPLE.</em></h2></div><div className="faq-list">{faqs.map(([q,a], index) => <details key={q} open={index === 0}><summary>{q}<b>+</b></summary><p>{a}</p></details>)}</div></section>

      <section className="final-cta"><p className="eyebrow"><span /> YOUR NEXT REP</p><h2>BUILD A BODY.<br /><em>RECLAIM</em> YOUR LIFE.</h2><p>A free intro session is a conversation, not a commitment.</p><a className="button primary" href="mailto:jeff@refineryfitness.biz?subject=Free%20Intro%20Session">Book your free intro <b>↗</b></a></section>
      <footer><a className="brand" href="#top"><span>R</span> REFINERY <i>FITNESS · BUDA</i></a><p>Faith-first, science-backed personal training and health coaching.</p><a href="mailto:jeff@refineryfitness.biz">jeff@refineryfitness.biz</a><p className="fine">Serving Buda, Kyle &amp; Hays County, Texas · © {new Date().getFullYear()} Refinery Fitness</p></footer>
      <a className="mobile-cta" href="mailto:jeff@refineryfitness.biz?subject=Free%20Intro%20Session">BOOK FREE INTRO <b>↗</b></a>
    </main>
  );
}
