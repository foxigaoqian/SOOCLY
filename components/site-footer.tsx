import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner shell">
        <div className="site-footer__brand-block">
          <Link href="/" className="site-footer__logo" aria-label="SOOCLY home">
            <Image src="/soocly-logo.svg" alt="SOOCLY" width={164} height={37} />
          </Link>
          <p className="site-footer__statement">Choose the look before you shoot.</p>
          <p className="site-footer__attitude">Less editing. More shooting.</p>
        </div>

        <div className="site-footer__links" aria-label="Footer navigation">
          <div>
            <p className="site-footer__heading">Explore</p>
            <Link href="/looks">Looks</Link>
            <Link href="/cameras">Cameras</Link>
            <Link href="/my-gear">My Gear</Link>
            <Link href="/saved">Saved</Link>
          </div>
          <div>
            <p className="site-footer__heading">Cameras</p>
            <Link href="/cameras/fujifilm/x100vi">Fujifilm X100VI</Link>
            <Link href="/cameras/ricoh/gr-iv">Ricoh GR IV</Link>
          </div>
          <div className="site-footer__principles">
            <p className="site-footer__heading">SOOCLY</p>
            <span>Looks, not presets.</span>
            <span>Made for your camera.</span>
            <span>Shoot it straight.</span>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom shell">
        <span>© 2026 SOOCLY</span>
        <span className="site-footer__mini-mark" aria-hidden="true">
          <i />
          <i />
        </span>
        <span>Camera Looks made for your gear.</span>
      </div>
    </footer>
  );
}
