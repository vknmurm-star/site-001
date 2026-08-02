import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/components/Container";
import ArticleCard from "@/components/ArticleCard";
import { categories, getCategory } from "@/lib/categories";
import { getArticlesByCategory } from "@/lib/articles";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};

  return {
    title: category.title,
    description: category.description,
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

  return (
    <section className="py-14 sm:py-20">
      <Container>
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
    </section>
  );
}
