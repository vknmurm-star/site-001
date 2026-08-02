import Link from "next/link";
import Container from "@/components/Container";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-24 text-center sm:py-32">
      <p className="text-sm font-semibold uppercase tracking-widest text-clay-dark">
        404
      </p>
      <h1 className="mt-3 font-heading text-3xl font-semibold sm:text-4xl">
        Такой страницы не нашлось
      </h1>
      <p className="mt-4 max-w-md text-ink-soft">
        Возможно, статья переехала или адрес введён с ошибкой. Загляните на главную —
        там точно найдётся что почитать.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-clay px-6 py-3 text-base font-semibold text-cream transition-colors hover:bg-clay-dark"
      >
        На главную
      </Link>
    </Container>
  );
}
