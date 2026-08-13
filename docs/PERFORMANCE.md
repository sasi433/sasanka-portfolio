# Performance and Accessibility Validation

Run a production build and server before auditing:

```powershell
pnpm build
pnpm start
pnpm audit:lighthouse
```

On Windows, set `CHROME_PATH` to an installed Chromium or Chrome executable when automatic discovery is unavailable. Audit output is written to the gitignored `.tools/lighthouse-home.json`.

## Current baseline

The redesigned homepage production build was audited on 13 August 2026 with mobile Lighthouse emulation:

| Category       | Score |
| -------------- | ----: |
| Performance    |    93 |
| Accessibility  |   100 |
| Best Practices |   100 |
| SEO            |    69 |

The SEO score is intentionally reduced in local and preview builds because they emit `noindex` and disallow crawling. Production builds set `NEXT_PUBLIC_SITE_ENV=production`, which enables indexing. Core measurements included 0 cumulative layout shift, 30 ms total blocking time and a 3.2 s largest contentful paint under Lighthouse's throttled mobile profile.

Automated axe checks also cover the homepage, About, Experience, Work, Skills, Contact, Privacy and a representative work-detail route after page-entry animations finish.

## Hero media policy

The homepage video is decorative, silent and encoded as WebM with an MP4 fallback. A small poster is rendered immediately; the video sources are not added on compact viewports, Save-Data connections or when reduced motion is requested. A visible pause/play control is provided whenever the motion layer is enabled. Current asset sizes must remain below the implementation-plan budgets of 2 MB for WebM and 3 MB for MP4.
