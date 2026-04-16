import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-stone-200 bg-white sticky top-0 z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight text-[var(--brand)]">
            Irving Street
          </Link>
          <nav className="flex items-center gap-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-[var(--brand)] transition-colors">
              Shop
            </Link>
            <Link href="/about" className="hover:text-[var(--brand)] transition-colors">
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
