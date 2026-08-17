"use client";

import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { devices, getLooksForDevice } from "@/lib/demo-data";
import {
  clearGearDevices,
  getGearSnapshot,
  getServerGearSnapshot,
  parseGearSnapshot,
  subscribeGear,
  toggleGearDevice,
} from "@/lib/gear-store";
import { getLookProofState } from "@/lib/look-proof-state";

export function MyGear() {
  const snapshot = useSyncExternalStore(
    subscribeGear,
    getGearSnapshot,
    getServerGearSnapshot,
  );
  const savedDeviceIds = parseGearSnapshot(snapshot);
  const savedDevices = devices.filter((device) => savedDeviceIds.includes(device.id));
  const availableDevices = devices.filter((device) => !savedDeviceIds.includes(device.id));

  return (
    <>
      <section className="my-gear-hero shell" aria-labelledby="my-gear-title">
        <div className="my-gear-hero__copy">
          <p className="eyebrow brand-eyebrow">Your cameras. Your Looks.</p>
          <h1 id="my-gear-title">
            Keep discovery focused
            <span>on the gear you carry.</span>
          </h1>
          <p>
            Save the cameras you actually shoot with. SOOCLY can then keep the path from visual
            idea to camera-specific settings short and useful.
          </p>
        </div>

        <div className="my-gear-hero__summary" aria-label="Saved gear summary">
          <strong>{savedDevices.length.toString().padStart(2, "0")}</strong>
          <span>{savedDevices.length === 1 ? "Camera saved" : "Cameras saved"}</span>
          <div className="my-gear-hero__oo" aria-hidden="true"><i /><i /></div>
        </div>
      </section>

      {savedDevices.length ? (
        <section className="my-gear-saved shell" aria-labelledby="your-cameras-title">
          <div className="my-gear-heading">
            <div>
              <p className="eyebrow brand-eyebrow">Your cameras</p>
              <h2 id="your-cameras-title">Ready when you are.</h2>
            </div>
            <button className="my-gear-clear" type="button" onClick={clearGearDevices}>
              Clear My Gear
            </button>
          </div>

          <div className="my-gear-device-grid">
            {savedDevices.map((device) => {
              const cameraLooks = getLooksForDevice(device.id);
              const primary = cameraLooks[0];
              const secondary = cameraLooks[1] ?? primary;
              const primaryProof = primary ? getLookProofState(primary, device) : undefined;
              const secondaryProof = secondary ? getLookProofState(secondary, device) : undefined;
              const proofStates = cameraLooks.map((look) => getLookProofState(look, device));
              const verifiedCount = proofStates.filter((proof) => proof.tone === "verified").length;
              const testingCount = proofStates.filter((proof) => proof.tone === "testing").length;
              const proofLabel =
                cameraLooks.length > 0 && verifiedCount === cameraLooks.length
                  ? `${verifiedCount} verified`
                  : verifiedCount > 0
                    ? `${verifiedCount}/${cameraLooks.length} verified`
                    : testingCount > 0
                      ? `${testingCount} testing`
                      : "Prototype references";
              const href = `/cameras/${device.brandSlug}/${device.modelSlug}`;

              return (
                <article className="my-gear-device" key={device.id}>
                  <Link className="my-gear-device__visual" href={href}>
                    {primary ? (
                      <span className="my-gear-device__image my-gear-device__image--main">
                        <Image
                          src={primaryProof?.imageSrc ?? primary.coverImage}
                          alt={primaryProof?.imageAlt ?? `Prototype visual reference for ${primary.name}`}
                          fill
                          sizes="(max-width: 760px) 92vw, 42vw"
                          style={primaryProof?.imageFilter ? { filter: primaryProof.imageFilter } : undefined}
                        />
                      </span>
                    ) : null}
                    {secondary ? (
                      <span className="my-gear-device__image my-gear-device__image--secondary">
                        <Image
                          src={secondaryProof?.imageSrc ?? secondary.coverImage}
                          alt=""
                          fill
                          sizes="(max-width: 760px) 40vw, 18vw"
                          style={secondaryProof?.imageFilter ? { filter: secondaryProof.imageFilter } : undefined}
                        />
                      </span>
                    ) : null}
                    <span className="my-gear-device__shade" aria-hidden="true" />
                    <span className="my-gear-device__visual-copy">
                      <small>{cameraLooks.length.toString().padStart(2, "0")} Looks · {proofLabel}</small>
                      <strong>Open {device.shortLabel} ↗</strong>
                    </span>
                  </Link>

                  <div className="my-gear-device__body">
                    <div>
                      <p>{device.brand}</p>
                      <h3><Link href={href}>{device.model}</Link></h3>
                      <span>{device.ecosystemTerm}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleGearDevice(device.id)}
                      aria-label={`Remove ${device.brand} ${device.model} from My Gear`}
                    >
                      Remove
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ) : (
        <section className="my-gear-empty shell" aria-labelledby="my-gear-empty-title">
          <div className="my-gear-empty__mark" aria-hidden="true"><i /><i /></div>
          <p className="eyebrow brand-eyebrow">My Gear is empty</p>
          <h2 id="my-gear-empty-title">Add the camera already in your bag.</h2>
          <p>
            No account is required in this prototype. Your camera choices stay in this browser and
            can be changed at any time.
          </p>
          <div className="my-gear-empty__options">
            {devices.map((device) => (
              <button key={device.id} type="button" onClick={() => toggleGearDevice(device.id)}>
                <span>+</span>
                <strong>{device.brand} {device.model}</strong>
                <small>{getLooksForDevice(device.id).length} Looks available</small>
              </button>
            ))}
          </div>
        </section>
      )}

      {savedDevices.map((device) => {
        const cameraLooks = getLooksForDevice(device.id).slice(0, 3);
        if (!cameraLooks.length) return null;

        return (
          <section className="my-gear-looks shell" key={`looks-${device.id}`} aria-labelledby={`looks-${device.id}`}>
            <div className="my-gear-heading">
              <div>
                <p className="eyebrow brand-eyebrow">Looks for your {device.shortLabel}</p>
                <h2 id={`looks-${device.id}`}>Start with the photograph.</h2>
              </div>
              <Link href={`/cameras/${device.brandSlug}/${device.modelSlug}`}>
                See all {device.shortLabel} Looks ↗
              </Link>
            </div>

            <div className="my-gear-look-grid">
              {cameraLooks.map((look) => {
                const proof = getLookProofState(look, device);
                return (
                  <article className="my-gear-look" key={look.id}>
                    <Link className="my-gear-look__image" href={`/looks/${look.slug}?device=${device.id}`}>
                      <Image
                        src={proof.imageSrc ?? look.coverImage}
                        alt={proof.imageAlt ?? `Prototype visual reference for ${look.name}`}
                        fill
                        sizes="(max-width: 720px) 92vw, 31vw"
                        style={proof.imageFilter ? { filter: proof.imageFilter } : undefined}
                      />
                      <span>{proof.label} · Open Look ↗</span>
                    </Link>
                    <div className="my-gear-look__body">
                      <p>{look.kicker}</p>
                      <h3><Link href={`/looks/${look.slug}?device=${device.id}`}>{look.name}</Link></h3>
                      <small>{device.shortLabel} version · {proof.label}</small>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}

      {availableDevices.length ? (
        <section className="my-gear-add-more shell" aria-labelledby="add-more-gear-title">
          <div>
            <p className="eyebrow brand-eyebrow">Add another camera</p>
            <h2 id="add-more-gear-title">Shoot with more than one system?</h2>
          </div>
          <div className="my-gear-add-more__options">
            {availableDevices.map((device) => (
              <button key={device.id} type="button" onClick={() => toggleGearDevice(device.id)}>
                <span>+</span>
                <strong>{device.brand} {device.model}</strong>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      <section className="my-gear-ending" aria-labelledby="my-gear-ending-title">
        <div className="shell my-gear-ending__inner">
          <div className="my-gear-ending__oo" aria-hidden="true"><i /><i /></div>
          <div>
            <p className="eyebrow">Choose → Set → Shoot</p>
            <h2 id="my-gear-ending-title">Less searching. More shooting.</h2>
          </div>
          <Link href="/looks">Explore all Looks ↗</Link>
        </div>
      </section>
    </>
  );
}
