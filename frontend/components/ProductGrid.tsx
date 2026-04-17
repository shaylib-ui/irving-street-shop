"use client";

/**
 * ProductGrid — fetches and displays the paginated product list.
 * Runs client-side so it works in both dev and production builds
 * without needing the backend reachable at build time.
 */

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "@/lib/api";
import type { ProductListResponse } from "@/types/product";

export default function ProductGrid() {
  const [data, setData] = useState<ProductListResponse | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getProducts({ page: 1, pageSize: 24, minNaturalPercent: 70, inStock: true })
      .then(setData)
      .catch(() => setError(true));
  }, []);

  if (error) {
    return (
      <div className="py-20 text-center text-gray-400">
        <p className="text-lg">Could not load products.</p>
        <p className="text-sm mt-1">Make sure the backend is running on port 3001.</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="py-20 text-center text-gray-400">
        <p className="text-sm">Loading products…</p>
      </div>
    );
  }

  if (data.products.length === 0) {
    return (
      <div className="py-20 text-center text-gray-400">
        <p className="text-lg">No products yet.</p>
        <p className="text-sm mt-1">
          Import a CJ product feed CSV via the Admin page to get started.
        </p>
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

      {data.totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2 text-sm">
          <span className="text-gray-400">
            Page {data.page} of {data.totalPages}
          </span>
        </div>
      )}
    </div>
  );
}
