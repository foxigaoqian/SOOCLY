import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner shell">
        <Link className="brand" href="/" aria-label="SOOCLY home" translate="no">
          SOOCLY
        </Link>
        <nav className="site-nav" aria-label="Primary navigation">
          <Link href="/#looks">Looks</Link>
          <Link href="/#cameras">Cameras</Link>
          <Link href="/saved">Saved</Link>
        </nav>
      </div>
    </header>
  );
}
