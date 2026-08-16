import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GearDeviceButton } from "@/components/gear-device-button";
import { MotionReveal } from "@/components/motion-reveal";
import { devices, getLooksForDevice } from "@/lib/demo-data";
import { getLookProofState } from "@/lib/look-proof-state";

export const metadata: Metadata = {
  title: "Supported Cameras",
  description:
    "Find SOOCLY Camera Looks made for supported Fujifilm and Ricoh cameras. Choose your camera first, then discover visual directions built for its in-camera controls.",
};

export default function CamerasPage() {
  const totalLooks = new Set(
    devices.flatMap((device) => getLooksForDevice(device.id).map((look) => look.id)),
  ).size;

  return (
    <main id="main-content" className="cameras-index">
      <section className="cameras-index-hero shell" aria-labelledby="cameras-index-title">
        <MotionReveal variant="rise" className="cameras-index-hero__copy">
          <p className="eyebrow brand-eyebrow">Made for your camera.</p>
          <h1 id="cameras-index-title">
            Find Looks made
            <span>for your gear.</span>
          </h1>
          <p>
            Choose the camera already in your bag. SOOCLY keeps the visual idea consistent,
            then translates it into the controls that camera actually gives you.
          </p>
        </MotionReveal>

        <MotionReveal variant="fade" className="cameras-index-hero__summary">
          <div>
            <strong>{devices.length.toString().padStart(2, "0")}</strong>
            <span>Supported cameras</span>
          </div>
          <div>
            <strong>{totalLooks.toString().padStart(2, "0")}</strong>
            <span>Look directions</span>
          </div>
          <span className="cameras-index-hero__oo" aria-hidden="true"><i /><i /></span>
        </MotionReveal>
      </section>

      <section className="cameras-index-list shell" aria-labelledby="supported-cameras-title">
        <MotionReveal variant="rise">
          <div className="cameras-index-heading">
            <div>
              <p className="eyebrow brand-eyebrow">Supported now</p>
              <h2 id="supported-cameras-title">Pick your camera. Then pick the photograph.</h2>
            </div>
            <p>
              We only show devices that currently have Look Variants in the prototype. No empty
              catalogue cards, no fake coming-soon wall.
            </p>
          </div>
        </MotionReveal>

        <div className="cameras-index-grid">
          {devices.map((device, index) => {
            const cameraLooks = getLooksForDevice(device.id);
            const primary = cameraLooks[0];
            const secondary = cameraLooks[1] ?? primary;
            const tertiary = cameraLooks[2] ?? secondary;
            const primaryProof = primary ? getLookProofState(primary, device) : undefined;
            const secondaryProof = secondary ? getLookProofState(secondary, device) : undefined;
            const tertiaryProof = tertiary ? getLookProofState(tertiary, device) : undefined;
            const proofStates = cameraLooks.map((look) => getLookProofState(look, device));
            const verifiedCount = proofStates.filter((proof) => proof.tone === "verified").length;
            const testingCount = proofStates.filter((proof) => proof.tone === "testing").length;
            const proofLabel =
              cameraLooks.length > 0 && verifiedCount === cameraLooks.length
                ? `${verifiedCount} verified Looks`
                : verifiedCount > 0
                  ? `${verifiedCount}/${cameraLooks.length} verified`
                  : testingCount > 0
                    ? `${testingCount} in testing`
                    : "Prototype references";
            const href = `/cameras/${device.brandSlug}/${device.modelSlug}`;

            return (
              <MotionReveal key={device.id} variant="rise">
                <article className="camera-index-card">
                  <Link
                    className="camera-index-card__visual"
                    href={href}
                    aria-label={`Explore ${device.brand} ${device.model} Looks`}
                  >
                    {primary ? (
                      <span className="camera-index-card__image camera-index-card__image--main">
                        <Image
                          src={primaryProof?.imageSrc ?? primary.coverImage}
                          alt={primaryProof?.imageAlt ?? `Prototype visual reference for ${primary.name}`}
                          fill
                          priority={index === 0}
                          sizes="(max-width: 820px) 92vw, 43vw"
                        />
                      </span>
                    ) : null}
                    {secondary ? (
                      <span className="camera-index-card__image camera-index-card__image--small camera-index-card__image--one">
                        <Image
                          src={secondaryProof?.imageSrc ?? secondary.coverImage}
                          alt=""
                          fill
                          sizes="(max-width: 820px) 38vw, 16vw"
                        />
                      </span>
                    ) : null}
                    {tertiary ? (
                      <span className="camera-index-card__image camera-index-card__image--small camera-index-card__image--two">
                        <Image
                          src={tertiaryProof?.imageSrc ?? tertiary.coverImage}
                          alt=""
                          fill
                          sizes="(max-width: 820px) 38vw, 16vw"
                        />
                      </span>
                    ) : null}
                    <span className="camera-index-card__overlay" aria-hidden="true" />
                    <span className="camera-index-card__stamp" aria-hidden="true"><i /><i /></span>
                    <span className="camera-index-card__visual-label">
                      <small>{cameraLooks.length.toString().padStart(2, "0")} Looks · {proofLabel}</small>
                      <strong>Explore {device.shortLabel} ↗</strong>
                    </span>
                  </Link>

                  <div className="camera-index-card__body">
                    <div className="camera-index-card__identity">
                      <p>{device.brand}</p>
                      <h3><Link href={href}>{device.model}</Link></h3>
                      <span>{device.ecosystemTerm}</span>
                    </div>
                    <p className="camera-index-card__description">{device.description}</p>

                    <div className="camera-index-card__actions">
                      <Link href={href}>See Looks for {device.shortLabel} <span aria-hidden="true">↗</span></Link>
                      <GearDeviceButton deviceId={device.id} label={device.shortLabel} />
                    </div>
                  </div>
                </article>
              </MotionReveal>
            );
          })}
        </div>
      </section>

      <section className="cameras-index-method" aria-labelledby="camera-method-title">
        <div className="shell cameras-index-method__inner">
          <MotionReveal variant="rise" className="cameras-index-method__copy">
            <p className="eyebrow">One Look. Different cameras.</p>
            <h2 id="camera-method-title">The aesthetic is shared. The recipe is not.</h2>
            <p>
              Tokyo Midnight should still feel like Tokyo Midnight whether you shoot Fujifilm or
              Ricoh. SOOCLY changes the implementation to match each camera instead of pretending
              every control system is the same.
            </p>
          </MotionReveal>

          <MotionReveal variant="fade" className="cameras-index-method__steps">
            <div>
              <span>01</span>
              <strong>Choose a Look</strong>
              <p>Start with the photograph you want to make.</p>
            </div>
            <div>
              <span>02</span>
              <strong>Choose your camera</strong>
              <p>Open the Look Variant built for that device.</p>
            </div>
            <div>
              <span>03</span>
              <strong>Shoot it straight</strong>
              <p>Take the direction into the moment instead of fixing it later.</p>
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="cameras-index-ending shell" aria-labelledby="cameras-ending-title">
        <MotionReveal variant="rise">
          <p className="eyebrow brand-eyebrow">Looks, not presets.</p>
          <h2 id="cameras-ending-title">Already know what you want the photo to feel like?</h2>
          <Link href="/looks">Explore all Looks <span aria-hidden="true">↗</span></Link>
        </MotionReveal>
      </section>
    </main>
  );
}
