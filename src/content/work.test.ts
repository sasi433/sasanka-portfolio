import { describe, expect, it } from "vitest";
import { workItems } from "@/content/work";
import type { WorkItem } from "@/content/types";
import { getWorkContentIssues } from "@/content/work-validation";

const exampleWorkItem: WorkItem = {
  slug: "example-project",
  title: "Example project",
  type: "application",
  status: "complete",
  featured: false,
  summary: "Example summary",
  context: "Example context",
  problem: "Example problem",
  approach: ["Example approach"],
  decisions: [{ title: "Example decision", explanation: "Example reason" }],
  challenges: ["Example challenge"],
  outcomes: ["Example outcome"],
  lessons: ["Example lesson"],
  technologies: ["TypeScript"],
};

describe("work content", () => {
  it("uses unique slugs and complete case-study sections", () => {
    expect(new Set(workItems.map((item) => item.slug)).size).toBe(
      workItems.length,
    );
    for (const item of workItems) {
      expect(item.approach.length).toBeGreaterThan(0);
      expect(item.decisions.length).toBeGreaterThan(0);
      expect(item.challenges.length).toBeGreaterThan(0);
      expect(item.outcomes.length).toBeGreaterThan(0);
      expect(item.lessons.length).toBeGreaterThan(0);
      expect(item.technologies.length).toBeGreaterThan(0);
    }
  });

  it("only exposes approved repository hosts", () => {
    for (const item of workItems.filter((entry) => entry.githubUrl)) {
      expect(new URL(item.githubUrl!).hostname).toBe("github.com");
      expect(item.liveUrl).toBeUndefined();
    }
  });

  it("passes the shared content-model validation", () => {
    expect(getWorkContentIssues(workItems)).toEqual([]);
  });

  it("accepts verified release, media and detail-section metadata", () => {
    const item: WorkItem = {
      ...exampleWorkItem,
      category: "technical-academic",
      executionModel: "technical-simulation",
      release: {
        label: "v1.0.0",
        url: "https://github.com/sasi433/example-project/releases/tag/v1.0.0",
      },
      heroImage: {
        src: "/images/projects/example-project/hero.png",
        alt: "Example project output",
      },
      screenshots: [
        {
          src: "/images/projects/example-project/result.png",
          alt: "Example result",
          caption: "A reproducible simulated result.",
        },
      ],
      detailSections: [
        {
          id: "validation",
          title: "Validation",
          items: ["Deterministic tests"],
        },
      ],
    };

    expect(getWorkContentIssues([item])).toEqual([]);
  });

  it("rejects unverified release links and implicit live applications", () => {
    const item: WorkItem = {
      ...exampleWorkItem,
      executionModel: "local-self-hosted",
      liveUrl: "https://example.com",
      release: {
        label: "v1.0.0",
        url: "https://example.com/releases/v1.0.0",
      },
    };

    expect(getWorkContentIssues([item])).toEqual([
      "example-project: live URL requires the live-web-application execution model",
      "example-project: release URL must target a GitHub release tag",
    ]);
  });
});
