import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms",
  description: "Basic terms for using the current SOOCLY Alpha and its prototype Camera Look settings.",
};

export default function TermsPage() {
  return (
    <main id="main-content" className="policy-page">
      <section className="policy-hero shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span>Terms</span>
        </nav>
        <p className="eyebrow brand-eyebrow">SOOCLY Alpha</p>
        <h1>Use the Look. Make your own photograph.</h1>
        <p className="policy-hero__lede">
          These terms cover the current SOOCLY Alpha: a visual discovery product with prototype
          camera-specific settings, local Saved Looks, and local My Gear state.
        </p>
        <p className="policy-date">Last updated August 16, 2026</p>
      </section>

      <section className="policy-body shell" aria-label="Terms of use">
        <aside className="policy-summary">
          <span className="policy-summary__mark" aria-hidden="true"><i /><i /></span>
          <strong>The short version</strong>
          <p>SOOCLY gives you a direction to shoot toward. Camera settings are guidance, not a promise of identical results.</p>
        </aside>

        <div className="policy-sections">
          <section>
            <span>01</span>
            <div>
              <h2>Prototype status</h2>
              <p>
                SOOCLY is currently an Alpha product. Features, Look availability, device support,
                settings, routes, and visual examples may change as the product is tested and verified.
              </p>
            </div>
          </section>

          <section>
            <span>02</span>
            <div>
              <h2>Camera settings are guidance</h2>
              <p>
                Camera Look settings are provided for creative and informational use. Results can vary
                with lighting, exposure, firmware, lens behavior, white balance, display conditions,
                subject color, and the way an individual camera processes an image.
              </p>
              <p>
                You are responsible for deciding whether and how to apply any setting to your camera.
                SOOCLY does not guarantee that a recipe will reproduce a reference image exactly.
              </p>
            </div>
          </section>

          <section>
            <span>03</span>
            <div>
              <h2>Prototype versus verified Looks</h2>
              <p>
                A Look marked as prototype is not a claim of verified real-camera output. Where SOOCLY
                later marks a Look Variant as verified, that status should be supported by real camera
                testing and clear device attribution. Prototype reference photography and browser visual
                treatments must not be read as proof of exact camera output.
              </p>
            </div>
          </section>

          <section>
            <span>04</span>
            <div>
              <h2>Photography and ownership</h2>
              <p>
                Photographs, brand assets, interface design, written material, and other content may have
                different owners and licenses. Displaying an image in SOOCLY does not transfer ownership
                of that image to a visitor. Third-party photography remains subject to the rights and
                licenses of its respective owner or source.
              </p>
              <p>
                You retain ownership of photographs you make with your own camera. A SOOCLY Look is a
                creative direction and device implementation; it does not claim ownership over your final photograph.
              </p>
            </div>
          </section>

          <section>
            <span>05</span>
            <div>
              <h2>Reasonable use</h2>
              <p>
                You may use the product to discover Looks, reference settings, save Looks locally, and
                organize supported cameras. Do not misrepresent SOOCLY prototype content as verified
                camera testing, impersonate the SOOCLY brand, or redistribute the site itself as though
                it were your own service.
              </p>
            </div>
          </section>

          <section>
            <span>06</span>
            <div>
              <h2>Availability and changes</h2>
              <p>
                Because this is an Alpha, the service may be changed, interrupted, removed, or rebuilt
                without preserving every piece of browser-local state. Keep any camera settings you rely
                on somewhere appropriate for your own workflow.
              </p>
            </div>
          </section>

          <section>
            <span>07</span>
            <div>
              <h2>Limits of responsibility</h2>
              <p>
                Use of the Alpha is at your own discretion. To the extent permitted by applicable law,
                SOOCLY is not responsible for lost browser-local data, missed photographs, camera
                configuration mistakes, or creative results that differ from a reference direction.
              </p>
            </div>
          </section>

          <section>
            <span>08</span>
            <div>
              <h2>Changes to these terms</h2>
              <p>
                These terms will be updated when the actual product changes materially, especially if
                accounts, submissions, payments, creator programs, or other new services are introduced.
                The latest revision date will appear at the top of this page.
              </p>
            </div>
          </section>
        </div>
      </section>

      <section className="policy-ending shell">
        <p className="eyebrow brand-eyebrow">Choose → Set → Shoot</p>
        <h2>The recipe is a starting point. The photograph is yours.</h2>
        <div className="policy-ending__actions">
          <Link href="/looks">Explore Looks <span aria-hidden="true">↗</span></Link>
          <Link href="/about">Why SOOCLY <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </main>
  );
}
