import Image from "next/image";
import Link from "next/link";
import styles from "@/components/look-card.module.css";
import { getVariantsForLook } from "@/lib/demo-data";
import type { Device, Look } from "@/lib/types";
import {
  getRenderableCameraProof,
  isPubliclyVerified,
} from "@/lib/verification-data";

type ProofTone = "prototype" | "testing" | "verified";

type CardProofState = {
  label: string;
  tone: ProofTone;
  imageSrc?: string;
  imageAlt?: string;
};

function getCardProofState(look: Look, device?: Device): CardProofState {
  const variants = getVariantsForLook(look.id);
  const scopedVariants = device
    ? variants.filter((variant) => variant.deviceId === device.id)
    : variants;
  const verifiedVariants = scopedVariants.filter((variant) =>
    isPubliclyVerified(variant),
  );
  const testingVariants = scopedVariants.filter(
    (variant) => variant.status === "testing",
  );
  const proofVariant =
    verifiedVariants[0] ?? testingVariants[0] ?? scopedVariants[0];
  const proofImage = proofVariant
    ? getRenderableCameraProof(proofVariant).sampleImages[0]
    : undefined;

  if (device) {
    if (verifiedVariants.length > 0) {
      return {
        label: "Verified",
        tone: "verified",
        imageSrc: proofImage?.src,
        imageAlt: proofImage?.alt,
      };
    }

    if (testingVariants.length > 0) {
      return {
        label: "Testing",
        tone: "testing",
        imageSrc: proofImage?.src,
        imageAlt: proofImage?.alt,
      };
    }

    return {
      label: "Prototype",
      tone: "prototype",
      imageSrc: proofImage?.src,
      imageAlt: proofImage?.alt,
    };
  }

  if (
    scopedVariants.length > 1 &&
    verifiedVariants.length > 0 &&
    verifiedVariants.length < scopedVariants.length
  ) {
    return {
      label: `${verifiedVariants.length}/${scopedVariants.length} verified`,
      tone: "verified",
      imageSrc: proofImage?.src,
      imageAlt: proofImage?.alt,
    };
  }

  if (
    scopedVariants.length > 0 &&
    verifiedVariants.length === scopedVariants.length
  ) {
    return {
      label: "Verified",
      tone: "verified",
      imageSrc: proofImage?.src,
      imageAlt: proofImage?.alt,
    };
  }

  if (testingVariants.length > 0) {
    return {
      label: "Testing",
      tone: "testing",
      imageSrc: proofImage?.src,
      imageAlt: proofImage?.alt,
    };
  }

  return {
    label: "Prototype",
    tone: "prototype",
    imageSrc: proofImage?.src,
    imageAlt: proofImage?.alt,
  };
}

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
  const proof = getCardProofState(look, device);
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
