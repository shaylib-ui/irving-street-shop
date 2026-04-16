import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">

          {/* Brand */}
          <div>
            <p className="text-base font-bold text-[var(--brand)]">Irving Street</p>
            <p className="mt-2 text-xs text-gray-500 leading-relaxed">
              A curated directory of clothing made from natural fibers. Every product shown is
              more than 70% cotton, wool, linen, silk, hemp, or other natural material.
            </p>
          </div>

          {/* Site links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
              Site
            </p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-gray-500 hover:text-[var(--brand)] transition-colors">Shop</Link></li>
              <li><Link href="/about" className="text-gray-500 hover:text-[var(--brand)] transition-colors">About</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
              Legal
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/affiliate-disclosure" className="text-gray-500 hover:text-[var(--brand)] transition-colors">
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-500 hover:text-[var(--brand)] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a href="mailto:hello@irvingstreet.shop" className="text-gray-500 hover:text-[var(--brand)] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-stone-100 pt-6 flex flex-wrap gap-3 items-center justify-between text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} Irving Street. All rights reserved.</p>
          <p>
            Irving Street participates in affiliate programs and earns commissions on qualifying
            purchases.{" "}
            <Link href="/affiliate-disclosure" className="underline hover:text-[var(--brand)]">
              Learn more.
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
