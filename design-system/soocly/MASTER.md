# SOOCLY Master Design System

**Status:** Editorial Prototype v0.2  
**Updated:** 2026-08-15

## Product Design Thesis

SOOCLY should feel like a premium photography brand and visual discovery product first, then reveal its camera utility underneath.

The design direction is **Apple-like product storytelling × photography editorial gallery × SOOCLY device-first utility**. This is a reference to interaction discipline, whitespace, pacing, and visual hierarchy—not permission to copy Apple or FilmSimRecipes layouts or brand assets.

The user should first think **“I want my photos to look like that.”** Only after that should the interface introduce camera versions and settings.

## Core Principle

**Photography is the interface.**

Photos are not decoration around a settings database. The photograph itself is the main discovery surface, the main proof surface, and the main sharing asset.

## Signature Interaction

**Direct-on-image Default ↔ Look comparison**

A large same-scene comparison with a vertical divider and circular handle is SOOCLY’s primary product interaction. Users drag directly across the image with mouse or finger. Do not put the core interaction in a small range control underneath the photograph.

Final production comparisons must use two verified images from the same scene. Prototype browser treatments must remain explicitly labeled as demonstrations.

## Visual Language

- Warm off-white page background
- Large photography surfaces
- Very short product copy
- Oversized, tightly tracked sans-serif headlines
- Minimal borders and shadows
- Rounded media surfaces used sparingly
- Strategic dark immersive sections for camera/device storytelling
- Calm transitions; no decorative motion for its own sake
- No dashboard chrome on primary discovery surfaces

## Color Tokens

- Page background: `#F5F4F0`
- Primary surface: `#FFFFFF`
- Soft surface: `#ECEBE6`
- Primary text: `#111111`
- Secondary text: `#6E6E73`
- Hairline border: `#D8D7D2`
- Dark immersive section: `#101010`
- Dark raised surface: `#1D1D1F`
- Dark secondary text: `#A1A1A6`
- SOOCLY warm accent: `#D9852D`

Avoid AI-purple gradients, gaming neon, faux-vintage paper textures, and excessive glassmorphism.

## Typography

- Primary display/UI: system grotesk stack (`Inter`, platform sans fallbacks)
- Headlines: oversized, tight tracking, short line length
- Body copy: generous line height, maximum readable width ~650–720px
- Metadata: small neutral sans or monospace only where it behaves like technical metadata
- Do not use decorative serif fonts simply to imply “editorial”

## Page Pacing

Primary marketing and Look pages should feel like product stories. One viewport/section should communicate one idea.

Recommended homepage rhythm:

1. **Find your look.** — camera selection + hero photograph
2. **See the difference.** — giant direct-drag comparison
3. **Looks worth shooting.** — image-first gallery
4. **Same Look. Your gear.** — camera/device section
5. Brand statement / simple close

Avoid cramming product explanation, growth mechanics, Creator features, and settings into the first screen.

## Layout

- Max content width: `1240px`
- Desktop shell gutter: 24px minimum
- Mobile shell gutter: 12px minimum per side
- Look grid: 3 columns desktop, 2 tablet, 1 mobile
- Hero and comparison imagery should approach the full content width
- Large whitespace is intentional and should not be “fixed” by compressing sections

## Component Direction

### Header

Thin, translucent, neutral. Wordmark plus only the navigation necessary for the current product. The header should never visually compete with photography.

### Camera Picker

One camera selector + one action. It should feel like a product control, not a form. No account requirement before browsing.

### Look Card

Image dominates. Below the image: Look name, one concise direction/use-case sentence, light tags, optional device compatibility. Avoid frames, fake viewfinder markings, large metadata strips, and settings on discovery cards.

### Before / After

- Directly draggable over the image
- Vertical white divider
- Circular handle
- Labels embedded inside the media surface
- Works with mouse, touch, keyboard-accessible range input
- Large enough to create visual impact

### Look Detail

Story order:

1. Look name and short visual promise
2. Hero photograph
3. Default ↔ Look comparison
4. Choose device version
5. Device-specific settings
6. Best-for / lighting / shooting notes
7. Save

The page should feel like a product page for the Look, not a database record.

### Settings

Settings are evidence and implementation details, not the emotional hook. Use clean definition rows with generous spacing. Device and verification status must remain visible.

## Image Integrity

- Real verified camera output is SOOCLY’s most important trust asset.
- Prototype imagery must remain clearly labeled as demo imagery.
- Never represent CSS filters or generated images as verified camera output.
- Final comparison pairs must use the same scene and disclose meaningful shooting context.
- Use responsive images and reserve aspect ratios to avoid layout shift.

## Interaction Rules

- Practical touch targets ≥ 44px
- Visible `:focus-visible`
- Semantic links/buttons/inputs
- Respect `prefers-reduced-motion`
- Device variant remains deep-linkable through URL state (`?device=` for Alpha)
- Save state keys are versioned until real accounts replace browser persistence

## Mobile

Mobile is a first-class shooting companion. Priority order:

1. Photograph
2. Look name
3. Direct Before/After interaction
4. Device version
5. Save
6. Settings

The comparison should become taller on mobile rather than shrinking into a letterbox. No horizontal scrolling.

## Anti-Patterns

- Dark dashboard as the default brand shell
- Generic SaaS hero copy
- Viewfinder decoration on every image
- Huge settings tables before visual proof
- Small Before/After sliders under the image
- Abstract gradients instead of photography
- Fake camera-output claims
- Over-animation
- Thin SEO pages created only by swapping device/scene variables
