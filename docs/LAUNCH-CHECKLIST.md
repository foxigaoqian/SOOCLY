# SOOCLY Production Launch Checklist

This checklist separates **code readiness** from **content verification**. Passing CI is not permission to make prototype Camera Looks searchable.

## 1. Product routes

Verify these routes on the real Next.js deployment:

- `/`
- `/looks`
- `/looks/tokyo-midnight`
- `/cameras`
- `/cameras/fujifilm/x100vi`
- `/cameras/ricoh/gr-iv`
- `/my-gear`
- `/saved`
- `/about`
- `/privacy`
- `/terms`
- a deliberately invalid URL for the branded 404

Check Header, Footer, breadcrumbs, camera switching, Save Look, My Gear, Copy Settings, filtering, and the SOOCLY Split on desktop and mobile.

## 2. Camera-proof gate

Before a Look is presented as verified or the site is opened to search engines:

- replace prototype/reference photography with licensed production photography
- use real same-scene Default ↔ Look output for the SOOCLY Split
- test every published Look Variant on the named camera
- record the exact camera model and complete settings
- confirm the author/creator and image usage rights
- remove any wording that implies unverified browser-treated imagery is camera output

A prototype Look may remain public only when its unverified status is unmistakable.

## 3. Search gate

SOOCLY defaults to `SITE_INDEXABLE=false`.

Keep it false on previews and while camera proof is incomplete. This causes the app metadata and `robots.txt` to block indexing and keeps the generated sitemap empty.

Only on the intended production deployment, after the content gate is complete:

```text
SITE_INDEXABLE=true
```

Then rebuild/redeploy and verify:

- `/robots.txt` allows public routes and excludes `/saved` and `/my-gear`
- `/sitemap.xml` contains public static pages, Look pages, and Camera pages
- `/saved` and `/my-gear` still emit `noindex`
- page titles and descriptions are correct
- the branded Open Graph image renders correctly

## 4. Domain and search tools

After `soocly.com` is bound to the real Git-connected deployment:

- force HTTPS and verify the canonical host
- verify `https://soocly.com/robots.txt`
- verify `https://soocly.com/sitemap.xml`
- add the production property to Google Search Console
- submit the sitemap only after `SITE_INDEXABLE=true`
- inspect the homepage, one Look page, and one Camera page in URL Inspection

Do not point the domain at a static visual mockup.

## 5. Performance and accessibility

On representative desktop and mobile devices:

- check hero and card image loading
- check layout shift around remote images
- check keyboard focus and skip link
- check the SOOCLY Split with keyboard input
- check reduced-motion behavior
- check Header behavior at scroll and mobile widths
- check empty states for Saved and My Gear

Run Lighthouse or equivalent against the final production URL, not only a local build.

## 6. Privacy and behavior

Before adding analytics, authentication, cloud sync, cookies, payments, or advertising technology, update `/privacy` and `/terms` to match the implementation first.

Current Alpha behavior is intentionally simple: Saved Looks and My Gear are browser-local product state.
