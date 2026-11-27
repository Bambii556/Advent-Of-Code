import { expect, test } from "bun:test";
import { puzzleForDate } from "./main.ts";

test("puzzleForDate picks the current AoC year and day", () => {
  expect(puzzleForDate(new Date(2025, 11, 4))).toEqual({ year: 2025, day: 4 });
  expect(puzzleForDate(new Date(2025, 11, 25))).toEqual({
    year: 2025,
    day: 25,
  });
});

test("puzzleForDate returns null outside December 1-25", () => {
  expect(puzzleForDate(new Date(2026, 10, 27))).toBeNull();
  expect(puzzleForDate(new Date(2025, 11, 26))).toBeNull();
  expect(puzzleForDate(new Date(2026, 0, 1))).toBeNull();
});
