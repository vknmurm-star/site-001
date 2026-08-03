import Link from "next/link";
import type { ArticleSummary } from "@/lib/articles";
import { formatDate } from "@/lib/format";
import { getCategory } from "@/lib/categories";
import ArticleCover from "./ArticleCover";
import CategoryPill from "./CategoryPill";

export default function ArticleCard({ article }: { article: ArticleSummary }) {
  const category = getCategory(article.category);
  if (!category) return null;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-shadow hover:shadow-lg hover:shadow-ink/5">
      <ArticleCover
        coverImage={article.coverImage}
        imageAlt={article.coverImageAlt}
        label={article.coverLabel}
        accent={category.accent}
        className="aspect-[4/3] w-full"
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      />
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <CategoryPill category={category} className="relative z-10 self-start" />
        <h3 className="font-heading text-xl leading-snug font-semibold">
          <Link
            href={`/articles/${article.slug}`}
            className="after:absolute after:inset-0"
          >
            {article.title}
          </Link>
        </h3>
        <p className="text-[15px] leading-relaxed text-ink-soft line-clamp-3">
          {article.description}
        </p>
        <div className="mt-auto flex items-center gap-3 pt-2 text-xs text-ink-soft">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{article.readingTimeMinutes} мин чтения</span>
        </div>
      </div>
    </article>
  );
}
