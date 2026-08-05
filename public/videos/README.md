# Hero video (optional, currently disabled)

The hero is a static photo with GSAP ambient motion (slow zoom, dust
particles, grain). If a video loop is ever produced (e.g. via Higgsfield),
drop it here as `hero-loop.mp4` and re-add the element inside
`.hero-media` in `components/Hero.tsx` (which must become a client
component again to handle `onError` fallback):

```tsx
<video className="hero-video" src="/videos/hero-loop.mp4" poster="/images/refinery-hero.jpg"
  autoPlay muted loop playsInline preload="metadata" tabIndex={-1}
  onError={() => setVideoOk(false)} />
```

Target spec:
- 1920×1080 (or 1440×810), H.264 MP4, no audio track
- 6–10 second seamless loop, under ~4 MB (`ffmpeg -an -crf 28 -movflags +faststart`)
- Dark/moody grade so the cream headline stays readable over it
