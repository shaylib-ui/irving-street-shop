import Link from "next/link";
import ProductCatalog from "@/components/ProductCatalog";

const WHY_ITEMS = [
  {
    icon: "🌿",
    title: "Transparent composition",
    body: "Every product displays its exact fiber breakdown. We only show items where natural fibers make up more than 70% of the fabric.",
  },
  {
    icon: "🔍",
    title: "Curated from trusted retailers",
    body: "We partner with established brands and retailers through the CJ Affiliate network — so you shop directly on their secure sites.",
  },
  {
    icon: "♻️",
    title: "Better for the planet",
    body: "Natural fibers are biodegradable and generally require fewer synthetic chemicals than petroleum-based textiles.",
  },
];

const NATURAL_FIBERS = [
  { name: "Cotton", desc: "Breathable, durable, and grown around the world for thousands of years." },
  { name: "Wool", desc: "Temperature-regulating and naturally moisture-wicking from sheep and other animals." },
  { name: "Linen", desc: "One of the oldest textiles — cool, strong, and made from the flax plant." },
  { name: "Silk", desc: "Luxuriously smooth protein fiber produced by silkworms." },
  { name: "Hemp", desc: "Fast-growing, low-impact crop that produces remarkably durable fabric." },
  { name: "Cashmere", desc: "Exceptionally soft fiber combed from cashmere and pashmina goats." },
];

export default function HomePage() {
  return (
    <div>
      {/* ── Hero — full-width, black bg + natural fibers photo at 70% opacity ── */}
      <section
        className="relative isolate overflow-hidden px-8 py-20 text-center mb-16"
        style={{
          backgroundColor: "#000",
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
          marginTop: "-2.5rem",
        }}
      >
        {/* Background image at 70% opacity */}
        <div
          className="absolute inset-0 -z-10 bg-center bg-cover"
          style={{ backgroundImage: "url('/hero-bg.png')", opacity: 0.7 }}
          aria-hidden="true"
        />
        <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.8)" }}>
          Natural fiber clothing
        </p>
        <h1
          className="font-bold tracking-tight text-white max-w-3xl mx-auto"
          style={{ fontSize: "20pt", lineHeight: 1.0 }}
        >
          Irving Street curates clothing from trusted retailers — filtered so
          that every item shown is made from at least 70% natural fiber.{" "}
          No guesswork. No greenwashing.
        </h1>
      </section>

      {/* ── Shop the catalog ──────────────────────────────────────────────── */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Shop the catalog</h2>
        <p className="text-gray-500 text-sm mb-8">
          Curated clothing, filtered to 70%+ natural fiber. Click through to buy directly from the retailer.
        </p>
        <ProductCatalog />
      </section>

      {/* ── Why Irving Street ─────────────────────────────────────────────── */}
      <section id="how-it-works" className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Irving Street?</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {WHY_ITEMS.map((item) => (
            <div key={item.title} className="rounded-xl border border-stone-200 bg-white p-6">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Fibers we look for ────────────────────────────────────────────── */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Fibers we look for</h2>
        <p className="text-center text-gray-500 text-sm mb-8">
          These are the natural fibers that count toward our 70% threshold.
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {NATURAL_FIBERS.map((fiber) => (
            <div key={fiber.name} className="rounded-xl border border-stone-200 bg-white p-5">
              <h3 className="font-semibold text-gray-900 mb-1">{fiber.name}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{fiber.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Disclosure note ───────────────────────────────────────────────── */}
      <section className="rounded-xl bg-stone-100 px-6 py-5 text-center">
        <p className="text-xs text-gray-500">
          Irving Street earns a commission on purchases made through links on this site at no extra
          cost to you.{" "}
          <Link href="/affiliate-disclosure" className="underline hover:text-[var(--brand)]">
            Read our full affiliate disclosure.
          </Link>
        </p>
      </section>
    </div>
  );
}
