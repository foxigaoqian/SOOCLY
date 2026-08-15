# SOOCLY Alpha Prototype

## Purpose

This prototype validates the core product experience before backend, accounts, creator tooling, UGC, notifications, payments, or AI matching are built.

The flow under test is:

> Choose a camera → discover a Look → open the Look → compare Default vs Look → inspect device-specific settings → save the Look.

## Included

- Next.js App Router prototype
- Fujifilm X100VI and Ricoh GR IV camera pages
- Six demonstration Looks
- Shared Look entity with device-specific Look Variants
- Camera-aware Look links using `?device=` state
- Before/After comparison interaction
- Device-specific settings layout
- Browser-only Saved Looks using versioned localStorage
- Responsive mobile/desktop design
- Prototype-only SEO metadata (`noindex`, `nofollow`)

## Intentionally Not Included

- Supabase/database
- Authentication
- Account-synced My Gear
- Creator profiles/submission
- Community photos / UGC
- Notifications
- Payments or subscriptions
- AI Find This Look
- Production analytics
- Production deployment

## Content Integrity

All current photography and settings are demonstration content for UX validation.

They **must not** be represented as verified X100VI or GR IV output. The UI labels this explicitly. Production Look pages require real device calibration and same-scene comparison proof.

## Local Run

```bash
npm install
npm run dev
```

Then open the local Next.js URL shown in the terminal.

For checks:

```bash
npm run typecheck
npm run lint
npm run build
```

## Current Validation Status

The source has been reviewed against the SOOCLY project guardrails and the current Vercel React/Web Interface guidance used during implementation.

A full dependency install/build could not be completed in the current agent execution environment because `npm install` timed out. Run the commands above locally or in CI before treating the branch as build-verified.

## What to Judge

Do not judge the prototype by whether the demo settings are photographically correct. Judge:

1. Does the homepage immediately communicate the product?
2. Is choosing a camera obvious?
3. Do the Look cards make you want to click?
4. Does the Look detail page put visual proof before parameters?
5. Is switching device variants understandable?
6. Is the Before/After interaction useful on mobile?
7. Does Save feel worth having before an account exists?
8. Does the UI feel photography-native rather than like a generic SaaS template?

If these fail, redesign before adding backend complexity.
