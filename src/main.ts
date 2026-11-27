import { readFile } from "node:fs/promises";
import type { Solution } from "./types.ts";
import { type DayMeta, discoverDays, loadDay } from "./utils/days.ts";
import { log } from "./utils/index.ts";
import { type DayTests, runTestPart } from "./utils/test_utils.ts";

type Mode = "test" | "run";
type PartNumber = 1 | 2;

async function loadTests(year: number, day: number): Promise<DayTests> {
  try {
    const module = await import(`./${year}/day${day}/tests.ts`);
    return module.tests ?? {};
  } catch {
    return {};
  }
}

function partOf(solution: Solution, part: PartNumber) {
  return part === 1 ? solution.part1 : solution.part2;
}

async function runExamples(
  solution: Solution,
  tests: DayTests,
  part: PartNumber,
): Promise<boolean> {
  const cases = part === 1 ? tests.part1 : tests.part2;
  if (!cases?.length) {
    log(`⚠️ No tests defined for Part ${part}\n`);
    return true;
  }

  try {
    await runTestPart(partOf(solution, part), cases, part);
    return true;
  } catch {
    return false;
  }
}

async function runPart(
  solution: Solution,
  tests: DayTests,
  part: PartNumber,
  input: string,
): Promise<boolean> {
  console.time(`Part ${part}`);
  const result = await partOf(solution, part)(input);
  console.timeEnd(`Part ${part}`);
  log(" - Result:", result);

  const expected = part === 1 ? tests.part1Expected : tests.part2Expected;
  if (expected === undefined) return true;
  if (result === expected) {
    log(" - ✅ matches expected\n");
    return true;
  }

  log(` - ❌ expected ${expected}\n`);
  return false;
}

export async function runDay(
  { year, day }: DayMeta,
  mode: Mode,
): Promise<boolean> {
  const solution = await loadDay(year, day);
  if (!solution) {
    log(`No solution found for Year ${year} Day ${day}`);
    return false;
  }

  log(`\n🎄 Day ${day} 🎄`);
  log(`=== Year ${year} Day ${day} ===\n`);
  if (solution.title) log(solution.title);

  const tests = await loadTests(year, day);
  const input =
    mode === "run"
      ? await readFile(
          new URL(`./${year}/day${day}/input.txt`, import.meta.url),
          "utf8",
        )
      : "";

  let passed = true;
  for (const part of [1, 2] as const) {
    const examplesPassed = await runExamples(solution, tests, part);
    if (!examplesPassed) {
      passed = false;
      continue;
    }

    if (mode === "run") {
      log(`${"-".repeat(20)}\n`);
      if (!(await runPart(solution, tests, part, input))) passed = false;
      if (part === 1) log(`\n${"#".repeat(20)}\n`);
    }
  }

  log(`\n=== Year ${year} Day ${day} END ===\n`);
  return passed;
}

async function main() {
  const args = process.argv.slice(2);

  if (args[0] === "--test") {
    const year = args[1] === undefined ? undefined : Number(args[1]);
    if (year !== undefined && !Number.isInteger(year)) {
      log("Please provide a valid year (e.g. 2025)");
      process.exit(1);
    }

    const days = discoverDays().filter(
      (meta) => year === undefined || meta.year === year,
    );
    if (days.length === 0) {
      log("No days found");
      process.exit(1);
    }

    let failures = 0;
    for (const meta of days) {
      if (!(await runDay(meta, "test"))) failures++;
    }

    log(`\n${days.length - failures}/${days.length} days passed tests`);
    process.exit(failures > 0 ? 1 : 0);
  }

  const year = Number(args[0]);
  const day = Number(args[1]);
  if (!Number.isInteger(year) || year < 1 || year > 2100) {
    log("Please provide a valid year (e.g. 2025)");
    process.exit(1);
  }
  if (!Number.isInteger(day) || day < 1 || day > 25) {
    log("Please provide a valid day (1-25)");
    process.exit(1);
  }

  const passed = await runDay({ year, day }, "run");
  process.exit(passed ? 0 : 1);
}

if (import.meta.main) {
  main();
}
