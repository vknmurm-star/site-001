import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import Container from "@/components/Container";
import CategoryPill from "@/components/CategoryPill";
import ArticleCover from "@/components/ArticleCover";
import TableOfContents from "@/components/TableOfContents";
import ArticleCard from "@/components/ArticleCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  extractHeadings,
  formatDate,
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
} from "@/lib/articles";
import { getCategory } from "@/lib/categories";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

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

  const title = article.seoTitle ?? article.title;
  const description = article.seoDescription ?? article.description;
  const path = `/articles/${article.slug}`;
  const ogImages = article.coverImage
    ? [{ url: absoluteUrl(article.coverImage), alt: article.coverImageAlt ?? article.title }]
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title,
      description,
      url: absoluteUrl(path),
      publishedTime: article.date,
      modifiedTime: article.date,
      tags: article.tags,
      images: ogImages,
    },
    twitter: {
      card: article.coverImage ? "summary_large_image" : "summary",
      title,
      description,
      images: ogImages?.map((i) => i.url),
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
  const related = getRelatedArticles(article, 3);
  const path = `/articles/${article.slug}`;

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    inLanguage: "ru-RU",
    datePublished: article.date,
    dateModified: article.date,
    articleSection: category.title,
    keywords: article.tags.join(", "),
    url: absoluteUrl(path),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(path),
    },
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: absoluteUrl("/"),
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/icon.png"),
        width: 512,
        height: 512,
      },
    },
  };

  if (article.coverImage) {
    jsonLd.image = [absoluteUrl(article.coverImage)];
  }

  const howToJsonLd =
    article.howTo && article.howTo.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: article.howToTitle ?? article.title,
          step: article.howTo.map((text, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            text,
          })),
        }
      : null;

  return (
    <article className="py-12 sm:py-16">
      <Container className="max-w-3xl">
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: category.title, href: `/categories/${category.slug}` },
            { label: article.title, href: path },
          ]}
        />
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

        <ArticleCover
          coverImage={article.coverImage}
          imageAlt={article.coverImageAlt}
          label={article.coverLabel}
          accent={category.accent}
          className="mt-8 aspect-[16/9] w-full"
          sizes="(min-width: 1024px) 768px, 100vw"
          priority
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
      {howToJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />
      )}
    </article>
  );
}
