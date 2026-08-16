import type {
  LookVariant,
  VariantVerificationEvidence,
  VerificationStatus,
} from "@/lib/types";

export const VERIFICATION_REQUIREMENTS = {
  sampleImages: 6,
  splitPairs: 3,
} as const;

const verificationEvidence: Record<string, VariantVerificationEvidence> = {
  "tokyo-midnight-x100vi": {
    variantId: "tokyo-midnight-x100vi",
    settingsValidated: false,
    rightsConfirmed: false,
    sampleImages: [],
    splitPairs: [],
    notes: [
      "Awaiting real Fujifilm X100VI camera-output samples.",
      "Awaiting same-scene Default ↔ Look comparison pairs.",
    ],
  },
  "tokyo-midnight-griv": {
    variantId: "tokyo-midnight-griv",
    settingsValidated: false,
    rightsConfirmed: false,
    sampleImages: [],
    splitPairs: [],
    notes: [
      "Awaiting real Ricoh GR IV camera-output samples.",
      "Awaiting same-scene Default ↔ Look comparison pairs.",
    ],
  },
};

export type VerificationProgress = {
  status: VerificationStatus;
  sampleCount: number;
  requiredSampleCount: number;
  splitPairCount: number;
  requiredSplitPairCount: number;
  settingsValidated: boolean;
  rightsConfirmed: boolean;
  canBeVerified: boolean;
};

export function getVerificationEvidence(variantId: string) {
  return verificationEvidence[variantId];
}

export function getVerificationProgress(variant: LookVariant): VerificationProgress {
  const evidence = getVerificationEvidence(variant.id);
  const sampleCount = evidence?.sampleImages.length ?? 0;
  const splitPairCount = evidence?.splitPairs.length ?? 0;
  const settingsValidated = evidence?.settingsValidated ?? false;
  const rightsConfirmed = evidence?.rightsConfirmed ?? false;
  const canBeVerified =
    settingsValidated &&
    rightsConfirmed &&
    sampleCount >= VERIFICATION_REQUIREMENTS.sampleImages &&
    splitPairCount >= VERIFICATION_REQUIREMENTS.splitPairs;

  return {
    status: variant.status,
    sampleCount,
    requiredSampleCount: VERIFICATION_REQUIREMENTS.sampleImages,
    splitPairCount,
    requiredSplitPairCount: VERIFICATION_REQUIREMENTS.splitPairs,
    settingsValidated,
    rightsConfirmed,
    canBeVerified,
  };
}

export function isPubliclyVerified(variant: LookVariant) {
  return variant.status === "verified" && getVerificationProgress(variant).canBeVerified;
}
