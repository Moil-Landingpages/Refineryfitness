import Image from "next/image";

/** Flame-and-wordmark lockup from public/logo.png (white text — meant for the
 *  dark nav, footer, and email masthead). Rendered at a fixed height with
 *  width derived from the artwork's 1563x467 aspect so it never distorts. */
export default function Logo({ height = 38 }: { height?: number }) {
  return (
    <Image
      className="logo-svg"
      src="/logo.png"
      alt="Refinery Fitness of Buda"
      width={Math.round((height * 1563) / 467)}
      height={height}
      priority
    />
  );
}
