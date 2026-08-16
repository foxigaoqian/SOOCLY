import type {
  CameraProofImage,
  LookVariant,
  SameSceneProofPair,
  VariantVerificationEvidence,
} from "@/lib/types";

export type VerificationRequirements = {
  sampleImages: number;
  splitPairs: number;
};

export type VerificationIssue = {
  severity: "error" | "warning";
  code:
    | "variant-id-mismatch"
    | "duplicate-sample-id"
    | "duplicate-pair-id"
    | "sample-device-mismatch"
    | "sample-role-mismatch"
    | "pair-device-mismatch"
    | "pair-role-mismatch"
    | "pair-image-id-collision"
    | "missing-image-field"
    | "missing-scene"
    | "verified-before-ready"
    | "testing-without-evidence"
    | "ready-for-testing"
    | "ready-for-verification";
  message: string;
};

export type VerificationAudit = {
  issues: VerificationIssue[];
  validSampleImages: CameraProofImage[];
  validSplitPairs: SameSceneProofPair[];
  canStartTesting: boolean;
  canBeVerified: boolean;
};

function hasText(value: string | undefined) {
  return Boolean(value?.trim());
}

function imageHasRequiredFields(image: CameraProofImage) {
  return (
    hasText(image.id) &&
    hasText(image.src) &&
    hasText(image.alt) &&
    hasText(image.creator) &&
    hasText(image.rights)
  );
}

export function auditVerificationEvidence(
  variant: LookVariant,
  evidence: VariantVerificationEvidence | undefined,
  requirements: VerificationRequirements,
): VerificationAudit {
  if (!evidence) {
    return {
      issues: [],
      validSampleImages: [],
      validSplitPairs: [],
      canStartTesting: false,
      canBeVerified: false,
    };
  }

  const issues: VerificationIssue[] = [];

  if (evidence.variantId !== variant.id) {
    issues.push({
      severity: "error",
      code: "variant-id-mismatch",
      message: `Evidence ${evidence.variantId} is attached to variant ${variant.id}.`,
    });
  }

  const sampleIds = new Set<string>();
  const validSampleImages = evidence.sampleImages.filter((image) => {
    let valid = true;

    if (sampleIds.has(image.id)) {
      issues.push({
        severity: "error",
        code: "duplicate-sample-id",
        message: `Duplicate sample image id: ${image.id}.`,
      });
      valid = false;
    }
    sampleIds.add(image.id);

    if (!imageHasRequiredFields(image)) {
      issues.push({
        severity: "error",
        code: "missing-image-field",
        message: `Sample ${image.id || "(missing id)"} is missing src, alt, creator, rights, or id.`,
      });
      valid = false;
    }

    if (image.deviceId !== variant.deviceId) {
      issues.push({
        severity: "error",
        code: "sample-device-mismatch",
        message: `Sample ${image.id} belongs to ${image.deviceId}, expected ${variant.deviceId}.`,
      });
      valid = false;
    }

    if (image.role !== "look-sample") {
      issues.push({
        severity: "error",
        code: "sample-role-mismatch",
        message: `Sample ${image.id} must use role look-sample, received ${image.role}.`,
      });
      valid = false;
    }

    return valid;
  });

  const pairIds = new Set<string>();
  const validSplitPairs = evidence.splitPairs.filter((pair) => {
    let valid = true;

    if (pairIds.has(pair.id)) {
      issues.push({
        severity: "error",
        code: "duplicate-pair-id",
        message: `Duplicate same-scene pair id: ${pair.id}.`,
      });
      valid = false;
    }
    pairIds.add(pair.id);

    if (!hasText(pair.scene)) {
      issues.push({
        severity: "error",
        code: "missing-scene",
        message: `Same-scene pair ${pair.id} needs a scene label.`,
      });
      valid = false;
    }

    if (!imageHasRequiredFields(pair.defaultImage) || !imageHasRequiredFields(pair.lookImage)) {
      issues.push({
        severity: "error",
        code: "missing-image-field",
        message: `Same-scene pair ${pair.id} has an image missing src, alt, creator, rights, or id.`,
      });
      valid = false;
    }

    if (
      pair.defaultImage.deviceId !== variant.deviceId ||
      pair.lookImage.deviceId !== variant.deviceId
    ) {
      issues.push({
        severity: "error",
        code: "pair-device-mismatch",
        message: `Same-scene pair ${pair.id} must use ${variant.deviceId} for both images.`,
      });
      valid = false;
    }

    if (pair.defaultImage.role !== "default" || pair.lookImage.role !== "look") {
      issues.push({
        severity: "error",
        code: "pair-role-mismatch",
        message: `Same-scene pair ${pair.id} must be Default → Look.`,
      });
      valid = false;
    }

    if (pair.defaultImage.id === pair.lookImage.id) {
      issues.push({
        severity: "error",
        code: "pair-image-id-collision",
        message: `Same-scene pair ${pair.id} cannot reuse one image id for Default and Look.`,
      });
      valid = false;
    }

    return valid;
  });

  const canStartTesting =
    evidence.settingsValidated ||
    validSampleImages.length > 0 ||
    validSplitPairs.length > 0;

  const hasStructuralErrors = issues.some((issue) => issue.severity === "error");
  const canBeVerified =
    !hasStructuralErrors &&
    evidence.settingsValidated &&
    evidence.rightsConfirmed &&
    validSampleImages.length >= requirements.sampleImages &&
    validSplitPairs.length >= requirements.splitPairs;

  if (variant.status === "verified" && !canBeVerified) {
    issues.push({
      severity: "error",
      code: "verified-before-ready",
      message: `${variant.id} is marked verified but its proof gate is incomplete.`,
    });
  }

  if (variant.status === "testing" && !canStartTesting) {
    issues.push({
      severity: "error",
      code: "testing-without-evidence",
      message: `${variant.id} is marked testing but has no real proof or validated settings yet.`,
    });
  }

  if (variant.status === "prototype" && canStartTesting) {
    issues.push({
      severity: "warning",
      code: "ready-for-testing",
      message: `${variant.id} has real proof activity and can be promoted to testing when intentional.`,
    });
  }

  if (variant.status !== "verified" && canBeVerified) {
    issues.push({
      severity: "warning",
      code: "ready-for-verification",
      message: `${variant.id} satisfies the proof gate and can be promoted to verified when reviewed.`,
    });
  }

  return {
    issues,
    validSampleImages,
    validSplitPairs,
    canStartTesting,
    canBeVerified,
  };
}

export function assertVerificationDataset(
  variants: LookVariant[],
  evidenceByVariant: Record<string, VariantVerificationEvidence>,
  requirements: VerificationRequirements,
) {
  const variantsById = new Map(variants.map((variant) => [variant.id, variant]));
  const errors: string[] = [];

  Object.entries(evidenceByVariant).forEach(([key, evidence]) => {
    if (key !== evidence.variantId) {
      errors.push(`Evidence key ${key} does not match variantId ${evidence.variantId}.`);
    }

    const variant = variantsById.get(evidence.variantId);
    if (!variant) {
      errors.push(`Evidence ${evidence.variantId} does not match any LookVariant.`);
      return;
    }

    const audit = auditVerificationEvidence(variant, evidence, requirements);
    audit.issues
      .filter((issue) => issue.severity === "error")
      .forEach((issue) => errors.push(`[${variant.id}] ${issue.message}`));
  });

  if (errors.length > 0) {
    throw new Error(`Invalid SOOCLY camera proof data:\n${errors.join("\n")}`);
  }
}
