import type { DayTests } from "../../utils/test_utils.ts";

const input = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

export const tests: DayTests = {
  part1: [
    {
      input,
      expected: 3,
    },
  ],
  part2: [
    {
      input,
      expected: 14,
    },
  ],
};
