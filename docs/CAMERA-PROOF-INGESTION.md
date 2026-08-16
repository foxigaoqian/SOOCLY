# Camera Proof Ingestion

Use this when real camera-output files arrive. The product already renders rights-cleared evidence automatically; this file only defines the minimum data entry shape.

## 1. Add Look samples

Add real straight-out-of-camera Look images to the matching `verificationEvidence` entry in `lib/verification-data.ts`.

```ts
sampleImages: [
  {
    id: "tokyo-midnight-x100vi-sample-01",
    src: "/proof/tokyo-midnight/x100vi/sample-01.jpg",
    alt: "Tokyo Midnight camera sample on a neon street at night",
    deviceId: "fuji-x100vi",
    role: "look-sample",
    creator: "Photographer name",
    rights: "SOOCLY web use confirmed",
    capturedAt: "2026-08-16",
    scene: "Neon street",
  },
],
```

Do not add edited exports as camera proof. Keep the file tied to the device that actually captured it.

## 2. Add same-scene Split pairs

Default and Look must be two distinct camera-output files from the same scene and camera.

```ts
splitPairs: [
  {
    id: "tokyo-midnight-x100vi-split-01",
    scene: "Convenience store exterior",
    defaultImage: {
      id: "tokyo-midnight-x100vi-split-01-default",
      src: "/proof/tokyo-midnight/x100vi/split-01-default.jpg",
      alt: "Default X100VI output at a convenience store at night",
      deviceId: "fuji-x100vi",
      role: "default",
      creator: "Photographer name",
      rights: "SOOCLY web use confirmed",
    },
    lookImage: {
      id: "tokyo-midnight-x100vi-split-01-look",
      src: "/proof/tokyo-midnight/x100vi/split-01-look.jpg",
      alt: "Tokyo Midnight X100VI output at the same convenience store",
      deviceId: "fuji-x100vi",
      role: "look",
      creator: "Photographer name",
      rights: "SOOCLY web use confirmed",
    },
  },
],
```

## 3. Move through proof states

- `prototype`: no public camera-proof claim.
- `testing`: real proof activity has started. Use only after at least one valid sample, one valid Split pair, or settings validation exists.
- `verified`: use only after all gates pass.

Current Verified gate:

- at least 6 valid real Look samples
- at least 3 valid same-scene Default → Look pairs
- `settingsValidated: true`
- `rightsConfirmed: true`

## 4. What CI now rejects

A production build fails if evidence references a nonexistent LookVariant, uses the wrong device, uses the wrong image role, duplicates sample/pair IDs, reuses the same image ID for both sides of a Split, omits required image metadata, marks `testing` without evidence, or marks `verified` before the proof gate passes.

`rightsConfirmed: false` keeps collected proof media private even while testing data is present.
