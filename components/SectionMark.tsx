/**
 * The decorative furniture the visual breaks introduced, shared by every
 * section between the hero and the closing CTA.
 *
 * Both pieces are absolutely positioned inside the section and sit in its
 * horizontal padding, so adding one never moves the content it decorates. The
 * numeral runs as a single sequence down the whole page — the breaks are part
 * of it, which is why they read 02 and 07 rather than 01 and 02.
 *
 * `tone` follows the ground rather than the brand: orange on the cream and soft
 * sections, lime on the ink ones, which is the accent logic the site already
 * uses for its kickers.
 */
export default function SectionMark({
  index,
  side = "right",
  tone = "light",
}: {
  index: string;
  side?: "left" | "right";
  tone?: "light" | "dark";
}) {
  return <span className={`sec-mark sec-${side} sec-${tone}`} aria-hidden="true">
    {/* The marker is a real element, not a ::after, so the scroll flow in
        Motion can animate it down the rail as the section passes through. */}
    <span className="sec-rail"><i className="rail-mark" /></span>
    <span className="sec-index">{index}</span>
  </span>;
}
