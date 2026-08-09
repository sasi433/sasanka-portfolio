import { describe, expect, it } from "vitest";
import { workItems } from "@/content/work";

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
});
