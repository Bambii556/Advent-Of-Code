import type { DayTests } from "../../utils/test_utils.ts";

const input = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

export const tests: DayTests = {
  part1: [
    {
      input,
      expected: 2,
    },
  ],
  part2: [
    {
      input,
      expected: 4,
    },
  ],
};
