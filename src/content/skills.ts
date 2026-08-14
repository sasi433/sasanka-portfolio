import type { SkillGroup } from "@/content/types";

export const skillGroups = [
  {
    title: "Programming Languages",
    description: "Languages used across systems, backend and automation work.",
    skills: ["Python", "C", "C++", "Bash / Shell", "Lua"],
    image: {
      src: "/images/skills/programming-languages-v2.webp",
      alt: "Abstract modular structures representing programming and systems logic",
    },
    tone: "blue",
    visual: "programming",
  },
  {
    title: "Backend Engineering",
    description:
      "Service and shared-capability design with testing and clear interfaces.",
    skills: [
      "FastAPI",
      "REST APIs",
      "Shared Python libraries",
      "Authentication flows",
      "Database integration",
      "Jinja templates",
      "Automated testing",
      "SQL / relational databases",
    ],
    image: {
      src: "/images/skills/backend-engineering-v2.webp",
      alt: "Abstract service architecture connecting APIs, validation and data systems",
    },
    tone: "green",
    visual: "backend",
  },
  {
    title: "DevOps and Cloud-Native Delivery",
    description: "Repeatable build, container and deployment workflows.",
    skills: [
      "Docker",
      "Kubernetes",
      "OpenShift",
      "Helm",
      "Terraform",
      "GitHub Actions",
      "Jenkins",
      "CI/CD",
      "GitOps concepts",
    ],
    image: {
      src: "/images/skills/cloud-native-delivery-v2.webp",
      alt: "Abstract delivery pipeline moving container modules toward cloud infrastructure",
    },
    tone: "blue",
    visual: "delivery",
  },
  {
    title: "Build, Security and Quality",
    description:
      "Early feedback, secure awareness and maintainable delivery controls.",
    skills: [
      "Bazel / build configuration",
      "SonarQube",
      "Prisma Cloud",
      "Build validation",
      "Automated testing",
      "Secure development awareness",
      "Code-quality workflows",
    ],
    image: {
      src: "/images/skills/build-security-quality-v2.webp",
      alt: "Abstract build artifacts passing through security and quality validation",
    },
    tone: "amber",
    visual: "quality",
  },
  {
    title: "Linux, Operations and Observability",
    description:
      "Production-minded investigation supported by logs and metrics.",
    skills: [
      "Linux",
      "Grafana",
      "Prometheus",
      "Structured logging",
      "Log analysis",
      "Troubleshooting",
      "Production-support triage",
      "Failure investigation",
    ],
    image: {
      src: "/images/skills/operations-observability-v2.webp",
      alt: "Abstract observability environment with system signals and diagnostic traces",
    },
    tone: "green",
    visual: "observability",
  },
  {
    title: "Modern Web Portfolio Stack",
    description:
      "Technologies demonstrated through the design and implementation of this portfolio.",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Cloudflare Workers",
    ],
    image: {
      src: "/images/skills/modern-web-stack-v2.webp",
      alt: "Abstract responsive web layers connected through a global edge network",
    },
    tone: "slate",
    visual: "web",
  },
  {
    title: "AI-Assisted Engineering",
    description:
      "Tools used thoughtfully for implementation, testing and review.",
    skills: [
      "OpenAI Codex",
      "GitHub Copilot",
      "ChatGPT",
      "Claude",
      "Prompt engineering",
      "AI-assisted implementation",
      "AI-assisted testing",
      "AI-assisted review",
    ],
    image: {
      src: "/images/skills/ai-assisted-engineering-v2.webp",
      alt: "Abstract AI-assisted engineering workflow with evaluation and verification paths",
    },
    tone: "burgundy",
    visual: "ai",
  },
] satisfies readonly SkillGroup[];
