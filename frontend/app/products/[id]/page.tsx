import type { Metadata } from "next";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: `Product ${id} — Irving Street` };
}

// Fiber composition stacked bar + legend (server-renderable, no interactivity needed)
function FiberComposition({ fiberBreakdown, materialRaw }: { fiberBreakdown: string; materialRaw: string }) {
  let fibers: { name: string; percent: number; isNatural: boolean }[] = [];
  try { fibers = JSON.parse(fiberBreakdown); } catch { /* empty */ }

  const naturalColors = ["#5c4a32", "#8a7060", "#a89178", "#c2a989"];

  return (
    <div className="rounded-lg border border-stone-200 bg-white p-4">
      <h2 className="text-sm font-semibold text-gray-700 mb-3">Fiber Composition</h2>

      {/* Stacked bar */}
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-stone-100 mb-3">
        {fibers.map((f, i) => (
          <div
            key={i}
            style={{
              width: `${f.percent}%`,
              background: f.isNatural ? naturalColors[i % naturalColors.length] : "#d6d3d1",
            }}
            title={`${f.name} ${f.percent}%`}
          />
        ))}
      </div>

      {/* Legend */}
      <ul className="space-y-1.5 text-sm">
        {fibers.map((f, i) => (
          <li key={i} className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full shrink-0"
                style={{
                  background: f.isNatural ? naturalColors[i % naturalColors.length] : "#d6d3d1",
                }}
              />
              <span className="capitalize text-gray-700">{f.name}</span>
              <span className={f.isNatural ? "badge-natural" : "badge-synthetic"}>
                {f.isNatural ? "natural" : "synthetic"}
              </span>
            </span>
            <span className="font-medium text-gray-700 tabular-nums">{f.percent}%</span>
          </li>
        ))}
      </ul>

      <p className="mt-3 pt-3 border-t border-stone-100 text-xs text-gray-500">
        Material (as listed by retailer):{" "}
        <span className="text-gray-700">{materialRaw}</span>
      </p>
    </div>
  );
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;

  // TODO: fetch real product from API
  // const product = await getProduct(id);

  return (
    <div className="max-w-4xl mx-auto">
      <p className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:underline">Home</Link> &rsaquo; Product
      </p>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Image placeholder */}
        <div className="aspect-square bg-stone-100 rounded-lg overflow-hidden flex items-center justify-center">
          <svg
            viewBox="0 0 200 200"
            className="h-full w-full"
            aria-hidden="true"
          >
            <rect width="200" height="200" fill="#e8e0d3" />
            <g stroke="#d9cfbe" strokeWidth="1" opacity="0.6">
              {Array.from({ length: 40 }).map((_, i) => (
                <line key={i} x1={-10 + i * 8} y1="-10" x2={-40 + i * 8} y2="210" />
              ))}
            </g>
            <text x="100" y="104" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#6b6355" opacity="0.7">
              [product shot]
            </text>
          </svg>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-light)]">
            Brand
          </p>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">
            Product #{id}
          </h1>

          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-gray-900">$—</span>
            <span className="badge-natural">—% natural</span>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">
            Product description will appear here once connected to the backend.
          </p>

          <FiberComposition
            fiberBreakdown='[{"name":"Cotton","percent":100,"isNatural":true}]'
            materialRaw="100% Cotton"
          />

          <a
            href="#"
            className="mt-2 inline-block rounded-md bg-[var(--brand)] px-6 py-3 text-center text-sm font-semibold text-white hover:bg-[var(--brand-light)] transition-colors"
          >
            Shop at Retailer &rarr;
          </a>
          <p className="text-xs text-gray-400 text-center">
            You&rsquo;ll be taken to the retailer&rsquo;s website to complete your purchase.
          </p>
        </div>
      </div>
    </div>
  );
}
