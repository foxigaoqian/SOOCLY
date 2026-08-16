import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CameraLookBrowser } from "@/components/camera-look-browser";
import { GearDeviceButton } from "@/components/gear-device-button";
import { LookCard } from "@/components/look-card";
import { MotionReveal } from "@/components/motion-reveal";
import { PrototypeNote } from "@/components/prototype-note";
import { devices, getDevice, getLooksForDevice } from "@/lib/demo-data";

export function generateStaticParams() {
  return devices.map((device) => ({
    brand: device.brandSlug,
    model: device.modelSlug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string; model: string }>;
}): Promise<Metadata> {
  const { brand, model } = await params;
  const device = getDevice(brand, model);
  if (!device) return {};

  return {
    title: `${device.brand} ${device.model} Camera Looks`,
    description: `Discover SOOCLY Camera Looks made for the ${device.brand} ${device.model}. Browse visual directions, open device-specific settings, and choose the Look before you shoot.`,
  };
}

function getCameraCopy(deviceId: string) {
  if (deviceId === "fuji-x100vi") {
    return {
      eyebrow: "Fujifilm Film Simulation Looks",
      title: "Looks made for your X100VI.",
      lede: "Start with the photograph you want. SOOCLY turns that visual direction into an X100VI-specific implementation you can take straight to the camera.",
      translation: "Film Simulation, white balance, tone, color, grain and the rest of the X100VI recipe controls become the implementation — not the idea itself.",
      systemLabel: "Fujifilm implementation",
    };
  }

  return {
    eyebrow: "Ricoh Image Control Looks",
    title: "Looks made for your GR IV.",
    lede: "Start with the photograph you want. SOOCLY turns that visual direction into a GR IV-specific implementation built for fast, in-camera shooting.",
    translation: "Image Control, white balance, contrast, saturation and the GR IV control set become the implementation — while the Look stays consistent.",
    systemLabel: "Ricoh implementation",
  };
}

export default async function CameraPage({
  params,
}: {
  params: Promise<{ brand: string; model: string }>;
}) {
  const { brand, model } = await params;
  const device = getDevice(brand, model);
  if (!device) notFound();

  const cameraLooks = getLooksForDevice(device.id);
  const featuredLooks = cameraLooks.slice(0, 3);
  const otherDevices = devices.filter((item) => item.id !== device.id);
  const copy = getCameraCopy(device.id);
  const heroPrimary = cameraLooks[0];
  const heroSecondary = cameraLooks[1] ?? cameraLooks[0];

  return (
    <main id="main-content" className="camera-detail-v1">
      <div className="shell camera-detail-v1__breadcrumb-wrap">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/cameras">Cameras</Link>
          <span aria-hidden="true">/</span>
          <span>{device.brand} {device.model}</span>
        </nav>
      </div>

      <section className="camera-detail-hero shell" aria-labelledby="camera-detail-title">
        <MotionReveal variant="rise" className="camera-detail-hero__copy">
          <p className="eyebrow brand-eyebrow">{copy.eyebrow}</p>
          <h1 id="camera-detail-title">{copy.title}</h1>
          <p className="camera-detail-hero__lede">{copy.lede}</p>

          <div className="camera-detail-hero__actions">
            <GearDeviceButton deviceId={device.id} label={device.shortLabel} />
            <Link className="camera-detail-hero__browse" href="#all-looks">
              Browse {device.shortLabel} Looks <span aria-hidden="true">↓</span>
            </Link>
          </div>

          <div className="camera-detail-hero__meta" aria-label="Camera Look availability">
            <div>
              <strong>{cameraLooks.length.toString().padStart(2, "0")}</strong>
              <span>Prototype Looks</span>
            </div>
            <div>
              <strong>{device.shortLabel}</strong>
              <span>{copy.systemLabel}</span>
            </div>
          </div>
        </MotionReveal>

        <MotionReveal variant="scale" className="camera-detail-hero__visual">
          {heroPrimary ? (
            <Link
              href={`/looks/${heroPrimary.slug}?device=${device.id}`}
              className="camera-detail-hero__image camera-detail-hero__image--primary"
              aria-label={`Open ${heroPrimary.name} for ${device.shortLabel}`}
            >
              <Image
                src={heroPrimary.coverImage}
                alt={`Editorial demo for ${heroPrimary.name}`}
                fill
                priority
                sizes="(max-width: 900px) 94vw, 58vw"
              />
              <span className="camera-detail-hero__image-shade" aria-hidden="true" />
              <span className="camera-detail-hero__caption">
                <small>Featured Look</small>
                <strong>{heroPrimary.name}</strong>
              </span>
            </Link>
          ) : null}

          {heroSecondary ? (
            <Link
              href={`/looks/${heroSecondary.slug}?device=${device.id}`}
              className="camera-detail-hero__image camera-detail-hero__image--secondary"
              aria-label={`Open ${heroSecondary.name} for ${device.shortLabel}`}
            >
              <Image
                src={heroSecondary.coverImage}
                alt={`Editorial demo for ${heroSecondary.name}`}
                fill
                sizes="(max-width: 900px) 48vw, 24vw"
              />
              <span className="camera-detail-hero__image-shade" aria-hidden="true" />
              <span className="camera-detail-hero__caption camera-detail-hero__caption--small">
                <small>Another direction</small>
                <strong>{heroSecondary.name}</strong>
              </span>
            </Link>
          ) : null}

          <div className="camera-detail-hero__device-stamp" aria-hidden="true">
            <span className="camera-detail-hero__oo"><i /><i /></span>
            <span>{device.brand}</span>
            <strong>{device.model}</strong>
          </div>
        </MotionReveal>
      </section>

      <div className="shell camera-detail-v1__prototype-note">
        <PrototypeNote />
      </div>

      <section className="camera-featured shell" aria-labelledby="featured-camera-looks">
        <MotionReveal variant="rise">
          <div className="camera-detail-heading">
            <div>
              <p className="eyebrow brand-eyebrow">Start here</p>
              <h2 id="featured-camera-looks">Featured directions for {device.shortLabel}.</h2>
            </div>
            <p>
              These are visual starting points, not popularity rankings. Open a Look to see the version built for {device.shortLabel}.
            </p>
          </div>
        </MotionReveal>

        <MotionReveal variant="fade">
          <div className="look-grid camera-featured__grid">
            {featuredLooks.map((look, index) => (
              <LookCard key={look.id} look={look} device={device} priority={index < 3} />
            ))}
          </div>
        </MotionReveal>
      </section>

      <section className="camera-browser-section" id="all-looks" aria-labelledby="all-camera-looks">
        <div className="shell">
          <MotionReveal variant="rise">
            <div className="camera-detail-heading camera-detail-heading--browser">
              <div>
                <p className="eyebrow brand-eyebrow">All supported Looks</p>
                <h2 id="all-camera-looks">Find the photograph before the settings.</h2>
              </div>
              <p>Filter by the kind of scene you want to shoot, then open the Look that pulls you in.</p>
            </div>
          </MotionReveal>

          <CameraLookBrowser device={device} looks={cameraLooks} />
        </div>
      </section>

      <section className="camera-translation" aria-labelledby="camera-translation-title">
        <div className="shell camera-translation__inner">
          <MotionReveal variant="rise" className="camera-translation__copy">
            <p className="eyebrow">One Look. This camera&apos;s controls.</p>
            <h2 id="camera-translation-title">The Look stays. The implementation changes.</h2>
            <p>{copy.translation}</p>
          </MotionReveal>

          <MotionReveal variant="fade" className="camera-translation__flow">
            <div>
              <span>01</span>
              <strong>Choose</strong>
              <p>Pick the photograph you want to make.</p>
            </div>
            <div>
              <span>02</span>
              <strong>Set</strong>
              <p>Use the Look Variant made for {device.shortLabel}.</p>
            </div>
            <div>
              <span>03</span>
              <strong>Shoot</strong>
              <p>Take the direction into the moment instead of fixing it later.</p>
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="camera-detail-ending shell" aria-labelledby="camera-detail-ending-title">
        <MotionReveal variant="rise">
          <p className="eyebrow brand-eyebrow">Camera Looks made for your gear</p>
          <h2 id="camera-detail-ending-title">Your camera is ready. Pick the Look.</h2>
          <div className="camera-detail-ending__actions">
            <Link href="/looks">Explore the full Look collection ↗</Link>
            {otherDevices.map((item) => (
              <Link key={item.id} className="camera-detail-ending__secondary" href={`/cameras/${item.brandSlug}/${item.modelSlug}`}>
                Also see {item.shortLabel}
              </Link>
            ))}
          </div>
        </MotionReveal>
      </section>
    </main>
  );
}
