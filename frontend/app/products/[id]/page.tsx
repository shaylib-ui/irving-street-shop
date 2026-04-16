/**
 * Product detail page.
 * TODO: fetch product by ID from API, render full detail + fiber breakdown chart.
 */

import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  // TODO: fetch product name for SEO title
  return { title: `Product ${id} — Irving Street` };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="max-w-4xl mx-auto">
      <p className="text-sm text-gray-500 mb-4">
        {/* TODO: breadcrumb */}
        <a href="/" className="hover:underline">Home</a> &rsaquo; Product
      </p>

      {/* TODO: replace with real product data */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Image */}
        <div className="aspect-square bg-stone-100 rounded-lg flex items-center justify-center">
          <span className="text-gray-400 text-sm">Product image</span>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Product #{id}
          </h1>

          <p className="text-gray-500 text-sm">Loading product details...</p>

          {/* Fiber composition */}
          <div className="rounded-lg border border-stone-200 p-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">
              Fiber Composition
            </h2>
            {/* TODO: render FiberEntry[] as a visual bar chart */}
            <p className="text-sm text-gray-400">— fiber breakdown —</p>
          </div>

          {/* CTA */}
          <a
            href="#"
            className="mt-auto inline-block rounded-md bg-[var(--brand)] px-6 py-3 text-center text-sm font-semibold text-white hover:bg-[var(--brand-light)] transition-colors"
          >
            Shop at Retailer &rarr;
          </a>
        </div>
      </div>

      {/* TODO: related products */}
    </div>
  );
}
