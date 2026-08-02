import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Container from "@/components/Container";
import NewsletterForm from "@/components/NewsletterForm";
import { getStaticPage } from "@/lib/pages";

export const metadata: Metadata = {
  title: "О проекте",
  description:
    "«Зрелая красота» — контентный проект об уходе, макияже и стиле для женщин 40–60 лет. Без давления и антивозрастной паники.",
};

export default function AboutPage() {
  const page = getStaticPage("about");

  return (
    <div className="py-14 sm:py-20">
      <Container className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-clay-dark">
          О проекте
        </p>
        <h1 className="mt-3 font-heading text-4xl font-semibold sm:text-5xl">
          {page.title}
        </h1>

        <div className="prose-article mt-10">
          <MDXRemote source={page.content} />
        </div>

        <div className="mt-14 rounded-3xl border border-line bg-surface p-8 text-center sm:p-10">
          <h2 className="font-heading text-2xl font-semibold">
            Подпишитесь на еженедельную подборку
          </h2>
          <p className="mx-auto mt-2 max-w-md text-ink-soft">
            Одно письмо в неделю с новыми статьями — без спама.
          </p>
          <div className="mt-6">
            <NewsletterForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
