"use client";

import Link from "next/link";
import type { Product, FiberEntry } from "@/types/product";

// Subtle striped SVG placeholder — deterministic tone per product name
function ProductImagePlaceholder({ label }: { label: string }) {
  const hash = Array.from(label).reduce((a, c) => a + c.charCodeAt(0), 0);
  const tones: [string, string][] = [
    ["#e8e0d3", "#d9cfbe"],
    ["#e2dcd0", "#cfc7b7"],
    ["#ddd4c3", "#c8bda9"],
    ["#e6dfd1", "#d4cab5"],
    ["#dfd7c7", "#cabfa8"],
  ];
  const [bg, stripe] = tones[hash % tones.length];
  return (
    <svg
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      <rect width="200" height="200" fill={bg} />
      <g stroke={stripe} strokeWidth="1" opacity="0.6">
        {Array.from({ length: 40 }).map((_, i) => (
          <line key={i} x1={-10 + i * 8} y1="-10" x2={-40 + i * 8} y2="210" />
        ))}
      </g>
      <text
        x="100"
        y="104"
        textAnchor="middle"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="8"
        fill="#6b6355"
        opacity="0.7"
      >
        [product shot]
      </text>
    </svg>
  );
}

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
      <div className="aspect-square bg-stone-100 overflow-hidden">
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="h-full w-full group-hover:scale-105 transition-transform duration-300">
            <ProductImagePlaceholder label={product.name} />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 p-4">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="badge-natural">
            {Math.round(product.naturalPercent)}% natural
          </span>
          {topFiber && (
            <span className="text-xs text-gray-400 capitalize">{topFiber.name}</span>
          )}
        </div>
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
        {!product.inStock && (
          <p className="text-xs text-gray-400">Out of stock</p>
        )}
      </div>
    </Link>
  );
}
