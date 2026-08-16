import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How the SOOCLY Alpha handles browser-local data and basic site delivery information.",
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="policy-page">
      <section className="policy-hero shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span>Privacy</span>
        </nav>
        <p className="eyebrow brand-eyebrow">SOOCLY Alpha</p>
        <h1>Privacy, without the fog.</h1>
        <p className="policy-hero__lede">
          SOOCLY currently keeps your Saved Looks and My Gear choices in your own browser. There is
          no account system, no cloud profile, and no advertising tracker in the current Alpha app.
        </p>
        <p className="policy-date">Last updated August 16, 2026</p>
      </section>

      <section className="policy-body shell" aria-label="Privacy policy">
        <aside className="policy-summary" aria-label="Privacy summary">
          <span className="policy-summary__mark" aria-hidden="true"><i /><i /></span>
          <strong>Current Alpha in one line</strong>
          <p>Your personal SOOCLY state stays on this browser unless the product clearly tells you otherwise.</p>
        </aside>

        <div className="policy-sections">
          <section>
            <span>01</span>
            <div>
              <h2>What SOOCLY stores</h2>
              <p>
                The current Alpha stores two small pieces of product state in browser LocalStorage:
                the cameras you add to <Link href="/my-gear">My Gear</Link> and the Looks you add to
                <Link href="/saved"> Saved</Link>.
              </p>
              <p>
                These records contain SOOCLY device identifiers and Look slugs. They are used only to
                restore your local product choices and make compatible Look links more useful.
              </p>
            </div>
          </section>

          <section>
            <span>02</span>
            <div>
              <h2>No account or cloud sync yet</h2>
              <p>
                The Alpha does not currently provide user accounts or a SOOCLY backend that syncs My
                Gear or Saved Looks between devices. Clearing this browser&apos;s site data, changing
                browsers, or using another device can remove or separate those local choices.
              </p>
            </div>
          </section>

          <section>
            <span>03</span>
            <div>
              <h2>Analytics, ads, and tracking</h2>
              <p>
                The current SOOCLY application code does not implement advertising trackers or a
                behavioral analytics service. If analytics, advertising, or consent-requiring cookies
                are introduced later, this policy and the product experience must be updated to match
                the actual implementation before those systems are treated as part of the public site.
              </p>
            </div>
          </section>

          <section>
            <span>04</span>
            <div>
              <h2>Basic site delivery</h2>
              <p>
                Like other websites, the infrastructure used to deliver SOOCLY may process standard
                technical request information needed to serve pages and protect the service, such as
                network addresses, browser or device information, request timestamps, and requested URLs.
                SOOCLY does not use that statement to claim a separate user-profile system exists.
              </p>
            </div>
          </section>

          <section>
            <span>05</span>
            <div>
              <h2>Your controls</h2>
              <p>
                You can remove individual cameras from My Gear, clear My Gear, remove individual Saved
                Looks, or clear Saved from inside the product. You can also remove SOOCLY LocalStorage
                through your browser&apos;s site-data controls.
              </p>
            </div>
          </section>

          <section>
            <span>06</span>
            <div>
              <h2>Policy changes</h2>
              <p>
                SOOCLY is still an Alpha product. This policy will change if the product starts using
                accounts, cloud sync, analytics, payments, submissions, or other systems that handle
                additional information. The page will show an updated date when that happens.
              </p>
            </div>
          </section>
        </div>
      </section>

      <section className="policy-ending shell">
        <p className="eyebrow brand-eyebrow">Product state, not a profile.</p>
        <h2>Save the camera. Save the Look. Go shoot.</h2>
        <div className="policy-ending__actions">
          <Link href="/my-gear">Open My Gear <span aria-hidden="true">↗</span></Link>
          <Link href="/saved">Open Saved <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </main>
  );
}
