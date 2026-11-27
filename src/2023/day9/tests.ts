import type { DayTests } from "../../utils/test_utils.ts";

const input1 = `0 3 6 9 12 15`;
const input2 = `1 3 6 10 15 21`;
const input3 = `10 13 16 21 30 45`;
const input4 = `${input1}\n${input2}\n${input3}`;

export const tests: DayTests = {
  part1: [
    {
      input: input1,
      expected: 18,
    },
    {
      input: input2,
      expected: 28,
    },
    {
      input: input3,
      expected: 68,
    },
    {
      input: input4,
      expected: 114,
    },
  ],
  part2: [
    {
      input: input3,
      expected: 5,
    },
    {
      input: input1,
      expected: -3,
    },
    {
      input: input2,
      expected: 0,
    },
    {
      input: input4,
      expected: 2,
    },
  ],
};
