import type { DayTests } from "../../utils/test_utils.ts";

const input = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

export const tests: DayTests = {
  part1: [
    {
      input,
      expected: 6440,
    },
  ],
  part2: [
    {
      input,
      expected: 5905,
    },
  ],
};
