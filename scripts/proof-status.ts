import { devices, lookVariants, looks } from "../lib/demo-data";
import { getVerificationProgress } from "../lib/verification-data";

function yesNo(value: boolean) {
  return value ? "yes" : "pending";
}

function readinessLabel(canStartTesting: boolean, canBeVerified: boolean) {
  if (canBeVerified) return "READY FOR VERIFIED";
  if (canStartTesting) return "READY FOR TESTING";
  return "PROTOTYPE";
}

const rows = lookVariants.map((variant) => {
  const look = looks.find((item) => item.id === variant.lookId);
  const device = devices.find((item) => item.id === variant.deviceId);
  const progress = getVerificationProgress(variant);

  if (!look || !device) {
    throw new Error(`Broken LookVariant relation: ${variant.id}`);
  }

  return {
    look: look.name,
    camera: device.shortLabel,
    status: variant.status,
    samples: `${progress.sampleCount}/${progress.requiredSampleCount}`,
    split: `${progress.splitPairCount}/${progress.requiredSplitPairCount}`,
    settings: yesNo(progress.settingsValidated),
    rights: yesNo(progress.rightsConfirmed),
    readiness: readinessLabel(progress.canStartTesting, progress.canBeVerified),
  };
});

const widths = {
  look: Math.max("LOOK".length, ...rows.map((row) => row.look.length)),
  camera: Math.max("CAMERA".length, ...rows.map((row) => row.camera.length)),
  status: Math.max("STATUS".length, ...rows.map((row) => row.status.length)),
  samples: Math.max("SAMPLES".length, ...rows.map((row) => row.samples.length)),
  split: Math.max("SPLIT".length, ...rows.map((row) => row.split.length)),
  settings: Math.max("SETTINGS".length, ...rows.map((row) => row.settings.length)),
  rights: Math.max("RIGHTS".length, ...rows.map((row) => row.rights.length)),
};

const header = [
  "LOOK".padEnd(widths.look),
  "CAMERA".padEnd(widths.camera),
  "STATUS".padEnd(widths.status),
  "SAMPLES".padEnd(widths.samples),
  "SPLIT".padEnd(widths.split),
  "SETTINGS".padEnd(widths.settings),
  "RIGHTS".padEnd(widths.rights),
  "READINESS",
].join("  ");

console.log("SOOCLY camera-proof status\n");
console.log(header);
console.log("-".repeat(header.length));

rows.forEach((row) => {
  console.log(
    [
      row.look.padEnd(widths.look),
      row.camera.padEnd(widths.camera),
      row.status.padEnd(widths.status),
      row.samples.padEnd(widths.samples),
      row.split.padEnd(widths.split),
      row.settings.padEnd(widths.settings),
      row.rights.padEnd(widths.rights),
      row.readiness,
    ].join("  "),
  );
});

const prototypeCount = rows.filter((row) => row.status === "prototype").length;
const testingCount = rows.filter((row) => row.status === "testing").length;
const verifiedCount = rows.filter((row) => row.status === "verified").length;
const readyForVerification = lookVariants.filter(
  (variant) => getVerificationProgress(variant).canBeVerified,
).length;

console.log("\nSummary");
console.log(`Variants: ${rows.length}`);
console.log(`Prototype: ${prototypeCount}`);
console.log(`Testing: ${testingCount}`);
console.log(`Verified: ${verifiedCount}`);
console.log(`Proof-complete: ${readyForVerification}`);
