import Image from "next/image";
import Link from "next/link";
import styles from "@/components/look-card.module.css";
import { getLookProofState } from "@/lib/look-proof-state";
import type { Device, Look } from "@/lib/types";

export function LookCard({
  look,
  device,
  priority = false,
}: {
  look: Look;
  device?: Device;
  priority?: boolean;
}) {
  const href = device ? `/looks/${look.slug}?device=${device.id}` : `/looks/${look.slug}`;
  const proof = getLookProofState(look, device);
  const badgeToneClass =
    proof.tone === "verified"
      ? styles.verified
      : proof.tone === "testing"
        ? styles.testing
        : styles.prototype;

  return (
    <article className="look-card">
      <Link className="look-card__image" href={href} aria-label={`Open ${look.name}`}>
        <Image
          src={proof.imageSrc ?? look.coverImage}
          alt={proof.imageAlt ?? `Prototype visual reference for the ${look.name} look`}
          fill
          priority={priority}
          sizes="(max-width: 720px) 94vw, (max-width: 1100px) 47vw, 31vw"
          style={proof.imageFilter ? { filter: proof.imageFilter } : undefined}
        />
        <span className={`${styles.proofBadge} ${badgeToneClass}`}>
          {proof.label}
        </span>
        <span className="look-card__hover" aria-hidden="true">View Look ↗</span>
      </Link>
      <div className="look-card__body">
        <div className="look-card__title-row">
          <div>
            <p className="eyebrow">{look.kicker}</p>
            <h3><Link href={href}>{look.name}</Link></h3>
          </div>
          {device ? <span className="look-card__device">{device.shortLabel}</span> : null}
        </div>
        <p>{look.summary}</p>
        <div className="tag-row" aria-label="Look tags">
          {look.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
