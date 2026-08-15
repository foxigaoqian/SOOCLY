import Image from "next/image";
import Link from "next/link";
import { CameraPicker } from "@/components/camera-picker";
import { LookCard } from "@/components/look-card";
import { PrototypeNote } from "@/components/prototype-note";
import { devices, looks } from "@/lib/demo-data";

export default function HomePage() {
  return (
    <main id="main-content">
      <section className="hero shell">
        <div className="hero__copy">
          <p className="eyebrow">Camera Looks, built around your gear</p>
          <h1>Find a Look you want to shoot.</h1>
          <p className="hero__lede">
            Choose your camera first. SOOCLY shows the visual direction, the device-specific settings, and the shooting context in one place.
          </p>
          <CameraPicker devices={devices} />
          <p className="hero__microcopy">No account needed to browse the prototype.</p>
        </div>

        <Link className="hero-contact-sheet" href="/looks/tokyo-midnight?device=fuji-x100vi" aria-label="Open Tokyo Midnight">
          <div className="hero-contact-sheet__topline">
            <span translate="no">SOOCLY / CONTACT 001</span>
            <span>PROTOTYPE</span>
          </div>
          <div className="hero-contact-sheet__frame">
            <Image
              src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1600&q=86"
              alt="Editorial Tokyo street demo for the Tokyo Midnight prototype"
              fill
              priority
              sizes="(max-width: 1050px) 90vw, 54vw"
            />
            <span className="hero-contact-sheet__mark hero-contact-sheet__mark--tl" aria-hidden="true" />
            <span className="hero-contact-sheet__mark hero-contact-sheet__mark--br" aria-hidden="true" />
          </div>
          <div className="hero-contact-sheet__caption">
            <strong>Tokyo Midnight</strong>
            <span>Default ↔ Look</span>
          </div>
        </Link>
      </section>

      <div className="shell">
        <PrototypeNote />
      </div>

      <section className="section shell" id="looks" aria-labelledby="looks-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Start with the picture, not the jargon</p>
            <h2 id="looks-title">Looks worth going outside for.</h2>
          </div>
          <p>Six visual directions to test the discovery experience before we build a giant library.</p>
        </div>
        <div className="look-grid">
          {looks.map((look, index) => (
            <LookCard key={look.id} look={look} priority={index < 2} />
          ))}
        </div>
      </section>

      <section className="section shell" id="cameras" aria-labelledby="cameras-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Alpha devices</p>
            <h2 id="cameras-title">Choose the camera you actually carry.</h2>
          </div>
          <p>SOOCLY keeps the Look separate from the implementation, so the same visual idea can be calibrated for different devices.</p>
        </div>
        <div className="camera-grid">
          {devices.map((device, index) => (
            <Link
              className="camera-tile"
              href={`/cameras/${device.brandSlug}/${device.modelSlug}`}
              key={device.id}
            >
              <span className="camera-tile__index">0{index + 1}</span>
              <div>
                <p className="eyebrow">{device.brand}</p>
                <h3>{device.model}</h3>
                <p>{device.description}</p>
              </div>
              <span className="camera-tile__cta">Explore {device.shortLabel} <span aria-hidden="true">↗</span></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="product-loop shell" aria-labelledby="loop-title">
        <p className="eyebrow">The product loop</p>
        <h2 id="loop-title">See it. Set it. Shoot it. Save what works.</h2>
        <div className="product-loop__steps" aria-label="SOOCLY product flow">
          {[
            ["01", "Choose gear"],
            ["02", "Discover a Look"],
            ["03", "Compare the result"],
            ["04", "Apply settings"],
            ["05", "Save the Look"],
          ].map(([number, label]) => (
            <div key={number}>
              <span>{number}</span>
              <strong>{label}</strong>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
