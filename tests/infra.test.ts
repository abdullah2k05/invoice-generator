import { describe, it, expect } from "vitest";

describe("test infrastructure", () => {
  it("runs assertions", () => {
    expect(1 + 1).toBe(2);
  });

  it("runs jsdom", () => {
    expect(typeof document).toBe("object");
    expect(document.createElement("div").tagName).toBe("DIV");
  });

  it("resolves the @ path alias", async () => {
    const mod = await import("@/lib/utils");
    expect(typeof mod.cn).toBe("function");
  });
});
