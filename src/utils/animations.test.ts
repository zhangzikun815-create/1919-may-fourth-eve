import { describe, expect, it } from "vitest";
import { getHorizontalDistance, shouldReduceMotion } from "./animations";

describe("animation helpers", () => {
  it("never returns a negative horizontal distance", () => {
    expect(getHorizontalDistance(900, 1200)).toBe(0);
    expect(getHorizontalDistance(2400, 1200)).toBe(1200);
  });

  it("honors a reduced-motion media query", () => {
    expect(shouldReduceMotion({ matches: true })).toBe(true);
    expect(shouldReduceMotion({ matches: false })).toBe(false);
  });
});
