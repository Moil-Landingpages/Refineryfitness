# Hero video

Drop the Higgsfield-generated hero loop here as `hero-loop.mp4`.

Target spec:
- 1920×1080 (or 1440×810), H.264 MP4, no audio track
- 6–10 second seamless loop, under ~4 MB (run through HandBrake or `ffmpeg -crf 28` if larger)
- Dark/moody grade so the cream headline stays readable over it

The site works without this file — the hero automatically falls back to
`/images/refinery-hero.png` until the video exists.
