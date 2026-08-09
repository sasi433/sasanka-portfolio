import type { ExperienceItem } from "@/content/types";

export const experienceItems = [
  {
    organisation: "Volvo Group",
    role: "Software Consultant — Client Engineering Assignment",
    dates: "April 2025 – June 2026",
    context:
      "Worked on Python services, shared Python libraries, internal engineering tooling, CI/CD workflows, build systems, container delivery and cloud-native deployment in a Volvo Group engineering environment.",
    contributions: [
      "Developed reusable shared Python libraries for common functionality used across multiple applications.",
      "Improved CI/CD workflows for building, tagging, validating, scanning, pushing and cleaning up container images.",
      "Improved Python module boundaries, dependencies, build-target ownership and fail-fast validation.",
      "Supported container delivery and troubleshooting across Docker, Kubernetes, OpenShift and Helm workflows.",
      "Worked with automated tests, build integration, documentation and cross-team coordination.",
    ],
    technologies: [
      "Python",
      "GitHub Actions",
      "Docker",
      "Kubernetes",
      "OpenShift",
      "Helm",
      "Terraform",
      "Bazel",
      "Jinja",
      "SonarQube",
      "Prisma Cloud",
      "Grafana",
      "Prometheus",
      "Linux",
    ],
    relatedWorkSlugs: [
      "shared-python-libraries",
      "container-image-delivery-workflow",
      "build-reliability-fail-fast-validation",
    ],
  },
  {
    organisation: "Ericsson",
    role: "Software Developer",
    dates: "March 2019 – March 2025",
    context:
      "Worked in Linux-based telecom and 5G RAN/baseband engineering environments, primarily using C and C++, with later Python and Bash automation and CI/CD responsibilities.",
    contributions: [
      "Developed and maintained C/C++ software in Linux-based telecom systems.",
      "Worked with real-time, multithreaded, distributed and performance-sensitive software components.",
      "Used Python and Bash/Shell for engineering automation and supporting tools.",
      "Participated in rotating first-line support, troubleshooting failures and escalating with technical evidence.",
      "Supported Secure Development Awareness as the Team's Security Master.",
    ],
    technologies: [
      "C",
      "C++",
      "Python",
      "Bash / Shell",
      "Linux",
      "Telecom / 5G RAN / baseband systems",
      "Multithreading",
      "Distributed systems",
      "Jenkins",
      "Gerrit",
      "CI/CD",
      "Log analysis",
      "Troubleshooting",
    ],
    relatedWorkSlugs: ["telecom-failure-triage"],
  },
] satisfies readonly ExperienceItem[];
