import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import Container from "@/components/Container";
import CategoryPill from "@/components/CategoryPill";
import CoverPlaceholder from "@/components/CoverPlaceholder";
import TableOfContents from "@/components/TableOfContents";
import ArticleCard from "@/components/ArticleCard";
import {
  extractHeadings,
  formatDate,
  getAllArticles,
  getArticleBySlug,
} from "@/lib/articles";
import { getCategory } from "@/lib/categories";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      publishedTime: article.date,
      tags: article.tags,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const category = getCategory(article.category);
  if (!category) notFound();

  const headings = extractHeadings(article.content);

  const related = getAllArticles()
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    articleSection: category.title,
    keywords: article.tags.join(", "),
    author: {
      "@type": "Organization",
      name: "Зрелая красота",
    },
  };

  return (
    <article className="py-12 sm:py-16">
      <Container className="max-w-3xl">
        <CategoryPill category={category} />
        <h1 className="mt-4 font-heading text-3xl font-semibold leading-tight sm:text-4xl">
          {article.title}
        </h1>
        <p className="mt-4 text-lg text-ink-soft">{article.description}</p>
        <div className="mt-5 flex items-center gap-3 text-sm text-ink-soft">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{article.readingTimeMinutes} мин чтения</span>
        </div>

        <CoverPlaceholder
          label={article.coverLabel}
          accent={category.accent}
          className="mt-8 aspect-[16/9] w-full"
        />
      </Container>

      <Container className="mt-10 grid max-w-5xl gap-10 lg:grid-cols-[1fr_260px] lg:items-start">
        <div className="prose-article max-w-3xl">
          <MDXRemote
            source={article.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug],
              },
            }}
          />
        </div>

        <aside className="lg:sticky lg:top-28">
          <TableOfContents headings={headings} />
        </aside>
      </Container>

      {related.length > 0 && (
        <Container className="mt-20 max-w-5xl border-t border-line pt-14">
          <h2 className="font-heading text-2xl font-semibold">Читайте также</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </Container>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}
