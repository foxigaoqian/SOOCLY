import { lookVariants } from "@/lib/demo-data";
import type {
  CameraProofImage,
  LookVariant,
  SameSceneProofPair,
  VerificationStatus,
} from "@/lib/types";
import { assertVerificationCoverage } from "@/lib/verification-coverage";
import { verificationEvidence } from "@/lib/verification-manifest";
import {
  assertVerificationDataset,
  auditVerificationEvidence,
} from "@/lib/verification-validator";

export const VERIFICATION_REQUIREMENTS = {
  sampleImages: 6,
  splitPairs: 3,
} as const;

// Every LookVariant must have an explicit verification ledger entry. Adding a
// new camera implementation without one now fails CI/build instead of silently
// bypassing the proof system.
assertVerificationCoverage(lookVariants, verificationEvidence);

// This runs whenever the product data is built. A malformed proof entry now
// fails CI/build instead of silently inflating counts or publishing the wrong
// camera, role, provenance, or status as evidence.
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
