import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BeforeAfter } from "@/components/before-after";
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
    description: `${look.summary} See the prototype comparison and device-specific settings on SOOCLY.`,
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
    <main id="main-content" className="look-page">
      <div className="shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/#looks">Looks</Link>
          <span aria-hidden="true">/</span>
          <span>{look.name}</span>
        </nav>
      </div>

      <header className="look-hero shell">
        <p className="eyebrow">{look.kicker}</p>
        <h1>{look.name}</h1>
        <p className="look-hero__summary">{look.summary}</p>
        <div className="look-hero__meta">
          <span>By {look.creator}</span>
          <span>{device.brand} {device.model}</span>
          <span>Prototype</span>
        </div>
        <SaveLookButton slug={look.slug} />
      </header>

      <section className="look-cover shell" aria-label={`${look.name} visual direction`}>
        <div className="look-cover__frame">
          <Image
            src={look.coverImage}
            alt={`Editorial demo showing the visual direction for ${look.name}`}
            fill
            priority
            sizes="(max-width: 900px) 94vw, 1240px"
          />
          <div className="look-cover__shade" aria-hidden="true" />
          <div className="look-cover__caption">
            <span>{device.shortLabel}</span>
            <strong>{look.name}</strong>
          </div>
        </div>
      </section>

      <section className="look-comparison shell" aria-labelledby="comparison-title">
        <div className="center-heading">
          <p className="eyebrow">See what changes</p>
          <h2 id="comparison-title">Default. Then {look.name}.</h2>
          <p>Drag directly across the photograph to compare the two visual directions.</p>
        </div>
        <BeforeAfter
          image={look.coverImage}
          alt={look.name}
          filter={look.previewFilter}
          lookLabel={look.name}
        />
      </section>

      <section className="device-version-section" aria-labelledby="device-version-title">
        <div className="shell device-version-section__inner">
          <div>
            <p className="eyebrow">Built for your gear</p>
            <h2 id="device-version-title">Choose the camera version.</h2>
            <p>The Look stays the same. The implementation changes with the device.</p>
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
        <div className="settings-panel">
          <div className="settings-panel__header">
            <div>
              <p className="eyebrow">{device.brand} {device.model}</p>
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

      <section className="look-ending shell">
        <p className="eyebrow">Save it for later</p>
        <h2>Love the look. Shoot the look.</h2>
        <SaveLookButton slug={look.slug} />
      </section>
    </main>
  );
}
