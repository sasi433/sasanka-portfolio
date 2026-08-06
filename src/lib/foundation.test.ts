import { describe, expect, it } from "vitest";
import { FOUNDATION_PHASE } from "./foundation";

describe("foundation", () => {
  it("remains scoped to Phase 0", () => {
    expect(FOUNDATION_PHASE).toBe(0);
  });
});
