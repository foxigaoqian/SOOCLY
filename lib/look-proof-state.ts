import { getVariantsForLook } from "@/lib/demo-data";
import type { Device, Look } from "@/lib/types";
import {
  getRenderableCameraProof,
  isPubliclyVerified,
} from "@/lib/verification-data";

export type LookProofTone = "prototype" | "testing" | "verified";

export type LookProofState = {
  label: string;
  tone: LookProofTone;
  imageSrc?: string;
  imageAlt?: string;
};

export function getLookProofState(look: Look, device?: Device): LookProofState {
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
