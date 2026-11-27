import type { DayTests } from "../../utils/test_utils.ts";

const input = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

export const tests: DayTests = {
  part1: [
    {
      input,
      expected: 41,
    },
  ],
  part2: [
    {
      input,
      expected: 6,
    },
  ],
};
