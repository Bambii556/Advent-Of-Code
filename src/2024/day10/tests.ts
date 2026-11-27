import type { DayTests } from "../../utils/test_utils.ts";

const input = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;

export const tests: DayTests = {
  part1: [
    {
      input,
      expected: 36,
    },
  ],
  part2: [
    {
      input,
      expected: 81,
    },
  ],
};
