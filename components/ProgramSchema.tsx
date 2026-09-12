import { SITE_URL } from "@/lib/site";
import { absolute } from "@/lib/pages";
import { areaServed } from "@/lib/market";

/**
 * `Service` markup for one program page.
 *
 * The provider points at the same `@id` the graph in lib/schema.ts defines, so
 * an engine reads one business offering several programs rather than several
 * unrelated ones. No price is published — none is stated anywhere on the site,
 * and inventing one here would be a claim the business has not made.
 */
export default function ProgramSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absolute(path)}#service`,
    name,
    description,
    serviceType: name,
    url: absolute(path),
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed,
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
