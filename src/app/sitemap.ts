import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";
import { categories } from "@/lib/categories";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const homepageLastModified = fs.statSync(
    path.join(process.cwd(), "content", "settings", "homepage.json")
  ).mtime;
  const aboutLastModified = fs.statSync(
    path.join(process.cwd(), "content", "pages", "about.mdx")
  ).mtime;
  const categoriesLastModified = fs.statSync(
    path.join(process.cwd(), "content", "categories.json")
  ).mtime;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: homepageLastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: aboutLastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${SITE_URL}/categories/${c.slug}`,
    lastModified: categoriesLastModified,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const articleRoutes: MetadataRoute.Sitemap = getAllArticles().map((a) => ({
    url: `${SITE_URL}/articles/${a.slug}`,
    lastModified: a.date,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...articleRoutes];
}
