import type { StoryItem } from "@/components/home/scroll-story";

export const careerStoryItems = [
  {
    kicker: "2011–2020 · Academic foundations",
    title: "Signal processing and practical experimentation",
    description:
      "Built early foundations through OFDM channel-estimation simulation and native Android sensor applications, connecting theory with implementation and testing.",
    icon: "foundation",
    visual: "signal",
    tone: "blue",
  },
  {
    kicker: "2018–2019 · One Planet Rating",
    title: "Python and Django backend development",
    description:
      "Built user-facing backend features, REST APIs, authentication flows and SQL-backed application logic while collaborating across product disciplines.",
    icon: "backend",
    visual: "api",
    tone: "green",
  },
  {
    kicker: "2019–2025 · Ericsson",
    title: "Telecom systems and production support",
    description:
      "Developed Linux-based C/C++ telecom software and expanded into automation, CI/CD, secure-development awareness and evidence-led failure triage.",
    icon: "reliability",
    visual: "network",
    tone: "slate",
  },
  {
    kicker: "2025–2026 · Volvo Group client assignment",
    title: "Python, tooling and cloud-native delivery",
    description:
      "Built reusable Python capabilities and improved build, container and deployment workflows in a client engineering environment.",
    icon: "cloud",
    visual: "vehicle",
    tone: "amber",
  },
  {
    kicker: "Present · Continued engineering",
    title: "Reliable systems and AI-assisted delivery",
    description:
      "Applying broad systems experience to backend projects, developer tooling, reliability work and modern engineering workflows.",
    icon: "tooling",
    visual: "delivery",
    tone: "burgundy",
  },
] as const satisfies readonly StoryItem[];
