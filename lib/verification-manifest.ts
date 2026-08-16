import rawManifest from "@/proof/manifest.json";
import type { ProofManifest, VariantVerificationEvidence } from "@/lib/types";

const manifest = rawManifest as ProofManifest;

if (manifest.version !== 1) {
  throw new Error(`Unsupported SOOCLY proof manifest version: ${String(manifest.version)}`);
}

const verificationEvidence: Record<string, VariantVerificationEvidence> = {};

manifest.variants.forEach((entry) => {
  if (verificationEvidence[entry.variantId]) {
    throw new Error(`Duplicate SOOCLY proof manifest entry: ${entry.variantId}`);
  }

  verificationEvidence[entry.variantId] = entry;
});

export { manifest as proofManifest, verificationEvidence };
