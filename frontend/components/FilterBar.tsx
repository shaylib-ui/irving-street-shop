"use client";

/**
 * FilterBar — search, sort, and filter controls for the product catalog.
 * TODO: connect to URL search params / parent state for actual filtering.
 */

export default function FilterBar() {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      {/* Search */}
      <input
        type="search"
        placeholder="Search products..."
        className="flex-1 min-w-48 rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
      />

      {/* Natural fiber threshold slider */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <label htmlFor="minNatural" className="whitespace-nowrap">
          Min. natural fiber:
        </label>
        <input
          id="minNatural"
          type="range"
          min={70}
          max={100}
          defaultValue={70}
          className="w-28 accent-[var(--brand)]"
        />
        <span className="w-10 text-right font-medium">70%</span>
      </div>

      {/* In-stock toggle */}
      <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
        <input type="checkbox" defaultChecked className="accent-[var(--brand)]" />
        In stock only
      </label>

      {/* Sort */}
      <select className="rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand)]">
        <option value="createdAt">Newest</option>
        <option value="price-asc">Price: low to high</option>
        <option value="price-desc">Price: high to low</option>
        <option value="naturalPercent">Most natural</option>
        <option value="name">Name A–Z</option>
      </select>
    </div>
  );
}
