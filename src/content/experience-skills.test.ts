import { describe, expect, it } from "vitest";
import { experienceItems } from "@/content/experience";
import { skillGroups } from "@/content/skills";

describe("experience content", () => {
  it("states the approved employment relationships and dates unambiguously", () => {
    expect(
      experienceItems.map(({ organisation, role, dates }) => ({
        organisation,
        role,
        dates,
      })),
    ).toEqual([
      {
        organisation: "Volvo Group",
        role: "Software Consultant - Client Engineering Assignment",
        dates: "April 2025 – June 2026",
      },
      {
        organisation: "Ericsson",
        role: "Software Developer",
        dates: "March 2019 – March 2025",
      },
      {
        organisation: "One Planet Rating",
        role: "Backend Developer",
        dates: "July 2018 – February 2019",
      },
    ]);

    expect(experienceItems[0].context).toMatch(
      /software consultant on a client engineering assignment at Volvo Group/,
    );
    expect(experienceItems[1].context).toMatch(
      /Directly employed by Ericsson from March 2019 through March 2025/,
    );
  });

  it("keeps Security Master as one restrained Ericsson contribution", () => {
    const references = experienceItems.flatMap((item) =>
      item.contributions.filter((contribution) =>
        /Security Master/i.test(contribution),
      ),
    );

    expect(references).toEqual([
      "Supported Secure Development Awareness as the Team's Security Master.",
    ]);
  });
});

describe("skills content", () => {
  it("preserves the seven approved categories and generated images", () => {
    expect(skillGroups.map((group) => group.title)).toEqual([
      "Programming Languages",
      "Backend Engineering",
      "DevOps and Cloud-Native Delivery",
      "Build, Security and Quality",
      "Linux, Operations and Observability",
      "Modern Web Portfolio Stack",
      "AI-Assisted Engineering",
    ]);
    expect(
      skillGroups.every((group) => group.image.src.endsWith("-v2.webp")),
    ).toBe(true);
  });

  it("qualifies modern web and leads AI-assisted engineering with capabilities", () => {
    const modernWeb = skillGroups.find(
      (group) => group.title === "Modern Web Portfolio Stack",
    );
    const aiAssisted = skillGroups.find(
      (group) => group.title === "AI-Assisted Engineering",
    );

    expect(modernWeb?.description).toMatch(/^Portfolio-demonstrated/);
    expect(aiAssisted?.skills.slice(0, 4)).toEqual([
      "AI-assisted implementation",
      "AI-assisted testing",
      "AI-assisted review",
      "Prompt engineering",
    ]);
    expect(aiAssisted?.skills.slice(4)).toEqual([
      "OpenAI Codex",
      "GitHub Copilot",
      "ChatGPT",
      "Claude",
    ]);
  });
});
