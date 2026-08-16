import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BeforeAfter } from "@/components/before-after";
import { BrandMark } from "@/components/brand-mark";
import { CameraPicker } from "@/components/camera-picker";
import { LookCard } from "@/components/look-card";
import { MotionReveal } from "@/components/motion-reveal";
import { PrototypeNote } from "@/components/prototype-note";
import { devices, looks } from "@/lib/demo-data";
import { SITE_DESCRIPTION } from "@/lib/site-config";
import { buildSocialMetadata } from "@/lib/social-metadata";

const homeTitle = "SOOCLY — Choose the Look Before You Shoot.";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  ...buildSocialMetadata({
    title: homeTitle,
    description: SITE_DESCRIPTION,
    path: "/",
  }),
};

export default function HomePage() {
  const featured = looks[0];

  return (
    <main id="main-content">
      <section className="editorial-hero brand-hero shell">
        <div className="editorial-hero__copy brand-hero__copy">
          <div className="brand-hero__signature" aria-hidden="true">
            <BrandMark />
          </div>
          <p className="eyebrow brand-eyebrow">Straight out of camera. On purpose.</p>
          <h1>
            Choose the look
            <span>before you shoot.</span>
          </h1>
          <p className="editorial-hero__lede brand-hero__lede">
            Find a look you love. Get the version made for your camera. Shoot it straight.
          </p>
          <CameraPicker devices={devices} />
          <p className="brand-hero__micro">Less time fixing photos. More time making them.</p>
        </div>

        <Link
          className="editorial-hero__media brand-hero__media"
          href="/looks/tokyo-midnight?device=fuji-x100vi"
          aria-label="Explore Tokyo Midnight"
        >
          <Image
            src={featured.coverImage}
            alt="Editorial Tokyo street demo for the Tokyo Midnight prototype"
            fill
            priority
            sizes="(max-width: 900px) 94vw, 1240px"
          />
          <div className="editorial-hero__shade" aria-hidden="true" />
          <div className="brand-hero__badge" aria-hidden="true">
            <span className="brand-hero__badge-oo">
              <i />
              <i />
            </span>
            <span>SOOCLY LOOK</span>
          </div>
          <div className="editorial-hero__caption">
            <div>
              <span>Featured Look</span>
              <strong>{featured.name}</strong>
            </div>
            <span className="editorial-hero__cta">Explore the Look ↗</span>
          </div>
        </Link>
      </section>

      <div className="shell prototype-note-wrap">
        <PrototypeNote />
      </div>

      <section className="comparison-story brand-split-story" aria-labelledby="difference-title">
        <div className="comparison-story__sticky shell">
          <MotionReveal variant="rise">
            <div className="center-heading brand-center-heading">
              <p className="eyebrow brand-eyebrow">The SOOCLY Split</p>
              <h2 id="difference-title">Choose it here. Shoot it out there.</h2>
              <p>
                The picture comes first. Drag the split, choose the direction, then take the camera-specific settings with you.
              </p>
            </div>
          </MotionReveal>

          <MotionReveal variant="scale">
            <BeforeAfter
              image={featured.coverImage}
              alt={featured.name}
              filter={featured.previewFilter}
              lookLabel={featured.name}
            />
            <div className="comparison-showcase__footer brand-split-footer">
              <span>Fujifilm X100VI</span>
              <Link href="/looks/tokyo-midnight?device=fuji-x100vi">Make this Look yours ↗</Link>
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="brand-manifesto" aria-labelledby="manifesto-title">
        <div className="shell brand-manifesto__inner">
          <MotionReveal variant="rise">
            <p className="brand-manifesto__kicker">A SOOCLY point of view</p>
            <h2 id="manifesto-title">Less editing.<br />More shooting.</h2>
          </MotionReveal>
          <MotionReveal variant="fade">
            <div className="brand-manifesto__flow" aria-label="SOOCLY workflow">
              <div><span>01</span><strong>Choose</strong><p>Start with the photograph you want to make.</p></div>
              <div><span>02</span><strong>Set</strong><p>Use the Look version built for your camera.</p></div>
              <div><span>03</span><strong>Shoot</strong><p>Make it in the moment. Keep post-processing optional.</p></div>
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="gallery-section shell" id="looks" aria-labelledby="looks-title">
        <MotionReveal variant="rise">
          <div className="editorial-heading">
            <div>
              <p className="eyebrow brand-eyebrow">Looks, not presets</p>
              <h2 id="looks-title">Looks worth shooting.</h2>
            </div>
            <p>
              Start with the image, not a wall of settings. Open a Look when it makes you want to pick up your camera.
            </p>
          </div>
        </MotionReveal>

        <MotionReveal variant="fade">
          <div className="look-grid">
            {looks.map((look) => (
              <LookCard key={look.id} look={look} />
            ))}
          </div>
        </MotionReveal>
      </section>

      <section className="camera-section brand-camera-section" id="cameras" aria-labelledby="cameras-title">
        <div className="shell">
          <MotionReveal variant="rise">
            <div className="center-heading center-heading--dark brand-center-heading">
              <p className="eyebrow">One visual idea. Different cameras.</p>
              <h2 id="cameras-title">One Look. Made for your camera.</h2>
              <p>
                A Look is the destination. Fujifilm and Ricoh use different settings to get there — SOOCLY keeps the idea consistent and the implementation device-specific.
              </p>
            </div>
          </MotionReveal>

          <MotionReveal variant="scale">
            <div className="camera-grid">
              {devices.map((device, index) => (
                <Link
                  className="camera-tile brand-camera-tile"
                  href={`/cameras/${device.brandSlug}/${device.modelSlug}`}
                  key={device.id}
                >
                  <span className="camera-tile__index">0{index + 1}</span>
                  <div>
                    <p className="eyebrow">{device.brand}</p>
                    <h3>{device.model}</h3>
                  </div>
                  <div className="camera-tile__bottom">
                    <p>{device.description}</p>
                    <span>Explore {device.shortLabel} ↗</span>
                  </div>
                </Link>
              ))}
            </div>
          </MotionReveal>
        </div>
      </section>

      <MotionReveal variant="rise">
        <section className="brand-statement brand-ending shell" aria-labelledby="brand-statement-title">
          <div className="brand-ending__mark" aria-hidden="true"><BrandMark /></div>
          <p className="eyebrow brand-eyebrow">Shoot it straight</p>
          <h2 id="brand-statement-title">Pick a Look. Set your camera. Go shoot.</h2>
          <p>SOOCLY should get you away from the screen and back behind the camera.</p>
          <Link className="brand-ending__action" href="/looks">Explore Looks <span aria-hidden="true">↗</span></Link>
        </section>
      </MotionReveal>
    </main>
  );
}
