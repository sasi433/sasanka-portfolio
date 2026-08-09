# Sasanka Maddala — Portfolio

This repository contains the source for a professional portfolio built with Next.js App Router and deployed to Cloudflare Workers through the OpenNext Cloudflare adapter.

Phases 0 and 1 provide the platform, theme, shared-layout and reusable-component foundations with a temporary landing page. Final portfolio content, deeper routes, the contact workflow, release-level accessibility coverage and deployment automation remain intentionally deferred to their approved phases in [`docs/IMPLEMENTATION_PLAN.md`](docs/IMPLEMENTATION_PLAN.md).

## Prerequisites

- Node.js 24 LTS (see `.nvmrc`)
- pnpm 11 (Corepack is recommended)

## Local development

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

The Next.js development server runs in Node.js. Before deployment, use `pnpm preview` to build with OpenNext and run the application in Cloudflare's local `workerd` runtime.

### Windows note

OpenNext is not fully compatible with native Windows and may fail while creating package symlinks. With Docker Desktop running, use `pnpm preview:docker` for a Linux-based OpenNext build and local Workers preview. Run deployments from WSL 2 or Linux-based CI. Normal `pnpm dev`, linting, type-checking, tests, and Next.js builds work on native Windows.

## Commands

| Command               | Purpose                                                    |
| --------------------- | ---------------------------------------------------------- |
| `pnpm dev`            | Start the Next.js development server                       |
| `pnpm build`          | Create a production Next.js build                          |
| `pnpm preview`        | Build with OpenNext and preview through Wrangler           |
| `pnpm preview:docker` | Preview through OpenNext and Wrangler in Docker on Windows |
| `pnpm deploy`         | Build and deploy to Cloudflare Workers                     |
| `pnpm lint`           | Run ESLint                                                 |
| `pnpm typecheck`      | Run TypeScript without emitting files                      |
| `pnpm test`           | Run Vitest                                                 |
| `pnpm test:e2e`       | Run Playwright end-to-end tests                            |
| `pnpm format`         | Format repository files with Prettier                      |

## Environment variables

Copy `.dev.vars.example` to `.dev.vars` only when a later phase introduces integrations. Keep `.dev.vars` and all real secrets uncommitted. Cloudflare production secrets must be configured as encrypted Worker secrets, not public Wrangler variables.

## Deployment

The Worker configuration is in `wrangler.jsonc`. The initial target is Cloudflare Workers on a `workers.dev` subdomain. Automatic deployment through Cloudflare Workers Builds is deferred until the deployment phase.

## Rights

Copyright © 2026 Sasanka Maddala. All rights reserved.

This repository is public for portfolio and code-review purposes. No licence is granted for reuse, redistribution or derivative works.
