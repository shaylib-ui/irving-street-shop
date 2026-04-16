import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Affiliate Disclosure — Irving Street",
  description:
    "Irving Street participates in affiliate programs and earns commissions on qualifying purchases. Learn how this works.",
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Affiliate Disclosure</h1>
      <p className="text-gray-500 mb-10 text-sm">Last updated: April 16, 2026</p>

      <div className="space-y-8 text-gray-700 leading-relaxed text-sm">

        <section className="rounded-xl border border-amber-200 bg-amber-50 px-6 py-5">
          <p className="font-medium text-amber-900">
            Summary: Irving Street earns a commission when you click a product link and make a
            purchase on the retailer&rsquo;s site. This costs you nothing extra and does not
            influence which products we show — every item must pass our 70% natural fiber
            threshold regardless of commission rate.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Our affiliate relationships</h2>
          <p>
            Irving Street participates in affiliate advertising programs, including the{" "}
            <strong>CJ Affiliate</strong> (Commission Junction) network. These programs are
            designed to provide a means for websites to earn advertising fees by linking to
            participating retailers.
          </p>
          <p className="mt-3">
            When you click a product link on Irving Street and subsequently make a qualifying
            purchase on the retailer&rsquo;s website, we may receive a small commission. The
            commission is paid by the retailer — <strong>it does not add any cost to your
            purchase.</strong>
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            How commissions affect our editorial decisions
          </h2>
          <p>
            They don&rsquo;t. Every product displayed on Irving Street must independently satisfy
            our single, automated criterion: <strong>more than 70% natural fiber content.</strong>{" "}
            Products are added or removed based solely on whether they meet this threshold — not
            based on commission rates, retailer relationships, or any other commercial
            consideration.
          </p>
          <p className="mt-3">
            We do not accept payment from retailers or brands to feature, rank, or highlight
            specific products. We do not have preferred placement arrangements.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">FTC compliance</h2>
          <p>
            In accordance with the U.S. Federal Trade Commission&rsquo;s guidelines on
            endorsements and testimonials (16 CFR Part 255), we disclose that product links on
            this site are affiliate links. This disclosure appears in the footer of every page
            and on this dedicated page.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Third-party pricing and availability</h2>
          <p>
            Product prices, availability, and descriptions are provided by the retailer and may
            change without notice. Irving Street makes no guarantee that prices shown are current
            or accurate. Always verify the price and details on the retailer&rsquo;s website
            before completing a purchase.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Questions</h2>
          <p>
            If you have questions about our affiliate relationships or how this site works,
            please read our{" "}
            <Link href="/about" className="underline text-[var(--brand)] hover:text-[var(--brand-light)]">
              About page
            </Link>{" "}
            or contact us at{" "}
            <a href="mailto:hello@irvingstreet.shop" className="underline text-[var(--brand)] hover:text-[var(--brand-light)]">
              hello@irvingstreet.shop
            </a>.
          </p>
        </section>

      </div>
    </div>
  );
}
