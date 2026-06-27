import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-luxe flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow mb-3">404</p>
      <h1 className="h-display text-5xl text-ink sm:text-6xl">This page slipped away</h1>
      <p className="mt-4 max-w-md text-stone">
        The piece you&apos;re looking for may have sold out or moved. Let&apos;s get you back to the
        good stuff.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className="btn-primary">
          Back home
        </Link>
        <Link href="/shop" className="btn-outline">
          Shop the collection
        </Link>
      </div>
    </div>
  );
}
