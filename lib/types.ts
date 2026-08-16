export type Device = {
  id: string;
  brand: string;
  model: string;
  brandSlug: string;
  modelSlug: string;
  shortLabel: string;
  ecosystemTerm: string;
  description: string;
};

export type Setting = {
  label: string;
  value: string;
};

export type Look = {
  id: string;
  slug: string;
  name: string;
  kicker: string;
  summary: string;
  creator: string;
  coverImage: string;
  previewFilter: string;
  tags: string[];
  accent: string;
};

export type VerificationStatus = "prototype" | "testing" | "verified";

export type CameraProofImage = {
  id: string;
  src: string;
  alt: string;
  deviceId: string;
  role: "look-sample" | "default" | "look";
  source: "real-camera-output";
  creator: string;
  rights: string;
  capturedAt: string;
  scene?: string;
};

export type SameSceneProofPair = {
  id: string;
  defaultImage: CameraProofImage;
  lookImage: CameraProofImage;
  scene: string;
};

export type VariantVerificationEvidence = {
  variantId: string;
  settingsValidated: boolean;
  rightsConfirmed: boolean;
  testedBy?: string;
  testedAt?: string;
  settingsVersion?: string;
  sampleImages: CameraProofImage[];
  splitPairs: SameSceneProofPair[];
  notes: string[];
};

export type ProofManifest = {
  version: 1;
  variants: VariantVerificationEvidence[];
};

export type LookVariant = {
  id: string;
  lookId: string;
  deviceId: string;
  status: VerificationStatus;
  settingsLabel: string;
  settings: Setting[];
  bestFor: string[];
  lighting: string[];
  notes: string[];
};
