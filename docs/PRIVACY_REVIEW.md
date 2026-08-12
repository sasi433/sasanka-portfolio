# Privacy and Release Review

**Local audit status:** Complete on 2026-08-09

**Release approval status:** Pending repository-owner review and production verification

This document records the local Phase 9 audit. A checked item means the repository evidence was reviewed locally; it does not authorise making the repository public, deploying production, or creating the `v1.0.0` release.

## Repository and personal information

- [x] Searched tracked files and Git history for credential-like values, secrets, tokens, and private environment files. No real secret values were found.
- [x] Confirmed `.dev.vars` is untracked, ignored, and absent from Git history. `.dev.vars.example` contains variable names with blank or non-secret example values only.
- [x] Searched current files and Git history for phone-number patterns, private addresses, exact location details, family references, and personal Windows paths. No publish-blocking match was found outside the approved implementation specification.
- [x] Confirmed the only public email is the dedicated professional address approved in the content brief.
- [x] Confirmed no `LICENSE` or other open-source licence file exists.
- [x] Confirmed the README contains the required copyright and no-licence notice.
- [x] Confirmed `.git` and the existing `origin` remote remain intact.

## Professional content and confidentiality

- [x] Reviewed public copy against the approved implementation brief.
- [x] Confirmed Volvo Group is described as a software consultant client engineering assignment, not direct employment.
- [x] Confirmed the published date ranges are Ericsson: March 2019–March 2025 and Volvo Group: April 2025–June 2026.
- [x] Confirmed One Planet Rating is published using the role, dates, historical work location, responsibilities and technologies verified by the repository owner on 2026-08-12.
- [x] Confirmed portfolio-demonstrated frontend skills are labelled separately from professional experience.
- [x] Confirmed project status labels are explicit; the Document Support RAG Chatbot remains labelled as currently building.
- [x] Confirmed professional case studies use sanitised descriptions and contain no employer code, screenshots, logs, ticket IDs, registry names, internal URLs, customer names, or proprietary diagrams.
- [x] Confirmed no invented numerical impact metrics are published.

## Media and external links

- [x] Inspected the sole profile image. The optimised PNG is 900 × 900 and contains no EXIF, GPS, ICC, IPTC, or XMP metadata.
- [x] Confirmed no family information or family photographs are present.
- [x] Confirmed the GitHub profile and all three selected project repository URLs return HTTP 200 publicly.
- [x] Confirmed the LinkedIn URL identifies the intended public profile. LinkedIn rejects automated status requests, so it still requires a normal signed-out browser check before launch.
- [x] Compared the public RAG repository README with the portfolio claims; its FastAPI, document-ingestion, RAG, source-grounding, testing, and Docker capabilities support the published summary.

## Technical release evidence

- [x] Formatting, ESLint, TypeScript, unit/component tests, Playwright journeys, accessibility checks, Next.js production build, OpenNext build, Workers preview, and Wrangler dry-run have passed locally during Phases 7–9.
- [x] Preview indexing is disabled unless `NEXT_PUBLIC_SITE_ENV=production` is intentionally configured.
- [x] The contact form does not store messages in a database and does not expose server secrets to the client bundle.
- [x] Turnstile uses explicit client rendering and clears expired, errored, or rejected tokens; server-side verification remains enabled.

## Owner and production checks still required

- [ ] Review the One Planet Rating, education, thesis and language content added after the earlier owner review.
- [x] Read every public page and approve the professional wording, project statuses, interests, photograph, and professional email for publication.
- [x] Review the linked GitHub and LinkedIn profiles themselves. They may expose location or employment details that the portfolio intentionally omits.
- [ ] Authenticate GitHub tooling and confirm the hosted `main` CI workflow passes.
- [ ] Configure Cloudflare Workers Builds for the private repository and production branch.
- [ ] Add the required public build variables and encrypted Turnstile/Resend secrets in Cloudflare; do not commit them.
- [ ] Deploy to `workers.dev`, verify Worker logs, and test the production URL in dark/light themes and representative browsers/viewports.
- [ ] Submit a real contact message, confirm Turnstile verification and rate limiting, and verify email delivery and reply-to behavior.
- [ ] Verify Cloudflare Web Analytics receives production traffic without exposing a public counter.
- [ ] Verify production metadata, canonical URL, robots policy, sitemap, Open Graph image, and social sharing preview against the final production URL.
- [ ] Explicitly approve changing repository visibility to public.
- [ ] Add the live website link to GitHub, LinkedIn, and the CV; add repository topics and pin the repository.
- [ ] Explicitly approve and create the `v1.0.0` tag/release only after every production check above passes.

## Sign-off

- Local technical/privacy audit: **complete with no repository blocker found**.
- Production launch readiness: **not yet signed off** because credentials, hosted CI, live contact delivery, analytics, production URL, and owner approval require external account access or personal judgment.
