import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const disallow = ["/admin", "/api"];

// Явно разрешаем основных ИИ-краулеров — цель проекта включает видимость
// в ответах ChatGPT, Perplexity, Google AI Overview и т.д. (GEO).
// Если это решение нужно пересмотреть — просто уберите нужный блок ниже.
const aiCrawlers = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "PerplexityBot",
  "ClaudeBot",
  "Claude-Web",
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: "/", disallow })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
