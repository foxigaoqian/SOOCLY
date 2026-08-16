import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BeforeAfter } from "@/components/before-after";
import { BrandMark } from "@/components/brand-mark";
import { CameraProofGallery } from "@/components/camera-proof-gallery";
import { CopySettingsButton } from "@/components/copy-settings-button";
import { LookCard } from "@/components/look-card";
import { MotionReveal } from "@/components/motion-reveal";
import { SaveLookButton } from "@/components/save-look-button";
import { VerificationStatusCard } from "@/components/verification-status-card";
import {
  getDeviceById,
  getLook,
  getVariant,
  getVariantsForLook,
  looks,
} from "@/lib/demo-data";
import {
  getLookShootingGuide,
  getLookTagline,
  getLookVisualReferences,
} from "@/lib/look-detail-data";
import {
  getRenderableCameraProof,
  getVerificationProgress,
  isPubliclyVerified,
} from "@/lib/verification-data";

export function generateStaticParams() {
  return looks.map((look) => ({ slug: look.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const look = getLook(slug);
  if (!look) return {};

  return {
    title: look.name,
    description: `${look.summary} Choose the Look before you shoot, then use the version made for your camera.`,
  };
}

export default async function LookPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ device?: string }>;
}) {
  const { slug } = await params;
  const { device: deviceId } = await searchParams;
  const look = getLook(slug);
  if (!look) notFound();

  const variants = getVariantsForLook(look.id);
  const variant = getVariant(look.id, deviceId);
  if (!variant) notFound();

  const device = getDeviceById(variant.deviceId);
  if (!device) notFound();

  const visualReferences = getLookVisualReferences(look);
  const shootingGuide = getLookShootingGuide(variant);
  const tagline = getLookTagline(look);
  const relatedLooks = looks
    .filter((item) => item.id !== look.id)
    .filter((item) => getVariantsForLook(item.id).some((itemVariant) => itemVariant.deviceId === device.id))
    .slice(0, 3);
  const verification = getVerificationProgress(variant);
  const publicProof = getRenderableCameraProof(variant);
  const primaryProofImage = publicProof.sampleImages[0];
  const splitProof = publicProof.splitPairs[0];
  const hasRealCameraSamples = publicProof.sampleImages.length > 0;
  const isVerified = isPubliclyVerified(variant);
  const statusLabel = isVerified
    ? "Verified"
    : variant.status === "testing"
      ? "Testing · proof in progress"
      : "Prototype · unverified";
  const settingsStatusLabel = isVerified
    ? "Verified camera output"
    : variant.status === "testing"
      ? "Testing · camera proof in progress"
      : "Prototype · calibration pending";
  const coverImage = primaryProofImage?.src ?? look.coverImage;
  const coverAlt = primaryProofImage?.alt ?? `Prototype visual direction for ${look.name}`;
  const coverStateLabel = primaryProofImage
    ? isVerified
      ? "Verified camera output"
      : "Camera proof sample"
    : "Prototype visualization";

  return (
    <main id="main-content" className="look-v1-page">
      <div className="shell look-v1-breadcrumb-wrap">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/looks">Looks</Link>
          <span aria-hidden="true">/</span>
          <span>{look.name}</span>
        </nav>
      </div>

      <header className="look-v1-hero shell">
        <MotionReveal variant="rise" className="look-v1-hero__copy">
          <div className="look-v1-hero__mark" aria-hidden="true">
            <BrandMark />
          </div>
          <p className="eyebrow brand-eyebrow">A SOOCLY Look</p>
          <h1>{look.name}</h1>
          <p className="look-v1-hero__tagline">{tagline}</p>
          <p className="look-v1-hero__summary">{look.summary}</p>

          <div className="look-v1-tags" aria-label="Look tags">
            {look.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>

          <div className="look-v1-hero__actions">
            <SaveLookButton slug={look.slug} />
            <Link className="look-v1-text-action" href="#settings">
              Get {device.shortLabel} settings <span aria-hidden="true">↓</span>
            </Link>
          </div>
        </MotionReveal>

        <MotionReveal variant="fade" className="look-v1-hero__facts">
          <div>
            <span>Creator</span>
            <strong>{look.creator}</strong>
          </div>
          <div>
            <span>Current camera</span>
            <strong>{device.brand} {device.model}</strong>
          </div>
          <div>
            <span>Camera versions</span>
            <strong>{variants.length}</strong>
          </div>
          <div>
            <span>Status</span>
            <strong className={isVerified ? "is-verified" : "is-prototype"}>
              {statusLabel}
            </strong>
          </div>
        </MotionReveal>
      </header>

      <MotionReveal variant="scale">
        <section className="look-v1-cover shell" aria-label={`${look.name} visual direction`}>
          <div className="look-v1-cover__frame">
            <Image
              src={coverImage}
              alt={coverAlt}
              fill
              priority
              sizes="(max-width: 900px) 94vw, 1240px"
              style={primaryProofImage ? undefined : { filter: look.previewFilter }}
            />
            <div className="look-v1-cover__wash" aria-hidden="true" />
            <div className="look-v1-cover__stamp" aria-hidden="true">
              <span className="look-v1-oo"><i /><i /></span>
              <b>SOOCLY LOOK</b>
            </div>
            <div className="look-v1-cover__caption">
              <div>
                <span>Visual direction</span>
                <strong>{look.name}</strong>
              </div>
              <span>{device.shortLabel} · {coverStateLabel}</span>
            </div>
          </div>
        </section>
      </MotionReveal>

      {hasRealCameraSamples ? (
        <CameraProofGallery
          lookName={look.name}
          deviceName={`${device.brand} ${device.model}`}
          images={publicProof.sampleImages}
          verified={isVerified}
        />
      ) : (
        <section className="look-v1-gallery-section" aria-labelledby="visual-story-title">
          <div className="shell">
            <MotionReveal variant="rise">
              <div className="look-v1-section-heading">
                <div>
                  <p className="eyebrow brand-eyebrow">The visual idea</p>
                  <h2 id="visual-story-title">Know the photograph before the settings.</h2>
                </div>
                <p>
                  These images communicate the intended mood, color relationships, and scene types. In this prototype they are reference imagery with browser color treatment — not verified camera output.
                </p>
              </div>
            </MotionReveal>

            <div className={`look-v1-gallery look-v1-gallery--${Math.min(visualReferences.length, 4)}`}>
              {visualReferences.map((item, index) => (
                <MotionReveal key={`${item.src}-${index}`} variant={index === 0 ? "scale" : "rise"}>
                  <figure className={`look-v1-gallery__item look-v1-gallery__item--${item.aspect}`}>
                    <div className="look-v1-gallery__media">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 760px) 94vw, 50vw"
                        style={{ filter: look.previewFilter }}
                      />
                      <span className="look-v1-gallery__index">0{index + 1}</span>
                    </div>
                    <figcaption>
                      <span>{item.label}</span>
                      <span>Prototype reference</span>
                    </figcaption>
                  </figure>
                </MotionReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="look-v1-split-section" aria-labelledby="comparison-title">
        <div className="shell">
          <MotionReveal variant="rise">
            <div className="center-heading brand-center-heading look-v1-split-heading">
              <p className="eyebrow brand-eyebrow">The SOOCLY Split</p>
              <h2 id="comparison-title">Default. Then {look.name}.</h2>
              <p>
                {splitProof
                  ? `This comparison uses a rights-cleared same-scene ${device.model} pair from the camera-proof record.`
                  : "Drag directly across the photograph. Choose the direction first, then take the camera-specific implementation with you."}
              </p>
            </div>
          </MotionReveal>

          <MotionReveal variant="scale">
            <BeforeAfter
              image={look.coverImage}
              alt={look.name}
              filter={look.previewFilter}
              lookLabel={look.name}
              proofPair={splitProof}
              deviceName={`${device.brand} ${device.model}`}
              publiclyVerified={isVerified}
            />
          </MotionReveal>
        </div>
      </section>

      <section className="look-v1-device-section" aria-labelledby="device-version-title">
        <div className="shell look-v1-device-section__inner">
          <MotionReveal variant="rise" className="look-v1-device-section__copy">
            <p className="eyebrow">Choose your camera</p>
            <h2 id="device-version-title">One Look. Made for your camera.</h2>
            <p>
              {look.name} is the visual idea. Each camera gets its own implementation, so switching gear changes the settings — not the destination.
            </p>
          </MotionReveal>

          <MotionReveal variant="fade" className="look-v1-device-switcher" >
            {variants.map((item) => {
              const itemDevice = getDeviceById(item.deviceId);
              if (!itemDevice) return null;
              const isActive = item.id === variant.id;
              return (
                <Link
                  key={item.id}
                  href={`/looks/${look.slug}?device=${item.deviceId}`}
                  className={isActive ? "is-active" : undefined}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span>{itemDevice.brand}</span>
                  <strong>{itemDevice.model}</strong>
                  <small>{isActive ? "Selected" : "Choose camera"}</small>
                </Link>
              );
            })}
          </MotionReveal>
        </div>
      </section>

      <section className="look-v1-settings-section shell" id="settings" aria-labelledby="settings-title">
        <MotionReveal variant="rise" className="look-v1-settings-intro">
          <div>
            <p className="eyebrow brand-eyebrow">{device.brand} {device.model}</p>
            <h2 id="settings-title">{look.name} for {device.model}.</h2>
            <p>{variant.settingsLabel}. Built as a device-specific Look Variant rather than a universal preset.</p>
          </div>
          <div className="look-v1-settings-actions">
            <span className={`look-v1-status ${isVerified ? "is-verified" : "is-prototype"}`}>
              <i /> {settingsStatusLabel}
            </span>
            <CopySettingsButton
              lookName={look.name}
              deviceName={`${device.brand} ${device.model}`}
              settings={variant.settings}
            />
          </div>
        </MotionReveal>

        <MotionReveal variant="fade">
          <div className="look-v1-settings-grid">
            {variant.settings.map((setting, index) => (
              <div className={index < 3 ? "look-v1-setting look-v1-setting--key" : "look-v1-setting"} key={setting.label}>
                <span>{setting.label}</span>
                <strong>{setting.value}</strong>
              </div>
            ))}
          </div>
        </MotionReveal>

        {!isVerified ? (
          <p className="look-v1-settings-note">
            Prototype integrity note: these values are for interface validation and are not claimed as tested {device.model} output. Production release requires real-camera calibration and same-scene proof.
          </p>
        ) : null}
      </section>

      <section className="look-v1-shoot-section" aria-labelledby="shoot-title">
        <div className="shell">
          <MotionReveal variant="rise">
            <div className="look-v1-shoot-heading">
              <p className="eyebrow">How to shoot this Look</p>
              <h2 id="shoot-title">Settings are the start. The scene still matters.</h2>
              <p>Use these notes to recognize the light and situations where {look.name} makes sense before you reach for the shutter.</p>
            </div>
          </MotionReveal>

          <div className="look-v1-guide-grid">
            <MotionReveal variant="rise">
              <article className="look-v1-guide-card look-v1-guide-card--accent">
                <span>01</span><p className="eyebrow">Best for</p>
                <ul>{variant.bestFor.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            </MotionReveal>
            <MotionReveal variant="rise">
              <article className="look-v1-guide-card">
                <span>02</span><p className="eyebrow">Best light</p>
                <ul>{variant.lighting.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            </MotionReveal>
            <MotionReveal variant="rise">
              <article className="look-v1-guide-card look-v1-guide-card--wide">
                <span>03</span><p className="eyebrow">Exposure</p>
                <p>{shootingGuide.exposureAdvice}</p>
              </article>
            </MotionReveal>
            <MotionReveal variant="rise">
              <article className="look-v1-guide-card look-v1-guide-card--wide">
                <span>04</span><p className="eyebrow">Scenes to look for</p>
                <ul>{shootingGuide.sceneSuggestions.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            </MotionReveal>
            <MotionReveal variant="rise">
              <article className="look-v1-guide-card">
                <span>05</span><p className="eyebrow">Color notes</p>
                <p>{shootingGuide.colorNotes}</p>
              </article>
            </MotionReveal>
            <MotionReveal variant="rise">
              <article className="look-v1-guide-card">
                <span>06</span><p className="eyebrow">Avoid</p>
                <p>{shootingGuide.avoid}</p>
              </article>
            </MotionReveal>
          </div>
        </div>
      </section>

      <section className="look-v1-proof-section shell" aria-labelledby="proof-title">
        <MotionReveal variant="scale">
          <VerificationStatusCard
            lookName={look.name}
            deviceName={`${device.brand} ${device.model}`}
            progress={verification}
          />
        </MotionReveal>
      </section>

      {relatedLooks.length > 0 ? (
        <section className="look-v1-related shell" aria-labelledby="related-title">
          <MotionReveal variant="rise">
            <div className="look-v1-section-heading">
              <div>
                <p className="eyebrow brand-eyebrow">Keep looking</p>
                <h2 id="related-title">More Looks for your {device.model}.</h2>
              </div>
              <p>Same camera, different visual directions. Start with the photograph that makes you want to go outside and shoot.</p>
            </div>
          </MotionReveal>
          <div className="look-v1-related-grid">
            {relatedLooks.map((related) => (
              <MotionReveal variant="rise" key={related.id}>
                <LookCard look={related} device={device} />
              </MotionReveal>
            ))}
          </div>
        </section>
      ) : null}

      <section className="look-v1-ending shell">
        <MotionReveal variant="rise">
          <div className="look-v1-ending__mark" aria-hidden="true"><BrandMark /></div>
          <p className="eyebrow brand-eyebrow">Less editing. More shooting.</p>
          <h2>Choose the Look. Set the camera. Go make the photograph.</h2>
          <p>{look.name} is ready to save. The prototype settings stay clearly marked until real-camera verification is complete.</p>
          <div className="look-v1-ending__actions">
            <SaveLookButton slug={look.slug} />
            <Link href="/looks" className="look-v1-text-action">Explore another Look <span aria-hidden="true">↗</span></Link>
          </div>
        </MotionReveal>
      </section>
    </main>
  );
}
