import Link from "next/link";
import Container from "./Container";
import { categories } from "@/lib/categories";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-cream-deep/60">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-heading text-xl font-semibold">Зрелая красота</p>
            <p className="mt-3 max-w-xs text-sm text-ink-soft">
              Уход, макияж и стиль для женщин, которые не гонятся за молодостью, а хотят
              чувствовать себя хорошо в своей коже — в любом возрасте.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink">Разделы</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/categories/${c.slug}`} className="hover:text-clay-dark">
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink">Проект</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              <li>
                <Link href="/about" className="hover:text-clay-dark">
                  О проекте
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-clay-dark">
                  Поиск по статьям
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-line pt-6 text-xs text-ink-soft">
          © {new Date().getFullYear()} Зрелая красота. Материалы носят информационный
          характер и не являются медицинской консультацией.
        </p>
      </Container>
    </footer>
  );
}
