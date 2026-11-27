import type { DayTests } from "../../utils/test_utils.ts";

const input = `.....
.F-7.
.|.|.
.L-J.
.....`;

const input2 = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`;

export const tests: DayTests = {
  part1: [
    {
      input,
      expected: 4,
    },
    {
      input: input2,
      expected: 8,
    },
  ],
  part2: [
    {
      input,
      expected: 0,
    },
    {
      input: input2,
      expected: 0,
    },
  ],
};
