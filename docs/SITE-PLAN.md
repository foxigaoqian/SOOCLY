# SOOCLY Site Plan v1

Status: Alpha information architecture
Updated: 2026-08-16

## 1. Product role of the website

SOOCLY is a cross-device Camera Look platform. The website should help a photographer move from visual intent to an in-camera setup:

**Discover a Look → choose a camera → see proof → get device-specific settings → shoot → save**

The site must not drift into a generic preset marketplace, camera-review site, or settings database.

Core brand idea:

> **Choose the look before you shoot.**

Core product attitude:

> **Less editing. More shooting.**

Core interaction:

> **The SOOCLY Split** — direct same-scene Default ↔ Look comparison.

---

## 2. Alpha sitemap

```text
SOOCLY
│
├── /                         Home
│
├── /looks                    Looks
│   └── /looks/[slug]         Look Detail
│
├── /cameras                  Cameras
│   └── /cameras/[brand]/[model]
│                             Camera Detail
│
├── /my-gear                  My Gear
├── /saved                    Saved
│
├── /about                    About
├── /privacy                  Privacy
├── /terms                    Terms
└── /404                      Not Found
```

These are the only Alpha page types. Do not add Blog, Community, Creators, Marketplace, Pricing, AI Look Finder, Login/Register, or Submit Look yet.

---

## 3. Primary user journeys

### Journey A — visual discovery

```text
Home
→ Looks
→ Look Detail
→ Choose camera
→ Settings
→ Save
```

### Journey B — camera-first discovery

```text
Search / direct entry
→ Camera Detail
→ Choose Look
→ Look Detail
→ Settings
→ Save
```

### Journey C — returning photographer

```text
Home / My Gear
→ Looks for saved camera
→ Look Detail
→ Shoot
```

### Journey D — saved intent

```text
Saved
→ Look Detail
→ camera-specific settings
→ shoot
```

---

## 4. Global navigation

### Header

Desktop:

```text
[SOOCLY logo]
Looks
Cameras
Saved
[Explore Looks]
```

Rules:
- Keep the header visually quiet and photography-first.
- Do not expose empty future sections.
- My Gear can enter through camera-selection surfaces until it becomes a stronger recurring-use destination.
- `Explore Looks` is the primary global CTA.
- Logo always returns to `/`.

Mobile:
- Logo left.
- One compact primary action right.
- Navigation may collapse into a menu once more destinations are live.
- Do not cram all desktop links into a narrow row.

### Footer

The footer is both navigation and brand closing statement.

Brand block:

> **Choose the look before you shoot.**
>
> **Less editing. More shooting.**

Navigation groups:

**Explore**
- Looks
- Cameras
- Saved
- My Gear

**Cameras**
- Fujifilm X100VI
- Ricoh GR IV

**SOOCLY**
- About
- Privacy
- Terms

Brand principles may appear as non-link text:
- Looks, not presets.
- Made for your camera.
- Shoot it straight.

Do not add dead links to future products.

---

# 5. Page specifications

## 5.1 Home `/`

Status: **Designed / implemented**

Purpose:
- Explain SOOCLY in seconds.
- Create desire through photography.
- Introduce the product loop.
- Send users into Looks or Cameras.

Module order:

1. Header
2. Hero — `Choose the look before you shoot.`
3. Camera picker / discovery entry
4. Featured photography
5. The SOOCLY Split
6. Brand manifesto — `Less editing. More shooting.`
7. Featured Looks
8. Cross-device camera story
9. Closing brand statement
10. Footer

Do not turn the homepage into a full catalogue. Its job is to create understanding and momentum.

---

## 5.2 Looks `/looks`

Priority: **P0**

Purpose:
- Main visual discovery surface.
- Let users browse Looks before thinking about settings.

Hero:

> **Find a look worth shooting.**

Supporting copy:

> Start with the photograph you want to make. Filter by mood, scene, or the camera already in your bag.

Module order:

1. Page intro
2. Camera context / My Gear selector
3. Mood / scene filters
4. Look gallery
5. Load-more / pagination pattern when needed
6. Empty-state / unsupported-camera guidance
7. Footer

Initial filter vocabulary:
- All
- Street
- Night
- Portrait
- Travel
- Daylight
- Warm
- Cinematic
- Vintage

Look cards prioritize:
1. photography
2. Look name
3. short visual description
4. supported cameras

Do not show full settings on cards.

---

## 5.3 Look Detail `/looks/[slug]`

Priority: **P0 — highest after homepage**

Purpose:
- Convert visual interest into something a photographer can actually shoot.
- This is the core product page.

Example:

```text
/looks/tokyo-midnight
```

Module order:

### A. Look Hero
- Look name
- short visual direction
- creator / verification status
- large hero photography
- Save action

Example language:

> **Tokyo Midnight**
>
> Cool streets. Warm light. After dark.

### B. Visual proof gallery
- 4–10 strong finished images
- large editorial presentation
- device attribution where verified

### C. The SOOCLY Split
- same-scene Default ↔ Look comparison
- direct drag on image
- device + Look attribution
- automatic one-time interaction hint allowed

Production rule:
- verified pages must use real same-scene camera output
- browser filters / AI images must never be presented as camera proof

### D. Choose your camera

Example:

```text
Fujifilm X100VI
Ricoh GR IV
```

Switching camera changes the active Look Variant, not the Look itself.

### E. Device-specific settings

Header:

> **Tokyo Midnight for Fujifilm X100VI**

Fujifilm schema may include:
- Film Simulation
- Dynamic Range
- White Balance
- WB Shift
- Highlight
- Shadow
- Color
- Sharpness
- High ISO NR
- Clarity
- Grain
- Color Chrome Effect
- Color Chrome FX Blue
- ISO guidance
- Exposure Compensation guidance

Ricoh uses its own device schema. Do not force all cameras into Fujifilm field names.

### F. How to shoot this Look

Required content:
- Best for
- Best light
- Exposure advice
- Scene suggestions
- Color / wardrobe notes when relevant
- What to avoid

This section is part of the product value, not optional editorial filler.

### G. Community / sample photography placeholder

Alpha:
- verified SOOCLY / creator sample photographs only

Later:
- community shots can be added without redesigning the core page

### H. Save / action block
- Save Look
- Save camera to My Gear if not already present
- concise return-to-shooting message

### I. Related discovery
- More Looks for this camera
- Similar mood / scene Looks

---

## 5.4 Cameras `/cameras`

Priority: **P0**

Purpose:
- Show which gear SOOCLY currently supports.
- Provide a clean entry for camera-first users.

Hero:

> **Find Looks made for your camera.**

Module order:
1. Intro
2. Supported-camera grid
3. Brand grouping when catalogue grows
4. Recently / popularly explored cameras when real data exists
5. Footer

Initial devices:
- Fujifilm X100VI
- Ricoh GR IV

Do not invent unsupported devices just to make the catalogue look larger.

---

## 5.5 Camera Detail `/cameras/[brand]/[model]`

Priority: **P0**

Examples:

```text
/cameras/fujifilm/x100vi
/cameras/ricoh/gr-iv
```

Purpose:
- Camera-specific discovery hub.
- Strong SEO landing-page model.
- Make SOOCLY immediately useful to owners of a specific device.

Hero:

> **Looks made for your X100VI.**

Module order:

1. Camera hero
2. `Add to My Gear`
3. Popular / featured Looks for this camera
4. Browse by mood / scene
5. All supported Looks
6. Short explanation of how SOOCLY adapts a Look to this device
7. Footer

Avoid turning the page into a camera review.

Only include camera facts when they directly explain the Look workflow.

---

## 5.6 My Gear `/my-gear`

Priority: **P0**

Purpose:
- Remember what the user shoots with.
- Personalize discovery without requiring an account in Alpha.

Alpha storage:
- LocalStorage

Module order:
1. `Your cameras`
2. Saved camera cards
3. Add / change camera
4. Looks for selected gear
5. Remove / clear controls

Empty state:

> **What do you shoot with?**
>
> Add a camera and SOOCLY will show you Looks made for it.

Do not require login in Alpha.

---

## 5.7 Saved `/saved`

Priority: **P0**

Purpose:
- Keep visual intent for later shooting.

Alpha storage:
- LocalStorage

Module order:
1. Saved Looks heading
2. Saved Look cards
3. active-camera context if available
4. recommendations only when useful

Empty state:

> **No saved Looks yet.**
>
> Save the ones that make you want to go shoot.

Saved and My Gear must remain separate concepts:
- My Gear = what camera the user owns
- Saved = what visual direction the user likes

---

## 5.8 About `/about`

Priority: **P1**

Purpose:
- Explain why SOOCLY exists.
- Strengthen brand distinction from preset libraries and recipe databases.

Narrative structure:

1. `Choose the look before you shoot.`
2. Traditional flow:
   `Shoot → Import → Edit → Try presets → Export`
3. SOOCLY flow:
   `Choose → Set → Shoot`
4. `Looks, not presets.`
5. `One Look. Made for your camera.`
6. `Less editing. More shooting.`
7. Product integrity statement about real camera proof

This should read like a photographic point of view, not a corporate About page.

---

## 5.9 Privacy `/privacy`

Priority: **Required before public launch**

Purpose:
- Explain data handling.

Alpha must cover at minimum:
- LocalStorage use
- analytics if introduced
- cookies if introduced
- contact / policy update information

Do not claim systems or data practices that have not actually been implemented.

---

## 5.10 Terms `/terms`

Priority: **Required before public launch**

Purpose:
- Basic platform terms.

Must eventually address:
- informational nature of camera settings
- user responsibility for applying settings
- image / creator ownership
- prohibited copying / redistribution where applicable
- future paid content only when actually introduced

Keep Alpha terms aligned with actual functionality.

---

## 5.11 Not Found `/404`

Priority: **P1**

Purpose:
- Recover discovery rather than dead-end the visitor.

Recommended content:

> **That Look isn't here.**
>
> The next one might be.

Actions:
- Explore Looks
- Browse Cameras

---

# 6. Page hierarchy and design effort

Not all pages deserve equal design effort.

### Tier 1 — signature product pages

1. Home
2. Look Detail
3. Camera Detail

These receive the strongest photography, motion, and SOOCLY-specific interactions.

### Tier 2 — discovery / utility

4. Looks
5. Cameras
6. My Gear
7. Saved

These should be fast, clean, and highly usable.

### Tier 3 — brand / legal

8. About
9. Privacy
10. Terms
11. 404

These reuse the global system and should not become design distractions.

---

# 7. Content model implications

The IA depends on two separate entities:

## Look

The visual idea.

Example:

```text
Tokyo Midnight
```

Suggested fields:
- id
- slug
- name
- short description
- long description
- cover image
- gallery
- mood tags
- scene tags
- creator
- verification status

## LookVariant

The device-specific implementation.

Examples:

```text
Tokyo Midnight × Fujifilm X100VI
Tokyo Midnight × Ricoh GR IV
```

Suggested fields:
- id
- lookId
- deviceId
- version
- settings schema version
- settings
- shooting guidance
- verification status
- proof images
- tested date

Do not model cross-device versions as unrelated Looks.

---

# 8. SEO page model

SEO should follow useful product pages, not thin programmatic pages.

Primary indexable page families later:

```text
/looks/[slug]
/cameras/[brand]/[model]
```

Potential intent examples:
- Fujifilm X100VI looks / recipes
- Ricoh GR IV looks / recipes
- named Look searches

Do not generate Scene × Device pages unless there is real content and real search/user value.

During prototype / pre-launch, `noindex` can remain enabled.

---

# 9. Alpha build order

Development order is fixed as:

```text
1. Home                         ✅
2. Look Detail                 ← NEXT
3. Looks
4. Camera Detail
5. Cameras
6. My Gear
7. Saved refinement
8. About
9. Privacy
10. Terms
11. 404 polish
```

Why Look Detail comes first:
- it proves the actual product value
- it forces the Look / LookVariant model to be correct
- it establishes settings, guidance, proof, Save, and device-switching patterns that other pages reuse

---

# 10. Alpha release gate

The site is not ready for a public Alpha simply because all routes exist.

Minimum release criteria:

- Home communicates the product clearly
- Look Detail works end to end
- at least two supported cameras have useful Camera Detail pages
- Looks / Cameras discovery works
- My Gear and Saved persist locally
- every published Look has clear verification status
- no AI/generated or browser-filtered image is represented as verified camera proof
- production pages use real same-scene SOOCLY Split pairs where proof claims are made
- mobile experience is usable
- privacy / terms exist and match real behavior
- no dead navigation links

---

# 11. Deferred pages

Explicitly out of Alpha scope:

```text
/login
/register
/creators
/creators/[handle]
/submit
/community
/pricing
/marketplace
/blog
/journal
/ai-look-finder
```

These can be introduced only when the underlying feature or content supply is real.

---

## Final product rule

Every page should answer at least one of these questions:

1. **What do I want my photo to look like?**
2. **Can I make that Look on my camera?**
3. **What exactly do I set?**
4. **How should I shoot it?**
5. **How do I save it for later?**

If a page does not help answer one of those questions, it probably does not belong in the Alpha site.