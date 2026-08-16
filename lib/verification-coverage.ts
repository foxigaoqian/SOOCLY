import type {
  LookVariant,
  VariantVerificationEvidence,
} from "@/lib/types";

export function assertVerificationCoverage(
  variants: LookVariant[],
  evidenceByVariant: Record<string, VariantVerificationEvidence>,
) {
  const variantIds = new Set(variants.map((variant) => variant.id));
  const errors: string[] = [];

  variants.forEach((variant) => {
    if (!evidenceByVariant[variant.id]) {
      errors.push(`LookVariant ${variant.id} is missing a verification evidence record.`);
    }
  });

  Object.keys(evidenceByVariant).forEach((variantId) => {
    if (!variantIds.has(variantId)) {
      errors.push(`Verification evidence ${variantId} does not match any LookVariant.`);
    }
  });

  if (errors.length > 0) {
    throw new Error(`Incomplete SOOCLY verification ledger:\n${errors.join("\n")}`);
  }
}
