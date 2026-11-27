import type { DayTests } from "../../utils/test_utils.ts";

const input = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

export const tests: DayTests = {
  part1: [
    {
      input,
      expected: 18,
    },
  ],
  part2: [
    {
      input,
      expected: 9,
    },
  ],
};
