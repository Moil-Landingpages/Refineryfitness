import Link from "next/link";
import { absolute, trail } from "@/lib/pages";

/**
 * The visible breadcrumb trail and its `BreadcrumbList` markup, emitted
 * together from one source so the two can never disagree — the condition
 * Google states for breadcrumb structured data.
 */
export default function Breadcrumbs({ path }: { path: string }) {
  const crumbs = trail(path);

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absolute(crumb.path),
    })),
  };

  return (
    <>
      <nav className="crumbs" aria-label="Breadcrumb">
        <ol>
          {crumbs.map((crumb, index) => (
            <li key={crumb.path}>
              {index === crumbs.length - 1
                ? <span aria-current="page">{crumb.name}</span>
                : <Link href={crumb.path}>{crumb.name}</Link>}
            </li>
          ))}
        </ol>
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
