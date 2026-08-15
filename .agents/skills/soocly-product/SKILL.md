---
name: soocly-product
description: Project-specific product and development rules for SOOCLY. Use for any SOOCLY feature, UX, architecture, data-model, SEO, creator/community, analytics, or deployment work. Read AGENTS.md and .agents/product-marketing.md before making material changes.
metadata:
  version: 1.0.0
---

# SOOCLY Product Skill

This skill is the project-local guardrail for SOOCLY. It does not replace specialist skills; it routes work through the product's actual strategy and invariants.

## Start here

Before material work:

1. Read `AGENTS.md`.
2. Read `.agents/product-marketing.md`.
3. Read the relevant `docs/` files.
4. If the task changes UI, read `design-system/soocly/MASTER.md` when it exists.
5. Load the smallest relevant specialist skills listed in `docs/SKILLS.md`.

## Product thesis

SOOCLY helps a user move from a desired visual result to a credible implementation on the exact device they use.

The experience should prioritize:

1. Visual result.
2. Device relevance.
3. Real proof.
4. Reproducible settings and shooting guidance.
5. Saving/participation/return value.

Do not turn SOOCLY into a parameter dump, a generic preset marketplace, or a content farm.

## Core data invariant

A **Look** is device-independent identity.

A **Look Variant** is the calibrated implementation for one Device.

A **Settings payload** belongs to a Look Variant and follows a brand/device settings schema.

A **Sample Photo / Comparison Pair / Community Shot** should reference the relevant Look Variant when it is used as evidence of actual output.

This separation must survive UI, APIs, database schema, URLs, analytics, and creator workflows.

## Alpha scope guardrail

Default Alpha scope:

- Browse Looks.
- Browse/select supported devices.
- Bind a device to My Gear.
- Look detail.
- Default ↔ Look comparison.
- Exact device-specific settings.
- Save a Look.

Do not add Creator marketplace, payment, AI reference-image matching, complex recommendation models, native apps, or mass device support to Alpha unless the product specification is explicitly changed.

## Trust standard

The platform's credibility is part of the product.

Never:

- Label AI-generated imagery as camera output.
- Claim a Look is tested/calibrated on a device without evidence.
- Claim identical settings produce identical output across devices or conditions.
- Hide important shooting conditions when they materially affect the result.

Prefer clear labels such as:

- Tested on
- Calibrated for
- Community shot
- Decorative / conceptual image
- Default comparison methodology

## Growth standard

Each strong Look should be able to act as a distribution unit:

- Public Look page.
- Real sample images.
- Default ↔ Look comparison.
- Social/creator assets.
- Save/Try actions.
- Device relevance.
- Future community evidence.

Growth mechanics should strengthen user value. Do not add notification spam, fake scarcity, meaningless streaks, or other dark patterns merely to increase session time.

## SEO standard

SOOCLY uses SEO to capture proven demand and durable Look/device discovery, not to generate every possible variable combination.

Before a new scalable page pattern is indexable, ask:

- Is there real user/search intent?
- Does this page contain unique evidence/data/content?
- Is it distinct from another page targeting the same query?
- Can users reach it through normal site navigation/internal links?

If the answer is weak, do not create/index it yet.

## UX standard

- Show photography early.
- Let users browse before forcing account creation.
- Use `Look` as the cross-platform concept, while respecting ecosystem terminology in context.
- Make device selection persistent and useful.
- Mobile and touch interaction are first-class.
- Before/After interaction must work without hover.
- Image loading must avoid layout shift and excessive bandwidth.
- Accessibility is a release requirement.

## Decision rule

When a specialist skill recommends a generic pattern that conflicts with SOOCLY's product strategy, prefer SOOCLY's documented strategy and adapt the pattern.

When documentation conflicts or the product decision is genuinely unresolved, do not guess silently. Surface the decision and record the chosen outcome in the appropriate project document before implementing it.
