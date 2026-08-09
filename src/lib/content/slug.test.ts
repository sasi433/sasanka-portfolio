import { describe, expect, it } from "vitest";
import { createSlug } from "@/lib/content/slug";

describe("createSlug", () => {
  it("creates a stable URL-safe slug", () => {
    expect(createSlug("Build Reliability & Fail-Fast Validation")).toBe(
      "build-reliability-fail-fast-validation",
    );
  });

  it("removes surrounding separators", () => {
    expect(createSlug("  Shared Python Libraries  ")).toBe(
      "shared-python-libraries",
    );
  });
});
