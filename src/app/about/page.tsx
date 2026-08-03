import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getStaticPage } from "@/lib/pages";
import { absoluteUrl } from "@/lib/site";

const description =
  "«Зрелая красота» — независимый проект об уходе, макияже и стиле для женщин 40–60 лет. Без давления и антивозрастной паники.";

export const metadata: Metadata = {
  title: "О проекте",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    title: "О проекте «Зрелая красота»",
    description,
    url: absoluteUrl("/about"),
  },
  twitter: {
    card: "summary_large_image",
    title: "О проекте «Зрелая красота»",
    description,
  },
};

export default function AboutPage() {
  const page = getStaticPage("about");

  return (
    <div className="py-14 sm:py-20">
      <Container className="max-w-3xl">
        <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "О проекте", href: "/about" }]} />
        <p className="text-sm font-semibold uppercase tracking-widest text-clay-dark">
          О проекте
        </p>
        <h1 className="mt-3 font-heading text-4xl font-semibold sm:text-5xl">
          {page.title}
        </h1>

        <div className="prose-article mt-10">
          <MDXRemote source={page.content} />
        </div>
      </Container>
    </div>
  );
}
