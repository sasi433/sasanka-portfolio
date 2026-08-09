# Performance and Accessibility Validation

Run a production build and server before auditing:

```powershell
pnpm build
pnpm start
pnpm audit:lighthouse
```

On Windows, set `CHROME_PATH` to an installed Chromium or Chrome executable when automatic discovery is unavailable. Audit output is written to the gitignored `.tools/lighthouse-home.json`.

## Phase 7 baseline

The homepage production build was audited on 9 August 2026 with mobile Lighthouse emulation:

| Category       | Score |
| -------------- | ----: |
| Performance    |    93 |
| Accessibility  |   100 |
| Best Practices |   100 |
| SEO            |    69 |

The SEO score is intentionally reduced in local and preview builds because they emit `noindex` and disallow crawling. Production builds set `NEXT_PUBLIC_SITE_ENV=production`, which enables indexing. Core measurements included 0 cumulative layout shift, 40 ms total blocking time and a 0.9 s speed index.

Automated axe checks also cover the homepage, About, Experience, Work, Skills, Contact, Privacy and a representative work-detail route after page-entry animations finish.
