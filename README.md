# SOOCLY

**Find your look. Shoot it straight.**

SOOCLY is a camera-look discovery platform for photographers who want great straight-out-of-camera results without spending unnecessary time guessing settings or post-processing.

The product is built around a simple idea:

> Choose your device → discover a Look → see real proof → apply device-specific settings → shoot → save/share/participate.

## Product direction

SOOCLY is not another Fujifilm-only recipe database.

The long-term product is a cross-device **Camera Look platform** covering Fujifilm, Ricoh, Sony, iPhone, and other cameras/phones while preserving the terminology users actually use in each ecosystem (Recipes, Film Simulations, Photographic Styles, Picture Profiles, etc.).

A **Look** is the visual result. Each supported device gets its own calibrated **Look Variant** and settings.

## Launch focus

Initial device ecosystems:

- **Fujifilm X100VI** — mature recipe demand and strong visual/social distribution potential.
- **Ricoh GR IV** — newer device with growing recipe demand and lower SEO competition.

Content target for early validation: roughly **20 high-quality Looks / device variants** with credible visual proof and practical shooting guidance. Quality and evidence matter more than catalog size.

## Product stages

### Alpha — prove the core value loop

Alpha should validate whether users actually want to discover and keep Looks for the gear they own.

Core capabilities:

- Browse Looks.
- Browse/select supported devices.
- Bind a device in **My Gear**.
- View a Look detail page.
- Compare **Default ↔ Look** with real evidence.
- Read exact device-specific settings and shooting notes.
- Save a Look.

### V1 Growth — prove participation and distribution

After Alpha activation is validated:

- Creator profiles and Look submission.
- Community Shots.
- Share cards.
- Notify Me for new device variants / relevant Looks.
- Creator and Look follows.
- Creator/social attribution.

### V2 Intelligence — make discovery smarter

Only after the earlier loops work:

- **Find My Look / Find This Look** reference-image matching.
- Richer personalized recommendations.
- Broader device ecosystems.
- Advanced discovery and premium experiences.

## Core growth loop

1. A visitor lands from creator/social content, search, or a shared photo.
2. The visitor discovers a Look and sees credible visual proof.
3. The visitor selects/binds their camera or phone.
4. The visitor saves/tries the relevant Look Variant.
5. The user shoots with it.
6. In Growth-stage features, the user can upload/share a real result.
7. Shared photography and creator distribution bring new visitors back to the Look.
8. Bound gear makes future relevant Look releases useful reactivation triggers.

## Alpha pages

- `/` — Find Your Look
- `/looks` — Look discovery
- `/looks/[slug]` — Look detail, Default ↔ Look, supported variants, settings, usage notes
- `/cameras` — device directory
- `/cameras/[brand]/[model]` — device-specific Looks
- `/my-gear` — saved/bound devices
- `/saved` — saved Looks
- `/login` — authentication when a value-bearing action requires it

Growth-stage pages such as `/creators/[slug]`, `/submit`, and community surfaces should not be pulled into Alpha by default.

## Core data model

SOOCLY must keep these concepts separate:

- **Look** — visual identity/name/mood independent of one device.
- **Device** — exact camera/phone model.
- **Look Variant** — one Look calibrated/tested for one Device.
- **Settings** — device/ecosystem-specific parameters for a Look Variant.
- **Sample Photos** — evidence tied to the appropriate Look Variant when representing real output.
- **Comparison Pairs** — Default ↔ Look evidence with documented methodology.
- **User Gear** — devices a user owns/uses.
- **Saves / Tries** — user intent and activation signals.
- **Community Shots / Follows / Notify Requests** — Growth-stage participation and retention data.

Different brands should use versioned settings schemas rather than one hard-coded universal set of camera fields.

## Growth model

SOOCLY is designed around connected growth engines:

1. **Creator + short-form social** — create demand with visual proof and recognizable Looks.
2. **SEO capture** — capture proven recipe/device/Look demand without mass-producing thin pages.
3. **UGC sharing** — later, real user photos made with a Look can naturally distribute the Look and SOOCLY brand.
4. **Device retention** — users bind gear and return when relevant Looks/variants become available.

A strong Look should eventually operate as a distribution unit, not just a database row: public page, real proof, social assets, creator attribution, user actions, community evidence, and device-relevant reactivation.

## Product principles

- Real visual proof over walls of text.
- Look-first discovery over parameter-first browsing.
- Device-specific calibration over generic copied settings.
- Help users choose a Look instead of requiring camera jargon first.
- Do not mass-generate thin SEO pages without real demand and unique value.
- Let people browse before forcing account creation.
- Ask for sign-in at value-bearing moments such as Save or Add to My Gear.
- AI-generated images must never be presented as real camera-output proof.
- Participation should add genuine user value, not manufacture empty engagement.

## Initial success metric

The primary activation concept is an **Activated Gear Owner**:

> a user who binds at least one device and saves or tries at least one Look.

Supporting Alpha metrics:

- Visit → device selected
- Device selected → device bound
- Look detail → Before/After interaction
- Look detail → save
- Returning users by bound device
- Organic/creator/social traffic to Look and Device pages

Growth-stage metrics later include Try → Community Shot, Upload → Share, creator referral traffic, and reactivation from relevant new Looks.

## Agent-assisted development

Project-wide development rules live in:

- `AGENTS.md`
- `.agents/product-marketing.md`
- `docs/SKILLS.md`

Install the recommended project-local Agent Skills with:

```bash
bash scripts/setup-agent-skills.sh
```

Cloudflare skills remain optional until the deployment architecture is selected.

## Domain

Production domain: **soocly.com**
