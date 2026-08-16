# SOOCLY real-camera proof intake

This workflow is the only path from Prototype → Testing → Verified.

## What counts as proof

Proof media must be straight-out-of-camera JPEG output from the exact camera model named by the LookVariant. Reference photography, CSS/browser color treatments, edited exports, AI images, stock imagery, screenshots, and files from another camera do not count.

The proof gate remains:

- at least 6 real Look sample images
- at least 3 same-scene Default ↔ Look pairs
- camera settings validated on the actual camera
- image rights confirmed

## 1. Put the JPEGs in the variant folder

Use the exact LookVariant id from `lib/demo-data.ts`.

Example:

```text
public/proof/tokyo-midnight-x100vi/
  samples/
    01.jpg
    02.jpg
    03.jpg
    04.jpg
    05.jpg
    06.jpg
  pairs/
    01-default.jpg
    01-look.jpg
    02-default.jpg
    02-look.jpg
    03-default.jpg
    03-look.jpg
```

The Look image used in a Split pair may also represent one of the six Look samples; the proof model does not require twelve different Look photographs.

## 2. Add the evidence to `proof/manifest.json`

Every proof image needs:

```json
{
  "id": "tokyo-midnight-x100vi-sample-01",
  "src": "/proof/tokyo-midnight-x100vi/samples/01.jpg",
  "alt": "Night street under mixed storefront lighting",
  "deviceId": "fuji-x100vi",
  "role": "look-sample",
  "source": "real-camera-output",
  "creator": "Photographer name",
  "rights": "Creator-owned; approved for SOOCLY publication",
  "capturedAt": "2026-08-16T20:10:00+09:00",
  "scene": "Shinjuku storefront street"
}
```

For a same-scene pair, use two images with roles `default` and `look`, both from the same camera and scene.

## 3. Record settings validation

Only set these fields after the recipe has been entered and tested on the named camera:

```json
{
  "settingsValidated": true,
  "testedBy": "Tester name",
  "testedAt": "2026-08-16",
  "settingsVersion": "v1"
}
```

A recipe copied from another site, another camera, or an untested draft is not validated.

## 4. Confirm rights separately

Keep `rightsConfirmed` false while any proof asset is still awaiting permission or ownership confirmation. Only set it to true when every image in that variant has a documented publication basis in its `rights` field.

Until this flag is true, collected proof media is withheld from the public proof UI.

## 5. Run the proof gate

```bash
npm run proof:check
```

This performs two different checks:

1. `proof:assets` verifies that manifest media is local, variant-scoped JPEG evidence and that the referenced files actually exist.
2. `proof:status` validates camera, role, source, capture metadata, counts, settings, rights, and current status.

CI runs the same gate on every pull request.

## 6. Promote status intentionally

When the first real evidence or validated settings arrive, a Prototype may be intentionally moved to `testing` in `lib/demo-data.ts`.

Do not mark a variant `verified` until `npm run proof:status` reports `READY FOR VERIFIED`. The build rejects a `verified` variant whose proof gate is incomplete.

## Current state

All current SOOCLY LookVariants remain Prototype until genuine camera evidence is supplied. The existing Unsplash/reference galleries are visual-direction material only and never enter this proof manifest.
