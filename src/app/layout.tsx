import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Зрелая красота — уход и стиль после 40",
    template: "%s | Зрелая красота",
  },
  description:
    "Уход за кожей, макияж и стиль для женщин 40–60 лет. Практичные советы без давления и лишних обещаний.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Зрелая красота",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-cream"
        >
          Перейти к содержимому
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
