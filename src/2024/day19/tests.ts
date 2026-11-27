import type { DayTests } from "../../utils/test_utils.ts";

const input = `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`;

export const tests: DayTests = {
  part1: [
    {
      input,
      expected: 6,
    },
  ],
  part2: [
    {
      input,
      expected: 16,
    },
  ],
};
