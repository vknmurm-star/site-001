import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/components/Container";
import ArticleCard from "@/components/ArticleCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { categories, getCategory } from "@/lib/categories";
import { getArticlesByCategory } from "@/lib/articles";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

function metaDescriptionFor(description: string): string {
  return `${description} Практические статьи для женщин 40–60 лет на сайте «${SITE_NAME}».`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};

  const description = metaDescriptionFor(category.description);
  const path = `/categories/${category.slug}`;

  return {
    title: category.title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title: category.title,
      description,
      url: absoluteUrl(path),
    },
    twitter: {
      card: "summary_large_image",
      title: category.title,
      description,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const articles = getArticlesByCategory(category.slug);
  const path = `/categories/${category.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.title,
    description: category.description,
    url: absoluteUrl(path),
    inLanguage: "ru-RU",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/articles/${article.slug}`),
        name: article.title,
      })),
    },
  };

  return (
    <section className="py-14 sm:py-20">
      <Container>
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: category.title, href: path },
          ]}
        />
        <p className="text-sm font-semibold uppercase tracking-widest text-clay-dark">
          Раздел
        </p>
        <h1 className="mt-3 font-heading text-4xl font-semibold sm:text-5xl">
          {category.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">
          {category.description}
        </p>

        {articles.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-ink-soft">
            Пока нет статей в этом разделе — загляните позже.
          </p>
        )}
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
