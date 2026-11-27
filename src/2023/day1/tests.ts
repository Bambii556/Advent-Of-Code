import type { DayTests } from "../../utils/test_utils.ts";

export const tests: DayTests = {
  part1: [
    {
      input: `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`,
      expected: 142,
    },
  ],
  part2: [
    {
      input: `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`,
      expected: 281,
    },
  ],
};
