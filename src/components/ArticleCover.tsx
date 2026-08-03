import Image from "next/image";
import type { Category } from "@/lib/categories";
import CoverPlaceholder from "./CoverPlaceholder";

export default function ArticleCover({
  coverImage,
  label,
  accent,
  className = "",
  sizes,
  priority = false,
}: {
  coverImage?: string;
  label: string;
  accent: Category["accent"];
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (coverImage) {
    return (
      <div className={`relative overflow-hidden rounded-2xl ${className}`}>
        <Image
          src={coverImage}
          alt={label}
          fill
          sizes={sizes ?? "(min-width: 1024px) 33vw, 100vw"}
          className="object-cover"
          priority={priority}
        />
      </div>
    );
  }

  return <CoverPlaceholder label={label} accent={accent} className={className} />;
}
