# SOOCLY Master Design System

**Status:** Prototype v0.1  
**Updated:** 2026-08-15

## Product Design Thesis

SOOCLY should feel like a modern photographer's contact sheet and field notebook, not a generic SaaS dashboard and not a nostalgic fake-film website.

The interface starts with photography and makes settings secondary. The visual system should reward browsing real images, keep camera metadata legible, and make the transition from "I like this" to "how do I shoot it?" feel immediate.

## Signature Element

**The Viewfinder / Contact-Sheet Frame**

Image cards use restrained frame marks, metadata strips, and contact-sheet language. This is the one recurring visual signature. Avoid decorating every surface with camera motifs.

## Color Tokens

- Background / carbon: `#111315`
- Raised panel: `#181B1E`
- Secondary panel: `#202429`
- Paper / primary action: `#F2F0E9`
- Primary text: `#F6F4EF`
- Secondary text: `#9DA5AD`
- Borders: `#343A40`
- Strong borders: `#59616A`
- Tungsten accent: `#EFB45D`
- Cool proof accent: `#8FC7FF`

Do not introduce AI-purple gradients or neon-green SaaS accents. Individual Looks may carry a local accent color, but product chrome stays neutral.

## Typography

- Primary UI / display: system grotesk stack (`Inter`, platform sans fallbacks)
- Utility / metadata: platform monospace stack
- Headlines: oversized, tight tracking, short line length
- Metadata: uppercase only where it genuinely behaves like camera/field metadata

Avoid decorative serif branding in the core product. Photography carries the emotion; typography carries hierarchy.

## Layout

- Max content width: `1240px`
- Primary shell: fluid with 20px desktop gutters and 14px mobile gutters
- Look grid: 3 columns desktop, 2 tablet, 1 mobile
- Detail pages: image proof first; settings follow beneath or beside it
- Do not bury core pages deeper than 3 clicks

## Interaction Rules

- Minimum practical touch target: 44px
- All controls have visible `:focus-visible`
- Prefer semantic button/link/input elements
- Motion is subtle and interruptible; only transform/opacity for decorative motion
- Respect `prefers-reduced-motion`
- URL represents device version on Look detail (`?device=`) so the selected implementation deep-links
- Prototype localStorage keys must be versioned

## Image Rules

- Real verified camera output is the product's trust asset.
- Prototype imagery must be labeled as demonstration imagery and never presented as device proof.
- Final comparison pairs must be the same scene and should disclose meaningful shooting context.
- Use responsive images, reserve aspect ratio, and avoid layout shift.

## Component Direction

### Look Card

Image dominates. Show Look name, short use-case line, 2-4 tags, and a direct `View Look` action. Do not put full settings on discovery cards.

### Camera Picker

One obvious device choice and one action. Avoid asking users to understand film-simulation terminology before they choose a camera.

### Before / After

Large comparison surface with clear Default and Look labels. The comparison interaction is table stakes, but it is essential proof UX.

### Settings Panel

Settings use a two-column definition list on desktop and stacked rows on mobile. Device and verification status must be impossible to miss.

## Mobile

Mobile is a first-class shooting companion, not a squeezed desktop page. Prioritize image, Look name, Save, device version, comparison, then settings. No horizontal scrolling.

## Anti-Patterns

- Generic dashboard sidebars
- Hero sections made of abstract gradients instead of photography
- Excessive glassmorphism
- Fake camera-output claims
- Huge parameter tables before visual proof
- 10+ choices in first-run device discovery
- Emoji as product icons
- Thin SEO pages generated only by swapping device/scene variables
