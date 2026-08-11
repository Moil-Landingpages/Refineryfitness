type IconProps = { size?: number };

const base = { fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "square" as const, "aria-hidden": true };

export const ArrowUpRight = ({ size = 15 }: IconProps) => (
  <svg {...base} width={size} height={size} viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9" /></svg>
);

export const ArrowRight = ({ size = 15 }: IconProps) => (
  <svg {...base} width={size} height={size} viewBox="0 0 24 24"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
);

export const ArrowLeft = ({ size = 15 }: IconProps) => (
  <svg {...base} width={size} height={size} viewBox="0 0 24 24"><path d="M20 12H5M11 6l-6 6 6 6" /></svg>
);

export const ArrowDown = ({ size = 15 }: IconProps) => (
  <svg {...base} width={size} height={size} viewBox="0 0 24 24"><path d="M12 4v15M6 13l6 6 6-6" /></svg>
);

export const Plus = ({ size = 15 }: IconProps) => (
  <svg {...base} width={size} height={size} viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>
);

export const Minus = ({ size = 15 }: IconProps) => (
  <svg {...base} width={size} height={size} viewBox="0 0 24 24"><path d="M5 12h14" /></svg>
);

export const Close = ({ size = 15 }: IconProps) => (
  <svg {...base} width={size} height={size} viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18" /></svg>
);

/** Turn-over arrows, for the RPMS cards. */
export const Flip = ({ size = 15 }: IconProps) => (
  <svg {...base} width={size} height={size} viewBox="0 0 24 24"><path d="M20 11a8 8 0 0 0-13.7-5.3L4 8M4 13a8 8 0 0 0 13.7 5.3L20 16M4 4v4h4M20 20v-4h-4" /></svg>
);

export const Dumbbell = ({ size = 15 }: IconProps) => (
  <svg {...base} strokeWidth={1.9} width={size} height={size} viewBox="0 0 24 24"><path d="M4 9.5v5M7.2 6.5v11M16.8 6.5v11M20 9.5v5M7.2 12h9.6" /></svg>
);

export const Person = ({ size = 15 }: IconProps) => (
  <svg {...base} strokeWidth={1.9} strokeLinecap="round" width={size} height={size} viewBox="0 0 24 24"><circle cx="12" cy="8.2" r="3.4" /><path d="M5.4 19.5c0-3.5 2.9-5.9 6.6-5.9s6.6 2.4 6.6 5.9" /></svg>
);

/** Chosen per break section by name, so page.tsx stays free of imports. */
export const BREAK_ICONS: Record<string, (props: IconProps) => React.ReactElement> = {
  dumbbell: Dumbbell,
  person: Person,
};

/** Brand glyphs are solid marks rather than strokes, so they skip `base`. */
const solid = { fill: "currentColor", "aria-hidden": true } as const;

export const Facebook = ({ size = 16 }: IconProps) => (
  <svg {...solid} width={size} height={size} viewBox="0 0 24 24"><path d="M14 8.5V7c0-.7.3-1 1-1h1.8V3.2h-2.5C11.5 3.2 11 5 11 6.7v1.8H9V11h2v9.8h3V11h2.3l.4-2.5H14Z" /></svg>
);

export const Instagram = ({ size = 16 }: IconProps) => (
  <svg {...solid} width={size} height={size} viewBox="0 0 24 24"><path d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm4 2.6a4.4 4.4 0 1 1 0 8.8 4.4 4.4 0 0 1 0-8.8Zm0 2a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8Zm4.7-2.9a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" /></svg>
);

/** Keyed by `SOCIALS[].id`, so the footer renders whatever lib/site.ts lists. */
export const SOCIAL_ICONS: Record<string, (props: IconProps) => React.ReactElement> = {
  facebook: Facebook,
  instagram: Instagram,
};
