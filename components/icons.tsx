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
