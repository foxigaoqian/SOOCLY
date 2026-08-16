"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import proofStyles from "@/components/looks-discovery-proof.module.css";
import { getLookProofState } from "@/lib/look-proof-state";
import type { Device, Look, LookVariant } from "@/lib/types";

const FILTERS = [
  "All",
  "Street",
  "Night",
  "Portrait",
  "Travel",
  "Daylight",
  "Warm",
  "Cinematic",
  "Vintage",
] as const;

type Filter = (typeof FILTERS)[number];

const DISCOVERY_TAGS: Record<string, Filter[]> = {
  "tokyo-midnight": ["Street", "Night", "Cinematic"],
  "golden-sunday": ["Portrait", "Travel", "Warm"],
  "summer-chrome": ["Street", "Travel", "Daylight"],
  "soft-portra": ["Portrait", "Warm", "Vintage"],
  "neon-rain": ["Street", "Night", "Cinematic"],
  "quiet-morning": ["Street", "Daylight", "Vintage"],
};

export function LooksDiscovery({
  looks,
  devices,
  variants,
}: {
  looks: Look[];
  devices: Device[];
  variants: LookVariant[];
}) {
  const [deviceId, setDeviceId] = useState("all");
  const [filter, setFilter] = useState<Filter>("All");

  const compatibleDeviceIdsByLook = useMemo(() => {
    const map = new Map<string, Set<string>>();
    variants.forEach((variant) => {
      const set = map.get(variant.lookId) ?? new Set<string>();
      set.add(variant.deviceId);
      map.set(variant.lookId, set);
    });
    return map;
  }, [variants]);

  const visibleLooks = useMemo(
    () =>
      looks.filter((look) => {
        const deviceMatch =
          deviceId === "all" || compatibleDeviceIdsByLook.get(look.id)?.has(deviceId);
        const filterMatch =
          filter === "All" || DISCOVERY_TAGS[look.slug]?.includes(filter) || false;
        return deviceMatch && filterMatch;
      }),
    [compatibleDeviceIdsByLook, deviceId, filter, looks],
  );

  const activeDevice = devices.find((device) => device.id === deviceId);
  const clearFilters = () => {
    setDeviceId("all");
    setFilter("All");
  };

  return (
    <>
      <section className="looks-hero shell" aria-labelledby="looks-page-title">
        <div className="looks-hero__copy">
          <p className="eyebrow brand-eyebrow">Looks, not presets.</p>
          <h1 id="looks-page-title">
            Find a look
            <span>worth shooting.</span>
          </h1>
          <p>
            Start with the photograph you want to make. Filter by mood, scene, or the camera
            already in your bag.
          </p>
        </div>

        <div className="looks-hero__index" aria-label="Prototype collection summary">
          <div>
            <strong>{looks.length.toString().padStart(2, "0")}</strong>
            <span>Looks</span>
          </div>
          <div>
            <strong>{devices.length.toString().padStart(2, "0")}</strong>
            <span>Cameras</span>
          </div>
          <div className="looks-hero__oo" aria-hidden="true">
            <i />
            <i />
          </div>
        </div>
      </section>

      <section className="looks-marquee shell" aria-label="Look preview strip">
        {looks.slice(0, 4).map((look, index) => (
          <Link
            key={look.id}
            href={`/looks/${look.slug}`}
            className={`looks-marquee__frame looks-marquee__frame--${index + 1}`}
            aria-label={`Open ${look.name}`}
          >
            <Image
              src={look.coverImage}
              alt={`Visual reference for ${look.name}`}
              fill
              priority={index < 2}
              sizes="(max-width: 800px) 80vw, 30vw"
            />
            <span>{look.name}</span>
          </Link>
        ))}
      </section>

      <section className="looks-filter-shell" aria-label="Filter Camera Looks">
        <div className="shell looks-filter-panel">
          <div className="looks-filter-panel__row looks-filter-panel__row--camera">
            <div className="looks-filter-panel__label">
              <span>01</span>
              <div>
                <strong>Your camera</strong>
                <small>Only show Looks that have a version for your gear.</small>
              </div>
            </div>
            <div className="looks-camera-options" role="group" aria-label="Filter by camera">
              <button
                type="button"
                className={deviceId === "all" ? "is-active" : undefined}
                onClick={() => setDeviceId("all")}
                aria-pressed={deviceId === "all"}
              >
                All cameras
              </button>
              {devices.map((device) => (
                <button
                  type="button"
                  key={device.id}
                  className={deviceId === device.id ? "is-active" : undefined}
                  onClick={() => setDeviceId(device.id)}
                  aria-pressed={deviceId === device.id}
                >
                  <span>{device.brand}</span>
                  <strong>{device.model}</strong>
                </button>
              ))}
            </div>
          </div>

          <div className="looks-filter-panel__row">
            <div className="looks-filter-panel__label">
              <span>02</span>
              <div>
                <strong>Mood / scene</strong>
                <small>Start with what you want the photograph to feel like.</small>
              </div>
            </div>
            <div className="looks-filter-chips" role="group" aria-label="Filter by mood or scene">
              {FILTERS.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={filter === item ? "is-active" : undefined}
                  onClick={() => setFilter(item)}
                  aria-pressed={filter === item}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="looks-results shell" aria-labelledby="looks-results-title">
        <div className="looks-results__heading">
          <div>
            <p className="eyebrow brand-eyebrow">
              {activeDevice ? `For ${activeDevice.brand} ${activeDevice.model}` : "The collection"}
            </p>
            <h2 id="looks-results-title">
              {filter === "All" ? "All available Looks." : `${filter} Looks.`}
            </h2>
          </div>
          <div className="looks-results__count" aria-live="polite">
            <strong>{visibleLooks.length.toString().padStart(2, "0")}</strong>
            <span>{visibleLooks.length === 1 ? "Look" : "Looks"}</span>
          </div>
        </div>

        {visibleLooks.length ? (
          <div className="looks-discovery-grid">
            {visibleLooks.map((look, index) => {
              const supportedDevices = devices.filter((device) =>
                compatibleDeviceIdsByLook.get(look.id)?.has(device.id),
              );
              const targetDeviceId =
                deviceId !== "all" && compatibleDeviceIdsByLook.get(look.id)?.has(deviceId)
                  ? deviceId
                  : supportedDevices[0]?.id;
              const href = `/looks/${look.slug}${targetDeviceId ? `?device=${targetDeviceId}` : ""}`;
              const discoveryTags = DISCOVERY_TAGS[look.slug] ?? [];
              const proof = getLookProofState(look, activeDevice);
              const proofToneClass =
                proof.tone === "verified"
                  ? proofStyles.verified
                  : proof.tone === "testing"
                    ? proofStyles.testing
                    : proofStyles.prototype;

              return (
                <article
                  className="looks-discovery-card"
                  key={look.id}
                  style={{ "--look-index": index } as React.CSSProperties}
                >
                  <Link className="looks-discovery-card__media" href={href}>
                    <Image
                      src={proof.imageSrc ?? look.coverImage}
                      alt={proof.imageAlt ?? `Prototype visual reference for ${look.name}`}
                      fill
                      sizes="(max-width: 720px) 94vw, (max-width: 1100px) 47vw, 31vw"
                    />
                    <div className="looks-discovery-card__topline">
                      <span className={`${proofStyles.badge} ${proofToneClass}`}>
                        {proof.label}
                      </span>
                      <span aria-hidden="true">0{index + 1}</span>
                    </div>
                    <div className="looks-discovery-card__hover" aria-hidden="true">
                      <span className="looks-discovery-card__hover-oo"><i /><i /></span>
                      <strong>Open Look</strong>
                      <span>↗</span>
                    </div>
                  </Link>

                  <div className="looks-discovery-card__body">
                    <div className="looks-discovery-card__tags" aria-label="Look categories">
                      {discoveryTags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                    <h3><Link href={href}>{look.name}</Link></h3>
                    <p>{look.summary}</p>
                    <div className="looks-discovery-card__devices" aria-label="Supported cameras">
                      <span>Made for</span>
                      <div>
                        {supportedDevices.map((device) => (
                          <b key={device.id}>{device.shortLabel}</b>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="looks-empty-state">
            <span className="looks-empty-state__mark" aria-hidden="true"><i /><i /></span>
            <p className="eyebrow brand-eyebrow">No match yet</p>
            <h3>No Look fits both filters in this prototype collection.</h3>
            <p>Try another mood, switch cameras, or return to the full collection.</p>
            <button type="button" onClick={clearFilters}>Show all Looks</button>
          </div>
        )}
      </section>

      <section className="looks-closing shell" aria-labelledby="looks-closing-title">
        <div className="looks-closing__mark" aria-hidden="true"><i /><i /></div>
        <div>
          <p className="eyebrow brand-eyebrow">Choose → Set → Shoot</p>
          <h2 id="looks-closing-title">The Look is the destination. Your camera is how you get there.</h2>
        </div>
        <p>
          This collection is still prototype content. As Looks become verified, every page will pair
          the visual direction with real camera-specific settings and proof.
        </p>
      </section>
    </>
  );
}
