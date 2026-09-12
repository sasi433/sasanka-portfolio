# Portfolio Synchronization Delivery Plan

- **Status:** Approved - Days 0-1 complete
- **Created:** 2026-09-11
- **Repository:** `sasi433/sasanka-portfolio`
- **Production:** `https://portfolio.sasanka-maddala.workers.dev/`

## Purpose

This document turns the approved portfolio synchronization brief into small,
independently deployable workdays. A future request such as:

> Implement Day 4 from `docs/PORTFOLIO_SYNCHRONIZATION_PLAN.md`.

authorizes only that day's scope, its validation, its commit, and its push to
`main`. Work on the following day must not start until the current day's commit
is confirmed on `origin/main`, GitHub CI is green, the Cloudflare deployment is
healthy, and any listed owner checkpoint is complete.

These are logical workdays. They do not have to be consecutive calendar days.

## Source-of-truth order

1. The owner's instruction for the active day.
2. This synchronization plan and the attached synchronization brief from which
   it was created.
3. `docs/IMPLEMENTATION_PLAN.md` for all unchanged product, privacy,
   architecture, accessibility, and design decisions.
4. Verified content in the public project repositories and their current
   releases.

This plan is an addendum. Do not edit `docs/IMPLEMENTATION_PLAN.md` as part of
this synchronization pass.

The synchronization brief supersedes the older plan only for:

- homepage section order and featured-project selection;
- current project statuses and the addition of newer projects;
- Work-page categorization and evidence presentation;
- reducing repetitive Security Master promotion;
- using real project evidence instead of generic project-card artwork;
- the expanded footer, SEO, structured-data, and production checks;
- the final Beyond Code presentation after the owner selects an option.

## Non-negotiable boundaries

- Work only in `sasanka-portfolio`.
- Sibling repositories are read-only sources. Never modify, tag, release, or
  deploy them.
- Do not invent functionality, dates, metrics, achievements, releases, live
  URLs, or employer details.
- Do not expose secrets, personal data, employer-owned material, or internal
  identifiers.
- Preserve the current visual identity, themes, navigation, headshot,
  responsive behavior, useful motion, Cloudflare/OpenNext architecture, contact
  architecture, accessibility work, skill imagery, and approved interest
  imagery unless the active day explicitly changes one of them.
- Do not create the portfolio `v1.0.0` tag or release during this plan.
- Do not push a partially validated implementation to `main`.

## Current verified starting facts

- `sasanka-portfolio` is on `main`; the starting commit when this plan was
  drafted was `b01085f`.
- The portfolio and all four referenced project repositories are public.
- Microphone Array Localization has a published GitHub `v1.0.0` release.
- Document Support RAG Chatbot has no published GitHub release. A local tag does
  not qualify as a public release.
- Production Incident Simulator and Log Report Automation have no published
  GitHub releases.
- The portfolio has no published GitHub release.
- Real screenshot assets are available locally for Production Incident
  Simulator, Log Report Automation, Microphone Array Localization, and Document
  Support RAG Chatbot.
- `document-support-rag-chatbot/images/screenshots/06-ci-validation.png` was
  untracked when this plan was drafted. Do not use it unless it later becomes
  an approved source asset.

Re-verify these facts at the start of Day 1 because repository state can
change.

## Mandatory execution protocol for every day

### Before editing

1. Read this complete plan and the active day's scope.
2. Read the relevant sections of `docs/IMPLEMENTATION_PLAN.md`.
3. Run `git status --short`. Stop and report unexpected user changes rather
   than overwriting them.
4. Fetch `origin` and fast-forward local `main` only. Do not rewrite history.
5. Confirm the previous day's commit is present on `origin/main`.
6. Re-read the relevant sibling-repository documentation before publishing a
   factual claim.
7. Record a baseline for tests directly affected by the day's work.

### While editing

- Keep the commit limited to the active day.
- Update or add tests for every changed behavior.
- Keep public content in typed content files.
- Copy only approved evidence assets and remove image metadata where needed.
- Use `Next/Image` for raster website images.
- If an unexpected fact, privacy concern, or design decision appears, stop and
  request owner input instead of guessing.

### Local validation before commit

Run the full gate unless the active day explicitly adds another check:

```text
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
pnpm build:cloudflare
pnpm deploy:dry-run
```

Also inspect the relevant pages locally in dark and light themes at 390 px and
desktop width. Use an OpenNext/Workers preview when the change touches runtime,
environment, routing, metadata, contact handling, or Cloudflare behavior.

Do not suppress failures. Fix failures caused by the day's work before
committing.

### Commit and deployment gate

1. Review `git diff` and `git diff --cached`.
2. Check that no secret, `.dev.vars`, personal path, private screenshot, or
   generated test artifact is staged.
3. Create the day's logical commit using the planned commit message.
4. Push the commit directly to `main`, as explicitly requested by the owner.
5. Confirm the exact commit exists on `origin/main`.
6. Wait for the GitHub `main` CI workflow to pass.
7. Wait for Cloudflare Workers Builds to deploy that same commit successfully.
8. Smoke-test the affected production routes.
9. Complete any owner checkpoint listed for the day.
10. Only then may the next day begin.

If a post-push defect is found, remain on the same day and create the smallest
corrective commit. Do not begin the next day until the corrective commit is on
`main` and all gates pass.

## Owner checkpoint rules

- **Required before work:** Codex must request the information before editing.
- **Required before next day:** the current day may be pushed, but subsequent
  work waits for the owner's production or visual approval.
- **Conditional:** Codex asks only when inspection reveals ambiguity, sensitive
  material, or missing evidence.
- Days without an owner checkpoint may proceed autonomously through commit and
  push when the user explicitly requests that day.

## Delivery phases and daily commits

| Day | Phase        | Deliverable                                               | Planned commit                                               | Status      |
| --- | ------------ | --------------------------------------------------------- | ------------------------------------------------------------ | ----------- |
| 0   | Planning     | Approve and track this execution plan                     | `docs: add portfolio synchronization delivery plan`          | Complete    |
| 1   | Evidence     | Verify sources and extend the content model               | `refactor: extend verified work content model`               | Complete    |
| 2   | Content      | Synchronize projects and reorganize Work                  | `feat: synchronize portfolio project catalog`                | Not started |
| 3   | Evidence     | Add optimized real project visuals and cards              | `feat: add real project evidence to work cards`              | Not started |
| 4   | Case studies | Strengthen application detail pages                       | `feat: expand application engineering case studies`          | Not started |
| 5   | Case studies | Improve sanitized professional diagrams                   | `feat: refine professional engineering diagrams`             | Not started |
| 6   | Homepage     | Put evidence earlier and clarify identity                 | `feat: prioritize engineering evidence on homepage`          | Not started |
| 7   | Accuracy     | Synchronize Experience and Skills content                 | `content: refine experience and engineering skills`          | Not started |
| 8   | About        | Refine Beyond Code density and content review             | `feat: rebalance beyond-code presentation`                   | Not started |
| 9   | Site polish  | Improve footer, header, contact, and privacy              | `feat: polish site-wide supporting content`                  | Not started |
| 10  | Discovery    | Harden canonical URL handling and SEO                     | `feat: harden production metadata and discovery`             | Not started |
| 11  | Quality      | Expand responsive, accessibility, and regression coverage | `test: expand portfolio release coverage`                    | Not started |
| 12  | Readiness    | Final validation and release documentation                | `docs: prepare synchronized portfolio for production review` | Not started |
| 13  | Production   | Record owner-led production verification                  | `docs: record synchronized production verification`          | Not started |

---

## Day 0 - Approve and track this plan

### Scope

- Review this document with the owner.
- Resolve the Beyond Code decision recorded under Day 8.
- Confirm that direct-to-`main` daily delivery remains desired.
- Commit and push this document only after owner approval.

### Validation

- Markdown formatting check.
- Confirm no application code or unrelated documentation changed.

### Owner checkpoint

**Required before commit:** approve this plan and select the Day 8 Beyond Code
option.

### Completion evidence

- This document is present on `origin/main`.
- The status of Day 0 is changed to `Complete` in the Day 0 commit.

---

## Day 1 - Verify sources and extend the content model

### Scope

- Re-verify repository visibility, default branches, releases, README claims,
  and available screenshot assets for all referenced projects.
- Inspect screenshots for names, email addresses, tokens, local paths, internal
  URLs, or other private data.
- Record approved sources and unresolved items in
  `docs/CONTENT_INVENTORY.md`.
- Extend `WorkItem` with the minimum typed fields needed for:
  - category;
  - execution model;
  - version/release label;
  - optional release URL;
  - optional card/hero image;
  - screenshot captions;
  - application-specific detail sections where needed.
- Keep existing content rendering correctly through backward-compatible data or
  a single atomic migration.
- Add content-model validation tests.

### Not in scope

- Visible Work-page redesign.
- Copying project screenshots.
- Changing public project descriptions.

### Additional validation

- Verify every configured release URL exists.
- Verify a live URL is impossible to render unless explicitly configured.

### Owner checkpoint

**Conditional:** required only if a source contradicts the synchronization
brief or a screenshot may contain private information.

### Completion evidence

- The extended model is typed and tested.
- The production UI is unchanged.

---

## Day 2 - Synchronize projects and reorganize Work

### Scope

- Update truthful status and scope for:
  - Document Support RAG Chatbot;
  - Production Incident Simulator;
  - Log Report Automation.
- Add:
  - Microphone Array Localization;
  - Personal Portfolio Platform.
- Organize `/work` into:
  1. Software Applications / Engineering Projects;
  2. Professional Engineering Case Studies;
  3. Technical / Academic Engineering.
- Keep Security Master as a restrained experience contribution, not a major
  standalone Work feature.
- Ensure all application and case-study routes render and unknown slugs return 404.
- Do not add a live link for local/self-hosted applications.
- Use the real microphone `v1.0.0` release URL and no unverified release links.
- Add tests for grouping, routing, status labels, and link rules.

### Owner checkpoint

**Required before next day:** review the production `/work` page wording and
project categorization. Corrections remain part of Day 2.

### Completion evidence

- All nine intended Work items are present in the correct sections.
- Status, release, execution-model, GitHub, and live-link behavior is truthful.

---

## Day 3 - Add optimized real project visuals and improve cards

### Scope

- Copy approved source assets into `public/images/projects/<slug>/` without
  modifying sibling repositories.
- Add one optimized card/hero image per application.
- Add the approved detail-gallery assets for Incident Simulator, Log Report
  Automation, RAG, and Microphone Array Localization.
- Prefer tracked RAG screenshots; exclude its untracked CI image unless later
  approved.
- Optimize dimensions and file formats while preserving screenshot text.
- Remove metadata that should not be published.
- Update Work cards to show:
  - project type;
  - truthful status/version;
  - execution model where useful;
  - concise value statement;
  - key technologies;
  - real image evidence.
- Use `View project` for applications and `Read case study` for professional
  case studies.
- Add a discreet GitHub action only when a repository exists.
- Load only one thumbnail per Work-index card.

### Additional validation

- Inspect all copied images at full size.
- Check image metadata and repository paths.
- Verify card readability in both themes and responsive widths.
- Confirm keyboard focus and alt-text behavior.

### Owner checkpoint

**Required before next day:** visually approve the production Work cards and
confirm that the selected screenshots are suitable for public presentation.

### Completion evidence

- Generic artwork is no longer the primary application evidence.
- No card gallery downloads all project screenshots.

---

## Day 4 - Strengthen application detail pages

### Scope

- Give applications an engineering case-study presentation with relevant
  sections selected from:
  - Overview;
  - Problem / motivation;
  - What it implements;
  - Architecture / workflow;
  - Key engineering decisions;
  - Reliability / security considerations;
  - Validation / testing;
  - Screenshots / results;
  - Technology stack;
  - Execution model;
  - Current scope / limitations;
  - GitHub, release, and genuine live actions.
- Add a responsive, accessible screenshot gallery with captions.
- Use actual RAG screenshots when they remain verified and safe.
- Make microphone result captions clear that they are reproducible simulations,
  not general real-world accuracy claims.
- Preserve the professional case-study presentation until Day 5.
- Add tests for screenshots and conditional GitHub/release/live links.

### Owner checkpoint

**Required before next day:** inspect representative application pages locally
or in production, especially screenshot legibility on mobile and desktop.

### Completion evidence

- Application pages present evidence and engineering decisions rather than
  merely repeating README text.

---

## Day 5 - Improve sanitized professional case-study diagrams

### Scope

- Replace simplistic generic diagrams with portfolio-owned responsive SVG/CSS
  diagrams for:
  - Shared Python Libraries;
  - Container Image Delivery Workflow;
  - Build Reliability and Fail-Fast Validation;
  - Production Support and Failure Triage.
- Use only generic reconstructed labels from the synchronization brief.
- Preserve confidentiality notes.
- Ensure diagrams remain understandable at mobile widths and through accessible
  text descriptions.
- Remove redundant standalone Security Master promotion from Work while keeping
  the approved Ericsson contribution.

### Additional validation

- Keyboard and screen-reader semantics.
- Dark/light contrast.
- 360 px, 390 px, tablet, and desktop rendering.

### Owner checkpoint

**Conditional:** required if any diagram label could imply confidential
architecture or an unsupported professional claim.

### Completion evidence

- Each professional case study has a distinct, sanitized engineering flow.

---

## Day 6 - Reorder the homepage and clarify professional identity

### Scope

- Preserve the creative headline: `Backend systems built for reliable
delivery.`
- Make the first viewport clearly expose:
  - Sasanka Maddala;
  - Senior Software Engineer;
  - Backend, Python, DevOps and Cloud-Native Systems.
- Keep `View My Work` primary and `Contact Me` secondary.
- Keep GitHub and LinkedIn secondary.
- Preserve the approved headshot and hero-video behavior; do not add typing,
  rotating titles, location, phone number, or Open to Work messaging.
- Reorder the homepage to:
  1. Hero;
  2. Featured Work;
  3. Career Journey;
  4. Engineering Focus / Impact;
  5. Skills;
  6. Beyond Code preview;
  7. Contact CTA.
- Feature exactly:
  - Document Support RAG Chatbot;
  - Production Incident Simulator;
  - Log Report Automation;
  - Shared Python Libraries.
- Preserve working career scrollytelling and mobile fallbacks.
- Remove repetitive Security Master emphasis from homepage impact copy.
- Add ordering, identity, CTA, and responsive tests.

### Owner checkpoint

**Required before next day:** approve the production homepage hierarchy in
dark/light themes on mobile and desktop. Corrections remain part of Day 6.

### Completion evidence

- Featured Work precedes Career Journey in markup and visually.
- Identity and specialization are understandable without waiting for animation.

---

## Day 7 - Synchronize Experience and Skills content

### Scope

- Present Volvo Group as:
  `Software Consultant - Client Engineering Assignment`, April 2025-June 2026.
- Correctly distinguish Ericsson direct employment through November 2024 from
  the later consulting engagement through March 2025.
- Do not change One Planet Rating facts without verified owner input.
- Keep Security Master as one restrained Ericsson contribution.
- Preserve the seven skill categories and their current generated imagery.
- Reframe AI-Assisted Engineering around capabilities first and tools second.
- Keep Modern Web explicitly portfolio-demonstrated.
- Do not add scores, percentage bars, or unsupported years.
- Add/update content tests.

### Owner checkpoint

**Required before work:** confirm the exact public Ericsson role wording. The
recommended wording is `Software Developer, later consulting engagement`, with
supporting copy stating that the direct role was followed by a short consulting
engagement through March 2025.

**Required before next day:** approve the Experience page after deployment.

### Completion evidence

- Employment relationships and dates cannot be misread.
- Skill claims remain demonstrable and appropriately qualified.

---

## Day 8 - Rebalance Beyond Code and complete content-review prompts

### Scope

- Preserve the eight approved interests and their existing generated images.
- Reduce Beyond Code's vertical weight relative to professional content.
- Preserve image gradients, readable text, theme behavior, and mobile UX.
- Add Hindi proficiency wording to the owner-review checklist without changing
  the public value unless the owner explicitly approves it.
- Do not add family or financial information.

### Owner decision required before work

The owner selected **Option B - Condensed scrollytelling** on 2026-09-11.
Implement that option during Day 8.

The options reviewed were:

- **Option A - Compact gallery (recommended by the synchronization brief):**
  replace About-page scrollytelling with approximately 4 columns x 2 rows on
  wide desktop, 2-3 columns on smaller screens, and 1 column on mobile.
- **Option B - Condensed scrollytelling (selected):** retain the previously approved
  scrollytelling concept but reduce trigger height and total scroll distance.

Do not replace it with the compact gallery unless the owner explicitly changes
this decision later.

### Owner checkpoint

**Required before next day:** approve the resulting About-page balance and
confirm whether the existing Hindi proficiency wording is accurate.

### Completion evidence

- Personal content remains lively but does not outweigh Work and Experience.

---

## Day 9 - Polish footer, header, contact, and privacy

### Scope

- Expand the footer with:
  - copyright;
  - GitHub;
  - LinkedIn;
  - email;
  - Privacy;
  - Source.
- Optionally retain a restrained stack line if it fits the current design.
- Keep the existing primary header navigation; add desktop social icons only if
  they remain uncluttered.
- Preserve the direct email fallback on Contact.
- Update Privacy from future tense to accurate present tense where production
  functionality is active.
- Explain contact processing, no separate application message database,
  Turnstile/security processing, Resend/email delivery, analytics, and contact
  email without making unsupported legal promises.
- Preserve generic provider/configuration errors.
- Add footer, contact, privacy, keyboard, and mobile-menu tests.

### Owner checkpoint

**Conditional:** request owner input if production contact or analytics remains
unconfigured; wording must describe actual state rather than planned state.

### Completion evidence

- Footer links work and Contact remains usable even when the form is
  unavailable.

---

## Day 10 - Harden canonical URL handling, SEO, and discovery

### Scope

- Make production detection safe when an environment variable is absent or
  invalid.
- Ensure localhost can never become a production canonical origin.
- Keep all absolute URLs derived from `NEXT_PUBLIC_SITE_URL`.
- Verify and improve:
  - canonical metadata;
  - title templates and descriptions;
  - Open Graph and social metadata;
  - `Person`, `WebSite`, and appropriate `ProfilePage` JSON-LD;
  - `sameAs` links;
  - sitemap routes, including all Work details;
  - production versus preview robots behavior;
  - `/contact/sent` noindex behavior;
  - API exclusion.
- Update `docs/DEPLOYMENT.md` with exact build-time and runtime configuration
  and future custom-domain migration instructions.
- Add SEO/metadata/robots/sitemap tests.

### Additional validation

- Build once with production values and once with preview/local values.
- Use an OpenNext preview for production-like route checks.

### Owner checkpoint

**Required before work only if values are unknown:** confirm the production URL
remains `https://portfolio.sasanka-maddala.workers.dev/`.

### Completion evidence

- Changing a future domain requires configuration changes, not application-code
  rewrites.

---

## Day 11 - Expand responsive, accessibility, performance, and regression coverage

### Scope

- Expand unit/component/Playwright coverage for all synchronization changes.
- Cover at minimum:
  - hero identity and CTAs;
  - homepage ordering;
  - Work categories and projects;
  - application versus case-study CTAs;
  - galleries and conditional links;
  - unknown Work slug 404;
  - seven skill categories and image mapping;
  - footer destinations;
  - canonical/robots/sitemap behavior;
  - dark/light theme and persistence;
  - 360 px and 390 px mobile, tablet, and desktop;
  - keyboard navigation;
  - reduced motion;
  - automated axe checks on key routes.
- Audit image loading, intrinsic sizes, lazy loading, and page weight.
- Correct synchronization-related accessibility or responsive defects.
- Do not make unrelated visual changes.

### Owner checkpoint

**Required before next day:** perform a short real-device check on iPhone Chrome
or Safari for Home, Work, one project page, Skills, About, and the mobile menu.

### Completion evidence

- Automated coverage reflects the new information architecture and evidence
  components.

---

## Day 12 - Run final local validation and prepare production review

### Scope

- Run the complete validation suite from a clean checkout state.
- Run OpenNext/Cloudflare preview and route smoke tests.
- Review the complete diff from the pre-synchronization baseline.
- Audit tracked files and Git diff for secrets, private paths, screenshot
  metadata, employer information, and accidental generated artifacts.
- Update:
  - `docs/CONTENT_INVENTORY.md`;
  - `docs/DEPLOYMENT.md`;
  - `docs/PRIVACY_REVIEW.md` only for checks genuinely completed;
  - README where the public project catalog or architecture description is
    stale.
- Produce the requested implementation report and a concise manual production
  checklist.
- Do not create `v1.0.0`.

### Owner checkpoint

**Required before next day:** approve the synchronized content and visuals as a
release candidate for production verification.

### Completion evidence

- Clean working tree after push.
- GitHub CI and Cloudflare deployment succeed for the Day 12 commit.
- No remaining local technical blocker is hidden or suppressed.

---

## Day 13 - Perform and record owner-led production verification

### Scope

This day depends on the owner because it includes private account settings,
personal judgment, real email delivery, and representative devices.

- Confirm Cloudflare build variables:
  - `NEXT_PUBLIC_SITE_URL`;
  - `NEXT_PUBLIC_SITE_ENV`;
  - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`;
  - `NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN`.
- Confirm runtime variables/secrets:
  - `RESEND_API_KEY`;
  - `TURNSTILE_SECRET_KEY`;
  - `CONTACT_TO_EMAIL`;
  - `CONTACT_FROM_EMAIL`;
  - the configured rate-limiter binding.
- Verify production routes, Worker logs, themes, representative browsers, and
  viewports.
- Submit a real contact message and verify:
  - Turnstile;
  - delivery;
  - reply-to behavior;
  - generic errors;
  - rate limiting without abusive testing.
- Confirm Cloudflare Web Analytics receives production traffic without a public
  counter.
- Verify canonical metadata, robots, sitemap, Open Graph image, and a social
  sharing preview against the production URL.
- Update only those `docs/PRIVACY_REVIEW.md` checkboxes supported by completed
  evidence.
- Record remaining steps for GitHub/LinkedIn/CV links, repository topics,
  pinned repositories, and later `v1.0.0` approval.

### Owner checkpoint

**Required throughout:** the owner performs or confirms dashboard, email,
browser, social-preview, and profile actions. No secret value should be pasted
into chat or committed.

### Completion evidence

- Production checks are recorded truthfully.
- Any unchecked release item has a clear reason and next action.
- The portfolio remains untagged until the owner separately authorizes
  `v1.0.0`.

## Standard future commands

Use one of these forms in a future conversation:

```text
Implement Day 2 from docs/PORTFOLIO_SYNCHRONIZATION_PLAN.md.
Follow every validation, commit, push, CI, Cloudflare and owner-gate rule in the plan.
```

```text
Resume Day 4 from docs/PORTFOLIO_SYNCHRONIZATION_PLAN.md.
First inspect the current Git state and report which completion gates remain.
```

```text
Audit Day 6 only. Do not edit, commit or push anything.
```

The word `implement` authorizes the active day's scoped file changes, local
validation, planned commit, and push to `main`. It does not authorize work from
another day, a `v1.0.0` tag/release, sibling-repository changes, or unrelated
external actions.

## Final synchronization definition of done

The synchronization pass is complete when Days 1-13 are complete, or when any
remaining owner-only checks are explicitly documented as pending. Completion
means the portfolio is synchronized, validated, deployed, and ready for a
separate final `v1.0.0` decision. It does not itself authorize that release.
