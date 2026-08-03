"use client";

import { useMemo, useState } from "react";
import ArticleCard from "./ArticleCard";
import type { ArticleSummary } from "@/lib/articles";
import { categories } from "@/lib/categories";

export default function SearchClient({
  articles,
  initialQuery = "",
}: {
  articles: ArticleSummary[];
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    return articles.filter((a) => {
      const matchesCategory = activeCategory ? a.category === activeCategory : true;
      if (!matchesCategory) return false;
      if (!q) return true;

      const haystack = [a.title, ...a.tags].join(" ").toLowerCase();
      return haystack.includes(q);
    });
  }, [articles, query, activeCategory]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <label htmlFor="article-search" className="sr-only">
          Поиск по статьям
        </label>
        <input
          id="article-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Например: ретинол, гардероб, брови…"
          className="w-full rounded-full border border-line bg-surface px-5 py-3 text-base text-ink placeholder:text-ink-soft/70 focus-visible:border-clay sm:max-w-md"
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            activeCategory === null
              ? "bg-clay text-cream"
              : "border border-line text-ink-soft hover:text-ink"
          }`}
        >
          Все темы
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => setActiveCategory(c.slug)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === c.slug
                ? "bg-clay text-cream"
                : "border border-line text-ink-soft hover:text-ink"
            }`}
          >
            {c.shortTitle}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-ink-soft" aria-live="polite">
        {results.length === 0
          ? "Ничего не нашлось — попробуйте другой запрос."
          : `Найдено статей: ${results.length}`}
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}
