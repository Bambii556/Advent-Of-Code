import type { DayTests } from "../../utils/test_utils.ts";

const input = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;

export const tests: DayTests = {
  part1: [
    {
      input,
      expected: 50,
    },
  ],
  part2: [
    {
      input,
      expected: 24,
    },
  ],
};
