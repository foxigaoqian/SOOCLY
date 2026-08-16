import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner shell">
        <Link className="brand brand--soocly" href="/" aria-label="SOOCLY home" translate="no">
          <BrandMark compact />
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
