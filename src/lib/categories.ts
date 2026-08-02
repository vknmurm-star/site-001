import categoriesData from "../../content/categories.json";

export type CategorySlug = "skincare" | "makeup" | "style" | "wellness";

export interface Category {
  slug: CategorySlug;
  title: string;
  shortTitle: string;
  description: string;
  accent: "clay" | "rose" | "gold" | "sage";
}

export const categories: Category[] = categoriesData.items as Category[];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
