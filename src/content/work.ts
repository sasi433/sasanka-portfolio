import type {
  WorkCategory,
  WorkExecutionModel,
  WorkItem,
} from "@/content/types";

export const workItems: readonly WorkItem[] = [
  {
    slug: "document-support-rag-chatbot",
    title: "Document Support RAG Chatbot",
    type: "application",
    category: "software-application",
    executionModel: "local-self-hosted",
    status: "complete",
    statusLabel: "v1 scope complete",
    featured: false,
    summary:
      "A local, self-hosted RAG application for ingesting support documents and answering questions with grounded source references.",
    context:
      "A public engineering project that explores a complete document-support workflow without presenting the application as a hosted service.",
    problem:
      "Document answers are more useful when they are grounded in relevant retrieved context and make their sources visible.",
    approach: [
      "Accept text, Markdown and PDF documents through a browser interface and FastAPI API.",
      "Create embeddings with OpenAI and persist searchable document chunks in ChromaDB.",
      "Return grounded answers with structured source references and support local Docker, Docker Compose and Kubernetes execution.",
    ],
    decisions: [
      {
        title: "Ground answers in retrieved content",
        explanation:
          "Source references and retrieved chunks keep the response flow inspectable instead of presenting unsupported answers.",
      },
      {
        title: "Keep deployment claims explicit",
        explanation:
          "The project supports local and self-hosted execution but is not advertised as a public hosted service.",
      },
    ],
    challenges: [
      "Balancing retrieval relevance, source transparency and useful fallback behaviour.",
    ],
    outcomes: [
      "Completed the intended v1 document ingestion, retrieval, grounded-answer and deployment-support scope.",
    ],
    lessons: [
      "Useful AI features need visible grounding, clear operating boundaries and repeatable validation.",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "OpenAI",
      "ChromaDB",
      "RAG",
      "Docker",
      "Kubernetes",
      "pytest",
      "Ruff",
    ],
    githubUrl: "https://github.com/sasi433/document-support-rag-chatbot",
  },
  {
    slug: "production-incident-simulator",
    title: "Production Incident Simulator",
    type: "application",
    category: "software-application",
    executionModel: "local-docker-environment",
    status: "complete",
    statusLabel: "v1 scope complete",
    featured: true,
    summary:
      "A local Docker incident lab for practising failure injection, observability, debugging, resilience patterns and postmortem analysis.",
    context:
      "A public engineering project built as a deliberately bounded, production-style simulation rather than a production service.",
    problem:
      "Reliability and incident-response skills are difficult to demonstrate with a simple happy-path application.",
    approach: [
      "Connect a FastAPI service with PostgreSQL, Redis and Nginx in Docker Compose.",
      "Expose structured logs, correlation IDs, Prometheus metrics and a provisioned Grafana dashboard.",
      "Provide deterministic incident scenarios, resilience controls and repeatable recovery workflows.",
    ],
    decisions: [
      {
        title: "Deterministic incidents",
        explanation:
          "Repeatable failure modes make investigation evidence and demonstrations easier to compare.",
      },
      {
        title: "Production-style, locally bounded",
        explanation:
          "Real service boundaries create useful operational exercises without claiming production deployment.",
      },
    ],
    challenges: [
      "Keeping failure scenarios realistic, observable, repeatable and safe to run locally.",
    ],
    outcomes: [
      "Completed the intended v1 incident lab with observable failure scenarios and documented investigation paths.",
    ],
    lessons: [
      "Observability, bounded failure behaviour and recovery guidance belong in the system design.",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Nginx",
      "Docker Compose",
      "Prometheus",
      "Grafana",
      "Structured logging",
    ],
    githubUrl: "https://github.com/sasi433/production-incident-simulator",
  },
  {
    slug: "log-report-automation",
    title: "Log Report Automation",
    type: "application",
    category: "software-application",
    executionModel: "local-cli-utility",
    status: "complete",
    statusLabel: "v1 scope complete",
    featured: true,
    summary:
      "A local Python CLI that converts structured CSV service logs into validated, stakeholder-friendly Excel reports.",
    context:
      "A public automation project focused on repeatable operational reporting and explicit data-quality feedback.",
    problem:
      "Raw CSV logs require validation, analysis and careful presentation before they become reliable reporting artifacts.",
    approach: [
      "Validate input with strict and lenient modes and actionable command-line summaries.",
      "Calculate reliability metrics including error rates and P95/P99 response times.",
      "Generate formatted Excel worksheets and charts while protecting untrusted text from formula execution.",
    ],
    decisions: [
      {
        title: "Command-line workflow",
        explanation:
          "A CLI keeps report generation repeatable, scriptable and easy to validate in CI.",
      },
      {
        title: "Treat spreadsheet output as a security boundary",
        explanation:
          "Potential formula input is handled explicitly before data is written to Excel.",
      },
    ],
    challenges: [
      "Producing readable workbooks while preserving data integrity and useful validation feedback.",
    ],
    outcomes: [
      "Completed the intended v1 path from validated operational logs to tested Excel reports.",
    ],
    lessons: [
      "Reporting utilities need strong input contracts, safe output handling and clear failure messages.",
    ],
    technologies: [
      "Python",
      "pandas",
      "openpyxl",
      "pytest",
      "GitHub Actions",
      "CLI development",
    ],
    githubUrl: "https://github.com/sasi433/log-report-automation",
  },
  {
    slug: "personal-portfolio-platform",
    title: "Personal Portfolio Platform",
    type: "application",
    category: "software-application",
    executionModel: "live-web-application",
    status: "maintained",
    statusLabel: "Live",
    featured: false,
    summary:
      "A responsive portfolio platform for presenting verified engineering work, experience and contact workflows with production-minded delivery controls.",
    context:
      "A public personal project and live web application; it demonstrates product implementation without implying professional frontend employment.",
    problem:
      "A credible engineering portfolio needs truthful content, accessible interaction, responsive presentation and a maintainable deployment path.",
    approach: [
      "Build typed, reusable content and UI foundations with Next.js, React and TypeScript.",
      "Support responsive layouts, dark and light themes, keyboard access and reduced-motion preferences.",
      "Deploy through OpenNext to Cloudflare Workers with automated tests, Turnstile, rate limiting and Resend-backed contact delivery.",
    ],
    decisions: [
      {
        title: "Content as typed data",
        explanation:
          "Structured content keeps project claims, routes and presentation consistent and testable.",
      },
      {
        title: "Progressive production controls",
        explanation:
          "Security, privacy, accessibility and deployment checks are treated as product requirements rather than launch extras.",
      },
    ],
    challenges: [
      "Balancing visual motion and scrollytelling with mobile usability, performance and reduced-motion support.",
    ],
    outcomes: [
      "Published a live, continuously deployed portfolio with automated unit, browser and Cloudflare build validation.",
    ],
    lessons: [
      "Portfolio credibility depends as much on evidence, boundaries and operational quality as on visual polish.",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Cloudflare Workers",
      "OpenNext",
      "Playwright",
      "Vitest",
      "Turnstile",
      "Resend",
    ],
    githubUrl: "https://github.com/sasi433/sasanka-portfolio",
    liveUrl: "https://portfolio.sasanka-maddala.workers.dev/",
  },
  {
    slug: "shared-python-libraries",
    title:
      "Developed Shared Python Libraries to Reduce Duplication and Improve Maintainability",
    shortTitle: "Shared Python Libraries",
    type: "engineering-case-study",
    category: "professional-case-study",
    executionModel: "professional-case-study",
    status: "complete",
    featured: true,
    summary:
      "Implemented reusable Python libraries for authentication, database interaction, Jinja templates, specifications and other shared domain functionality.",
    context:
      "Sanitised professional case study from a client engineering environment supporting multiple applications.",
    problem:
      "Repeated application-specific implementations made common behaviour harder to own, test and change safely.",
    approach: [
      "Identified common functionality and defined reusable library boundaries.",
      "Designed public interfaces and integrated shared modules into builds.",
      "Supported migration, testing, error handling and documentation.",
    ],
    decisions: [
      {
        title: "Capability-based boundaries",
        explanation:
          "Libraries grouped coherent shared responsibilities instead of coupling applications together.",
      },
      {
        title: "Common ownership",
        explanation:
          "Reusable behaviour could be tested and improved once for multiple consumers.",
      },
    ],
    challenges: [
      "Balancing stable public interfaces with application migration needs.",
    ],
    outcomes: [
      "Reduced application-specific reinvention and improved consistency, maintainability and testing.",
    ],
    lessons: [
      "Successful shared libraries need clear boundaries, documentation and ownership.",
    ],
    technologies: [
      "Python",
      "Authentication",
      "Database integration",
      "Jinja",
      "Bazel",
      "Automated testing",
    ],
    confidentialityNote:
      "This case study is intentionally sanitised and contains no employer code, internal names, schemas or implementation details.",
  },
  {
    slug: "container-image-delivery-workflow",
    title: "Improved Reliability of a Container Image Delivery Workflow",
    shortTitle: "Container Image Delivery Workflow",
    type: "engineering-case-study",
    category: "professional-case-study",
    executionModel: "professional-case-study",
    status: "complete",
    featured: true,
    summary:
      "Improved container build, tag, validation, scanning, push and cleanup workflows for more predictable delivery behaviour.",
    context:
      "Sanitised professional case study from a cloud-native delivery workflow.",
    problem:
      "Fragile input, reference and tag handling could produce confusing failures across a multi-step image workflow.",
    approach: [
      "Clarified workflow inputs and source-reference handling.",
      "Made image-tag propagation consistent across build, scan and push steps.",
      "Improved validation, cleanup and troubleshooting feedback.",
    ],
    decisions: [
      {
        title: "Validate before publishing",
        explanation:
          "Early checks kept invalid state from travelling through expensive delivery steps.",
      },
    ],
    challenges: [
      "Keeping derived image identity consistent across isolated CI steps.",
    ],
    outcomes: [
      "Made container delivery behaviour more predictable and easier to troubleshoot.",
    ],
    lessons: [
      "Explicit data flow is essential in multi-step delivery automation.",
    ],
    technologies: [
      "GitHub Actions",
      "Docker",
      "CI/CD",
      "Container registries",
      "Prisma Cloud",
    ],
    confidentialityNote:
      "Generic workflow names are used; no internal registries, images, repositories or credentials are disclosed.",
  },
  {
    slug: "build-reliability-fail-fast-validation",
    title:
      "Improved Build Reliability Through Clearer Module Ownership and Fail-Fast Validation",
    shortTitle: "Build Reliability and Fail-Fast Validation",
    type: "engineering-case-study",
    category: "professional-case-study",
    executionModel: "professional-case-study",
    status: "complete",
    featured: false,
    summary:
      "Clarified Python module and build-target ownership and added early validation for shared templates and static inputs.",
    context:
      "Sanitised professional case study from a multi-application Python build environment.",
    problem:
      "Unclear dependency boundaries and missing or duplicate inputs caused late, difficult-to-diagnose build failures.",
    approach: [
      "Restructured module imports and dependency relationships.",
      "Clarified build-target ownership in Bazel configuration.",
      "Validated missing and duplicate template or static inputs earlier.",
    ],
    decisions: [
      {
        title: "Fail fast with specific feedback",
        explanation:
          "Static checks surfaced actionable errors before later build or runtime stages.",
      },
    ],
    challenges: [
      "Improving boundaries without disrupting existing build consumers.",
    ],
    outcomes: [
      "Reduced confusing CI failures and improved maintainability and feedback.",
    ],
    lessons: [
      "Build ownership should reflect module ownership and be validated explicitly.",
    ],
    technologies: [
      "Python",
      "Bazel",
      "Build configuration",
      "Jinja",
      "Static validation",
      "CI/CD",
    ],
    confidentialityNote:
      "The examples are generalised and omit proprietary modules, templates and architecture.",
  },
  {
    slug: "telecom-failure-triage",
    title: "First-Line Troubleshooting and Failure Triage in Telecom Systems",
    shortTitle: "Production Support and Failure Triage",
    type: "engineering-case-study",
    category: "professional-case-study",
    executionModel: "professional-case-study",
    status: "complete",
    featured: false,
    summary:
      "Applied structured first-line triage, evidence analysis and cross-team escalation to customer and internal failure tickets.",
    context:
      "Sanitised professional case study from Linux-based telecom engineering.",
    problem:
      "Failures needed rapid scope and ownership assessment before a fix or evidence-based escalation could proceed.",
    approach: [
      "Performed initial triage and analysed available logs and evidence.",
      "Determined likely scope and reproduced behaviour where possible.",
      "Fixed team-owned issues or escalated with concise technical context.",
    ],
    decisions: [
      {
        title: "Evidence before escalation",
        explanation:
          "Clear findings and scope helped the right expert team continue efficiently.",
      },
    ],
    challenges: [
      "Investigating performance-sensitive distributed systems with incomplete evidence.",
    ],
    outcomes: [
      "Supported reliable issue routing, resolution and cross-team collaboration.",
    ],
    lessons: [
      "Good operational triage combines technical depth with clear communication.",
    ],
    technologies: [
      "C",
      "C++",
      "Python",
      "Linux",
      "Log analysis",
      "Jenkins",
      "Gerrit",
      "Troubleshooting",
    ],
    confidentialityNote:
      "No customer names, ticket identifiers, logs, network identifiers or proprietary failure details are included.",
  },
  {
    slug: "microphone-array-localization",
    title: "Microphone Array Localization",
    type: "application",
    category: "technical-academic",
    executionModel: "technical-simulation",
    release: {
      label: "v1.0.0",
      url: "https://github.com/sasi433/microphone-array-localization/releases/tag/v1.0.0",
    },
    status: "complete",
    statusLabel: "v1.0.0 · Released",
    featured: false,
    summary:
      "A MATLAB reconstruction and modernization of an academic two-dimensional sound-source localization simulation.",
    context:
      "A public technical and academic project with a published v1.0.0 portfolio release and reproducible simulation results.",
    problem:
      "Time-difference-of-arrival estimators need a clear, deterministic simulation harness for comparison and verification.",
    approach: [
      "Simulate one stationary synthetic source in a synchronized, direct-path two-dimensional environment.",
      "Compare LMS peak, LMS phase-slope and independently implemented GCC-PHAT estimators.",
      "Use deterministic MATLAB tests and reproducible figures to document selected simulation scenarios.",
    ],
    decisions: [
      {
        title: "Bound the scientific claim",
        explanation:
          "Results are described as reproducible simulation outcomes, not general real-world accuracy or production performance.",
      },
      {
        title: "Multiple estimators behind one workflow",
        explanation:
          "A shared configuration and result structure makes estimator behaviour easier to compare.",
      },
    ],
    challenges: [
      "Modernizing the academic implementation while preserving deterministic, explainable signal-processing behaviour.",
    ],
    outcomes: [
      "Published a tested v1.0.0 release with selectable estimators and reproducible documentation figures.",
    ],
    lessons: [
      "Technical demonstrations are stronger when assumptions, boundaries and reproducibility are stated alongside results.",
    ],
    technologies: [
      "MATLAB",
      "Signal processing",
      "TDOA",
      "LMS",
      "GCC-PHAT",
      "Deterministic testing",
    ],
    githubUrl: "https://github.com/sasi433/microphone-array-localization",
  },
];

export const workCategoryOrder = [
  "software-application",
  "professional-case-study",
  "technical-academic",
] as const satisfies readonly WorkCategory[];

export const workCategoryLabels = {
  "software-application": "Software application / engineering project",
  "professional-case-study": "Professional engineering case study",
  "technical-academic": "Technical / academic engineering",
} satisfies Record<WorkCategory, string>;

export const workCategoryBadgeLabels = {
  "software-application": "Software project",
  "professional-case-study": "Professional case study",
  "technical-academic": "Technical / academic",
} satisfies Record<WorkCategory, string>;

export const workExecutionModelLabels = {
  "live-web-application": "Live web application",
  "local-self-hosted": "Local / self-hosted",
  "local-docker-environment": "Local Docker incident lab",
  "local-cli-utility": "Local CLI utility",
  "technical-simulation": "Technical simulation",
  "professional-case-study": "Sanitised professional case study",
} satisfies Record<WorkExecutionModel, string>;

export const workCategorySections = [
  {
    category: "software-application",
    id: "software-applications",
    eyebrow: "Software applications / engineering projects",
    title: "Public systems built to solve, automate and explore.",
    description:
      "Repository-backed applications with explicit execution models, public scope and honest release status.",
  },
  {
    category: "professional-case-study",
    id: "professional-case-studies",
    eyebrow: "Professional engineering case studies",
    title: "Engineering contributions explained without proprietary detail.",
    description:
      "Sanitised examples of maintainability, delivery reliability, build quality and production support.",
  },
  {
    category: "technical-academic",
    id: "technical-academic",
    eyebrow: "Technical / academic engineering",
    title: "Reproducible technical work with clearly bounded claims.",
    description:
      "Academic and engineering investigations presented with their assumptions, validation and release evidence.",
  },
] as const satisfies readonly {
  category: WorkCategory;
  id: string;
  eyebrow: string;
  title: string;
  description: string;
}[];

export function getWorkItemsByCategory(category: WorkCategory) {
  return workItems.filter((item) => item.category === category);
}

export function getWorkItem(slug: string) {
  return workItems.find((item) => item.slug === slug);
}

export const workStatusLabels = {
  complete: "Complete",
  maintained: "Maintained",
  "currently-building": "Currently building",
  archived: "Archived",
} satisfies Record<WorkItem["status"], string>;
