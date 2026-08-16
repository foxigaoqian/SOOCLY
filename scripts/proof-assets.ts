import fs from "node:fs";
import path from "node:path";
import { lookVariants } from "../lib/demo-data";
import { verificationEvidence } from "../lib/verification-manifest";
import type { CameraProofImage } from "../lib/types";

const root = process.cwd();
const publicRoot = path.join(root, "public");
const errors: string[] = [];
let assetCount = 0;

function checkAsset(variantId: string, image: CameraProofImage) {
  assetCount += 1;
  const expectedPrefix = `/proof/${variantId}/`;

  if (!image.src.startsWith(expectedPrefix)) {
    errors.push(
      `[${variantId}] ${image.id}: proof media must live under ${expectedPrefix}; received ${image.src}.`,
    );
    return;
  }

  if (/^https?:\/\//i.test(image.src) || image.src.includes("..")) {
    errors.push(`[${variantId}] ${image.id}: remote or parent-traversal proof paths are not allowed.`);
    return;
  }

  const extension = path.extname(image.src).toLowerCase();
  if (extension !== ".jpg" && extension !== ".jpeg") {
    errors.push(
      `[${variantId}] ${image.id}: real-camera proof must reference a JPEG file; received ${extension || "no extension"}.`,
    );
  }

  const relativePath = image.src.replace(/^\/+/, "");
  const absolutePath = path.join(publicRoot, relativePath);

  if (!fs.existsSync(absolutePath)) {
    errors.push(`[${variantId}] ${image.id}: missing file public/${relativePath}.`);
  }
}

const knownVariantIds = new Set(lookVariants.map((variant) => variant.id));

Object.entries(verificationEvidence).forEach(([variantId, evidence]) => {
  if (!knownVariantIds.has(variantId)) {
    errors.push(`[${variantId}] manifest entry does not match a current LookVariant.`);
  }

  evidence.sampleImages.forEach((image) => checkAsset(variantId, image));
  evidence.splitPairs.forEach((pair) => {
    checkAsset(variantId, pair.defaultImage);
    checkAsset(variantId, pair.lookImage);
  });
});

if (errors.length > 0) {
  throw new Error(`Invalid SOOCLY proof assets:\n${errors.join("\n")}`);
}

console.log(`SOOCLY proof assets: ${assetCount} manifest-referenced JPEG file(s) validated.`);
