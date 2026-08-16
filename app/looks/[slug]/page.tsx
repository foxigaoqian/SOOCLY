import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BeforeAfter } from "@/components/before-after";
import { BrandMark } from "@/components/brand-mark";
import { SaveLookButton } from "@/components/save-look-button";
import {
  getDeviceById,
  getLook,
  getVariant,
  getVariantsForLook,
  looks,
} from "@/lib/demo-data";

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

  return (
    <main id="main-content" className="look-page look-page--brand">
      <div className="shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/#looks">Looks</Link>
          <span aria-hidden="true">/</span>
          <span>{look.name}</span>
        </nav>
      </div>

      <header className="look-hero shell brand-look-hero">
        <div className="brand-look-hero__mark" aria-hidden="true"><BrandMark /></div>
        <p className="eyebrow brand-eyebrow">A SOOCLY Look · {look.kicker}</p>
        <h1>{look.name}</h1>
        <p className="look-hero__summary">{look.summary}</p>
        <div className="look-hero__meta">
          <span>By {look.creator}</span>
          <span>{device.brand} {device.model}</span>
          <span>Prototype</span>
        </div>
        <SaveLookButton slug={look.slug} />
      </header>

      <section className="look-cover shell brand-look-cover" aria-label={`${look.name} visual direction`}>
        <div className="look-cover__frame">
          <Image
            src={look.coverImage}
            alt={`Editorial demo showing the visual direction for ${look.name}`}
            fill
            priority
            sizes="(max-width: 900px) 94vw, 1240px"
          />
          <div className="look-cover__shade" aria-hidden="true" />
          <div className="brand-look-cover__stamp" aria-hidden="true">
            <span><i /><i /></span>
            <b>SOOCLY LOOK</b>
          </div>
          <div className="look-cover__caption">
            <span>{device.shortLabel}</span>
            <strong>{look.name}</strong>
          </div>
        </div>
      </section>

      <section className="look-comparison shell brand-look-comparison" aria-labelledby="comparison-title">
        <div className="center-heading brand-center-heading">
          <p className="eyebrow brand-eyebrow">The SOOCLY Split</p>
          <h2 id="comparison-title">See it before you shoot it.</h2>
          <p>Drag across the photograph to compare the default direction with {look.name}.</p>
        </div>
        <BeforeAfter
          image={look.coverImage}
          alt={look.name}
          filter={look.previewFilter}
          lookLabel={look.name}
        />
      </section>

      <section className="device-version-section brand-device-version" aria-labelledby="device-version-title">
        <div className="shell device-version-section__inner">
          <div>
            <p className="eyebrow">One Look. Different cameras.</p>
            <h2 id="device-version-title">Made for your gear.</h2>
            <p>The visual idea stays the same. The implementation changes with the camera.</p>
          </div>
          <div className="variant-switcher" aria-label="Choose device version">
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
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="look-details shell" aria-labelledby="settings-title">
        <div className="settings-panel brand-settings-panel">
          <div className="settings-panel__header">
            <div>
              <p className="eyebrow brand-eyebrow">{device.brand} {device.model}</p>
              <h2 id="settings-title">The settings behind the Look.</h2>
            </div>
            <span className="status-chip">Unverified Demo</span>
          </div>
          <dl className="settings-list">
            {variant.settings.map((setting) => (
              <div key={setting.label}>
                <dt>{setting.label}</dt>
                <dd>{setting.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="shooting-panel" aria-label="How to use this Look">
          <div>
            <p className="eyebrow">Best for</p>
            <ul>
              {variant.bestFor.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Lighting</p>
            <ul>
              {variant.lighting.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Shooting notes</p>
            <ul>
              {variant.notes.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </aside>
      </section>

      <section className="look-ending brand-look-ending shell">
        <div className="brand-look-ending__mark" aria-hidden="true"><BrandMark /></div>
        <p className="eyebrow brand-eyebrow">Less editing. More shooting.</p>
        <h2>Love the Look. Set the camera. Go shoot.</h2>
        <SaveLookButton slug={look.slug} />
      </section>
    </main>
  );
}
