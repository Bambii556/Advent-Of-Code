import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const SRC_ROOT = fileURLToPath(new URL(".", import.meta.url));

const testsTemplate = `import type { DayTests } from "../../utils/test_utils.ts";

export const tests: DayTests = {
  part1: [],
  part2: [],
};
`;

function indexTemplate(day: number): string {
  return `import type { Solution } from "../../types.ts";

export const day${day}: Solution = {
  part1: async (input: string) => {
    return "Not implemented yet";
  },

  part2: async (input: string) => {
    return "Not implemented yet";
  },
};
`;
}

export function scaffoldDay(
  year: number,
  day: number,
  root = SRC_ROOT,
): string {
  const dir = join(root, String(year), `day${day}`);
  if (existsSync(dir)) {
    throw new Error(`${dir} already exists`);
  }

  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.ts"), indexTemplate(day));
  writeFileSync(join(dir, "tests.ts"), testsTemplate);
  writeFileSync(join(dir, "input.txt"), "");
  return dir;
}

if (import.meta.main) {
  const [yearArg, dayArg] = process.argv.slice(2);
  const year = Number(yearArg);
  const day = Number(dayArg);

  const validYear = Number.isInteger(year) && year >= 2015 && year <= 2100;
  const validDay = Number.isInteger(day) && day >= 1 && day <= 25;
  if (process.argv.slice(2).length !== 2 || !validYear || !validDay) {
    console.error("Usage: bun run scaffold <year> <day>");
    console.error("Example: bun run scaffold 2025 13");
    process.exit(1);
  }

  try {
    const dir = scaffoldDay(year, day);
    console.log(`Scaffolded ${dir}`);
    console.log(`Paste the puzzle input into ${join(dir, "input.txt")}`);
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}
