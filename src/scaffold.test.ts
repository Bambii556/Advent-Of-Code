import { afterEach, expect, test } from "bun:test";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { scaffoldDay } from "./scaffold.ts";

const roots: string[] = [];

afterEach(() => {
  for (const root of roots.splice(0)) {
    rmSync(root, { recursive: true, force: true });
  }
});

test("scaffolds a day without overwriting", () => {
  const root = mkdtempSync(join(tmpdir(), "aoc-"));
  roots.push(root);

  const dir = scaffoldDay(2025, 13, root);
  expect(readFileSync(join(dir, "index.ts"), "utf8")).toContain(
    "export const day13",
  );
  expect(readFileSync(join(dir, "tests.ts"), "utf8")).toContain(
    "export const tests",
  );
  expect(readFileSync(join(dir, "input.txt"), "utf8")).toBe("");
  expect(() => scaffoldDay(2025, 13, root)).toThrow("already exists");
});
