import { describe, expect, it } from "vitest";
import {
  getWorkItemsByCategory,
  workCategoryOrder,
  workCategorySections,
  workItems,
} from "@/content/work";
import type { WorkItem } from "@/content/types";
import { getWorkContentIssues } from "@/content/work-validation";

const exampleWorkItem: WorkItem = {
  slug: "example-project",
  title: "Example project",
  type: "application",
  status: "complete",
  category: "software-application",
  executionModel: "local-self-hosted",
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

const expectedSlugsByCategory = {
  "software-application": [
    "document-support-rag-chatbot",
    "production-incident-simulator",
    "log-report-automation",
    "personal-portfolio-platform",
  ],
  "professional-case-study": [
    "shared-python-libraries",
    "container-image-delivery-workflow",
    "build-reliability-fail-fast-validation",
    "telecom-failure-triage",
  ],
  "technical-academic": ["microphone-array-localization"],
} as const;

describe("work content", () => {
  it("contains the nine intended projects in the planned category order", () => {
    expect(workItems).toHaveLength(9);
    expect(workCategoryOrder).toEqual([
      "software-application",
      "professional-case-study",
      "technical-academic",
    ]);
    expect(workCategorySections.map((section) => section.category)).toEqual(
      workCategoryOrder,
    );

    for (const category of workCategoryOrder) {
      expect(getWorkItemsByCategory(category).map((item) => item.slug)).toEqual(
        expectedSlugsByCategory[category],
      );
    }
  });

  it("uses unique slugs and complete case-study sections", () => {
    expect(new Set(workItems.map((item) => item.slug)).size).toBe(
      workItems.length,
    );
    for (const item of workItems) {
      expect(item.category).toBeTruthy();
      expect(item.executionModel).toBeTruthy();
      expect(item.approach.length).toBeGreaterThan(0);
      expect(item.decisions.length).toBeGreaterThan(0);
      expect(item.challenges.length).toBeGreaterThan(0);
      expect(item.outcomes.length).toBeGreaterThan(0);
      expect(item.lessons.length).toBeGreaterThan(0);
      expect(item.technologies.length).toBeGreaterThan(0);
    }
  });

  it("publishes truthful status and execution labels", () => {
    expect(
      workItems.slice(0, 4).map(({ slug, statusLabel, executionModel }) => ({
        slug,
        statusLabel,
        executionModel,
      })),
    ).toMatchObject([
      {
        slug: "document-support-rag-chatbot",
        statusLabel: "v1 scope complete",
        executionModel: "local-self-hosted",
      },
      {
        slug: "production-incident-simulator",
        statusLabel: "v1 scope complete",
        executionModel: "local-docker-environment",
      },
      {
        slug: "log-report-automation",
        statusLabel: "v1 scope complete",
        executionModel: "local-cli-utility",
      },
      {
        slug: "personal-portfolio-platform",
        statusLabel: "Live",
        executionModel: "live-web-application",
      },
    ]);

    expect(
      workItems.find((item) => item.slug === "microphone-array-localization"),
    ).toMatchObject({
      statusLabel: "v1.0.0 · Released",
      executionModel: "technical-simulation",
      release: {
        label: "v1.0.0",
        url: "https://github.com/sasi433/microphone-array-localization/releases/tag/v1.0.0",
      },
    });
  });

  it("only exposes verified GitHub, release and live links", () => {
    for (const item of workItems.filter((entry) => entry.githubUrl)) {
      expect(new URL(item.githubUrl!).hostname).toBe("github.com");
    }

    expect(
      workItems
        .filter((item) => item.liveUrl)
        .map(({ slug, executionModel, liveUrl }) => ({
          slug,
          executionModel,
          liveUrl,
        })),
    ).toEqual([
      {
        slug: "personal-portfolio-platform",
        executionModel: "live-web-application",
        liveUrl: "https://portfolio.sasanka-maddala.workers.dev/",
      },
    ]);

    expect(workItems.filter((item) => item.release)).toHaveLength(1);
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
