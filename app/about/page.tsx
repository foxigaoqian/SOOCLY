import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MotionReveal } from "@/components/motion-reveal";

export const metadata: Metadata = {
  title: "About SOOCLY",
  description:
    "SOOCLY is built around a simple photographic idea: choose the look before you shoot. Discover a visual direction, use the version made for your camera, and spend less time fixing photographs later.",
};

const oldFlow = ["Shoot", "Import", "Edit", "Try presets", "Export"];
const sooclyFlow = ["Choose", "Set", "Shoot"];

export default function AboutPage() {
  return (
    <main id="main-content" className="about-page">
      <section className="about-hero shell" aria-labelledby="about-title">
        <MotionReveal variant="rise" className="about-hero__copy">
          <p className="eyebrow brand-eyebrow">Why SOOCLY exists</p>
          <h1 id="about-title">
            Choose the look
            <span>before you shoot.</span>
          </h1>
          <p className="about-hero__lede">
            Photography gets more interesting when the decision happens before the shutter — not
            after the file reaches an editing app.
          </p>
        </MotionReveal>

        <MotionReveal variant="scale" className="about-hero__visual">
          <div className="about-hero__image">
            <Image
              src="https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1800&q=88"
              alt="Night street photography used as an editorial SOOCLY reference"
              fill
              priority
              sizes="(max-width: 900px) 94vw, 56vw"
            />
            <span className="about-hero__shade" aria-hidden="true" />
            <span className="about-hero__caption">Find the photograph first.</span>
          </div>
          <span className="about-hero__oo" aria-hidden="true"><i /><i /></span>
        </MotionReveal>
      </section>

      <section className="about-shift" aria-labelledby="about-shift-title">
        <div className="shell about-shift__inner">
          <MotionReveal variant="rise" className="about-shift__intro">
            <p className="eyebrow">A different order of operations</p>
            <h2 id="about-shift-title">Move the creative decision forward.</h2>
            <p>
              The usual workflow leaves the visual identity of a photograph unresolved until after
              the moment is gone. SOOCLY moves that decision closer to the act of seeing.
            </p>
          </MotionReveal>

          <div className="about-flow-grid">
            <MotionReveal variant="fade" className="about-flow about-flow--old">
              <div className="about-flow__label">
                <span>After the shutter</span>
                <strong>The familiar workflow</strong>
              </div>
              <div className="about-flow__steps">
                {oldFlow.map((step, index) => (
                  <div key={step}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{step}</strong>
                  </div>
                ))}
              </div>
            </MotionReveal>

            <MotionReveal variant="rise" className="about-flow about-flow--soocly">
              <div className="about-flow__label">
                <span>Before the shutter</span>
                <strong>The SOOCLY workflow</strong>
              </div>
              <div className="about-flow__steps">
                {sooclyFlow.map((step, index) => (
                  <div key={step}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{step}</strong>
                  </div>
                ))}
              </div>
              <p>Choose the direction. Set the camera. Stay in the moment.</p>
            </MotionReveal>
          </div>
        </div>
      </section>

      <section className="about-looks shell" aria-labelledby="about-looks-title">
        <MotionReveal variant="rise" className="about-section-heading">
          <p className="eyebrow brand-eyebrow">Looks, not presets.</p>
          <h2 id="about-looks-title">Start with a photograph, not a settings list.</h2>
          <p>
            A SOOCLY Look is the visual idea: the atmosphere, color relationship, contrast and
            emotional direction you want the photograph to carry. Settings are only the way a
            specific camera gets there.
          </p>
        </MotionReveal>

        <div className="about-look-pair">
          <MotionReveal variant="scale" className="about-look-pair__image about-look-pair__image--one">
            <Image
              src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1400&q=86"
              alt="Tokyo street photography editorial reference"
              fill
              sizes="(max-width: 800px) 92vw, 48vw"
            />
            <span>Tokyo Midnight</span>
          </MotionReveal>
          <MotionReveal variant="scale" className="about-look-pair__image about-look-pair__image--two">
            <Image
              src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1400&q=86"
              alt="Warm daylight photography editorial reference"
              fill
              sizes="(max-width: 800px) 92vw, 38vw"
            />
            <span>Golden Sunday</span>
          </MotionReveal>
        </div>

        <MotionReveal variant="fade" className="about-definition">
          <div>
            <span>01</span>
            <strong>See the Look</strong>
            <p>Decide what kind of photograph you want before thinking about controls.</p>
          </div>
          <div>
            <span>02</span>
            <strong>Choose your camera</strong>
            <p>Open the version translated for the camera already in your bag.</p>
          </div>
          <div>
            <span>03</span>
            <strong>Take it outside</strong>
            <p>Use the settings as a starting point, then react to the real light in front of you.</p>
          </div>
        </MotionReveal>
      </section>

      <section className="about-device" aria-labelledby="about-device-title">
        <div className="shell about-device__inner">
          <MotionReveal variant="rise" className="about-device__copy">
            <p className="eyebrow">One Look. Made for your camera.</p>
            <h2 id="about-device-title">The aesthetic stays. The implementation changes.</h2>
            <p>
              Fujifilm and Ricoh do not expose the same controls, so SOOCLY does not pretend one
              recipe fits both. A Look can stay visually consistent while its camera-specific
              implementation changes underneath.
            </p>
            <Link href="/cameras">See supported cameras <span aria-hidden="true">↗</span></Link>
          </MotionReveal>

          <MotionReveal variant="fade" className="about-device__diagram">
            <div className="about-device__look">
              <span className="about-device__mark" aria-hidden="true"><i /><i /></span>
              <small>Look</small>
              <strong>Tokyo Midnight</strong>
            </div>
            <span className="about-device__connector" aria-hidden="true">→</span>
            <div className="about-device__variants">
              <div>
                <small>Fujifilm</small>
                <strong>X100VI</strong>
                <span>Film Simulation implementation</span>
              </div>
              <div>
                <small>Ricoh</small>
                <strong>GR IV</strong>
                <span>Image Control implementation</span>
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="about-integrity shell" aria-labelledby="about-integrity-title">
        <MotionReveal variant="rise" className="about-integrity__statement">
          <p className="eyebrow brand-eyebrow">Proof matters</p>
          <h2 id="about-integrity-title">A camera Look should earn your trust on a camera.</h2>
        </MotionReveal>

        <MotionReveal variant="fade" className="about-integrity__body">
          <p>
            Prototype imagery can help design the product, but it is not camera proof. SOOCLY will
            not present an AI-generated image, a browser filter, or an unrelated photograph as if
            it were genuine output from a named camera and Look.
          </p>
          <p>
            Verified Look pages are intended to use real camera output, clear device attribution,
            and same-scene comparisons where the result itself is the evidence.
          </p>
          <div className="about-integrity__rule">
            <span aria-hidden="true">✓</span>
            <strong>Real output. Clear attribution. No fake proof.</strong>
          </div>
        </MotionReveal>
      </section>

      <section className="about-closing" aria-labelledby="about-closing-title">
        <div className="shell about-closing__inner">
          <MotionReveal variant="rise">
            <p className="eyebrow">Less editing. More shooting.</p>
            <h2 id="about-closing-title">The point is still the photograph.</h2>
            <p>
              SOOCLY is not trying to make cameras more complicated. It is trying to make the
              visual decision clearer — so you can spend more time noticing light, people, weather
              and timing, and less time trying to rescue intent afterward.
            </p>
            <div className="about-closing__actions">
              <Link href="/looks">Explore Looks <span aria-hidden="true">↗</span></Link>
              <Link className="about-closing__secondary" href="/cameras">Choose your camera</Link>
            </div>
          </MotionReveal>
          <span className="about-closing__mark" aria-hidden="true"><i /><i /></span>
        </div>
      </section>
    </main>
  );
}
