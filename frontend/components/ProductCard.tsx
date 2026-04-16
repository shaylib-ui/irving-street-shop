import Link from "next/link";
import type { Product, FiberEntry } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const fibers: FiberEntry[] = (() => {
    try { return JSON.parse(product.fiberBreakdown); }
    catch { return []; }
  })();

  const topFiber = fibers.find((f) => f.isNatural);

  const displayPrice = product.salePrice ?? product.price;
  const isOnSale = product.salePrice !== null && product.salePrice < product.price;

  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col rounded-xl border border-stone-200 bg-white overflow-hidden hover:shadow-md transition-shadow"
    >
      {/* Image */}
      <div className="aspect-square bg-stone-100 overflow-hidden">
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-300 text-sm">
            No image
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 p-4">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
          {product.name}
        </h3>

        {/* Natural fiber badge */}
        <div className="flex items-center gap-2">
          <span className="badge-natural">
            {Math.round(product.naturalPercent)}% natural
          </span>
          {topFiber && (
            <span className="text-xs text-gray-400 capitalize">{topFiber.name}</span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto pt-2">
          <span className={`text-base font-bold ${isOnSale ? "text-red-600" : "text-gray-900"}`}>
            {product.currency === "USD" ? "$" : product.currency}
            {displayPrice.toFixed(2)}
          </span>
          {isOnSale && (
            <span className="text-xs text-gray-400 line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Out of stock */}
        {!product.inStock && (
          <p className="text-xs text-gray-400">Out of stock</p>
        )}
      </div>
    </Link>
  );
}
