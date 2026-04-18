import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Irving Street",
  description:
    "Irving Street is a curated clothing directory that only shows products made from more than 70% natural fibers.",
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-8 text-gray-700 leading-relaxed">

        {/* Banner image */}
        <div className="aspect-[1000/356] w-full overflow-hidden rounded-xl bg-stone-100">
          <Image
            src="/irving-street-banner.png"
            alt="Irving Street — Shop Real"
            width={1000}
            height={356}
            className="h-full w-full object-contain"
            priority
          />
        </div>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">OUR MISSION</h2>
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
          <h2 className="text-xl font-semibold text-gray-900 mb-3">How it works</h2>
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
            We filter for cotton, wool, linen, silk, hemp, cashmere, alpaca, bamboo, jute, and
            others, and clearly show fiber composition in each product listing.
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
