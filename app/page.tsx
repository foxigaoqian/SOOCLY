import Image from "next/image";
import Link from "next/link";
import { BeforeAfter } from "@/components/before-after";
import { CameraPicker } from "@/components/camera-picker";
import { LookCard } from "@/components/look-card";
import { PrototypeNote } from "@/components/prototype-note";
import { devices, looks } from "@/lib/demo-data";

export default function HomePage() {
  const featured = looks[0];

  return (
    <main id="main-content">
      <section className="editorial-hero shell">
        <div className="editorial-hero__copy">
          <p className="eyebrow">Camera Looks for the gear you already own</p>
          <h1>Find your look.</h1>
          <p className="editorial-hero__lede">
            Choose your camera. See the difference. Take the settings outside and shoot it your way.
          </p>
          <CameraPicker devices={devices} />
        </div>

        <Link
          className="editorial-hero__media"
          href="/looks/tokyo-midnight?device=fuji-x100vi"
          aria-label="Explore Tokyo Midnight"
        >
          <Image
            src={featured.coverImage}
            alt="Editorial Tokyo street demo for the Tokyo Midnight prototype"
            fill
            priority
            sizes="(max-width: 900px) 94vw, 1240px"
          />
          <div className="editorial-hero__shade" aria-hidden="true" />
          <div className="editorial-hero__caption">
            <div>
              <span>Featured Look</span>
              <strong>{featured.name}</strong>
            </div>
            <span className="editorial-hero__cta">Explore the Look ↗</span>
          </div>
        </Link>
      </section>

      <div className="shell prototype-note-wrap">
        <PrototypeNote />
      </div>

      <section className="comparison-showcase shell" aria-labelledby="difference-title">
        <div className="center-heading">
          <p className="eyebrow">See the difference</p>
          <h2 id="difference-title">One scene. Two directions.</h2>
          <p>Drag directly across the photograph. The final product will use verified same-scene camera output.</p>
        </div>
        <BeforeAfter
          image={featured.coverImage}
          alt={featured.name}
          filter={featured.previewFilter}
          lookLabel={featured.name}
        />
        <div className="comparison-showcase__footer">
          <span>Fujifilm X100VI</span>
          <Link href="/looks/tokyo-midnight?device=fuji-x100vi">Get this Look ↗</Link>
        </div>
      </section>

      <section className="gallery-section shell" id="looks" aria-labelledby="looks-title">
        <div className="editorial-heading">
          <div>
            <p className="eyebrow">Popular Looks</p>
            <h2 id="looks-title">Looks worth shooting.</h2>
          </div>
          <p>Start with the image. Open a Look only when it makes you want to pick up your camera.</p>
        </div>
        <div className="look-grid">
          {looks.map((look, index) => (
            <LookCard key={look.id} look={look} priority={index < 3} />
          ))}
        </div>
      </section>

      <section className="camera-section" id="cameras" aria-labelledby="cameras-title">
        <div className="shell">
          <div className="center-heading center-heading--dark">
            <p className="eyebrow">Made for your camera</p>
            <h2 id="cameras-title">Same Look. Your gear.</h2>
            <p>SOOCLY keeps the visual idea separate from the device settings, so one Look can be calibrated camera by camera.</p>
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
                </div>
                <div className="camera-tile__bottom">
                  <p>{device.description}</p>
                  <span>Explore {device.shortLabel} ↗</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="brand-statement shell" aria-labelledby="brand-statement-title">
        <p className="eyebrow">SOOCLY</p>
        <h2 id="brand-statement-title">Choose the look before you shoot.</h2>
        <p>No endless preset tweaking. Discover a direction, use the version built for your camera, and make the photograph in the moment.</p>
      </section>
    </main>
  );
}
