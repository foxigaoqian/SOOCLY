# SOOCLY Agent Skills

SOOCLY uses a small, explicit set of external Agent Skills plus project-specific rules. The goal is not to install every available skill. Each skill should be loaded only when its domain is relevant.

## Quick setup

From the repository root:

```bash
bash scripts/setup-agent-skills.sh
```

The script installs the default project-local skills. Cloudflare skills are optional until SOOCLY's deployment architecture is selected.

To include the optional Cloudflare deployment pack:

```bash
SOOCLY_INSTALL_CLOUDFLARE_SKILLS=1 bash scripts/setup-agent-skills.sh
```

## Skill sources

### 1. Marketing/product skills

Source: `coreyhaines31/marketingskills`

Selected skills:

- `product-marketing`
- `marketing-psychology`
- `customer-research`
- `site-architecture`
- `programmatic-seo`
- `seo-audit`
- `influencer-marketing`
- `community-marketing`
- `referrals`
- `free-tools`
- `analytics`

Why these are included:

- SOOCLY needs a persistent product/positioning context before content or features drift.
- The product deliberately uses participation, gear ownership, creator identity, and reactivation loops, so behavioral design needs explicit review.
- SEO is useful for demand capture but should not become a thin-page factory.
- Creator distribution, UGC, sharing, and future free tools are core growth mechanisms.
- Growth features must be instrumented from the start.

Repository:

`https://github.com/coreyhaines31/marketingskills`

### 2. Product UI/UX design intelligence

Source: `nextlevelbuilder/ui-ux-pro-max-skill`

Selected skill:

- `ui-ux-pro-max`

Use it to:

- Generate SOOCLY's master design system before production UI work.
- Select a photography-appropriate visual system, typography, spacing, interaction, and responsive behavior.
- Review accessibility, mobile layout, touch targets, image-heavy performance, and interaction details.
- Maintain a consistent design system across pages instead of letting each agent improvise.

Repository:

`https://github.com/nextlevelbuilder/ui-ux-pro-max-skill`

### 3. Distinctive frontend design direction

Source: `anthropics/skills`

Selected skill:

- `frontend-design`

Use it to:

- Prevent generic AI-SaaS visual output.
- Ground visual decisions in photography, cameras, film, contact sheets, light, frames, and image-making culture.
- Create a deliberate visual identity and one memorable signature interaction instead of decorating every surface.

Repository:

`https://github.com/anthropics/skills`

### 4. React / Next.js engineering

Source: `vercel-labs/agent-skills`

Selected skills:

- `react-best-practices`
- `composition-patterns`
- `web-design-guidelines`

Use them to:

- Avoid React/Next.js waterfalls and unnecessary client JavaScript.
- Keep image-heavy pages performant.
- Build reusable Look, Device, comparison, feed, and creator components without boolean-prop sprawl.
- Review accessibility, navigation state, forms, focus, reduced motion, typography, and image behavior.

Repository:

`https://github.com/vercel-labs/agent-skills`

### 5. Database, auth, storage, and RLS

Source: `supabase/agent-skills`

Selected skills:

- `supabase`
- `supabase-postgres-best-practices`

Use them to:

- Design migrations, Auth/SSR integration, Storage, and Row-Level Security.
- Review the Look / Look Variant / Device / user-gear / save / community-shot schema.
- Design indexes and queries for feeds, device filtering, saves, and creator pages.
- Keep access control in the database/server layer rather than trusting the client.

Repository:

`https://github.com/supabase/agent-skills`

### 6. Cloudflare deployment pack — optional

Source: `cloudflare/skills`

Selected skills when Cloudflare is chosen:

- `cloudflare`
- `wrangler`
- `web-perf`
- `workers-best-practices`

Use them only after the deployment technical spike selects Cloudflare for the relevant workload.

Repository:

`https://github.com/cloudflare/skills`

## Routing by task

| Task | Skills to load first |
|---|---|
| Change positioning / audience / product scope | `product-marketing`, `customer-research` |
| Design activation / retention / notification / participation | `marketing-psychology`, `analytics` |
| Plan URLs / page hierarchy / navigation | `site-architecture` |
| Propose scalable SEO pages | `programmatic-seo`, then `site-architecture` |
| Audit SEO before launch | `seo-audit` |
| Create the design system | `ui-ux-pro-max`, `frontend-design` |
| Build/review a page/component | `frontend-design`, `react-best-practices`, `composition-patterns` |
| Accessibility/UX implementation review | `web-design-guidelines`, `ui-ux-pro-max` |
| Design database/auth/RLS | `supabase`, `supabase-postgres-best-practices` |
| Creator acquisition/program | `influencer-marketing`, `analytics` |
| Community/UGC design | `community-marketing`, `marketing-psychology`, `analytics` |
| Product sharing/referral loop | `referrals`, `marketing-psychology`, `analytics` |
| Find My Look / acquisition utility | `free-tools`, `analytics` |
| Cloudflare deploy/review | `cloudflare`, `wrangler`, `workers-best-practices`, `web-perf` |

## Mandatory project context

All agents should read these before material product work:

- `README.md`
- `AGENTS.md`
- `.agents/product-marketing.md`

When created, also read the relevant files under:

- `docs/`
- `design-system/soocly/`

## Design-system policy

Before production UI development, generate and review:

`design-system/soocly/MASTER.md`

The master file should define at minimum:

- Design thesis and photography-specific visual concept.
- Color tokens.
- Display/body/utility typography.
- Grid and spacing.
- Image aspect-ratio rules.
- Look Card behavior.
- Default ↔ Look comparison behavior.
- Mobile navigation and touch behavior.
- Motion principles and reduced-motion fallback.
- Accessibility minimums.
- Loading/skeleton/image-performance behavior.
- Anti-patterns to avoid.

Page-specific exceptions should live under:

`design-system/soocly/pages/`

Do not regenerate or overwrite the master design system without explicit product/design approval.

## Skill update policy

External skills evolve. Do not copy random snippets from forks when an authoritative source exists.

When updating:

1. Re-run `scripts/setup-agent-skills.sh` in a development environment.
2. Review upstream breaking changes before relying on new behavior.
3. Keep SOOCLY-specific product decisions in this repository rather than editing third-party skills.
4. If a third-party skill conflicts with `AGENTS.md` or the current product specification, SOOCLY's project rules win.

## What is intentionally not installed by default

- Large generic "all skills" bundles.
- Paid ads skills before the product has validated organic/creator acquisition and monetization.
- App-store optimization before a native app exists.
- Cloudflare deployment skills before the hosting architecture is selected.
- Complex experimentation/paywall skills before Alpha activation is proven.

The skill set should expand only when a real project stage requires it.
