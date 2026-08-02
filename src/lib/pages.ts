import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface StaticPage {
  title: string;
  content: string;
}

export function getStaticPage(slug: string): StaticPage {
  const filePath = path.join(process.cwd(), "content", "pages", `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    title: data.title as string,
    content,
  };
}
