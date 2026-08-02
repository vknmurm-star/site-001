import type { Category } from "@/lib/categories";

const accentGradients: Record<Category["accent"], string> = {
  clay: "from-clay/25 via-cream-deep to-clay/10",
  rose: "from-rose/25 via-cream-deep to-rose/10",
  gold: "from-gold/25 via-cream-deep to-gold/10",
  sage: "from-sage/25 via-cream-deep to-sage/10",
};

const accentText: Record<Category["accent"], string> = {
  clay: "text-clay-dark",
  rose: "text-rose",
  gold: "text-gold",
  sage: "text-sage",
};

export default function CoverPlaceholder({
  label,
  accent,
  className = "",
}: {
  label: string;
  accent: Category["accent"];
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${accentGradients[accent]} ${className}`}
    >
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-40"
        viewBox="0 0 200 200"
      >
        <circle cx="30" cy="170" r="70" fill="currentColor" className={accentText[accent]} fillOpacity="0.15" />
        <circle cx="180" cy="20" r="50" fill="currentColor" className={accentText[accent]} fillOpacity="0.12" />
      </svg>
      <span
        className={`relative px-4 text-center text-sm font-medium tracking-wide ${accentText[accent]}`}
      >
        {label}
      </span>
    </div>
  );
}
