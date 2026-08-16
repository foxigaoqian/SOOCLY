import { lookVariants } from "@/lib/demo-data";
import type {
  CameraProofImage,
  LookVariant,
  SameSceneProofPair,
  VariantVerificationEvidence,
  VerificationStatus,
} from "@/lib/types";
import { assertVerificationCoverage } from "@/lib/verification-coverage";
import {
  assertVerificationDataset,
  auditVerificationEvidence,
} from "@/lib/verification-validator";

export const VERIFICATION_REQUIREMENTS = {
  sampleImages: 6,
  splitPairs: 3,
} as const;

function pendingEvidence(
  variantId: string,
  cameraLabel: string,
): VariantVerificationEvidence {
  return {
    variantId,
    settingsValidated: false,
    rightsConfirmed: false,
    sampleImages: [],
    splitPairs: [],
    notes: [
      `Awaiting real ${cameraLabel} camera-output samples.`,
      "Awaiting same-scene Default ↔ Look comparison pairs.",
    ],
  };
}

const verificationEvidence: Record<string, VariantVerificationEvidence> = {
  "tokyo-midnight-x100vi": pendingEvidence(
    "tokyo-midnight-x100vi",
    "Fujifilm X100VI",
  ),
  "tokyo-midnight-griv": pendingEvidence(
    "tokyo-midnight-griv",
    "Ricoh GR IV",
  ),
  "golden-sunday-x100vi": pendingEvidence(
    "golden-sunday-x100vi",
    "Fujifilm X100VI",
  ),
  "summer-chrome-x100vi": pendingEvidence(
    "summer-chrome-x100vi",
    "Fujifilm X100VI",
  ),
  "summer-chrome-griv": pendingEvidence(
    "summer-chrome-griv",
    "Ricoh GR IV",
  ),
  "soft-portra-x100vi": pendingEvidence(
    "soft-portra-x100vi",
    "Fujifilm X100VI",
  ),
  "neon-rain-griv": pendingEvidence(
    "neon-rain-griv",
    "Ricoh GR IV",
  ),
  "quiet-morning-griv": pendingEvidence(
    "quiet-morning-griv",
    "Ricoh GR IV",
  ),
};

// Every LookVariant must have an explicit verification ledger entry. Adding a
// new camera implementation without one now fails CI/build instead of silently
// bypassing the proof system.
assertVerificationCoverage(lookVariants, verificationEvidence);

// This runs whenever the product data is built. A malformed proof entry now
// fails CI/build instead of silently inflating counts or publishing the wrong
// camera, role, or status as evidence.
assertVerificationDataset(
  lookVariants,
  verificationEvidence,
  VERIFICATION_REQUIREMENTS,
);

export type VerificationProgress = {
  status: VerificationStatus;
  sampleCount: number;
  requiredSampleCount: number;
  splitPairCount: number;
  requiredSplitPairCount: number;
  settingsValidated: boolean;
  rightsConfirmed: boolean;
  canStartTesting: boolean;
  canBeVerified: boolean;
};

export type RenderableCameraProof = {
  sampleImages: CameraProofImage[];
  splitPairs: SameSceneProofPair[];
};

export function getVerificationEvidence(variantId: string) {
  return verificationEvidence[variantId];
}

export function getVerificationAudit(variant: LookVariant) {
  return auditVerificationEvidence(
    variant,
    getVerificationEvidence(variant.id),
    VERIFICATION_REQUIREMENTS,
  );
}

export function getRenderableCameraProof(variant: LookVariant): RenderableCameraProof {
  const evidence = getVerificationEvidence(variant.id);

  // Collected/testing media stays private until the entire evidence set has
  // explicit rights confirmation. Structural validation still happens before
  // this gate, so invalid media can never count toward readiness.
  if (!evidence?.rightsConfirmed) {
    return { sampleImages: [], splitPairs: [] };
  }

  const audit = getVerificationAudit(variant);

  return {
    sampleImages: audit.validSampleImages,
    splitPairs: audit.validSplitPairs,
  };
}

export function getVerificationProgress(variant: LookVariant): VerificationProgress {
  const evidence = getVerificationEvidence(variant.id);
  const audit = getVerificationAudit(variant);

  return {
    status: variant.status,
    sampleCount: audit.validSampleImages.length,
    requiredSampleCount: VERIFICATION_REQUIREMENTS.sampleImages,
    splitPairCount: audit.validSplitPairs.length,
    requiredSplitPairCount: VERIFICATION_REQUIREMENTS.splitPairs,
    settingsValidated: evidence?.settingsValidated ?? false,
    rightsConfirmed: evidence?.rightsConfirmed ?? false,
    canStartTesting: audit.canStartTesting,
    canBeVerified: audit.canBeVerified,
  };
}

export function isPubliclyVerified(variant: LookVariant) {
  return variant.status === "verified" && getVerificationProgress(variant).canBeVerified;
}
