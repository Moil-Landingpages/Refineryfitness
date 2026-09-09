/**
 * The subpage hero: kicker, H1, lede, and an optional list of labelled facts.
 *
 * The facts are a definition list rather than prose because service area,
 * format, and what a session includes are details both a reader and a retrieval
 * crawler want as literal labelled values — a fragment lifted out of the page
 * still carries them.
 */
export default function PageHero({
  kicker,
  heading,
  lede,
  facts,
  actions,
}: {
  kicker: string;
  heading: React.ReactNode;
  lede: React.ReactNode;
  facts?: Array<[label: string, value: React.ReactNode]>;
  actions?: React.ReactNode;
}) {
  return <section className="page-hero">
    <div>
      <p className="kicker"><b /> {kicker}</p>
      <h1>{heading}</h1>
      <p className="page-lede">{lede}</p>
      {actions ? <div className="page-actions">{actions}</div> : null}
    </div>
    {facts?.length ? <dl className="page-facts">
      {facts.map(([label, value]) => <div key={label} style={{ display: "contents" }}>
        <dt>{label}</dt><dd>{value}</dd>
      </div>)}
    </dl> : null}
  </section>;
}
