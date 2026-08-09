# Cloudflare Deployment and Operations

The production target is Cloudflare Workers through the OpenNext Cloudflare adapter. Native-Windows deployment is unsupported; use Workers Builds, Linux CI, WSL 2 or Docker/Linux.

## Workers Builds setup

In Cloudflare Workers & Pages, import the GitHub repository and use:

- Worker name: `sasanka-portfolio` (must match `wrangler.jsonc`)
- Production branch: `main`
- Build command: `pnpm exec opennextjs-cloudflare build`
- Deploy command: `pnpm exec opennextjs-cloudflare deploy -- --keep-vars`
- Non-production deploy command: `pnpm exec opennextjs-cloudflare upload -- --keep-vars`
- Root directory: repository root

Configure Node.js 24 and pnpm 11.20.0 in the build environment. `package.json`, `.nvmrc` and the lockfile are authoritative.

## Build-time variables

Set these under Workers Builds **Build variables and secrets** because Next.js inlines `NEXT_PUBLIC_*` values during its build:

- `NEXT_PUBLIC_SITE_URL`: final HTTPS portfolio origin, without a trailing path
- `NEXT_PUBLIC_SITE_ENV`: `production` only for the production branch; use `preview` elsewhere
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: public Turnstile widget key
- `NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN`: Web Analytics token

## Runtime secrets and variables

Configure these in the Worker's runtime settings. Never commit their real values:

- `RESEND_API_KEY` (encrypted secret)
- `TURNSTILE_SECRET_KEY` (encrypted secret)
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

The `CONTACT_RATE_LIMITER` binding is declared in `wrangler.jsonc` at five requests per minute. Keep dashboard variables during adapter deploys with `--keep-vars`.

## Verification after deployment

1. Confirm the `workers.dev` URL returns 200 for `/`, `/work`, `/contact`, `/sitemap.xml`, `/robots.txt` and `/opengraph-image`.
2. Verify the production robots file allows public pages and blocks `/api/` and `/contact/sent`.
3. Test dark and light themes, mobile navigation, work details and an unknown work slug.
4. Send one real contact message and confirm reply-to, plain-text and HTML email output.
5. Inspect Worker logs using `pnpm exec wrangler tail`; verify request IDs appear only in responses and provider details or message bodies are not logged.
6. Confirm Cloudflare Web Analytics receives traffic without displaying a public counter.

## Rollback and redeployment

- Preferred rollback: Cloudflare dashboard → Worker → Deployments → select the last known-good version → Rollback.
- Git rollback: create a normal revert commit for the faulty change and push it to `main`; do not rewrite published history.
- Manual redeploy from Linux: check out the required commit, install with `pnpm install --frozen-lockfile`, run the full validation suite, then run `pnpm deploy`.
- Preview-only upload: run `pnpm upload`; this creates a version without immediately serving it.

After rollback, repeat route, contact, theme and analytics verification. Retain the failed deployment logs long enough to diagnose the cause without copying secrets or contact-message content into issues.
