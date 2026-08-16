import type { Metadata } from "next";
import Link from "next/link";
import { MotionReveal } from "@/components/motion-reveal";
import { SavedLooks } from "@/components/saved-looks";

export const metadata: Metadata = {
  title: "Saved Camera Looks",
  description:
    "Return to the SOOCLY Camera Looks you want to shoot. Saved Looks stay local in the Alpha and open the camera-specific version that matches My Gear when available.",
};

export default function SavedPage() {
  return (
    <main id="main-content" className="saved-v1">
      <div className="shell saved-v1__breadcrumb-wrap">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span>Saved</span>
        </nav>
      </div>

      <section className="saved-hero shell" aria-labelledby="saved-page-title">
        <MotionReveal variant="rise" className="saved-hero__copy">
          <p className="eyebrow brand-eyebrow">Keep the visual intent.</p>
          <h1 id="saved-page-title">
            Save the Looks
            <span>you want to shoot.</span>
          </h1>
          <p>
            A shortlist for photographs you have not made yet. Come back, open the version for your
            camera, set it, and go shoot.
          </p>
        </MotionReveal>

        <MotionReveal variant="fade" className="saved-hero__principle">
          <span className="saved-hero__oo" aria-hidden="true"><i /><i /></span>
          <div>
            <small>Saved is visual intent</small>
            <strong>My Gear is the camera.</strong>
            <p>SOOCLY keeps them separate, then connects them when you are ready to shoot.</p>
          </div>
        </MotionReveal>
      </section>

      <SavedLooks />

      <section className="saved-ending shell" aria-labelledby="saved-ending-title">
        <MotionReveal variant="rise">
          <p className="eyebrow brand-eyebrow">Less editing. More shooting.</p>
          <h2 id="saved-ending-title">A saved Look is only useful if it gets you back outside.</h2>
          <div className="saved-ending__actions">
            <Link href="/looks">Find another Look ↗</Link>
            <Link className="saved-ending__secondary" href="/my-gear">Manage My Gear</Link>
          </div>
        </MotionReveal>
      </section>
    </main>
  );
}
