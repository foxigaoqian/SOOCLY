import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found-page shell">
      <div className="not-found-page__mark" aria-hidden="true"><i /><i /></div>
      <p className="eyebrow brand-eyebrow">404 · Frame missed</p>
      <h1>That Look isn&apos;t here.</h1>
      <p className="not-found-page__line">The next one might be.</p>
      <p className="not-found-page__copy">
        The page may have moved, the Look may still be in development, or the URL may simply be off by a frame.
      </p>
      <div className="not-found-page__actions">
        <Link href="/looks">Explore Looks <span aria-hidden="true">↗</span></Link>
        <Link href="/cameras">Browse Cameras <span aria-hidden="true">↗</span></Link>
      </div>
      <div className="not-found-page__code" aria-hidden="true">
        <span>4</span><span className="not-found-page__oo"><i /><i /></span><span>4</span>
      </div>
    </main>
  );
}
