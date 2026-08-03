import type { Metadata } from "next";
import Container from "@/components/Container";
import SearchClient from "@/components/SearchClient";
import { getAllArticles, toSummary } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Поиск по статьям",
  description: "Найдите статьи по заголовку, теме или тегу.",
  alternates: { canonical: "/search" },
  robots: {
    index: false,
    follow: true,
  },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const summaries = getAllArticles().map(toSummary);

  return (
    <section className="py-14 sm:py-20">
      <Container>
        <p className="text-sm font-semibold uppercase tracking-widest text-clay-dark">
          Поиск
        </p>
        <h1 className="mt-3 font-heading text-4xl font-semibold sm:text-5xl">
          Найдите то, что сейчас нужно
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">
          Ищите по заголовку или ключевому слову, либо отфильтруйте по теме.
        </p>

        <div className="mt-10">
          <SearchClient articles={summaries} initialQuery={q ?? ""} />
        </div>
      </Container>
    </section>
  );
}
