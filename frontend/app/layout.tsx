import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Irving Street — Natural Fiber Clothing",
  description:
    "Shop clothing made from more than 70% natural fibers — cotton, wool, linen, silk, hemp, and more. Every product is filtered and labeled with its exact fiber composition.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50 text-gray-900 antialiased flex flex-col">
        <Header />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
