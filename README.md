# Sasanka Maddala — Professional Portfolio

A production-oriented portfolio for Sasanka Maddala, Senior Software Engineer — Backend, Python, DevOps and Cloud-Native Systems.

The application presents verified professional experience, manually curated public projects, sanitised engineering case studies and a secure contact workflow. It is built with Next.js App Router and deployed to Cloudflare Workers through the OpenNext Cloudflare adapter.

## Technology

- Node.js 24 LTS and pnpm 11
- Next.js 16, React 19 and TypeScript
- Tailwind CSS with custom dark/light design tokens
- CSS scroll-driven animation and a small Intersection Observer layer for progressive, reduced-motion-aware interaction
- Zod, React Hook Form, Turnstile, Workers Rate Limiting and Resend
- Vitest, React Testing Library, Playwright, axe and Lighthouse
- Cloudflare Workers, OpenNext and Wrangler

## Local development

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Copy `.dev.vars.example` to the ignored `.dev.vars` only when testing integrations. Never commit real secrets.

OpenNext does not fully support native Windows symlink behavior. On Windows with Docker Desktop running, use `pnpm preview:docker`. Run production deployments through Cloudflare Workers Builds, WSL 2 or another Linux environment.

## Commands

| Command                 | Purpose                                              |
| ----------------------- | ---------------------------------------------------- |
| `pnpm dev`              | Start the Next.js development server                 |
| `pnpm start`            | Serve an existing production build                   |
| `pnpm build`            | Create a production Next.js build                    |
| `pnpm build:cloudflare` | Build the Cloudflare Worker with OpenNext            |
| `pnpm preview`          | Build and preview through OpenNext/Wrangler          |
| `pnpm preview:docker`   | Run the OpenNext preview in Node 24 Linux on Windows |
| `pnpm deploy`           | Build and deploy immediately to Cloudflare           |
| `pnpm upload`           | Build and upload a version without promoting it      |
| `pnpm deploy:dry-run`   | Validate the generated Wrangler upload bundle        |
| `pnpm lint`             | Run ESLint                                           |
| `pnpm typecheck`        | Run TypeScript without emitting files                |
| `pnpm test`             | Run unit, component and server tests                 |
| `pnpm test:e2e`         | Run Playwright browser and accessibility tests       |
| `pnpm audit:lighthouse` | Audit the local production homepage                  |
| `pnpm format`           | Format files with Prettier                           |
| `pnpm format:check`     | Verify formatting without writing                    |

## Architecture

The App Router uses React Server Components by default. Client components are limited to theme selection, mobile navigation, career animation and contact-form interaction. Typed files under `src/content` provide the public portfolio content and reusable work-detail model.

`POST /api/contact` validates input server-side, rejects honeypots silently, verifies Turnstile, applies the Workers rate-limit binding and delivers plain-text and HTML email through Resend. Messages are not stored in a database and provider internals are not returned to visitors.

Metadata, JSON-LD, sitemap, robots rules, a generated Open Graph image and optional Cloudflare Web Analytics are environment-aware. Preview builds remain non-indexable until `NEXT_PUBLIC_SITE_ENV=production` is explicitly configured.

See [architecture](docs/ARCHITECTURE.md), [deployment and rollback](docs/DEPLOYMENT.md), [performance](docs/PERFORMANCE.md), [content inventory](docs/CONTENT_INVENTORY.md) and the approved [implementation plan](docs/IMPLEMENTATION_PLAN.md).

## Continuous integration and deployment

GitHub Actions validates formatting, linting, types, unit/component/server tests, Playwright/axe behavior, the OpenNext Worker build and Wrangler dry-run bundle on every push to `main` and every pull request.

Cloudflare Workers Builds is the intended deployment owner. The dashboard connection, build-time values, encrypted runtime secrets and first production deployment require account-owner setup described in [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Content and privacy

Professional claims are sourced from approved content. Employer case studies use generic names and newly created diagrams; no employer-owned code, screenshots, logs, internal URLs, credentials or customer data are included. No phone number, home address, current city, family information or availability status is published.

## Rights

Copyright © 2026 Sasanka Maddala. All rights reserved.

This repository is public for portfolio and code-review purposes. No licence is granted for reuse, redistribution or derivative works.
