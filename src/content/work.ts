import type { WorkItem } from "@/content/types";

export const workItems: readonly WorkItem[] = [
  {
    slug: "production-incident-simulator",
    title: "Production Incident Simulator",
    type: "application",
    status: "currently-building",
    statusLabel: "Active Project — Improving Reliability and Test Coverage",
    featured: true,
    summary:
      "A Dockerized production-style backend environment for simulating, observing and troubleshooting realistic software incidents using FastAPI, PostgreSQL, Redis, Nginx and Prometheus.",
    context:
      "A public side project for practising production-minded backend engineering, observability and incident response.",
    problem:
      "Reliability skills are difficult to demonstrate with a simple happy-path application.",
    approach: [
      "Model realistic service dependencies in a Docker Compose environment.",
      "Expose health, readiness, metrics and structured logs for investigation.",
      "Use controlled fault injection, runbooks and postmortems to practise response workflows.",
    ],
    decisions: [
      {
        title: "Production-style local environment",
        explanation:
          "Multiple services create useful failure boundaries without claiming production readiness.",
      },
    ],
    challenges: ["Keeping incident scenarios realistic, repeatable and safe."],
    outcomes: [
      "Created a practical environment for reliability and troubleshooting exercises.",
    ],
    lessons: [
      "Observability and operational guidance are part of a backend system, not add-ons.",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Nginx",
      "Docker Compose",
      "Prometheus",
      "Structured logging",
      "Async Python",
    ],
    githubUrl: "https://github.com/sasi433/production-incident-simulator",
  },
  {
    slug: "log-report-automation",
    title: "Log Report Automation",
    type: "application",
    status: "maintained",
    statusLabel: "Maintained — Release Hardening",
    featured: true,
    summary:
      "A Python command-line tool that transforms structured CSV service logs into validated, stakeholder-friendly Excel reports with summary metrics and daily analysis.",
    context:
      "A public automation project focused on turning operational data into a consistent reporting artifact.",
    problem:
      "Raw CSV logs require validation, normalization and careful presentation before they are useful to report consumers.",
    approach: [
      "Validate and normalize structured CSV input.",
      "Generate logs, summary and daily-summary worksheets.",
      "Test the transformation and automate quality checks in CI.",
    ],
    decisions: [
      {
        title: "Command-line workflow",
        explanation:
          "A CLI keeps repeatable report generation easy to automate and inspect.",
      },
    ],
    challenges: [
      "Producing readable workbooks while preserving data integrity.",
    ],
    outcomes: [
      "Created a repeatable path from validated logs to styled reports.",
    ],
    lessons: [
      "Reporting tools need strong input validation and useful failure messages.",
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
    slug: "document-support-rag-chatbot",
    title: "Document Support RAG Chatbot",
    type: "application",
    status: "currently-building",
    statusLabel: "Currently Building",
    featured: false,
    summary:
      "An in-progress FastAPI-based RAG application for ingesting documents, retrieving relevant context and answering questions with grounded source references.",
    context:
      "A public learning project exploring document-support workflows with retrieval-augmented generation.",
    problem:
      "Useful document answers need relevant retrieved context and visible grounding rather than unsupported responses.",
    approach: [
      "Develop the API and document-ingestion workflow incrementally.",
      "Keep retrieved context and source references central to the answer flow.",
      "Add tests and delivery capabilities only as they are implemented and verified.",
    ],
    decisions: [
      {
        title: "Transparent in-progress status",
        explanation:
          "The portfolio distinguishes current work from completed capabilities.",
      },
    ],
    challenges: ["Evaluating retrieval quality and grounded responses."],
    outcomes: [
      "Established an active project for learning practical RAG patterns.",
    ],
    lessons: [
      "AI features require explicit grounding and verification boundaries.",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "Retrieval-Augmented Generation",
      "Document ingestion",
      "LLM integration",
      "API development",
    ],
    githubUrl: "https://github.com/sasi433/document-support-rag-chatbot",
  },
  {
    slug: "shared-python-libraries",
    title:
      "Developed Shared Python Libraries to Reduce Duplication and Improve Maintainability",
    shortTitle: "Shared Python Libraries",
    type: "engineering-case-study",
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
    shortTitle: "Telecom Failure Triage",
    type: "engineering-case-study",
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
];

export function getWorkItem(slug: string) {
  return workItems.find((item) => item.slug === slug);
}

export const workStatusLabels = {
  complete: "Complete",
  maintained: "Maintained",
  "currently-building": "Currently building",
  archived: "Archived",
} satisfies Record<WorkItem["status"], string>;
