export const SITE_URL = (process.env.SITE_URL ?? "https://example.com").replace(/\/$/, "");

export const SITE_NAME = "Зрелая красота";

export const SITE_DESCRIPTION =
  "Уход за кожей, макияж и стиль для женщин 40–60 лет. Практичные советы без давления и лишних обещаний.";

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
