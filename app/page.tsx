"use client";

import { useState } from "react";

const programs = [
  { id: "strong", number: "01", label: "Signature reset", name: "Strong Start", line: "Build the system before you chase the result.", copy: "Four weekly workouts, habit coaching, and a standing check-in make your next right decision obvious.", includes: ["4 workouts every week", "Weekly coaching check-in", "Mindset + habit system"], action: "Ask about Strong Start" },
  { id: "one", number: "02", label: "High-touch coaching", name: "1:1 Training", line: "A program built around your life, not the other way around.", copy: "Train in person with coaching that meets your goals, schedule, experience, and the season you are in.", includes: ["Personalized training plan", "In-person movement coaching", "Accountability that adapts"], action: "Explore 1:1 coaching" },
  { id: "mobile", number: "03", label: "Buda + Kyle", name: "Mobile Training", line: "Exceptional coaching, right where life happens.", copy: "Bring the focus of a thoughtful training session to your home, garage gym, or preferred local setting.", includes: ["At-home or garage-gym sessions", "Buda, Kyle + Hays County", "Built for busy schedules"], action: "Ask about mobile training" },
];

const faqs = [
  ["Who is Refinery Fitness for?", "For people who want a practical, values-aligned way to get strong, feel capable, and stay consistent. You do not need to be fit to begin."],
  ["Where do sessions happen?", "Refinery Fitness serves Buda, Kyle, and Hays County with in-person, mobile, and virtual options. The best setting depends on your plan and schedule."],
  ["What makes the RPMS Method different?", "It treats lasting health as relational, physical, mental, and spiritual. Training is designed to strengthen the rest of your life—not take it over."],
  ["What happens in a free intro?", "It is a clear, no-pressure conversation about what you want to change, what has gotten in the way, and the best next step."],
];

const schema = { "@context": "https://schema.org", "@graph": [
  { "@type": "HealthClub", name: "Refinery Fitness of Buda", description: "Faith-first, science-backed personal training and health coaching in Buda, Texas.", url: "https://refineryfitness.biz", email: "jeff@refineryfitness.biz", priceRange: "$$", areaServed: ["Buda, TX", "Kyle, TX", "Hays County, TX"], founder: { "@type": "Person", name: "Jeff Mensing", jobTitle: "Personal Trainer & Health Coach" }, sameAs: ["https://www.instagram.com/refineryfitnessofbuda/", "https://www.facebook.com/p/Refinery-Fitness-of-Buda-61576662147080/"] },
  { "@type": "FAQPage", mainEntity: faqs.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) }
] };

export default function Home() {
  const [activeProgram, setActiveProgram] = useState(0);
  const [answer, setAnswer] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const program = programs[activeProgram];
  const next = () => setAnswer((n) => n + 1);
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <nav><a className="logo" href="#top"><b>R</b><span>REFINERY</span><i>FITNESS / BUDA</i></a><div className="nav-links"><a href="#method">Method</a><a href="#programs">Programs</a><a href="#about">Story</a></div><a className="nav-book" href="mailto:jeff@refineryfitness.biz?subject=Free%20Intro%20Session">Book an intro <em>↗</em></a></nav>

    <header className="hero" id="top"><div className="hero-image" /><div className="hero-shade" /><div className="hero-grid" /><div className="hero-copy"><p className="kicker"><b /> PERSONAL TRAINING · BUDA, TEXAS</p><h1>MORE THAN<br /><strong>MOTION.</strong></h1><p className="hero-summary">Science-backed coaching for people who are ready to become strong enough for the life they are called to live.</p><div className="hero-actions"><a className="button lime" href="mailto:jeff@refineryfitness.biz?subject=Free%20Intro%20Session">Book your free intro <span>↗</span></a><a className="watch" href="#method"><i>↓</i> See what makes this different</a></div></div><div className="hero-meta"><span>BUDA · KYLE · HAYS COUNTY</span><span>IN PERSON / MOBILE / VIRTUAL</span></div><div className="hero-scroll">SCROLL TO BUILD <b>↓</b></div></header>

    <section className="marquee" aria-label="Refinery Fitness values"><div>RELATIONAL <i>✦</i> PHYSICAL <i>✦</i> MENTAL <i>✦</i> SPIRITUAL <i>✦</i> RELATIONAL <i>✦</i> PHYSICAL <i>✦</i> MENTAL <i>✦</i> SPIRITUAL <i>✦</i></div></section>

    <section className="intro section" id="method"><div className="intro-head"><p className="kicker dark"><b /> THE RPMS METHOD</p><h2>THE BODY IS<br />PART OF THE<br /><em>STORY.</em></h2></div><div className="intro-copy"><p>Most programs ask, <strong>“How hard can you go?”</strong> We start somewhere better: <strong>“What would it look like to become whole?”</strong></p><p>The RPMS Method helps you train the physical, without ignoring the relational, mental, and spiritual habits that make progress stick.</p><a className="under-link" href="mailto:jeff@refineryfitness.biz?subject=The%20RPMS%20Method">Talk through the RPMS Method <span>↗</span></a></div><div className="method-map">{[["R","Relational","Coaching that makes room for real life."],["P","Physical","Strength and nutrition with a clear why."],["M","Mental","Habits that survive your hardest week."],["S","Spiritual","Health as stewardship—not self-worship."]].map(([letter,title,copy]) => <article key={letter}><span>{letter}</span><h3>{title}</h3><p>{copy}</p><i>0{["R","P","M","S"].indexOf(letter)+1}</i></article>)}</div></section>

    <section className="visual-break"><div className="photo-coaching" /><div className="visual-quote"><p>“The work is physical.<br />The <em>change</em> is bigger.”</p><span>REFINERY FITNESS / THE WHOLE PERSON</span></div></section>

    <section className="programs section" id="programs"><div className="program-title"><p className="kicker dark"><b /> FIND YOUR START</p><h2>DON’T JUST<br />START.<br /><em>STAY WITH IT.</em></h2><p>A pathway for your schedule. A system for your life.</p></div><div className="program-console"><div className="program-tabs">{programs.map((item, index) => <button key={item.id} className={activeProgram === index ? "active" : ""} onClick={() => setActiveProgram(index)}><small>{item.number}</small>{item.name}<span>↗</span></button>)}</div><div className="program-detail"><div><p className="program-label">{program.label}</p><h3>{program.name}</h3><p className="program-line">{program.line}</p><p className="program-copy">{program.copy}</p><a className="button orange" href={`mailto:jeff@refineryfitness.biz?subject=${encodeURIComponent(program.action)}`}>{program.action} <span>↗</span></a></div><ul>{program.includes.map((item) => <li key={item}><b>+</b>{item}</li>)}</ul><div className="program-index">0{activeProgram+1}<i>/</i>03</div></div></div></section>

    <section className="assessment"><div className="assessment-copy"><p className="kicker"><b /> 90-SECOND CHECK-IN</p><h2>WHAT WOULD<br />MAKE YOU<br /><em>UNSTOPPABLE?</em></h2><p>There is no perfect plan. There is a next right step. Find yours.</p></div><div className="check-in">{answer < 3 ? <><p className="step">0{answer+1} <span>/ 03</span></p><h3>{["What usually ends a good routine?", "What kind of support would change the game?", "Where does training need to fit?"][answer]}</h3><div className="choices">{[["Time gets away from me", "I do not know what to do", "I lose momentum"],["A plan built for me", "Someone who checks in", "Training that fits my values"],["In person", "At home / mobile", "Virtually"]][answer].map((item) => <button onClick={next} key={item}>{item}<b>→</b></button>)}</div></> : <><p className="step">YOUR DIRECTION</p><h3>A plan is waiting on the other side of one honest conversation.</h3><p>Let’s turn what is getting in your way into your way forward.</p><a className="button lime" href="mailto:jeff@refineryfitness.biz?subject=My%20Refinery%20Check-In">Get my recommendation <span>↗</span></a><button className="reset" onClick={() => setAnswer(0)}>Start over</button></>}</div></section>

    <section className="proof section" id="about"><div><p className="kicker dark"><b /> A DIFFERENT KIND OF COACHING</p><h2>YOU’RE NOT<br />BEHIND.<br />YOU’RE <em>HERE.</em></h2></div><div className="proof-story"><p>Refinery Fitness is built for the person tired of fitness culture that demands more than life can give. Jeff Mensing brings a Kinesiology-trained, faith-first approach to strength, health, and confidence—without the noise or the guilt.</p><p className="proof-note">NO ONE IS TOO FAR GONE.</p><a className="under-link" href="mailto:jeff@refineryfitness.biz?subject=Meet%20Jeff">Meet Jeff in a free intro <span>↗</span></a></div><div className="result-card"><span>REAL PROGRESS<br />NOT EMPTY PROMISES</span><p><strong>+5 LB</strong> lean muscle<br /><strong>−4%</strong> body fat</p><small>Documented client result over approximately four months.</small></div></section>

    <section className="faq section"><div><p className="kicker"><b /> CLEAR ANSWERS</p><h2>LESS<br />GUESSING.<br /><em>MORE GOING.</em></h2></div><div className="faq-list">{faqs.map(([question, response], index) => <article className={openFaq === index ? "open" : ""} key={question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>0{index+1}</span>{question}<b>{openFaq === index ? "−" : "+"}</b></button><div><p>{response}</p></div></article>)}</div></section>

    <section className="final"><p className="kicker dark"><b /> YOUR NEXT REP</p><h2>BUILD A BODY.<br /><em>RECLAIM</em> YOUR LIFE.</h2><p>A free intro is a conversation—not a commitment.</p><a className="button dark-button" href="mailto:jeff@refineryfitness.biz?subject=Free%20Intro%20Session">Book your free intro <span>↗</span></a></section>
    <footer><a className="logo" href="#top"><b>R</b><span>REFINERY</span><i>FITNESS / BUDA</i></a><p>Faith-first, science-backed personal training &amp; health coaching.</p><a href="mailto:jeff@refineryfitness.biz">jeff@refineryfitness.biz</a><small>BUDA · KYLE · HAYS COUNTY · TEXAS</small></footer><a className="mobile-book" href="mailto:jeff@refineryfitness.biz?subject=Free%20Intro%20Session">BOOK FREE INTRO <b>↗</b></a>
  </main>;
}
