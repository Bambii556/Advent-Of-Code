import type { DayTests } from "../../utils/test_utils.ts";

export const tests: DayTests = {
  part1: [
    {
      input: `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`,
      expected: "4,6,3,5,6,3,5,2,1,0",
    },
  ],
  part2: [
    {
      input: `Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`,
      expected: 117440,
    },
  ],
};
