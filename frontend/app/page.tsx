/**
 * Home page — product catalog with filters and pagination.
 * TODO: wire up real data fetching and interactive filters.
 */

import ProductGrid from "@/components/ProductGrid";
import FilterBar from "@/components/FilterBar";

export default function HomePage() {
  return (
    <div>
      <section className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Natural Fiber Clothing
        </h1>
        <p className="mt-2 text-gray-500">
          Every item shown is made from more than 70% natural fibers — cotton,
          wool, linen, silk, hemp, and more.
        </p>
      </section>

      <FilterBar />

      <ProductGrid />
    </div>
  );
}
