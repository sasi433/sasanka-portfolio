# Sasanka Maddala — Personal Portfolio Website

## Complete Implementation Plan and Codex Project Specification

**Document status:** Approved implementation baseline
**Target release:** v1.0.0
**Initial repository visibility:** Private
**Final repository visibility:** Public after privacy review
**Initial hosting cost:** Free
**Primary implementation approach:** AI-assisted development using Codex/Copilot
**Development style:** Phase-based delivery, not daily commits

---

# 1. Project Objective

Build a professional personal portfolio website that represents Sasanka Maddala as:

> **Senior Software Engineer — Backend, Python, DevOps and Cloud-Native Systems**

The website should present a coherent engineering career that began with C/C++ and Linux-based telecom systems and expanded into:

* Python development
* Backend systems
* Shared libraries
* Build systems
* CI/CD workflows
* Docker and container delivery
* Kubernetes and OpenShift
* Cloud-native engineering
* Production troubleshooting
* Developer tooling
* AI-assisted engineering

The website must primarily convince recruiters and hiring managers while still being useful to:

* Engineering managers
* Technical interviewers
* Software engineers reviewing the work
* Potential freelance clients
* Professional contacts

The website must feel:

* Serious and senior
* Technically credible
* Friendly and approachable
* Visually distinctive without becoming gimmicky

---

# 2. Primary Visitor Journey

The homepage must establish the following within the first screen:

1. Who Sasanka is
2. What kind of engineering work he does
3. Which areas he specialises in
4. Where visitors can inspect evidence of his work
5. How visitors can contact him

## Primary call to action

> **View My Work**

## Secondary call to action

> **Contact Me**

GitHub and LinkedIn should appear as secondary icon links rather than competing with the two main buttons.

The website must not use:

* “Open to Work”
* “Actively looking”
* Availability banners
* Country-specific job-search messaging
* Freelance sales language on the homepage
* CV download in v1

---

# 3. Locked Product Decisions

## Audience

Use one global portfolio for v1.0.0.

The audience hierarchy is:

1. Recruiters and hiring managers
2. Technical evaluators and engineering managers
3. Freelance or collaboration prospects

Do not create separate Sweden, India or freelance versions in v1.

## Public professional identity

Use the following public positioning:

> **Senior Software Engineer — Backend, Python, DevOps and Cloud-Native Systems**

A suitable homepage supporting statement is:

> I build reliable backend systems, shared engineering capabilities and cloud-native delivery workflows, drawing on a career that spans C/C++ telecom systems, Python development, CI/CD and production engineering.

The exact copy may be refined, but the positioning must not be diluted into a long list of unrelated job titles.

## Employers and client environments

Display these primary organisations:

* Volvo Group
* Ericsson
* One Planet Rating

For Volvo Group, use wording such as:

> **Volvo Group — Software Consultant**
> Client engineering assignment

Do not prominently feature TMC or Aurora Engineering in the visual career timeline.

Do not imply direct employment by Volvo Group.

## Public contact information

Display:

* Dedicated professional email address
* Contact form
* LinkedIn
* GitHub

Do not display:

* Swedish phone number
* Indian phone number
* Home address
* Current city
* Family information
* Availability status

## Language

English only.

Do not implement internationalisation in v1.

## Repository licensing

Do not add an open-source licence.

Add a notice to the README:

> Copyright © 2026 Sasanka Maddala. All rights reserved.
> This repository is public for portfolio and code-review purposes. No licence is granted for reuse, redistribution or derivative works.

Without a software licence, default copyright applies, although GitHub’s platform terms still allow public repository content to be viewed and forked through GitHub’s functionality.

---

# 4. Recommended Architecture

## High-level architecture

```text
Visitor Browser
       |
       v
Next.js Portfolio Application
       |
       +-- Static and server-rendered portfolio pages
       |
       +-- Next.js Route Handler: /api/contact
                    |
                    +-- Input validation
                    +-- Honeypot check
                    +-- Cloudflare Turnstile verification
                    +-- Rate-limit check
                    +-- Resend email API
                                   |
                                   v
                        Sasanka's professional inbox
```

## Hosting architecture

Deploy the complete Next.js application to **Cloudflare Workers** using the Cloudflare OpenNext adapter.

Do not use Cloudflare Pages static export for the main architecture.

Cloudflare currently recommends Workers for full-stack Next.js deployments. The OpenNext adapter supports the App Router, Route Handlers, React Server Components, static generation, server-side rendering and Server Actions.

## Why this architecture

It provides:

* One frontend and server-side codebase
* No separate FastAPI deployment
* No database requirement
* Server-side contact-form handling
* Secure environment variables
* Free initial hosting
* A free `workers.dev` URL
* A path to add a custom domain later
* Practical Next.js and TypeScript experience
* A simpler operational model than two independently deployed applications

Cloudflare Workers’ current free plan includes 100,000 Worker requests per day, while requests serving static assets are free and unlimited. This portfolio should sit comfortably within those limits under normal personal-site traffic.

---

# 5. Technology Stack

## Runtime and package management

* Node.js 24 LTS
* pnpm
* Lock all resolved dependency versions in `pnpm-lock.yaml`
* Add `.nvmrc` containing `24`
* Add the Node version to `package.json` under `engines`

Node.js currently identifies version 24 as an LTS release and recommends production applications use an Active or Maintenance LTS version.

## Application framework

* Next.js 16.x
* React
* TypeScript
* Next.js App Router
* React Server Components by default
* Client Components only where browser interaction is required

Examples of justified Client Components:

* Theme toggle
* Mobile navigation
* Animated career timeline
* Project filters
* Contact form interaction
* Screenshot gallery

## Styling

* Tailwind CSS
* CSS custom properties for design tokens
* Small global stylesheet for resets, theme variables and shared effects
* No large component-library theme
* No Bootstrap
* No Material UI

Tailwind should provide layout and component styling while custom theme variables create the distinctive visual identity. Tailwind’s current recommended integration supports Next.js through its framework and PostCSS setup.

## Animation

* Motion for React
* CSS transitions for basic hover and focus states
* Motion only for meaningful interactions
* Respect `prefers-reduced-motion`

The current Motion package is imported through `motion/react`.

## Icons

* Lucide React
* Use icons only when they improve scanning
* All icon-only controls must have accessible labels

## Theme management

* `next-themes`, or a similarly lightweight theme implementation
* Default theme: dark
* Light-mode toggle in the top-right navigation area
* Persist the visitor’s selection
* Prevent a theme flash during page load
* Do not follow the operating-system preference for the first visit; use dark as the brand default
* After manual selection, preserve the visitor’s choice

## Validation and forms

* Zod for shared validation schemas
* React Hook Form for contact-form client behaviour
* Next.js Route Handler for server processing
* Cloudflare Turnstile for anti-bot protection
* Cloudflare Workers Rate Limiting binding
* Resend for email delivery

## Testing

* Vitest
* React Testing Library
* Playwright
* `@axe-core/playwright` for automated accessibility checks

Playwright supports Chromium, Firefox and WebKit and can emulate mobile devices, making it suitable for validating the important portfolio journeys across screen sizes and browser engines.

## Deployment

* Cloudflare Workers
* `@opennextjs/cloudflare`
* Wrangler
* Cloudflare Workers Builds connected to GitHub
* Cloudflare Web Analytics
* Initial `workers.dev` subdomain
* Custom domain deferred until after v1 launch

---

# 6. Information Architecture

## Public routes

```text
/
├── /about
├── /experience
├── /work
│   └── /work/[slug]
├── /skills
├── /contact
├── /contact/sent
├── /privacy
└── /not-found
```

## Navigation

Desktop navigation:

* Home
* Experience
* Work
* Skills
* About
* Contact
* Theme toggle
* GitHub icon
* LinkedIn icon

Mobile navigation:

* Accessible menu button
* Full-height or dropdown menu
* Keyboard operable
* Proper focus management
* Escape key closes the menu
* Navigation closes after selection

## Why use “Work” rather than only “Projects”

The Work section must contain three types of engineering evidence:

1. Complete personal applications
2. Sanitised professional engineering case studies
3. Currently building projects

This better represents a senior engineer than presenting only side projects.

---

# 7. Homepage Specification

The homepage must be a scrolling summary of the complete portfolio.

Every important section should link to a deeper page.

## Section 1: Hero

Include:

* Professional headshot
* Name: Sasanka Maddala
* Role statement
* One concise positioning paragraph
* View My Work button
* Contact Me button
* GitHub link
* LinkedIn link
* A subtle visual indicator that more content exists below

Suggested direction:

```text
Senior Software Engineer

I build reliable backend systems, shared engineering capabilities
and cloud-native delivery workflows.

My engineering background spans C/C++ telecom systems, Python,
CI/CD, containers, Kubernetes and production troubleshooting.
```

Do not use:

* Animated typing text
* Rotating job titles
* “Hello World”
* Fake command prompts
* Large terminal windows
* Percentage-based skill ratings

## Section 2: Engineering Summary

Display three or four concise pillars:

* Backend and Python Engineering
* CI/CD and Developer Tooling
* Cloud-Native Delivery
* Production Troubleshooting

Each pillar should explain value, not merely list technologies.

## Section 3: Interactive Career Journey

Create a visual career timeline showing progression through:

1. One Planet Rating
2. Ericsson
3. Volvo Group client assignment
4. Present-day portfolio and side-project development

The narrative should show expansion rather than career replacement:

```text
C/C++ and Linux foundations
        ↓
Telecom software and production support
        ↓
Python, automation and backend development
        ↓
CI/CD, shared libraries and cloud-native delivery
        ↓
AI-assisted engineering and modern portfolio projects
```

Desktop:

* Horizontal or alternating vertical layout
* Expandable milestone details
* Visible progression line

Mobile:

* Simple vertical timeline
* No sideways scrolling
* Details visible without hover

## Section 4: Featured Work

Feature a maximum of four items on the homepage:

* Production Incident Simulator
* Log Report Automation
* Shared Python Libraries engineering case study
* Container Image Delivery Workflow engineering case study

The Document Support RAG Chatbot should appear in a smaller “Currently Building” area until it is complete.

## Section 5: Engineering Impact

Display selected professional outcomes:

* Shared Python libraries
* Container workflow hardening
* Build-time validation and maintainability improvements
* Production issue triage
* Secure engineering contribution

Avoid numerical metrics unless verified and publicly shareable.

## Section 6: Skills Summary

Show categories rather than an unstructured logo wall.

Link to `/skills` for the complete view.

## Section 7: Beyond Code Summary

Include a restrained introduction to personal interests.

Do not include family information.

## Section 8: Contact Call to Action

Use neutral wording such as:

> Interested in discussing software engineering, backend systems, developer tooling or cloud-native delivery? Get in touch.

Do not say:

* Hire me now
* Available immediately
* Looking for my next opportunity
* Book a free consultation

---

# 8. Detailed Page Specifications

## About page

The About page should explain:

* Professional identity
* Engineering philosophy
* Career expansion from systems programming to backend and DevOps
* Interest in maintainable systems and developer experience
* How side projects support continued learning
* A concise Beyond Code section

Do not turn the About page into a full autobiography.

## Experience page

Each experience item should contain:

* Organisation
* Role
* Date range
* One-paragraph context
* Three to six meaningful contributions
* Technologies
* Links to relevant sanitised engineering case studies

### Volvo Group

Display:

> Volvo Group
> Software Consultant — Client Engineering Assignment

Emphasise:

* Python engineering
* Shared libraries
* CI/CD
* GitHub Actions
* Docker
* Build tooling
* Kubernetes/OpenShift delivery
* Build validation
* Troubleshooting
* Cross-functional engineering support

### Ericsson

Emphasise:

* C and C++
* Linux systems
* Telecom software
* Python automation
* Jenkins and Gerrit workflows
* Failure triage
* Cross-team support
* Security Master responsibility
* Production-minded engineering

### One Planet Rating

Do not invent content.

Before launch, verify and provide:

* Exact role title
* Exact dates
* Main responsibilities
* Technologies
* One or two meaningful outcomes

If content remains incomplete, omit the detailed entry rather than publishing placeholder text.

## Work page

Use three clearly labelled sections or filters:

### Featured Applications

* Production Incident Simulator
* Log Report Automation
* Other completed and approved applications

### Engineering Case Studies

* Shared Python Libraries
* Container Image Delivery Workflow
* Build Reliability and Fail-Fast Validation
* Production Support and Failure Triage
* Secure Engineering Contribution

### Currently Building

* Document Support RAG Chatbot
* Future modernised academic projects
* Other active projects

Do not automatically import every GitHub repository.

Every published repository link must be selected manually.

Do not display:

* Repository star counts
* GitHub language-percentage graphics
* Contribution streaks
* Recent commit feeds
* Every repository owned by the account

## Skills page

Use the following groups.

### Programming Languages

* Python
* C
* C++
* Bash
* Lua, only if still comfortable discussing it

### Backend Engineering

* FastAPI
* REST APIs
* Shared Python libraries
* Authentication flows
* Database integration
* Jinja templates
* Automated testing

### DevOps and Cloud-Native Delivery

* Docker
* Kubernetes
* OpenShift
* Helm
* Terraform
* GitHub Actions
* Jenkins
* CI/CD
* GitOps concepts

### Build, Security and Quality

* Bazel/build configuration
* SonarQube
* Prisma Cloud
* Build validation
* Secure development awareness
* Automated testing
* Code-quality workflows

### Linux, Operations and Observability

* Linux troubleshooting
* Grafana
* Prometheus
* Log analysis
* Production-support triage
* Failure investigation

### Modern Web Portfolio Stack

* React
* Next.js
* TypeScript
* Tailwind CSS
* Cloudflare Workers

Label this category honestly as technology demonstrated through the portfolio project. Do not imply years of professional frontend experience.

### AI-Assisted Engineering

* Codex
* GitHub Copilot
* ChatGPT
* Claude
* Prompt engineering
* AI-assisted implementation, testing and review

## Beyond Code content

Keep this within the About page rather than creating a large separate lifestyle site.

Interests may appear in this order:

1. Gaming
2. Technology and gadgets
3. Cars
4. Food
5. AI tools and experimentation
6. Movies and television
7. Travel
8. Building side projects
9. Continuous technical learning
10. Personal finance and long-term planning

Use a short sentence for each selected category.

Do not include:

* Wife or daughter
* Parenting
* Family photographs
* Family location
* Personal financial figures
* Relocation details
* Personal debts or investments

The final page does not need to show all ten interests. Use approximately six to eight of the strongest items.

---

# 9. Case Study Content Model

All applications and professional case studies should use one reusable page template.

## Required fields

```typescript
type WorkItem = {
  slug: string;
  title: string;
  shortTitle?: string;
  type: "application" | "engineering-case-study";
  status: "complete" | "maintained" | "currently-building" | "archived";
  featured: boolean;
  summary: string;
  context: string;
  problem: string;
  approach: string[];
  decisions: {
    title: string;
    explanation: string;
  }[];
  challenges: string[];
  outcomes: string[];
  lessons: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  screenshots?: {
    src: string;
    alt: string;
    caption?: string;
  }[];
  diagram?: {
    src: string;
    alt: string;
  };
  confidentialityNote?: string;
};
```

## Case study page order

1. Title and status
2. Short summary
3. Context
4. Problem
5. Approach
6. Architecture or workflow diagram
7. Important technical decisions
8. Challenges
9. Outcomes
10. Lessons learned
11. Technology stack
12. GitHub link, when public
13. Live demo link, when available
14. Confidentiality note for professional work

---

# 10. Professional Engineering Case Studies

## Case Study 1: Shared Python Libraries

### Public title

> **Developed Shared Python Libraries to Reduce Duplication and Improve Maintainability**

### Core story

The work involved implementing reusable Python libraries from scratch for common functionality used by multiple applications.

The shared capabilities included:

* Authentication
* Database interaction
* Jinja templates
* Specifications and related shared domain functionality

The central engineering purpose was to:

* Remove duplicated implementation across applications
* Establish common ownership of reusable functionality
* Improve consistency
* Improve maintainability
* Make testing easier
* Make future changes safer
* Reduce application-specific reinvention

Do not reduce this case study to only authentication.

Authentication may be used as one example inside the larger shared-library story.

### Topics to cover

* Why duplicated code was creating maintenance risk
* How common responsibilities were identified
* How library boundaries were chosen
* How public interfaces were designed
* How applications consumed the libraries
* Error-handling strategy
* Testing strategy
* Build integration
* Documentation
* Compatibility and migration considerations
* Lessons learned about shared code ownership

### Confidentiality restrictions

Do not publish:

* Internal package names
* Internal repository names
* Authentication implementation details
* Token formats
* Database credentials or schemas
* Internal service names
* Proprietary specification formats
* Company source code

Use a generic architecture diagram created specifically for the portfolio.

## Case Study 2: Container Image Delivery Workflow

### Public title

> **Improved Reliability of a Container Image Delivery Workflow**

Cover:

* Build
* Tagging
* Validation
* Security scanning
* Registry push
* Cleanup
* More deterministic input handling
* More predictable image-tag propagation
* Reduction of fragile manual handling
* CI/CD troubleshooting

Do not publish:

* Registry addresses
* Repository names
* Credentials
* Workflow source copied from the employer
* Internal image names
* Company-specific environment details

## Case Study 3: Build Reliability and Fail-Fast Validation

### Public title

> **Improved Build Reliability Through Clearer Module Ownership and Fail-Fast Validation**

Combine:

* Module-boundary cleanup
* Import restructuring
* Dependency hygiene
* Build-target ownership
* Template and static-asset packaging
* Missing-input validation
* Duplicate-input validation
* Earlier and clearer CI feedback

## Case Study 4: Production Support and Failure Triage

### Public title

> **First-Line Troubleshooting and Failure Triage in Telecom Systems**

Cover:

* Rotating first-line support
* Customer and internal failure tickets
* Log and evidence analysis
* Scope determination
* Reproduction
* Fixing issues where possible
* Evidence-based escalation
* Cross-team collaboration

Do not publish:

* Customer names
* Ticket numbers
* Internal logs
* Network identifiers
* Product vulnerabilities
* Proprietary failure details

## Case Study 5: Secure Engineering Contribution

This should initially be a smaller experience highlight rather than a full featured case study.

Use wording such as:

> **Supported Secure Development Awareness as the Team’s Security Master**

Do not imply that Sasanka worked as a dedicated security engineer or security lead unless that wording is formally accurate.

---

# 11. Visual Design System

## Style direction

Use a mature dark developer-style interface.

The site must avoid common developer-portfolio clichés:

* Matrix animation
* Green-on-black terminal theme
* Fake console windows
* Neon cyberpunk effects
* Constant glowing borders
* Code rain
* Excessive monospace text
* Animated mouse followers
* 3D scenes
* Long loading introductions

## Initial colour tokens

These are starting values and must be adjusted if contrast testing fails.

### Dark theme

```css
--background: #09090b;
--surface: #141216;
--surface-elevated: #1d1920;
--text-primary: #f7f3f5;
--text-secondary: #b9afb4;
--accent: #8c274c;
--accent-hover: #a63761;
--accent-soft: #2c1620;
--border: #35272e;
--focus: #d68aa3;
```

### Light theme

```css
--background: #faf7f8;
--surface: #ffffff;
--surface-elevated: #f4ecef;
--text-primary: #21161b;
--text-secondary: #6e5f66;
--accent: #7a1f42;
--accent-hover: #641735;
--accent-soft: #f1dce4;
--border: #ddcfd5;
--focus: #7a1f42;
```

Wine red must be used primarily for:

* Buttons
* Active navigation
* Timeline nodes
* Selected filters
* Borders
* Small emphasis
* Focus accents

Do not use wine red for long blocks of body text.

## Typography

Use:

* Geist Sans for headings and body text
* Geist Mono for technical labels, dates and short metadata

Typography hierarchy must communicate seniority through whitespace, scale and restraint rather than oversized decorative text.

## Layout

* Mobile-first
* Maximum content width around 1200–1280 pixels
* Comfortable reading width for paragraphs
* Consistent vertical spacing
* Strong section separation
* Sticky navigation only when it does not obstruct mobile content
* No horizontal page scrolling

## Breakpoints to validate

* 360px
* 390px
* 768px
* 1024px
* 1280px
* 1440px and above

---

# 12. Animation Rules

Use noticeable but controlled interactions.

Approved animations:

* Section fade-and-rise on first entry
* Timeline-line progression
* Timeline-node selection
* Project-card hover elevation
* Button transitions
* Navigation underline
* Theme-toggle transition
* Screenshot gallery transitions
* Expand and collapse for supporting details

Rules:

* Animation must never delay access to content
* Core information must remain usable without animation
* Avoid animating large background layers continuously
* Avoid movement while users are reading
* Disable or simplify motion when reduced motion is requested
* Avoid layout-shifting animations
* Prefer transforms and opacity

---

# 13. Content Storage Strategy

Use content-as-code.

Do not add a CMS or database in v1.

Store structured content in:

```text
src/content/
├── profile.ts
├── navigation.ts
├── experience.ts
├── skills.ts
├── interests.ts
├── work.ts
└── social-links.ts
```

Advantages:

* Type-safe content
* Easy review in Git
* No administration panel
* No authentication
* No database
* Simple deployment
* Codex can update content safely

All public text should come from content files where practical, rather than being scattered through components.

Do not put secrets in content files.

---

# 14. Proposed Repository Structure

```text
personal-portfolio/
├── .github/
│   └── workflows/
│       └── ci.yml
├── docs/
│   ├── IMPLEMENTATION_PLAN.md
│   ├── CONTENT_INVENTORY.md
│   ├── PRIVACY_REVIEW.md
│   └── ARCHITECTURE.md
├── e2e/
│   ├── navigation.spec.ts
│   ├── theme.spec.ts
│   ├── work.spec.ts
│   ├── contact.spec.ts
│   └── accessibility.spec.ts
├── public/
│   ├── images/
│   │   ├── profile/
│   │   ├── projects/
│   │   ├── diagrams/
│   │   └── interests/
│   ├── favicon.ico
│   └── site.webmanifest
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   ├── page.tsx
│   │   │   └── sent/
│   │   │       └── page.tsx
│   │   ├── experience/
│   │   │   └── page.tsx
│   │   ├── skills/
│   │   │   └── page.tsx
│   │   ├── work/
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── privacy/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   ├── page.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── about/
│   │   ├── contact/
│   │   ├── experience/
│   │   ├── home/
│   │   ├── layout/
│   │   ├── skills/
│   │   ├── ui/
│   │   └── work/
│   ├── content/
│   ├── hooks/
│   ├── lib/
│   │   ├── contact/
│   │   ├── metadata/
│   │   ├── validation/
│   │   └── utils/
│   ├── providers/
│   └── types/
├── .dev.vars.example
├── .gitignore
├── .nvmrc
├── open-next.config.ts
├── playwright.config.ts
├── postcss.config.mjs
├── README.md
├── tailwind configuration if required
├── tsconfig.json
├── vitest.config.ts
├── wrangler.jsonc
├── package.json
└── pnpm-lock.yaml
```

---

# 15. Contact Form Architecture

## Fields

Required:

* Name
* Email
* Topic
* Message
* Turnstile token

Topic choices:

* Job or consulting opportunity
* Freelance project
* Technical collaboration
* Professional networking
* Other

Optional:

* Organisation

Hidden:

* Honeypot field

## Validation

Client-side validation improves usability, but all values must be validated again on the server.

Suggested limits:

* Name: 2–100 characters
* Email: valid email format, maximum 254 characters
* Organisation: maximum 120 characters
* Topic: approved enum only
* Message: 20–5,000 characters
* Honeypot: must be empty

Reject:

* Unexpected fields
* Invalid topic values
* Excessive lengths
* Missing Turnstile token
* Reused or expired verification token
* Rate-limited submissions

## Turnstile

Turnstile validation must occur server-side.

Cloudflare states that client-side Turnstile alone does not secure the form. Tokens are single-use and expire after five minutes, so the Route Handler must validate each token through Siteverify before sending an email.

Environment variables:

```text
NEXT_PUBLIC_TURNSTILE_SITE_KEY
TURNSTILE_SECRET_KEY
```

Use separate development and production Turnstile configurations.

## Rate limiting

Configure a Workers Rate Limiting binding for `/api/contact`.

Suggested starting rule:

```text
5 accepted attempts per 60 seconds per requesting client
```

Return HTTP 429 with a friendly generic response when exceeded.

The Workers Rate Limiting API is suitable for endpoint-specific protection, but its counters are eventually consistent and local to a Cloudflare location. Use it as an abuse-control mechanism rather than an exact accounting system.

## Email delivery

Use Resend.

For v1 without a custom domain:

* Send from the Resend testing sender
* Send only to the email associated with Sasanka’s Resend account
* Set the visitor’s address as `replyTo`
* Do not use the visitor’s email as the `from` address

Resend’s default `resend.dev` sender can send testing emails only to the email associated with the Resend account. That limitation is compatible with this contact form because every submission is delivered to Sasanka’s own inbox. A verified domain can be added later.

Required secrets:

```text
RESEND_API_KEY
CONTACT_TO_EMAIL
CONTACT_FROM_EMAIL
TURNSTILE_SECRET_KEY
```

Public variable:

```text
NEXT_PUBLIC_TURNSTILE_SITE_KEY
```

## Email contents

Subject:

```text
Portfolio contact: [topic] — [name]
```

Body:

* Name
* Email
* Organisation, when supplied
* Topic
* Message
* Submission timestamp
* Referring page
* No unnecessary IP retention

## Privacy

Do not store submissions in a database.

Do not log:

* Full email addresses
* Complete messages
* Turnstile tokens
* API keys

Logs may include:

* Request ID
* Success or failure category
* Status code
* Provider response category
* Timestamp

## Success flow

After successful submission:

* Redirect to `/contact/sent`
* Show a clear confirmation
* Provide a route back to the portfolio
* Mark `/contact/sent` as `noindex`

Do not claim that a reply will arrive within a specific time.

---

# 16. Privacy and Confidentiality Rules

## Personal privacy

The public website must not include:

* Family details
* Wife or daughter
* Family photographs
* Home address
* Personal phone numbers
* Exact current location
* Personal financial information
* Identification numbers
* Private email addresses
* Immigration or permit details
* Personal travel dates

## Employer confidentiality

Professional case studies must not contain:

* Proprietary code
* Screenshots from employer systems
* Internal architecture diagrams
* Internal repository names
* Internal URLs
* Customer names
* Ticket IDs
* Production logs
* Credentials
* Registry names
* Internal environment names
* Token formats
* Confidential performance metrics
* Vulnerability details
* Company-owned documents
* Screenshots of Slack, Teams, Jira, GitHub Enterprise or internal dashboards

Every professional case study must use:

* Generic component names
* Newly created diagrams
* Sanitised explanations
* Publicly safe technology names
* Outcome-oriented descriptions without confidential values

## Repository privacy

Before making the repository public:

1. Inspect every committed file.
2. Inspect Git history.
3. Search for email addresses and phone numbers.
4. Search for API keys and tokens.
5. Search for company names beyond approved public references.
6. Search for internal project names.
7. Search for local file paths containing personal usernames.
8. Review image metadata.
9. Remove drafts containing private content.
10. Confirm that `.dev.vars` and environment files were never committed.

If sensitive content exists in Git history, create a clean public repository or rewrite the history before publication.

---

# 17. Accessibility Requirements

Target WCAG 2.2 AA.

WCAG 2.2 is the current W3C Recommendation for making web content accessible across desktop and mobile devices.

Required:

* Semantic HTML
* One logical `h1` per page
* Hierarchical headings
* Skip-to-content link
* Visible keyboard focus
* Keyboard-operable navigation
* Labelled form controls
* Accessible error summaries
* Sufficient colour contrast
* Alternative text for meaningful images
* Empty alternative text for decorative images
* Reduced-motion handling
* No hover-only information
* Minimum comfortable pointer targets
* Proper modal or menu focus management
* ARIA only where native HTML is insufficient

Do not use:

* Div-based buttons
* Click handlers on non-interactive elements
* Placeholder text as the only form label
* Colour as the only status indicator
* Auto-playing video or audio

---

# 18. SEO and Sharing

Implement:

* Global metadata
* Route-specific titles and descriptions
* Canonical URLs
* Open Graph image
* Social sharing metadata
* Favicon
* Web manifest
* `robots.ts`
* `sitemap.ts`
* Structured data
* Meaningful page headings
* Descriptive link text

Next.js provides metadata APIs and file conventions for Open Graph images, robots files and sitemaps.

## Suggested metadata

Homepage title:

> Sasanka Maddala | Senior Software Engineer

Homepage description:

> Senior software engineer specialising in Python, backend systems, CI/CD, developer tooling and cloud-native delivery, with foundations in C/C++ and Linux telecom systems.

## Structured data

Add JSON-LD for:

* `Person`
* `WebSite`
* `ProfilePage`

Include only public information.

## Search visibility

Production:

* Index allowed

Preview deployments:

* No indexing
* Use an environment-aware robots configuration where practical

---

# 19. Analytics

Use Cloudflare Web Analytics.

Do not show public visitor counters.

Analytics must be visible only through Sasanka’s Cloudflare account.

Cloudflare describes Web Analytics as free and privacy-first and states that it does not collect or use visitors’ personal data.

Monitor:

* Page views
* Popular pages
* Most-viewed case studies
* Referrer categories
* Device types
* Browser categories
* Core Web Vitals
* Visits to `/contact/sent`

Do not add in v1:

* Session recording
* Heat maps
* Advertising trackers
* Cross-site tracking
* User accounts
* Fingerprinting
* Public analytics dashboard

---

# 20. Performance Requirements

Targets for production pages:

* Lighthouse Performance: 90 or higher
* Lighthouse Accessibility: 95 or higher
* Lighthouse Best Practices: 95 or higher
* Lighthouse SEO: 95 or higher

These are project acceptance targets, not guarantees for every device and network.

Implementation rules:

* Optimise the profile image before committing
* Use AVIF or WebP where practical
* Include explicit image dimensions
* Lazy-load below-the-fold images
* Avoid large background videos
* Keep animation libraries out of pages that do not need them
* Prefer Server Components
* Avoid unnecessary client-side JavaScript
* Use dynamic imports only where beneficial
* Avoid loading every project screenshot on the homepage
* Prevent cumulative layout shift
* Use one icon library
* Avoid duplicate font families

For v1, pre-optimise images and avoid depending on a paid image-transformation service.

---

# 21. Testing Strategy

## Unit tests

Test:

* Zod validation schemas
* Work-item filtering
* Slug lookup
* Content utilities
* Contact-response mapping
* Theme utilities where applicable

## Component tests

Test:

* Navigation
* Theme toggle
* Work card
* Timeline
* Contact form
* Error states
* Success states

## End-to-end tests

Playwright must cover:

1. Homepage loads.
2. Primary CTA opens Work.
3. Secondary CTA opens Contact.
4. Desktop navigation works.
5. Mobile navigation works.
6. Theme selection persists.
7. Work filters operate.
8. A case-study page opens by slug.
9. Invalid contact data is rejected.
10. Successful contact submission works with test or mocked dependencies.
11. 404 page is shown for an invalid slug.
12. Keyboard navigation reaches all controls.
13. No critical automated accessibility violations exist.
14. Key pages render at mobile and desktop widths.

## Manual validation

Test manually in:

* Chrome
* Edge
* Firefox
* Safari or Playwright WebKit
* iPhone-sized viewport
* Android-sized viewport
* Keyboard-only navigation
* Reduced-motion mode
* Light mode
* Dark mode

---

# 22. Continuous Integration and Deployment

## GitHub Actions CI

Create `.github/workflows/ci.yml`.

Run on:

* Push to `main`
* Pull requests targeting `main`

Steps:

1. Checkout
2. Configure Node.js 24
3. Configure pnpm cache
4. Install with frozen lockfile
5. Lint
6. Type-check
7. Run unit tests
8. Run component tests
9. Build Next.js/OpenNext application
10. Run selected Playwright smoke tests

GitHub Actions can automate Node.js build and test workflows and recommends using `setup-node` for consistent runner configuration.

## Deployment

Use Cloudflare Workers Builds rather than storing a Cloudflare API token in GitHub initially.

Connect the GitHub repository to the Cloudflare Worker.

Configure:

* Production branch: `main`
* Install command: `pnpm install --frozen-lockfile`
* Deploy command: `pnpm run deploy`
* Worker name matching `wrangler.jsonc`
* Required secrets in Cloudflare
* Public environment variables in Cloudflare build settings

Cloudflare Workers Builds supports GitHub integration and can automatically build and deploy the Worker when changes are pushed.

## Local versus production runtime

Use:

```text
pnpm dev
```

for fast daily development.

Use:

```text
pnpm preview
```

before deployment.

Cloudflare notes that normal Next.js development runs in Node.js, while the deployed application runs in the Workers `workerd` runtime. The OpenNext preview command more accurately reproduces production behaviour.

---

# 23. Environment and Secret Management

Local secret file:

```text
.dev.vars
```

Example committed file:

```text
.dev.vars.example
```

Never commit:

```text
.dev.vars
.env
.env.local
.env.production
```

Cloudflare supports encrypted Worker secrets and local `.dev.vars` files. Secrets must not be placed in Wrangler’s public variable configuration or committed to source control.

Suggested `.dev.vars.example`:

```text
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>
TURNSTILE_SECRET_KEY=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Do not place real values in the example.

---

# 24. Implementation Phases

Large AI-generated implementation chunks are acceptable.

The phases are delivery checkpoints, not daily work assignments.

Codex should complete one phase, run relevant checks and summarise its work before moving to the next major phase.

---

## Phase 0 — Repository and Platform Foundation

### Objective

Create a functioning Next.js application configured for Cloudflare Workers.

### Tasks

1. Create a private GitHub repository.
2. Do not select an open-source licence.
3. Clone it beside the other local repositories.
4. Pin Node.js 24 LTS.
5. Configure pnpm.
6. Scaffold Next.js with Cloudflare’s current Next.js Worker tooling.
7. Preserve the existing `.git` directory.
8. Configure:

   * TypeScript
   * App Router
   * `src/` directory
   * ESLint
   * Tailwind CSS
   * OpenNext
   * Wrangler
9. Add package scripts:

   * `dev`
   * `build`
   * `preview`
   * `deploy`
   * `lint`
   * `typecheck`
   * `test`
   * `test:e2e`
   * `format`
10. Create the proposed folder structure.
11. Add a basic README.
12. Save this plan under `docs/IMPLEMENTATION_PLAN.md`.
13. Create:

* `docs/CONTENT_INVENTORY.md`
* `docs/PRIVACY_REVIEW.md`
* `docs/ARCHITECTURE.md`

14. Verify:

* Local development works
* Production build works
* Cloudflare preview works

Cloudflare’s current CLI can scaffold a Next.js Worker project and configures the OpenNext adapter.

### Acceptance criteria

* `pnpm dev` works
* `pnpm build` works
* `pnpm preview` works
* No TypeScript errors
* No secrets committed
* App displays a temporary foundation page
* Repository remains private

---

## Phase 1 — Design System and Shared Layout

### Objective

Build the visual and structural foundation.

### Tasks

1. Add dark and light theme tokens.
2. Configure typography.
3. Create:

   * Header
   * Desktop navigation
   * Mobile navigation
   * Footer
   * Theme toggle
   * Button variants
   * Section container
   * Card
   * Badge
   * External-link component
   * Accessible skip link
4. Add responsive layout rules.
5. Add focus states.
6. Add reduced-motion support.
7. Add page transition restraint.
8. Add placeholder metadata and favicon.

### Acceptance criteria

* Dark theme is default
* Theme selection persists
* No visible theme flash
* Navigation works on mobile and desktop
* Keyboard focus is clearly visible
* Colour contrast passes initial checks
* No horizontal overflow at required breakpoints

---

## Phase 2 — Content Model and Page Skeletons

### Objective

Create typed content and all routes before final visual polish.

### Tasks

1. Create TypeScript content types.
2. Create typed content files.
3. Add initial approved content.
4. Create page skeletons:

   * Home
   * About
   * Experience
   * Work
   * Work detail
   * Skills
   * Contact
   * Privacy
   * Contact sent
   * 404
5. Implement work-item slug generation.
6. Implement invalid-slug handling.
7. Add content-status support:

   * Complete
   * Maintained
   * Currently building
   * Archived
8. Add manual GitHub and live-demo links.
9. Do not invent missing content.
10. Record missing content in `CONTENT_INVENTORY.md`.

### Acceptance criteria

* Every route loads
* Content is type-safe
* Unknown work slug produces 404
* No visible Lorem Ipsum
* Missing private content is not displayed
* No automatic GitHub repository import exists

---

## Phase 3 — Homepage and Career Journey

### Objective

Create the primary recruiter-facing experience.

### Tasks

1. Build the hero.
2. Add the professional photograph.
3. Add engineering pillars.
4. Build the interactive career journey.
5. Add featured work.
6. Add engineering-impact section.
7. Add skills summary.
8. Add Beyond Code teaser.
9. Add contact CTA.
10. Add restrained scroll animation.
11. Add mobile timeline alternative.

### Acceptance criteria

* Visitor identity and positioning are immediately clear
* View My Work is the strongest CTA
* Contact Me is secondary
* Timeline works without hover
* Homepage remains understandable with JavaScript animation disabled
* Mobile layout is complete
* No family or location details appear

---

## Phase 4 — Experience, Skills and About Pages

### Objective

Create deeper professional context.

### Tasks

1. Complete Volvo Group experience.
2. Complete Ericsson experience.
3. Add One Planet Rating only when verified.
4. Connect experience items to engineering case studies.
5. Build grouped skills page.
6. Distinguish professional skills from portfolio-demonstrated frontend skills.
7. Build About narrative.
8. Build Beyond Code content.
9. Add accessible technology badges.

### Acceptance criteria

* Volvo is accurately labelled as a client assignment
* TMC and Aurora are not prominent
* No false direct-employment implication exists
* React/Next.js skills are not overstated
* Skills are grouped and readable
* No skill percentages or progress bars exist

---

## Phase 5 — Work and Case Study System

### Objective

Build the strongest evidence section.

### Tasks

1. Build Work landing page.
2. Add filters or segmented sections.
3. Build reusable work cards.
4. Build reusable case-study template.
5. Add applications:

   * Production Incident Simulator
   * Log Report Automation
6. Add currently-building item:

   * Document Support RAG Chatbot
7. Add professional case studies:

   * Shared Python Libraries
   * Container Image Delivery Workflow
   * Build Reliability and Fail-Fast Validation
   * Production Support and Failure Triage
8. Add Secure Engineering as a smaller highlight.
9. Add sanitised diagrams.
10. Add GitHub links where appropriate.
11. Add live links only when functional.
12. Add confidentiality notes.

### Acceptance criteria

* Applications and engineering case studies are clearly differentiated
* RAG project is labelled Currently Building
* No employer-owned code or screenshots appear
* Every case study has problem, approach, decisions, outcome and lessons
* GitHub links open securely in a new tab
* No empty live-demo button is shown

---

## Phase 6 — Contact Form and Server-Side Functionality

### Objective

Implement secure communication without a separate backend.

### Tasks

1. Build accessible contact form.
2. Add client validation.
3. Add server validation.
4. Add honeypot.
5. Add Turnstile.
6. Validate Turnstile server-side.
7. Add Workers rate limiter.
8. Integrate Resend.
9. Add plain-text and HTML email formats.
10. Set visitor email as reply-to.
11. Add success redirect.
12. Add friendly error states.
13. Add request IDs.
14. Avoid sensitive logs.
15. Add privacy-page explanation.

### Acceptance criteria

* Valid contact message reaches the intended inbox
* Invalid fields are rejected server-side
* Missing or invalid Turnstile token is rejected
* Honeypot submissions are rejected silently
* Secrets are not visible in browser code
* Message is not stored in a database
* Error messages do not expose provider internals
* `/contact/sent` works and is not indexed

---

## Phase 7 — SEO, Analytics, Accessibility and Performance

### Objective

Prepare the site for real visitors and search engines.

### Tasks

1. Add final metadata.
2. Add canonical URLs.
3. Add Open Graph image.
4. Add JSON-LD.
5. Add sitemap.
6. Add robots configuration.
7. Add production versus preview indexing rules.
8. Enable Cloudflare Web Analytics.
9. Add semantic review.
10. Add automated accessibility checks.
11. Optimise images.
12. Audit client-side JavaScript.
13. Audit layout shift.
14. Audit keyboard experience.
15. Audit reduced motion.
16. Run Lighthouse.

### Acceptance criteria

* Metadata is route-specific
* Social sharing preview works
* Sitemap includes public routes
* Preview routes are not intended for indexing
* No public analytics counter exists
* No critical accessibility violations
* Lighthouse targets are substantially met
* Core pages remain fast on mobile emulation

---

## Phase 8 — Tests, CI and Automatic Deployment

### Objective

Create a maintainable and deployable repository.

### Tasks

1. Add Vitest configuration.
2. Add component tests.
3. Add Playwright tests.
4. Add accessibility test.
5. Add GitHub Actions CI.
6. Connect repository to Cloudflare Workers Builds.
7. Add production secrets.
8. Deploy to `workers.dev`.
9. Verify Worker logs.
10. Test production contact form.
11. Verify analytics.
12. Document rollback and redeployment.

### Acceptance criteria

* CI passes on `main`
* Failed lint/type/test/build blocks a clean status
* Push to `main` deploys automatically
* Production URL works
* Contact email arrives
* No secrets appear in repository or build logs
* Production site works in dark and light themes

---

## Phase 9 — Content and Privacy Audit

### Objective

Approve the portfolio for public release.

### Tasks

1. Review every public sentence.
2. Verify employment wording.
3. Verify all dates.
4. Verify skill claims.
5. Verify every project status.
6. Check every external link.
7. Review every image.
8. Inspect image metadata.
9. Search repository and Git history for:

   * Phone numbers
   * Private email addresses
   * Secrets
   * Tokens
   * Internal names
   * Customer names
   * Local Windows paths
   * Family references
10. Verify README copyright notice.
11. Confirm no open-source licence exists.
12. Make the repository public.
13. Add the public website link to:

* GitHub profile
* LinkedIn
* CV

14. Create GitHub repository topics.
15. Pin the repository on GitHub.

### Acceptance criteria

* Privacy checklist is signed off
* Repository is safe to publish
* Website and repository links work
* Public README explains architecture and setup
* No confidential or overly personal content exists
* v1.0.0 release tag is created

---

# 25. Definition of Done for v1.0.0

The release is complete when:

* Website is publicly reachable
* Repository has passed privacy review
* Repository is public
* Homepage clearly communicates professional positioning
* Mobile and desktop navigation work
* Dark and light themes work
* Experience page is accurate
* Work page contains approved applications and case studies
* Shared Python Libraries case study reflects all relevant shared capabilities
* Contact form securely delivers email
* Turnstile is validated server-side
* Analytics are enabled privately
* Metadata, sitemap and Open Graph image work
* No critical accessibility problems remain
* CI passes
* Production deployment is automatic
* No public phone numbers or family information exist
* No proprietary employer material exists
* README contains no open-source licence
* Git tag `v1.0.0` exists

---

# 26. Explicitly Out of Scope for v1

Do not implement:

* Blog
* Notes section
* CMS
* Database
* User accounts
* Admin portal
* Public analytics counter
* CV download
* Swedish translation
* India-specific version
* Sweden-specific version
* Separate freelance version
* Testimonials
* Recommendations
* Newsletter
* Comments
* AI chatbot
* Separate FastAPI backend
* Real-time GitHub feed
* GitHub star counts
* GitHub contribution graph
* Automatic repository importing
* 3D graphics
* Complex WebGL
* Family content
* Public phone numbers
* Paid hosting
* Paid custom domain
* Employer-owned code or images

---

# 27. Post-v1 Backlog

Possible later improvements:

## v1.1

* Additional completed projects
* Better project screenshots
* More sanitised diagrams
* Refined animations
* Improved case-study copy
* Project screenshot gallery
* Custom analytics events

## v1.2

* Custom domain
* Domain-based professional email
* Verified Resend sending domain
* Improved contact-form deliverability
* Cloudflare custom-domain security rules

## v1.3

* Additional professional case studies
* Modernised academic project portfolio
* Optional generic résumé page
* Printable résumé view
* Richer project architecture diagrams

## v2

Only consider when justified:

* Separate recruiter pathways
* Freelance services page
* Lightweight content management
* Technical articles
* Search
* Additional language support

---

# 28. Rules for Codex

Codex must follow these rules throughout implementation.

1. Read this specification before changing code.
2. Implement one phase at a time unless explicitly instructed otherwise.
3. Do not invent professional facts, dates, outcomes or metrics.
4. Use visible `TODO(content)` entries only in documentation files, never on public pages.
5. Do not add technologies merely because they look impressive.
6. Do not introduce a CMS or database.
7. Do not introduce a separate backend.
8. Do not expose secrets.
9. Do not copy employer-owned code.
10. Do not add family or location information.
11. Do not add public phone numbers.
12. Do not add a CV download.
13. Do not add a blog.
14. Do not add an open-source licence.
15. Use Server Components by default.
16. Justify every Client Component.
17. Avoid unnecessary dependencies.
18. Preserve accessibility.
19. Respect reduced-motion settings.
20. Run formatting, linting, type checks and tests before declaring a phase complete.
21. Summarise:

    * Files created
    * Files modified
    * Important decisions
    * Commands run
    * Test results
    * Remaining content gaps
22. Do not commit automatically unless asked.
23. Never delete user-authored content without explaining why.
24. Keep components focused and reusable.
25. Keep public content in typed content files.
26. Keep professional case studies sanitised.
27. Do not redesign the agreed colour and content direction without approval.

---

# 29. Recommended First Codex Prompt

Use this after creating and cloning the empty private GitHub repository:

```text
You are implementing my professional portfolio website.

Read and follow the complete project specification in
docs/IMPLEMENTATION_PLAN.md. Treat it as the source of truth.

Begin with Phase 0 only: Repository and Platform Foundation.

Requirements:

1. Preserve the existing .git directory.
2. Configure a Next.js 16 App Router application for Cloudflare Workers
   using the current Cloudflare OpenNext setup.
3. Use Node.js 24 LTS, pnpm, TypeScript, Tailwind CSS and a src directory.
4. Create the agreed initial folder structure.
5. Configure Wrangler and OpenNext.
6. Add scripts for dev, build, preview, deploy, lint, typecheck, test,
   test:e2e and format.
7. Add .nvmrc, .gitignore, .dev.vars.example and an initial README.
8. Do not add an open-source licence.
9. Do not add real contact information or secrets.
10. Create the documentation files specified in Phase 0.
11. Add only a simple temporary foundation page; do not start the final
    visual design yet.
12. Run lint, type checking, build and Cloudflare preview validation.
13. Fix any errors you encounter.
14. Do not commit changes.

At the end, report:

- Commands executed
- Files created and modified
- Installed dependencies
- Test/build results
- Cloudflare-specific configuration
- Anything requiring manual action from me
- Any deviations from the specification and why
```

---

# 30. Implementation Principle

The project should be built in meaningful functional phases, not artificial daily commits.

A phase may contain a substantial amount of AI-generated code.

The quality standard is:

> A working, accurate, secure and maintainable result with understandable architecture—not evidence that every line was typed manually.

The repository history should remain clear, but there is no requirement to simulate daily development activity.
