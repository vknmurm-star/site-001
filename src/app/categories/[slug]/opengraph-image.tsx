import { ImageResponse } from "next/og";
import { categories, getCategory } from "@/lib/categories";
import { SITE_NAME } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

const accentColors: Record<string, string> = {
  clay: "#b5602f",
  rose: "#a15d63",
  gold: "#b8944f",
  sage: "#6f7f5c",
};

export default async function CategoryOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  const accent = accentColors[category?.accent ?? "clay"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#fbf6ef",
          padding: "0 100px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: accent,
            opacity: 0.14,
            top: -160,
            right: -120,
            display: "flex",
          }}
        />
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: accent,
            display: "flex",
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 72,
            fontWeight: 700,
            color: "#2d251f",
            display: "flex",
            maxWidth: 900,
          }}
        >
          {category?.title ?? "Раздел"}
        </div>
      </div>
    ),
    { ...size }
  );
}
