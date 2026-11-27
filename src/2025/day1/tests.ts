import type { DayTests } from "../../utils/test_utils.ts";

const input = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

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
      expected: 6,
    },
  ],
};
