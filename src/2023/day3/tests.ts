import type { DayTests } from "../../utils/test_utils.ts";

const input = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

export const tests: DayTests = {
  part1: [
    {
      input,
      expected: 4361,
    },
  ],
  part2: [
    {
      input,
      expected: 467835,
    },
  ],
};
