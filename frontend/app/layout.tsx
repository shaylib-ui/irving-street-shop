import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Irving Street — Natural Fiber Clothing",
  description: "Shop clothing made with natural fibers: cotton, wool, linen, silk, hemp, and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50 text-gray-900 antialiased">
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
        <footer className="mt-16 border-t border-stone-200 py-8 text-center text-sm text-gray-500">
          <p>Irving Street &mdash; Naturally made clothing</p>
        </footer>
      </body>
    </html>
  );
}
