import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header site-header--v5">
      <div className="site-header__inner shell">
        <Link className="site-header__logo" href="/" aria-label="SOOCLY home">
          <Image src="/soocly-logo.svg" alt="SOOCLY" width={142} height={32} priority />
        </Link>

        <nav className="site-nav site-nav--v5" aria-label="Primary navigation">
          <Link href="/#looks">Looks</Link>
          <Link href="/#cameras">Cameras</Link>
          <Link className="site-nav__saved" href="/saved">Saved</Link>
        </nav>

        <Link className="site-header__cta" href="/#looks">
          <span>Explore Looks</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </header>
  );
}
