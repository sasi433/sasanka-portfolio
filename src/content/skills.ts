import type { SkillGroup } from "@/content/types";

export const skillGroups = [
  {
    title: "Programming Languages",
    skills: ["Python", "C", "C++", "Bash / Shell", "Lua"],
  },
  {
    title: "Backend Engineering",
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
  },
  {
    title: "DevOps and Cloud-Native Delivery",
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
  },
  {
    title: "Build, Security and Quality",
    skills: [
      "Bazel / build configuration",
      "SonarQube",
      "Prisma Cloud",
      "Build validation",
      "Automated testing",
      "Secure development awareness",
      "Code-quality workflows",
    ],
  },
  {
    title: "Linux, Operations and Observability",
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
  },
  {
    title: "AI-Assisted Engineering",
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
  },
] satisfies readonly SkillGroup[];
