import Image from "next/image";
import type { CameraProofImage } from "@/lib/types";
import styles from "./camera-proof-gallery.module.css";

type CameraProofGalleryProps = {
  lookName: string;
  deviceName: string;
  images: CameraProofImage[];
  verified: boolean;
};

function captureMeta(image: CameraProofImage, deviceName: string) {
  return [deviceName, image.scene, image.capturedAt, image.creator].filter(Boolean).join(" · ");
}

export function CameraProofGallery({
  lookName,
  deviceName,
  images,
  verified,
}: CameraProofGalleryProps) {
  if (images.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="camera-proof-gallery-title">
      <div className="shell">
        <div className={styles.heading}>
          <div>
            <p className="eyebrow brand-eyebrow">
              {verified ? "Verified camera output" : "Real camera proof"}
            </p>
            <h2 id="camera-proof-gallery-title">Photos made with {lookName}.</h2>
          </div>
          <p>
            {verified
              ? `These photographs are verified ${deviceName} output made with this Look.`
              : `These are real ${deviceName} camera-output samples currently being used to verify this Look. The Verified label stays off until every proof requirement passes.`}
          </p>
        </div>

        <div className={styles.grid}>
          {images.map((image, index) => (
            <figure className={styles.figure} key={image.id}>
              <div className={styles.media}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 720px) 94vw, (max-width: 1100px) 47vw, 31vw"
                />
                <span className={styles.index} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <figcaption>
                <span>{verified ? "Verified sample" : "Verification sample"}</span>
                <span>{captureMeta(image, deviceName)}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
