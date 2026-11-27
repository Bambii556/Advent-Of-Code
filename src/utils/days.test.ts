import { describe, expect, test } from "bun:test";
import { discoverDays, loadDay } from "./days.ts";

describe("days", () => {
  test("discovers numbered year and day directories", () => {
    const days = discoverDays();
    expect(days).toContainEqual({ year: 2023, day: 1 });
    expect(
      days.every(({ year, day }) => year >= 2000 && day >= 1 && day <= 25),
    ).toBe(true);
  });

  test("loadDay imports a solution and skips missing days", async () => {
    expect(typeof (await loadDay(2023, 1))?.part1).toBe("function");
    expect(await loadDay(1999, 1)).toBeUndefined();
  });
});
