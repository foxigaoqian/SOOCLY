import type { Metadata } from "next";
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
      <div className="look-page__top shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/#looks">Looks</Link>
          <span aria-hidden="true">/</span>
          <span>{look.name}</span>
        </nav>

        <header className="look-hero">
          <div className="look-hero__copy">
            <p className="eyebrow">{look.kicker}</p>
            <h1>{look.name}</h1>
            <p className="look-hero__summary">{look.summary}</p>
            <div className="look-hero__meta">
              <span>By {look.creator}</span>
              <span>{device.brand} {device.model}</span>
              <span className="status-chip">Prototype</span>
            </div>
            <SaveLookButton slug={look.slug} />
          </div>

          <div className="variant-switcher" aria-label="Choose device version">
            <span className="variant-switcher__label">Device version</span>
            <div className="variant-switcher__links">
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
                    {itemDevice.shortLabel}
                  </Link>
                );
              })}
            </div>
          </div>
        </header>
      </div>

      <section className="comparison-section shell" aria-labelledby="comparison-title">
        <div className="section-heading section-heading--compact">
          <div>
            <p className="eyebrow">Visual proof interaction</p>
            <h2 id="comparison-title">Default ↔ {look.name}</h2>
          </div>
          <p>Drag the control to test the comparison UX.</p>
        </div>
        <BeforeAfter image={look.coverImage} alt={look.name} filter={look.previewFilter} />
      </section>

      <section className="look-details shell" aria-labelledby="settings-title">
        <div className="settings-panel">
          <div className="settings-panel__header">
            <div>
              <p className="eyebrow">{device.brand} {device.model}</p>
              <h2 id="settings-title">{variant.settingsLabel}</h2>
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
    </main>
  );
}
