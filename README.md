# SOOCLY

**Find your look. Shoot it straight.**

SOOCLY is a camera-look discovery platform for photographers who want great straight-out-of-camera results without spending time on post-processing.

The product is built around a simple idea:

> Choose your device → discover a look → see real before/after results → apply the exact settings → shoot → share your result.

## Product direction

SOOCLY is not just another Fujifilm recipe database.

The long-term product is a cross-device **Camera Look platform** covering Fujifilm, Ricoh, Sony, iPhone and other cameras/phones while preserving the terminology users actually search for on each platform (Recipes, Film Simulations, Photographic Styles, Picture Profiles, etc.).

## V1 focus

Launch with two camera ecosystems:

- Fujifilm X100VI — mature recipe demand and strong social reach
- Ricoh GR IV — newer device with growing recipe demand

Initial target: **20 high-quality Looks** (roughly 10 per camera), each with real visual proof and practical shooting guidance.

## Core V1 loop

1. Visitor lands from social, creator content, search, or shared photography.
2. Visitor selects/binds a camera in **My Gear**.
3. Visitor discovers a Look.
4. Visitor compares **Default ↔ Look** using real images.
5. Visitor saves or tries the Look.
6. Visitor shoots and uploads a result.
7. SOOCLY generates a shareable card for the user's photo.
8. Shared photos bring new users back to the Look page.
9. New Looks for a bound device can reactivate the user.

## Required V1 pages

- `/` — Find Your Look
- `/looks` — Look discovery feed
- `/looks/[slug]` — Look detail, before/after, settings, usage notes, community shots
- `/cameras` — camera directory
- `/cameras/[brand]/[model]` — device-specific Looks
- `/creators/[slug]` — creator profile and Looks
- `/submit` — creator submission
- `/my-gear` — saved devices
- `/saved` — saved Looks

## Look data model

Each Look should support:

- Name and slug
- Creator
- Supported device + calibrated device version
- Cover image
- Multiple real sample photos
- Multiple Default ↔ Look before/after pairs
- Exact camera settings
- Best use cases
- Lighting conditions
- Shooting notes
- Tags / mood / film inspiration
- Save count
- Tried count
- Community photos
- Availability status per device
- Notify-me requests for unsupported devices

## Growth model

SOOCLY is designed around four connected growth engines:

1. **Creator + short-form social** — create demand with visual before/after content.
2. **SEO capture** — rank for proven terms such as Fujifilm recipes, X100VI recipes, Ricoh recipes, specific Look names, and device-specific queries.
3. **UGC sharing** — users share photos made with a Look, naturally distributing the Look and SOOCLY brand.
4. **Device retention** — users bind gear and return when relevant Looks become available.

A Look should be treated as a distribution unit, not just a database row: one Look should generate a search page, creator share asset, social content, Pinterest assets, community shots and device-specific reactivation opportunities.

## Product principles

- Real visual proof over walls of text.
- Device-specific calibration over generic copied settings.
- Help users choose a Look instead of forcing them to understand camera jargon first.
- Do not mass-generate thin SEO pages without real photography or useful data.
- Keep the first-use flow lightweight; ask for account creation only when saving, following, uploading or requesting notifications makes it useful.
- Build participation and creator ownership into the product from the beginning.

## Initial success metrics

The first release is for validating distribution and retention, not maximizing revenue.

Primary metrics:

- Visit → camera selected / bound
- Look detail → save
- Look detail → try
- Try → community upload
- Upload → share
- Creator referral traffic
- Returning users by bound camera
- Organic traffic to camera and Look pages

## Domain

Production domain: **soocly.com**
