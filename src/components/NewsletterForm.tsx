"use client";

import { FormEvent, useState } from "react";

export default function NewsletterForm({
  variant = "default",
}: {
  variant?: "default" | "compact";
}) {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");
  const [email, setEmail] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    // Демо-форма: реальная интеграция с сервисом рассылок не подключена.
    setStatus("submitted");
  }

  if (status === "submitted") {
    return (
      <p
        role="status"
        className={`rounded-xl bg-sage/10 px-4 py-3 text-sm font-medium text-sage ${
          variant === "compact" ? "" : "text-center"
        }`}
      >
        Спасибо! Проверьте почту — мы прислали письмо для подтверждения.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={
        variant === "compact"
          ? "flex flex-col gap-2 sm:flex-row"
          : "mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
      }
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Электронная почта
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="ваш email"
        className="w-full flex-1 rounded-full border border-line bg-surface px-5 py-3 text-base text-ink placeholder:text-ink-soft/70 focus-visible:border-clay"
      />
      <button
        type="submit"
        className="whitespace-nowrap rounded-full bg-clay px-6 py-3 text-base font-semibold text-cream transition-colors hover:bg-clay-dark"
      >
        Подписаться
      </button>
    </form>
  );
}
