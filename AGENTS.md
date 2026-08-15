# SOOCLY Agent Development Guide

This repository is developed with AI coding agents. This file defines the project-wide operating rules, task routing, and quality gates agents must follow.

## 1. Source of truth

Before changing product behavior, UX, architecture, growth logic, SEO, or data models, read these sources in order:

1. The user's current instruction.
2. `.agents/product-marketing.md` — product, audience, positioning, differentiation, and goals.
3. Relevant documents under `docs/`.
4. `design-system/soocly/MASTER.md` when it exists.
5. Existing implementation and tests.

Do not silently invent a new product direction because a framework or starter template makes it convenient.

## 2. Product invariant

SOOCLY is a cross-device camera-look discovery platform, not a generic preset store and not a Fujifilm-only recipe database.

The core user loop is:

> Choose a device → discover a Look → see real proof → apply device-specific settings → shoot → save/share/participate → return for relevant new Looks.

The product vocabulary is:

- **Look**: the visual result users want.
- **Device**: a specific camera or phone model.
- **Look Variant**: a Look calibrated for one specific device.
- **Settings**: the parameters required to create a Look Variant on that device.
- **Community Shot**: a real user photo made with a Look Variant.

Never model `Tokyo Midnight × X100VI` and `Tokyo Midnight × GR IV` as unrelated Looks. They are variants of one Look.

## 3. Skill routing

Use the smallest relevant set of skills. Do not load every skill for every task.

### Product and strategy

Use:

- `product-marketing` for product context, audience, positioning, terminology, and competitive framing.
- `marketing-psychology` for activation, habit loops, participation, choice architecture, and ethical behavioral design.
- `customer-research` for demand mining, user-language analysis, objections, and community research.

Use these before proposing major features or changing the core loop.

### Information architecture and SEO

Use:

- `site-architecture` for page hierarchy, navigation, URLs, breadcrumbs, and internal links.
- `programmatic-seo` before creating scalable camera/look/category pages.
- `seo-audit` before launch and after meaningful architecture changes.

SEO rule: do not create thin pages merely by combining variables. A page must have real search intent and unique value such as device-calibrated settings, verified images, comparison pairs, creator data, or community evidence.

### Visual design and UX

Use:

- `ui-ux-pro-max` to create and maintain the project design system and to review responsive/accessibility behavior.
- `frontend-design` to ensure SOOCLY has a distinctive photography-native visual identity instead of a generic SaaS template.
- `web-design-guidelines` for implementation-level accessibility and interface review.

For a new product-wide UI direction, create `design-system/soocly/MASTER.md` before implementation. Do not change the master design system casually; page-level overrides should be documented separately.

### React / Next.js implementation

Use:

- `react-best-practices` for React and Next.js performance, data fetching, bundle size, and rendering decisions.
- `composition-patterns` for reusable component APIs and component architecture.

Do not start framework implementation until product flow and design direction for the task are sufficiently defined.

### Data, auth, storage, and security

Use:

- `supabase` for Supabase Database, Auth, SSR, Storage, migrations, and RLS.
- `supabase-postgres-best-practices` for schema, SQL, indexes, security, and query performance.

Database changes require migrations. User-owned records require explicit authorization rules. Never rely on client-side checks for data authorization.

### Growth and distribution

Use:

- `influencer-marketing` for creator acquisition, creator programs, usage rights, and creator measurement.
- `community-marketing` for community participation and creator/user advocacy.
- `referrals` for product sharing loops and future affiliate/referral mechanics.
- `free-tools` for acquisition tools such as Find This Look.
- `analytics` for event taxonomy, attribution, funnel measurement, and experiment instrumentation.

Growth features must map to a measurable behavior, not vanity engagement.

### Cloudflare deployment

Cloudflare skills are optional until the deployment architecture is selected. If Cloudflare is chosen, use `cloudflare`, `wrangler`, `web-perf`, and `workers-best-practices` before writing or reviewing production deployment code.

## 4. Development phases and gates

### Phase 0 — Product specification

Before product code:

- Product positioning and audience are documented.
- Alpha/V1/V2 boundaries are explicit.
- Core user flows are documented.
- Data-model invariants are documented.
- Success metrics are defined.

### Phase 1 — Design system and prototype

Before production UI:

- SOOCLY master design system exists.
- Core mobile and desktop flows are prototyped.
- Look Card and Before/After interaction patterns are decided.
- Accessibility and image-performance constraints are included.

### Phase 2 — Technical architecture

Before feature implementation:

- Framework/deployment decision is documented.
- Auth/data/storage responsibilities are clear.
- Look/Variant/Settings schema is reviewed.
- Analytics event taxonomy is defined.
- SEO rendering/indexation strategy is clear.

### Phase 3 — Alpha build

Alpha should validate the smallest useful loop:

- Browse Looks.
- Select/bind a device.
- Open a Look.
- Compare Default ↔ Look.
- Read exact device-specific settings.
- Save a Look.

Do not pull V2 features into Alpha unless they are required to validate the core loop.

## 5. Trust and content rules

SOOCLY's most valuable asset is credible visual proof.

- A photo labeled as shot on a specific device with a specific Look Variant must be a real photo made with that device/variant.
- AI-generated imagery may be used for clearly decorative brand assets, but must never be presented as proof of camera output.
- Before/After pairs used as product proof must document how the comparison was produced.
- Device compatibility claims must be specific and testable.
- Do not promise that identical settings produce identical results across different camera models.

## 6. UX rules

- Photography is the interface's primary content; UI chrome should support it, not overpower it.
- Mobile is a first-class surface, not a later adaptation.
- First-use browsing should work without account creation.
- Ask for sign-in only at a value-bearing moment such as Save, Add to My Gear, Notify, Follow, or Upload.
- Prefer `Find a Look` language over requiring newcomers to understand `recipe` jargon.
- Use device-ecosystem terminology where search/user expectations require it: Fujifilm/Ricoh Recipes, iPhone Photographic Styles, Sony Picture Profiles/film looks, etc.
- Do not use engagement dark patterns or notification spam.

## 7. SEO rules

- Server-render/index important public Look and Device pages.
- Keep URLs stable, readable, lowercase, and slug-based.
- Generate pages only when they provide unique user value.
- Every indexable Look page should have meaningful original visual/data content.
- Avoid keyword cannibalization between Look, Device, and editorial pages.
- Build internal linking around real entities: Device, Look, Creator, supported variants, and related Looks.

## 8. Analytics rules

The primary activation concept is **Activated Gear Owner**:

> a user who binds at least one device and saves or tries at least one Look.

At minimum, instrument:

- `device_selected`
- `device_bound`
- `look_viewed`
- `before_after_interacted`
- `look_saved`
- `look_tried`
- `notify_requested`
- `community_shot_uploaded`
- `shot_shared`
- `creator_referral_landed`

Event names and properties must be versioned/documented before production analytics is shipped.

## 9. Quality gate before merging product code

For affected surfaces, verify:

- Type checking passes.
- Tests/lint pass where configured.
- Responsive behavior is checked at phone, tablet, laptop, and wide desktop widths.
- Keyboard/focus behavior works.
- Reduced-motion preference is respected for nonessential animation.
- Images have dimensions, appropriate loading behavior, alt text where meaningful, and optimized formats.
- No secrets are committed.
- User data access is authorized server-side / through RLS.
- SEO metadata/canonicals are correct for new public pages.
- Analytics does not accidentally collect sensitive content.

## 10. Skill installation

See `docs/SKILLS.md` and run:

```bash
bash scripts/setup-agent-skills.sh
```

The setup script installs the recommended project-local skill packs. Cloudflare skills are opt-in until deployment is decided.
