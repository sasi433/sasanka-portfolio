import { describe, expect, it } from "vitest";
import { educationItems, languageItems } from "@/content/education";
import { experienceItems } from "@/content/experience";

describe("verified profile additions", () => {
  it("publishes the verified One Planet Rating experience", () => {
    const experience = experienceItems.find(
      (item) => item.organisation === "One Planet Rating",
    );

    expect(experience).toMatchObject({
      role: "Backend Developer",
      dates: "July 2018 – February 2019",
      location: "Stockholm, Sweden",
    });
    expect(experience?.technologies).toEqual(
      expect.arrayContaining(["Python", "Django", "REST APIs", "SQL"]),
    );
  });

  it("keeps thesis work factual and separate from featured work", () => {
    expect(educationItems).toHaveLength(2);
    expect(educationItems.map((item) => item.thesis.title)).toEqual([
      "Development of a Multi Sensor Android Application",
      "Channel Estimation of OFDM by LS and MMSE Methods",
    ]);
    expect(JSON.stringify(educationItems)).not.toMatch(
      /co-?author|thesis partner/i,
    );
  });

  it("uses the owner-approved language proficiency descriptions", () => {
    expect(languageItems).toEqual([
      {
        language: "English",
        proficiency: "Professional working proficiency",
      },
      { language: "Telugu", proficiency: "Native" },
      {
        language: "Hindi",
        proficiency: "Professional working proficiency",
      },
      { language: "Swedish", proficiency: "Basic proficiency" },
    ]);
  });
});
