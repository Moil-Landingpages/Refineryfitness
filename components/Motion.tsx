"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export default function Motion() {
  useGSAP((_, contextSafe) => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      ScrollTrigger.create({ start: "top -120", onToggle: (self) => document.querySelector("nav")?.classList.toggle("scrolled", self.isActive) });

      // Ambient hero: continuous slow zoom + drifting chalk-dust field, so the
      // hero feels alive even while the video file doesn't exist.
      gsap.fromTo(".hero-media", { scale: 1.12 }, { scale: 1.03, duration: 16, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.utils.toArray<HTMLElement>(".dust span").forEach((d) => {
        gsap.to(d, {
          x: () => gsap.utils.random(-80, 80),
          y: () => gsap.utils.random(-120, -30),
          opacity: () => gsap.utils.random(0.05, 0.45),
          duration: () => gsap.utils.random(6, 14),
          delay: gsap.utils.random(0, 5),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, { y: 44, autoAlpha: 0, duration: 0.85, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
        gsap.from(group.children, { y: 44, autoAlpha: 0, duration: 0.7, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: group, start: "top 82%" } });
      });

      gsap.fromTo(".photo-coaching", { yPercent: -6, scale: 1.12 }, { yPercent: 6, scale: 1.12, ease: "none", scrollTrigger: { trigger: ".visual-break", start: "top bottom", end: "bottom top", scrub: true } });

      // Text effects need final metrics, so split only after fonts are in.
      document.fonts.ready.then(contextSafe!(() => {
        const h1 = new SplitText(".hero h1", { type: "chars", mask: "chars" });
        gsap.timeline({ defaults: { ease: "power3.out" } })
          .from(".hero-copy .kicker", { y: 26, autoAlpha: 0, duration: 0.6 }, 0.1)
          .from(h1.chars, { yPercent: 120, duration: 0.85, stagger: 0.03, ease: "power4.out" }, "-=0.3")
          .from(".hero-summary", { y: 30, autoAlpha: 0, duration: 0.7 }, "-=0.5")
          .from(".hero-actions", { y: 24, autoAlpha: 0, duration: 0.6 }, "-=0.45")
          .from([".hero-meta", ".hero-scroll"], { autoAlpha: 0, duration: 0.8 }, "-=0.3");

        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          const split = new SplitText(el, { type: "words", mask: "words" });
          gsap.from(split.words, { yPercent: 115, duration: 0.75, stagger: 0.07, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } });
        });
      }));
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      document.querySelector<HTMLVideoElement>(".hero-video")?.pause();
    });
  });

  return null;
}
