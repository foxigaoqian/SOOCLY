"use client";

import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { devices, looks, lookVariants } from "@/lib/demo-data";
import {
  getGearSnapshot,
  getServerGearSnapshot,
  parseGearSnapshot,
  subscribeGear,
} from "@/lib/gear-store";
import {
  clearSavedLooks,
  getSavedSnapshot,
  getServerSavedSnapshot,
  parseSavedSnapshot,
  subscribeSaved,
  toggleSavedLook,
} from "@/lib/saved-store";

export function SavedLooks() {
  const savedSnapshot = useSyncExternalStore(
    subscribeSaved,
    getSavedSnapshot,
    getServerSavedSnapshot,
  );
  const gearSnapshot = useSyncExternalStore(
    subscribeGear,
    getGearSnapshot,
    getServerGearSnapshot,
  );

  const savedSlugs = parseSavedSnapshot(savedSnapshot);
  const gearDeviceIds = parseGearSnapshot(gearSnapshot);
  const savedLooks = looks.filter((look) => savedSlugs.includes(look.slug));
  const gearDevices = devices.filter((device) => gearDeviceIds.includes(device.id));

  const compatibleDeviceIdsByLook = new Map<string, string[]>();
  lookVariants.forEach((variant) => {
    const current = compatibleDeviceIdsByLook.get(variant.lookId) ?? [];
    if (!current.includes(variant.deviceId)) current.push(variant.deviceId);
    compatibleDeviceIdsByLook.set(variant.lookId, current);
  });

  const savedIds = new Set(savedLooks.map((look) => look.id));
  const recommendations = looks
    .filter((look) => {
      if (savedIds.has(look.id)) return false;
      if (gearDeviceIds.length === 0) return true;
      const compatibleIds = compatibleDeviceIdsByLook.get(look.id) ?? [];
      return gearDeviceIds.some((deviceId) => compatibleIds.includes(deviceId));
    })
    .slice(0, 3);

  if (savedLooks.length === 0) {
    return (
      <section className="saved-empty shell" aria-labelledby="saved-empty-title">
        <span className="saved-empty__mark" aria-hidden="true"><i /><i /></span>
        <p className="eyebrow brand-eyebrow">Nothing saved yet</p>
        <h2 id="saved-empty-title">Save the Looks that make you want to go shoot.</h2>
        <p>
          Your shortlist stays in this browser for the Alpha. Save a visual direction now, then
          come back when you are ready to set the camera and make the photograph.
        </p>
        <div className="saved-empty__actions">
          <Link href="/looks">Explore Looks <span aria-hidden="true">↗</span></Link>
          <Link className="saved-empty__secondary" href="/my-gear">Set up My Gear</Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="saved-context shell" aria-label="Saved Look context">
        <div className="saved-context__count">
          <strong>{savedLooks.length.toString().padStart(2, "0")}</strong>
          <span>{savedLooks.length === 1 ? "Saved Look" : "Saved Looks"}</span>
        </div>

        <div className="saved-context__gear">
          <p className="eyebrow brand-eyebrow">My Gear context</p>
          {gearDevices.length ? (
            <div className="saved-context__gear-list">
              {gearDevices.map((device) => (
                <Link key={device.id} href={`/cameras/${device.brandSlug}/${device.modelSlug}`}>
                  {device.shortLabel}
                </Link>
              ))}
              <Link className="saved-context__manage" href="/my-gear">Manage gear ↗</Link>
            </div>
          ) : (
            <p className="saved-context__gear-empty">
              Add a camera to My Gear and Saved will open the matching Look Variant first. {" "}
              <Link href="/my-gear">Add your camera ↗</Link>
            </p>
          )}
        </div>

        <button className="saved-context__clear" type="button" onClick={clearSavedLooks}>
          Clear Saved
        </button>
      </section>

      <section className="saved-collection shell" aria-labelledby="saved-collection-title">
        <div className="saved-section-heading">
          <div>
            <p className="eyebrow brand-eyebrow">Your shortlist</p>
            <h2 id="saved-collection-title">Visual directions worth coming back to.</h2>
          </div>
          <p>Photography first. The camera-specific implementation is one click away.</p>
        </div>

        <div className="saved-grid">
          {savedLooks.map((look, index) => {
            const compatibleIds = compatibleDeviceIdsByLook.get(look.id) ?? [];
            const supportedDevices = devices.filter((device) => compatibleIds.includes(device.id));
            const preferredDevice =
              gearDevices.find((device) => compatibleIds.includes(device.id)) ?? supportedDevices[0];
            const href = `/looks/${look.slug}${preferredDevice ? `?device=${preferredDevice.id}` : ""}`;

            return (
              <article className="saved-card" key={look.id}>
                <Link className="saved-card__media" href={href} aria-label={`Open ${look.name}`}>
                  <Image
                    src={look.coverImage}
                    alt={`Editorial visual reference for ${look.name}`}
                    fill
                    priority={index < 2}
                    sizes="(max-width: 760px) 94vw, 46vw"
                  />
                  <span className="saved-card__shade" aria-hidden="true" />
                  <span className="saved-card__index" aria-hidden="true">0{index + 1}</span>
                  <span className="saved-card__open">
                    Open {preferredDevice ? `for ${preferredDevice.shortLabel}` : "Look"} ↗
                  </span>
                </Link>

                <div className="saved-card__body">
                  <div className="saved-card__title-row">
                    <div>
                      <p className="eyebrow">{look.kicker}</p>
                      <h3><Link href={href}>{look.name}</Link></h3>
                    </div>
                    <button type="button" onClick={() => toggleSavedLook(look.slug)}>
                      Remove
                    </button>
                  </div>

                  <p className="saved-card__summary">{look.summary}</p>

                  <div className="saved-card__bottom">
                    <div className="saved-card__devices">
                      <span>Available for</span>
                      <div>
                        {supportedDevices.map((device) => (
                          <Link
                            key={device.id}
                            className={preferredDevice?.id === device.id ? "is-preferred" : undefined}
                            href={`/looks/${look.slug}?device=${device.id}`}
                          >
                            {device.shortLabel}
                          </Link>
                        ))}
                      </div>
                    </div>
                    {preferredDevice ? (
                      <span className="saved-card__preferred">
                        {gearDeviceIds.includes(preferredDevice.id) ? "Matches My Gear" : "Default camera"}
                      </span>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {recommendations.length ? (
        <section className="saved-next shell" aria-labelledby="saved-next-title">
          <div className="saved-section-heading saved-section-heading--next">
            <div>
              <p className="eyebrow brand-eyebrow">
                {gearDevices.length ? "More for your gear" : "Keep discovering"}
              </p>
              <h2 id="saved-next-title">
                {gearDevices.length ? "A few more Looks that fit your cameras." : "A few more directions to consider."}
              </h2>
            </div>
            <Link href="/looks">See all Looks ↗</Link>
          </div>

          <div className="saved-next__grid">
            {recommendations.map((look) => {
              const compatibleIds = compatibleDeviceIdsByLook.get(look.id) ?? [];
              const preferredDevice =
                gearDevices.find((device) => compatibleIds.includes(device.id)) ??
                devices.find((device) => compatibleIds.includes(device.id));
              const href = `/looks/${look.slug}${preferredDevice ? `?device=${preferredDevice.id}` : ""}`;

              return (
                <Link className="saved-next-card" href={href} key={look.id}>
                  <span className="saved-next-card__media">
                    <Image
                      src={look.coverImage}
                      alt={`Visual reference for ${look.name}`}
                      fill
                      sizes="(max-width: 760px) 82vw, 30vw"
                    />
                  </span>
                  <span className="saved-next-card__copy">
                    <small>{look.kicker}</small>
                    <strong>{look.name}</strong>
                    <span>{preferredDevice ? `${preferredDevice.shortLabel} version` : "Open Look"} ↗</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}
    </>
  );
}
