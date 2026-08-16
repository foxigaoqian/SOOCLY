# SOOCLY Master Design System

**Status:** Brand Prototype v0.4  
**Updated:** 2026-08-16

## Brand Thesis

SOOCLY is not a generic preset library and not a settings database with nicer photography around it.

The brand point of view is:

> **Choose the look before you shoot.**

SOOCLY helps photographers decide on a visual direction first, get the version made for their camera, and make the photograph in the moment.

The product should encourage less post-processing dependency and more time shooting.

Core brand language:

- **Choose the look before you shoot.** — brand belief
- **Camera Looks made for your gear.** — product definition
- **Shoot it straight.** — product result
- **Less editing. More shooting.** — brand attitude
- **The SOOCLY Split** — signature comparison interaction

## Brand Character

SOOCLY should feel:

- photographic, not software-first
- confident, not technical for its own sake
- image-led, not parameter-led
- modern, not faux-vintage
- opinionated, not loud
- useful enough to get the user away from the screen and back behind the camera

Apple remains a reference for pacing, hierarchy, whitespace, restrained motion, and interaction discipline only. FilmSimRecipes remains a reference for photography discovery utility only. Neither is the SOOCLY visual identity.

## Signature Mark — OO

The two `O` characters in SOOCLY are the primary brand symbol.

Visual treatment:

- first O = outline / Default
- second O = filled **Exposure Orange** / Look
- together they communicate `Default → Look`

The OO motif may appear in:

- wordmark
- comparison handle
- image stamps
- share cards
- loading / transition moments
- compact favicon/icon explorations later

Do not scatter decorative circles everywhere. The symbol should remain intentional and recognizable.

## Signature Interaction — The SOOCLY Split

The large direct-on-image Default ↔ Look comparison is officially named **The SOOCLY Split**.

Rules:

- drag directly on the photograph with mouse or finger
- vertical divider sits inside the image
- handle uses the OO symbol rather than generic chevrons
- Default label is on the left, active Look name on the right
- keyboard-accessible range input remains underneath the transparent interaction layer
- comparison must remain visually large enough to function as proof, not as a small utility widget

Production comparisons must use verified same-scene camera output. Prototype browser treatments must remain explicitly labeled.

## Color System

### Core

- **SOOCLY Ivory:** `#F5F2EA`
- **SOOCLY Paper:** `#FFFDF8`
- **Ink Black:** `#111111`
- **Deep Black:** `#0C0C0C`
- **Muted Ink:** `#686762`
- **Paper Line:** `#D8D2C6`

### Signature Accent

- **Exposure Orange:** `#FF6A32`
- **Exposure Orange Deep:** `#E5521D`

Exposure Orange is a brand signal, not a general decoration color. Prefer it for:

- second O in the wordmark
- active state / selected camera version
- SOOCLY Split handle
- signature text accents
- key brand sections
- important actions / hover states

Avoid AI-purple gradients, gaming neon, generic blue SaaS accents, and Apple's exact gray/blue visual language.

## Typography

Use the platform system sans stack first:

`-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Arial, sans-serif`

Do not ship proprietary Apple font files.

Rules:

- display headlines: ~600 weight, very large, tight but readable tracking
- body copy: 450–550 weight, generous line height
- metadata: small neutral sans; uppercase only where it behaves like a label
- avoid over-heavy 700–900 display text except for the compact wordmark
- avoid decorative serif fonts merely to signal editorial taste

## Photography Is the Interface

The photograph is:

- the discovery surface
- the proof surface
- the share asset
- the emotional hook

Settings exist to help recreate the image direction. They do not lead the experience.

## Homepage Story

The homepage should express the brand in this order:

1. **Choose the look before you shoot.**
   - SOOCLY wordmark / OO motif
   - camera picker
   - featured photograph

2. **The SOOCLY Split**
   - direct visual proof
   - `Default → Look`
   - "Choose it here. Shoot it out there."

3. **Less editing. More shooting.**
   - brand manifesto section
   - Choose → Set → Shoot

4. **Looks worth shooting.**
   - image-first gallery

5. **One Look. Made for your camera.**
   - device-specific implementations

6. **Pick a Look. Set your camera. Go shoot.**
   - simple exit-oriented close

The homepage should make the user understand both what the product does and what the brand believes.

## Look Detail Story

A Look page should feel like a product story for a photographic direction, not a recipe database record.

Order:

1. SOOCLY Look identity + Look name
2. hero photograph
3. The SOOCLY Split
4. camera version choice
5. device-specific settings
6. shooting context
7. Save
8. "Love the Look. Set the camera. Go shoot."

## Look vs Device

Never collapse Look identity into camera settings.

- **Look** = visual destination
- **Look Variant** = device-specific implementation

Example:

- Tokyo Midnight = Look
- Tokyo Midnight × Fujifilm X100VI = Look Variant
- Tokyo Midnight × Ricoh GR IV = Look Variant

The UI should make this model understandable without forcing users to learn database terminology.

## Motion

Motion should feel photographic and deliberate.

Preferred:

- slow rise/fade reveals
- image scale from ~0.97 → 1
- sticky storytelling for one high-value section at a time
- calm easing similar to `cubic-bezier(.22, 1, .36, 1)`
- subtle OO state transitions later

Avoid:

- continuous parallax everywhere
- bouncy spring animations
- hover effects on every element
- decorative motion that competes with photography

Always respect `prefers-reduced-motion`.

## Layout

- max primary content width: ~1240px
- desktop shell gutter: 24px minimum
- mobile shell gutter: 12px minimum per side
- hero and comparison imagery can approach full content width
- Look grid: 3 desktop, 2 tablet, 1 mobile
- large whitespace is intentional
- hard 3–6px media corners are acceptable as a SOOCLY distinction; avoid making every image an Apple-like 30px card

## Component Rules

### Header

Thin and quiet. SOOCLY OO wordmark + only necessary product navigation.

### Camera Picker

One camera choice + one action. No account requirement to browse.

### Look Card

Image dominates. Name + concise direction + minimal tags. No parameter wall.

### SOOCLY Split

See signature interaction rules above.

### Camera Section

Use strong contrast and Exposure Orange sparingly to explain one Look / multiple device implementations.

### Settings

Settings are implementation evidence. Use clear definition rows and keep device + verification status visible.

## Trust / Image Integrity

- real verified camera output is the product's most important trust asset
- prototype imagery must remain explicitly labeled
- never represent CSS filters or generated images as verified camera output
- final comparison pairs should use the same scene
- creator attribution and usage rights must be recorded
- meaningful shooting context should accompany verified Looks

## Mobile

Mobile is a first-class shooting companion.

Priority:

1. Look image
2. Look identity
3. SOOCLY Split
4. device version
5. Save
6. settings

The comparison should become taller rather than tiny. No horizontal scrolling.

## Anti-Patterns

- "make it look more like Apple" as a design goal
- generic SaaS hero copy
- dark dashboard as the default shell
- tiny Before/After range sliders below the image
- viewfinder decoration on every photograph
- parameter tables before visual proof
- orange used everywhere until it loses meaning
- decorative OO circles without semantic purpose
- fake camera-output claims
- thin SEO pages created only by swapping device/scene variables
