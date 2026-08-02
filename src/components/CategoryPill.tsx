import Link from "next/link";
import type { Category } from "@/lib/categories";

const accentClasses: Record<Category["accent"], string> = {
  clay: "bg-clay/10 text-clay-dark",
  rose: "bg-rose/10 text-rose",
  gold: "bg-gold/15 text-gold",
  sage: "bg-sage/10 text-sage",
};

export default function CategoryPill({
  category,
  className = "",
}: {
  category: Pick<Category, "slug" | "shortTitle" | "accent">;
  className?: string;
}) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${accentClasses[category.accent]} ${className}`}
    >
      {category.shortTitle}
    </Link>
  );
}
