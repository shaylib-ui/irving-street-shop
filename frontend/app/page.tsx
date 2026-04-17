"use client";

import Link from "next/link";

const NATURAL_FIBERS = [
  { name: "Cotton", desc: "Breathable, durable, and grown around the world for thousands of years." },
  { name: "Wool", desc: "Temperature-regulating and naturally moisture-wicking from sheep and other animals." },
  { name: "Linen", desc: "One of the oldest textiles — cool, strong, and made from the flax plant." },
  { name: "Silk", desc: "Luxuriously smooth protein fiber produced by silkworms." },
  { name: "Hemp", desc: "Fast-growing, low-impact crop that produces remarkably durable fabric." },
  { name: "Cashmere", desc: "Exceptionally soft fiber combed from cashmere and pashmina goats." },
];

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

export default function HomePage() {
  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="rounded-2xl bg-[#f5f0e8] px-8 py-16 text-center mb-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--brand-light)] mb-3">
          Natural fiber clothing
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 max-w-2xl mx-auto leading-tight">
          Clothing made the way nature intended
        </h1>
        <p className="mt-5 text-lg text-gray-600 max-w-xl mx-auto">
          Irving Street curates clothing from trusted retailers — filtered so
          that every item shown is made from at least 70% natural fiber.
          No guesswork. No greenwashing.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link
            href="/about"
            className="rounded-md bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--brand-light)] transition-colors"
          >
            Our mission
          </Link>
          <Link
            href="#how-it-works"
            className="rounded-md border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-stone-50 transition-colors"
          >
            How it works
          </Link>
        </div>
      </section>

      {/* ── Coming soon banner ────────────────────────────────────────────── */}
      <section className="mb-16 rounded-xl border border-amber-200 bg-amber-50 px-6 py-5 text-center">
        <p className="text-sm font-medium text-amber-800">
          🛠️ &nbsp;Product catalog coming soon — we&rsquo;re building it now.
          Sign up below to be notified when we launch.
        </p>
        <form className="mt-4 flex flex-wrap gap-2 justify-center" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="your@email.com"
            className="rounded-md border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand)] w-64"
          />
          <button
            type="submit"
            className="rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--brand-light)] transition-colors"
          >
            Notify me
          </button>
        </form>
      </section>

      {/* ── Why Irving Street ─────────────────────────────────────────────── */}
      <section id="how-it-works" className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Why Irving Street?
        </h2>
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

      {/* ── Natural fibers guide ──────────────────────────────────────────── */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          Fibers we look for
        </h2>
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
