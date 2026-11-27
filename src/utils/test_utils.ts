export interface TestCase {
  input: string;
  expected: string | number;
  description?: string;
}

export interface DayTests {
  part1?: TestCase[];
  part2?: TestCase[];
  part1Expected?: string | number;
  part2Expected?: string | number;
}

export async function runTestPart(
  solution: (input: string) => Promise<string | number>,
  tests: TestCase[],
  partNumber: number,
): Promise<boolean> {
  let allTestsPassed = true;
  const failures: string[] = [];

  console.log(`📝 Running Part ${partNumber} Tests:`);

  for (const [index, test] of tests.entries()) {
    try {
      const result = await solution(test.input);
      if (result === test.expected) {
        console.log(`  ✅ Example ${index + 1} passed`);
        continue;
      }

      console.log(`  ❌ Example ${index + 1} failed`);
      console.log(`     Expected: ${test.expected}`);
      console.log(`     Got: ${result}`);
      failures.push(`Example ${index + 1}`);
      allTestsPassed = false;
    } catch (error) {
      const e = error instanceof Error ? error.message : JSON.stringify(error);
      console.log(`  ❌ Example ${index + 1} errored: ${e}`);
      failures.push(`Example ${index + 1} (${e})`);
    }
  }

  if (!allTestsPassed) {
    console.log(`\n❌ Part ${partNumber} tests failed:`);
    failures.forEach((failure) => {
      console.log(`  - ${failure}`);
    });
    throw new Error(`Part ${partNumber} tests failed`);
  }

  console.log(`✅ All Part ${partNumber} tests passed!`);
  return true;
}
