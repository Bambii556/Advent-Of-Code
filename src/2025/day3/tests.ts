import type { DayTests } from "../../utils/test_utils.ts";

const input = `987654321111111
811111111111119
234234234234278
818181911112111`;

export const tests: DayTests = {
  part1: [
    {
      input,
      expected: 357,
    },
  ],
  part2: [
    {
      input,
      expected: 3121910778619,
    },
  ],
};
