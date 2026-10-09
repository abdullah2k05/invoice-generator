import { describe, it, expect, beforeEach } from "vitest";
import { getItemValue } from "@/lib/getInitialValue";
import { computeInvoiceTotals, formatMinorUnits } from "@/lib/money";

describe("legacy item normalisation (CALC-006)", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("converts legacy qty 0 to undefined so blank keeps meaning one unit", () => {
    localStorage.setItem(
      "items",
      JSON.stringify([
        { itemDescription: "a", qty: 0, amount: 10 },
        { itemDescription: "b", qty: 3, amount: 5 },
      ])
    );
    const items = getItemValue();
    expect(items[0].qty).toBeUndefined();
    expect(items[1].qty).toBe(3);

    // blank qty still bills one unit, as it did before the money rewrite
    const t = computeInvoiceTotals({ items, currency: "USD" });
    expect(formatMinorUnits(t.subtotalMinor, 2)).toBe("25.00");
  });

  it("keeps explicit non-zero qty untouched", () => {
    localStorage.setItem(
      "items",
      JSON.stringify([{ itemDescription: "a", qty: 2.5, amount: 4 }])
    );
    const items = getItemValue();
    expect(items[0].qty).toBe(2.5);
  });

  it("survives invalid JSON", () => {
    localStorage.setItem("items", "{not json");
    const items = getItemValue();
    expect(items).toEqual([{ itemDescription: "" }]);
  });
});
