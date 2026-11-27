import type { DayTests } from "../../utils/test_utils.ts";

const input = `1
10
100
2024`;

export const tests: DayTests = {
  part1: [
    {
      input,
      expected: 37327623,
    },
  ],
  part2: [
    {
      input,
      expected: 23,
    },
  ],
};
