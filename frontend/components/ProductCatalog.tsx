"use client";

import { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import type { Product } from "@/types/product";

// ── Mock data (shown when API is unavailable) ─────────────────────────────
const MOCK_PRODUCTS: Product[] = [
  { id: 1, advertiserId: "pact", advertiserName: "Pact", sku: "PCT-TEE-001", name: "Organic Cotton Crew Tee in Natural", description: "A midweight organic cotton crew-neck tee, cut for a relaxed fit with a ribbed collar and reinforced shoulder seams.", price: 32, retailPrice: 32, salePrice: null, currency: "USD", imageUrl: "", buyUrl: "#", inStock: true, materialRaw: "100% Organic Cotton", naturalPercent: 100, fiberBreakdown: JSON.stringify([{ name: "Cotton", percent: 100, isNatural: true }]), createdAt: "2026-03-12", updatedAt: "2026-04-01" },
  { id: 2, advertiserId: "wool-and-prince", advertiserName: "Wool & Prince", sku: "WP-OXF-212", name: "Merino Wool Oxford Shirt, Light Blue", description: "A button-down made from 100% merino wool — breathable, wrinkle-resistant, and can be worn multiple times between washes.", price: 148, retailPrice: 148, salePrice: 118, currency: "USD", imageUrl: "", buyUrl: "#", inStock: true, materialRaw: "100% Merino Wool", naturalPercent: 100, fiberBreakdown: JSON.stringify([{ name: "Wool", percent: 100, isNatural: true }]), createdAt: "2026-02-18", updatedAt: "2026-04-02" },
  { id: 3, advertiserId: "quince", advertiserName: "Quince", sku: "QNC-LIN-003", name: "European Linen Long-Sleeve Shirt", description: "Lightweight European flax linen, garment-washed for a soft hand and relaxed drape.", price: 59.9, retailPrice: 59.9, salePrice: null, currency: "USD", imageUrl: "", buyUrl: "#", inStock: true, materialRaw: "100% Linen", naturalPercent: 100, fiberBreakdown: JSON.stringify([{ name: "Linen", percent: 100, isNatural: true }]), createdAt: "2026-03-28", updatedAt: "2026-04-05" },
  { id: 4, advertiserId: "everlane", advertiserName: "Everlane", sku: "EV-DNM-440", name: "The Cotton Straight-Leg Jean", description: "Rigid 13 oz denim woven from long-staple cotton with a small percentage of elastane for recovery.", price: 98, retailPrice: 98, salePrice: null, currency: "USD", imageUrl: "", buyUrl: "#", inStock: true, materialRaw: "98% Cotton, 2% Elastane", naturalPercent: 98, fiberBreakdown: JSON.stringify([{ name: "Cotton", percent: 98, isNatural: true }, { name: "Elastane", percent: 2, isNatural: false }]), createdAt: "2026-01-22", updatedAt: "2026-04-01" },
  { id: 5, advertiserId: "naadam", advertiserName: "Naadam", sku: "NDM-CSH-017", name: "Mongolian Cashmere Crewneck Sweater", description: "Two-ply Mongolian cashmere from herders in the Gobi desert, knit in a classic crewneck silhouette.", price: 185, retailPrice: 225, salePrice: 185, currency: "USD", imageUrl: "", buyUrl: "#", inStock: true, materialRaw: "100% Cashmere", naturalPercent: 100, fiberBreakdown: JSON.stringify([{ name: "Cashmere", percent: 100, isNatural: true }]), createdAt: "2026-02-02", updatedAt: "2026-04-06" },
  { id: 6, advertiserId: "jungmaven", advertiserName: "Jungmaven", sku: "JNG-HMP-088", name: "Hemp-Cotton Baja Hoodie in Oat", description: "A hooded pullover in a hemp-cotton blend, heavyweight for cool evenings.", price: 128, retailPrice: 128, salePrice: null, currency: "USD", imageUrl: "", buyUrl: "#", inStock: false, materialRaw: "55% Hemp, 45% Organic Cotton", naturalPercent: 100, fiberBreakdown: JSON.stringify([{ name: "Hemp", percent: 55, isNatural: true }, { name: "Cotton", percent: 45, isNatural: true }]), createdAt: "2026-03-01", updatedAt: "2026-04-03" },
  { id: 7, advertiserId: "quince", advertiserName: "Quince", sku: "QNC-SLK-221", name: "Washable Silk Button-Up Blouse", description: "19-momme washable mulberry silk in a classic camp-collar cut. Machine washable on delicate.", price: 79.9, retailPrice: 79.9, salePrice: null, currency: "USD", imageUrl: "", buyUrl: "#", inStock: true, materialRaw: "100% Mulberry Silk", naturalPercent: 100, fiberBreakdown: JSON.stringify([{ name: "Silk", percent: 100, isNatural: true }]), createdAt: "2026-02-14", updatedAt: "2026-04-01" },
  { id: 8, advertiserId: "pact", advertiserName: "Pact", sku: "PCT-CHN-110", name: "Organic Cotton Stretch Chino", description: "Five-pocket chino in organic cotton twill with a touch of elastane for everyday comfort.", price: 78, retailPrice: 78, salePrice: 58, currency: "USD", imageUrl: "", buyUrl: "#", inStock: true, materialRaw: "97% Organic Cotton, 3% Elastane", naturalPercent: 97, fiberBreakdown: JSON.stringify([{ name: "Cotton", percent: 97, isNatural: true }, { name: "Elastane", percent: 3, isNatural: false }]), createdAt: "2026-03-20", updatedAt: "2026-04-07" },
  { id: 9, advertiserId: "icebreaker", advertiserName: "Icebreaker", sku: "ICB-MER-660", name: "Merino 200 Base Layer Crew", description: "Midweight merino wool base layer with flatlock seams. Naturally odor resistant.", price: 110, retailPrice: 110, salePrice: null, currency: "USD", imageUrl: "", buyUrl: "#", inStock: true, materialRaw: "100% Merino Wool", naturalPercent: 100, fiberBreakdown: JSON.stringify([{ name: "Wool", percent: 100, isNatural: true }]), createdAt: "2026-01-09", updatedAt: "2026-04-02" },
  { id: 10, advertiserId: "taylorstitch", advertiserName: "Taylor Stitch", sku: "TS-LIN-501", name: "The Short-Sleeve Hemp Camp Shirt", description: "Open-weave hemp camp collar shirt — structured but breezy, perfect for warm weather.", price: 98, retailPrice: 98, salePrice: null, currency: "USD", imageUrl: "", buyUrl: "#", inStock: true, materialRaw: "70% Hemp, 30% Organic Cotton", naturalPercent: 100, fiberBreakdown: JSON.stringify([{ name: "Hemp", percent: 70, isNatural: true }, { name: "Cotton", percent: 30, isNatural: true }]), createdAt: "2026-02-25", updatedAt: "2026-04-05" },
  { id: 11, advertiserId: "everlane", advertiserName: "Everlane", sku: "EV-SWT-908", name: "Cashmere-Wool V-Neck Sweater", description: "A warm v-neck knit in a blend of Mongolian cashmere and Australian merino wool.", price: 145, retailPrice: 145, salePrice: null, currency: "USD", imageUrl: "", buyUrl: "#", inStock: true, materialRaw: "70% Wool, 30% Cashmere", naturalPercent: 100, fiberBreakdown: JSON.stringify([{ name: "Wool", percent: 70, isNatural: true }, { name: "Cashmere", percent: 30, isNatural: true }]), createdAt: "2026-01-30", updatedAt: "2026-04-04" },
  { id: 12, advertiserId: "pact", advertiserName: "Pact", sku: "PCT-SCF-030", name: "Organic Cotton Cable-Knit Scarf", description: "Chunky cable-knit scarf in organic cotton — warm enough for winter without the wool itch.", price: 48, retailPrice: 48, salePrice: null, currency: "USD", imageUrl: "", buyUrl: "#", inStock: true, materialRaw: "100% Organic Cotton", naturalPercent: 100, fiberBreakdown: JSON.stringify([{ name: "Cotton", percent: 100, isNatural: true }]), createdAt: "2026-03-08", updatedAt: "2026-04-06" },
];

// ── Category helpers ─────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "shirts", label: "Shirts" },
  { id: "sweaters", label: "Sweaters" },
  { id: "jeans", label: "Jeans" },
  { id: "pants", label: "Pants" },
] as const;

type CategoryId = typeof CATEGORIES[number]["id"];

function categoryOf(product: Product): string {
  const n = (product.name + " " + product.materialRaw).toLowerCase();
  if (/\bjean|denim\b/.test(n)) return "jeans";
  if (/\bsweater|cashmere|knit|hoodie|pullover|cardigan|base layer\b/.test(n)) return "sweaters";
  if (/\bshirt|tee|t-shirt|blouse|oxford|button-up|camp shirt|top\b/.test(n)) return "shirts";
  if (/\bpant|chino|trouser|slack\b/.test(n)) return "pants";
  return "other";
}

// ── Brand multi-select ───────────────────────────────────────────────────────
function BrandMultiSelect({
  brands,
  selected,
  onChange,
}: {
  brands: string[];
  selected: string[];
  onChange: (v: string[]) => void;
}) {
  const [open, setOpen] = useState(false);

  const label =
    selected.length === 0
      ? "All brands"
      : selected.length === 1
      ? selected[0]
      : `${selected.length} brands`;

  const toggle = (name: string) => {
    if (selected.includes(name)) onChange(selected.filter((b) => b !== name));
    else onChange([...selected, name]);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-gray-700 hover:border-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
      >
        <span>{label}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" className="text-gray-400">
          <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute z-20 mt-1 min-w-52 max-h-72 overflow-auto rounded-md border border-stone-200 bg-white p-1 shadow-lg">
            <div className="flex items-center justify-between px-2 py-1.5 border-b border-stone-100 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Brands</span>
              {selected.length > 0 && (
                <button
                  type="button"
                  onClick={() => onChange([])}
                  className="text-xs text-[var(--brand)] hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
            {brands.map((name) => (
              <label
                key={name}
                className="flex items-center gap-2 px-2 py-1.5 text-sm text-gray-700 rounded hover:bg-stone-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(name)}
                  onChange={() => toggle(name)}
                  className="accent-[var(--brand)]"
                />
                <span>{name}</span>
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ── FilterBar ────────────────────────────────────────────────────────────────
interface Filters {
  search: string;
  brands: string[];
  inStock: boolean;
  sortBy: string;
  category: CategoryId;
}

function FilterBar({
  filters,
  setFilters,
  allBrands,
}: {
  filters: Filters;
  setFilters: (f: Filters) => void;
  allBrands: string[];
}) {
  return (
    <div className="mb-6 flex flex-col gap-3">
      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => {
          const active = filters.category === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setFilters({ ...filters, category: c.id })}
              className={
                "rounded-full border px-4 py-1.5 text-sm transition-colors " +
                (active
                  ? "border-[var(--brand)] bg-[var(--brand)] text-white"
                  : "border-stone-300 bg-white text-gray-700 hover:border-[var(--brand)] hover:text-[var(--brand)]")
              }
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {/* Search, brand, in-stock, sort */}
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          placeholder="Search products..."
          className="flex-1 min-w-48 rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
        />
        <BrandMultiSelect
          brands={allBrands}
          selected={filters.brands}
          onChange={(brands) => setFilters({ ...filters, brands })}
        />
        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })}
            className="accent-[var(--brand)]"
          />
          In stock only
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
          className="rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
        >
          <option value="createdAt">Newest</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="naturalPercent">Most natural</option>
          <option value="name">Name A–Z</option>
        </select>
      </div>
    </div>
  );
}

// ── ProductCatalog (owns filter state) ───────────────────────────────────────
export default function ProductCatalog() {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    brands: [],
    inStock: true,
    sortBy: "createdAt",
    category: "all",
  });

  // Derive brand list from mock products
  const allBrands = useMemo(
    () =>
      [...new Set(MOCK_PRODUCTS.map((p) => p.advertiserName))].sort((a, b) =>
        a.localeCompare(b)
      ),
    []
  );

  const products = useMemo(() => {
    let list = MOCK_PRODUCTS.slice();
    if (filters.category !== "all") {
      list = list.filter((p) => categoryOf(p) === filters.category);
    }
    if (filters.brands.length > 0) {
      list = list.filter((p) => filters.brands.includes(p.advertiserName));
    }
    if (filters.search.trim()) {
      const q = filters.search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.advertiserName.toLowerCase().includes(q) ||
          p.materialRaw.toLowerCase().includes(q)
      );
    }
    list = list.filter((p) => p.naturalPercent >= 70);
    if (filters.inStock) list = list.filter((p) => p.inStock);
    switch (filters.sortBy) {
      case "price-asc": list.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price)); break;
      case "price-desc": list.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price)); break;
      case "naturalPercent": list.sort((a, b) => b.naturalPercent - a.naturalPercent); break;
      case "name": list.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }
    return list;
  }, [filters]);

  return (
    <div>
      <FilterBar filters={filters} setFilters={setFilters} allBrands={allBrands} />
      {products.length === 0 ? (
        <div className="py-20 text-center text-gray-400">
          <p className="text-lg">No products match your filters.</p>
          <p className="text-sm mt-1">Try widening your search.</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4">{products.length.toLocaleString()} products</p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
