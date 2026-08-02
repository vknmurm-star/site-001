import type { Heading } from "@/lib/articles";

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  if (headings.length === 0) return null;

  return (
    <nav aria-label="Оглавление статьи" className="rounded-2xl border border-line bg-surface p-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
        В этой статье
      </p>
      <ul className="mt-4 space-y-2 text-sm">
        {headings.map((h) => (
          <li key={h.id} className={h.depth === 3 ? "pl-4" : ""}>
            <a
              href={`#${h.id}`}
              className="text-ink-soft hover:text-clay-dark hover:underline"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
