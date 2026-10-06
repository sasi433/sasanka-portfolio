import { describe, expect, it } from "vitest";
import { interests } from "@/content/interests";

describe("Beyond Code interests", () => {
  it("preserves the eight approved interests and generated images", () => {
    expect(
      interests.map(({ title, image }) => ({ title, src: image.src })),
    ).toEqual([
      { title: "Gaming", src: "/images/interests/gaming-v2.webp" },
      {
        title: "Technology and gadgets",
        src: "/images/interests/technology-gadgets-v2.webp",
      },
      { title: "Cars", src: "/images/interests/cars-v2.webp" },
      { title: "Food", src: "/images/interests/food-travel.webp" },
      {
        title: "AI experimentation",
        src: "/images/interests/ai-experimentation-v2.webp",
      },
      {
        title: "Movies and television",
        src: "/images/interests/movies-television-v2.webp",
      },
      { title: "Travel", src: "/images/interests/travel.webp" },
      {
        title: "Side projects",
        src: "/images/interests/side-projects-v2.webp",
      },
    ]);
  });

  it("does not publish family or financial information", () => {
    expect(JSON.stringify(interests)).not.toMatch(
      /family|spouse|child|salary|income|financial/i,
    );
  });
});
