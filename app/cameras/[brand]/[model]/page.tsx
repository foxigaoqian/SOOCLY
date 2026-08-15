import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LookCard } from "@/components/look-card";
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
    title: `${device.brand} ${device.model} Looks`,
    description: `Browse prototype Looks and device-specific settings for the ${device.brand} ${device.model}.`,
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

  return (
    <main id="main-content" className="camera-page shell">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/#cameras">Cameras</Link>
        <span aria-hidden="true">/</span>
        <span>{device.brand} {device.model}</span>
      </nav>

      <header className="camera-page__header">
        <div>
          <p className="eyebrow">{device.ecosystemTerm}</p>
          <h1>{device.brand} {device.model}</h1>
          <p>{device.description}</p>
        </div>
        <div className="camera-page__stat" aria-label={`${cameraLooks.length} prototype looks available`}>
          <strong>{cameraLooks.length.toString().padStart(2, "0")}</strong>
          <span>Prototype Looks</span>
        </div>
      </header>

      <PrototypeNote />

      <section className="section section--camera" aria-labelledby="camera-looks-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Calibrated direction</p>
            <h2 id="camera-looks-title">Looks available for {device.shortLabel}</h2>
          </div>
          <p>Each card opens the shared Look with this camera’s implementation selected.</p>
        </div>
        <div className="look-grid">
          {cameraLooks.map((look, index) => (
            <LookCard key={look.id} look={look} device={device} priority={index < 2} />
          ))}
        </div>
      </section>
    </main>
  );
}
