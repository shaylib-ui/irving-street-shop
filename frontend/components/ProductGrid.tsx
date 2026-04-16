/**
 * ProductGrid — fetches and displays the paginated product list.
 * TODO: receive filter state from parent / URL params and pass to getProducts().
 */

import ProductCard from "./ProductCard";
import { getProducts } from "@/lib/api";

export default async function ProductGrid() {
  let data;
  try {
    data = await getProducts({ page: 1, pageSize: 24, minNaturalPercent: 70, inStock: true });
  } catch {
    return (
      <div className="py-20 text-center text-gray-400">
        <p className="text-lg">Could not load products.</p>
        <p className="text-sm mt-1">Make sure the backend is running on port 3001.</p>
      </div>
    );
  }

  if (data.products.length === 0) {
    return (
      <div className="py-20 text-center text-gray-400">
        <p className="text-lg">No products found.</p>
        <p className="text-sm mt-1">Import a CJ product feed CSV via the Admin page to get started.</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-gray-500 mb-4">
        {data.total.toLocaleString()} products
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {data.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* TODO: pagination controls */}
      {data.totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2 text-sm">
          {/* Placeholder — replace with real pagination component */}
          <span className="text-gray-400">
            Page {data.page} of {data.totalPages}
          </span>
        </div>
      )}
    </div>
  );
}
