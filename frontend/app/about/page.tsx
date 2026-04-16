import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Irving Street",
  description:
    "Irving Street is a curated clothing directory that only shows products made from more than 70% natural fibers.",
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">About Irving Street</h1>
      <p className="text-gray-500 mb-10 text-sm">Last updated: April 2026</p>

      <div className="prose prose-stone max-w-none space-y-8 text-gray-700 leading-relaxed">

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Our mission</h2>
          <p>
            Irving Street exists to make it easier to find clothing made from natural fibers.
            Browsing online for a cotton shirt or a wool sweater sounds simple — but in practice
            you wade through page after page of polyester blends, vague &ldquo;soft fabric&rdquo;
            descriptions, and materials listings buried at the bottom of a product page.
          </p>
          <p className="mt-3">
            We fix that by doing the filtering work for you. Every product in our catalog has been
            evaluated against a single, clear standard: <strong>more than 70% of the fabric must
            be natural fiber.</strong> If it doesn&rsquo;t meet that threshold, it doesn&rsquo;t
            appear here.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">How we build our catalog</h2>
          <p>
            We source product listings from retailers through the{" "}
            <strong>CJ Affiliate network</strong>, one of the largest and most established
            affiliate platforms. When a retailer shares their product feed, we parse the
            material composition field of every item and calculate what percentage of the fabric
            is composed of natural fibers — cotton, wool, linen, silk, hemp, cashmere, alpaca,
            bamboo, jute, and others.
          </p>
          <p className="mt-3">
            Products that pass the 70% threshold are added to our catalog with their fiber
            breakdown displayed clearly on the product card. Products that don&rsquo;t pass are
            discarded automatically — no exceptions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">What we are — and aren&rsquo;t</h2>
          <p>
            Irving Street is a <strong>curated directory</strong>, not a retailer. We
            don&rsquo;t sell anything directly. When you click through to a product, you land on
            the retailer&rsquo;s own website and purchase directly from them. We earn a small
            commission on qualifying purchases — this is explained fully in our{" "}
            <Link href="/affiliate-disclosure" className="underline text-[var(--brand)] hover:text-[var(--brand-light)]">
              affiliate disclosure
            </Link>.
          </p>
          <p className="mt-3">
            We don&rsquo;t accept payment to feature products, and the 70% natural fiber
            threshold is applied equally to every item regardless of which retailer it comes from.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Why natural fibers?</h2>
          <p>
            We&rsquo;re not here to lecture — the reasons people prefer natural fibers are
            personal and varied. Some people have sensitive skin that reacts to synthetic
            materials. Others prefer the way natural textiles wear and age. Some are motivated
            by the fact that natural fibers are biodegradable and generally have a different
            environmental profile than petroleum-derived fabrics.
          </p>
          <p className="mt-3">
            Whatever your reason, our goal is simply to make it easier to act on that preference.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact</h2>
          <p>
            Questions, feedback, or retailer inquiries:{" "}
            <a
              href="mailto:hello@irvingstreet.shop"
              className="underline text-[var(--brand)] hover:text-[var(--brand-light)]"
            >
              hello@irvingstreet.shop
            </a>
          </p>
        </section>

      </div>
    </div>
  );
}
