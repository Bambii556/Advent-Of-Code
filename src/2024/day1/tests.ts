import type { DayTests } from "../../utils/test_utils.ts";

const input = `3   4
4   3
2   5
1   3
3   9
3   3`;

export const tests: DayTests = {
  part1: [
    {
      input,
      expected: 11,
    },
  ],
  part2: [
    {
      input,
      expected: 31,
    },
  ],
};
