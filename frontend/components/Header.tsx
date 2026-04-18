import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="border-b border-stone-200 bg-white sticky top-0 z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center shrink-0" aria-label="Irving Street — home">
            <Image
              src="/logo.png"
              alt="Irving Street"
              height={32}
              width={200}
              className="object-contain"
              priority
            />
          </Link>
          <nav className="flex items-center gap-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-[var(--brand)] transition-colors">
              Shop
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
