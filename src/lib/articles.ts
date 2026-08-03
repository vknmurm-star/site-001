import fs from "fs";
import path from "path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import type { CategorySlug } from "./categories";

const CONTENT_DIR = path.join(process.cwd(), "content", "articles");

export interface ArticleFrontmatter {
  title: string;
  description: string;
  category: CategorySlug;
  tags: string[];
  date: string;
  coverLabel: string;
  coverImage?: string;
  coverImageAlt?: string;
  howToTitle?: string;
  howTo?: string[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface Article extends ArticleFrontmatter {
  slug: string;
  content: string;
  readingTimeMinutes: number;
}

export type ArticleSummary = Omit<Article, "content">;

export interface Heading {
  depth: 2 | 3;
  text: string;
  id: string;
}

function readingTimeFor(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const wordsPerMinute = 180;
  return Math.max(1, Math.round(words / wordsPerMinute));
}

let cache: Article[] | null = null;

export function getAllArticles(): Article[] {
  if (cache) return cache;

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  const articles = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const fm = data as ArticleFrontmatter;

    return {
      ...fm,
      slug,
      content,
      readingTimeMinutes: readingTimeFor(content),
    };
  });

  cache = articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return cache;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: CategorySlug): Article[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  const others = getAllArticles().filter((a) => a.slug !== article.slug);
  const sameCategory = others.filter((a) => a.category === article.category);
  const rest = others.filter((a) => a.category !== article.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

export function toSummary(article: Article): ArticleSummary {
  const summary: ArticleSummary = {
    slug: article.slug,
    title: article.title,
    description: article.description,
    category: article.category,
    tags: article.tags,
    date: article.date,
    coverLabel: article.coverLabel,
    coverImage: article.coverImage,
    coverImageAlt: article.coverImageAlt,
    readingTimeMinutes: article.readingTimeMinutes,
  };
  return summary;
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  getAllArticles().forEach((a) => a.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}

export function extractHeadings(content: string): Heading[] {
  const slugger = new GithubSlugger();
  const lines = content.split("\n");
  const headings: Heading[] = [];

  for (const line of lines) {
    const match = /^(##|###)\s+(.*)$/.exec(line.trim());
    if (!match) continue;
    const depth = match[1].length as 2 | 3;
    const text = match[2].trim();
    headings.push({ depth, text, id: slugger.slug(text) });
  }

  return headings;
}

export { formatDate } from "./format";
