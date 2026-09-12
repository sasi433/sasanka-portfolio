# Content Inventory

This file tracks source material that must be verified before it is published. Public content must come from the approved implementation brief or another explicitly verified source.

## Required for later phases

- TODO(content): Obtain repository-owner approval of the final public wording before changing repository visibility or publishing `v1.0.0`.
- The owner approved excluding the current Incident Simulator request-ID
  correlation screenshot and Log Report Automation CLI screenshot on
  2026-09-12. Both expose a local Windows user path and must not be copied or
  published during later phases.

## Phase 9 review

- Sanitised professional case studies were reviewed for internal names, proprietary details, unsupported metrics, and confidentiality risks on 2026-08-09.
- Project repository links and status labels were reconfirmed on 2026-08-09. The RAG project intentionally remains labelled `Currently Building` for v1.
- One Planet Rating role, dates, historical work location, responsibilities and technologies were verified by the repository owner on 2026-08-12 and are now approved for publication.
- Master's and bachelor's degree details, thesis descriptions, factual results and technology topics were verified by the repository owner on 2026-08-12.
- Spoken-language proficiency descriptions were verified by the repository owner on 2026-08-12.

## Verified inputs received

- Public name, professional headline, biography and professional email address.
- Public GitHub and LinkedIn profile URLs.
- Approved professional headshot and repository-relative public path.
- One Planet Rating, Ericsson and Volvo Group role wording, date ranges, responsibilities and technologies.
- Three curated public project repositories, descriptions and current status labels.
- Four sanitised professional case-study subjects and the Secure Development Awareness highlight.
- Grouped skills and selected Beyond Code interests.

## Synchronization source audit - 2026-09-12

The following repositories were checked through the authenticated GitHub CLI
and their local read-only source checkouts. All are public and use `main` as the
default branch.

| Project                       | Verified repository                     | Release state                                                                                      | Verified execution scope                                                                                           |
| ----------------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Document Support RAG Chatbot  | `sasi433/document-support-rag-chatbot`  | No published GitHub release                                                                        | Local/self-hosted FastAPI application with browser, REST, Docker, Compose and single-instance Kubernetes workflows |
| Production Incident Simulator | `sasi433/production-incident-simulator` | No published GitHub release                                                                        | Local Docker Compose incident lab; CI validates it but does not deploy it                                          |
| Log Report Automation         | `sasi433/log-report-automation`         | No published GitHub release                                                                        | Local Python CLI that creates validated Excel reports; not a live monitoring service                               |
| Microphone Array Localization | `sasi433/microphone-array-localization` | Published [`v1.0.0`](https://github.com/sasi433/microphone-array-localization/releases/tag/v1.0.0) | Reproducible MATLAB technical simulation; not an AI or production acoustic-localization product                    |
| Personal Portfolio Platform   | `sasi433/sasanka-portfolio`             | No published GitHub release                                                                        | Live Cloudflare Workers application at the production URL recorded in the synchronization plan                     |

### README-backed claims approved as source material

- RAG: text, Markdown and PDF ingestion; OpenAI embeddings and answer
  generation; persistent ChromaDB retrieval; grounded citations and fallback;
  recent-session follow-ups; Pytest, Ruff, Docker, Compose and Kubernetes
  validation. Its documented limitations must remain visible when the public
  copy is synchronized.
- Incident Simulator: FastAPI, PostgreSQL, Redis, Nginx, Prometheus and Grafana;
  three deterministic incident scenarios; structured logs and request
  correlation; CI lint/test, Compose smoke and security scan jobs. Every
  incident is simulated and the application is a local lab, not a deployed
  production service.
- Log Report Automation: validated CSV-to-Excel reporting; strict and lenient
  validation; reliability metrics, service/daily summaries and native charts;
  formula-injection protection; Python 3.10-3.12 CI. It is a reporting utility,
  not a database, BI platform or live ingestion system.
- Microphone Array Localization: MATLAB V1.0.0 simulation with LMS peak, LMS
  phase-slope and independently implemented GCC-PHAT estimators; deterministic
  tests and reproducible selected figures. Results are simulation evidence,
  not general real-world accuracy claims.

### Screenshot and metadata audit

- RAG screenshots `01`-`05` are tracked and visually suitable as candidate
  evidence. Their displayed documents and addresses are fictional demo content.
  `06-ci-validation.png` is untracked in the source repository and remains
  excluded.
- Incident Simulator screenshots `01`-`04` and `06` are candidate evidence.
  `05-request-id-correlation.png` exposes a local Windows user path and must not
  be copied or published.
- Log Report Automation screenshots `02`-`06` are candidate evidence.
  `01-cli-report-generation.png` exposes a local Windows user path and must not
  be copied or published. Older unnumbered images are not selected for the
  synchronization gallery.
- Microphone Array Localization's `v1.0-error-vs-snr.png` and
  `v1.0-estimator-comparison.png` are candidate evidence. The older V0.1 images
  are not selected for V1.0 presentation.
- Raster metadata inspection found no GPS, EXIF/IPTC identity, token, email or
  local-path metadata. The MATLAB figures contain only MathWorks software and
  generation-time metadata, which must still be removed when optimized copies
  are produced on Day 3.

No source screenshot has been copied into this repository during Day 1.

No unverified item should appear on a public page.
