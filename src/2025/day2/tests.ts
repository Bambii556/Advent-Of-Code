import type { DayTests } from "../../utils/test_utils.ts";

const input = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`;

export const tests: DayTests = {
  part1: [
    {
      input,
      expected: 1227775554,
    },
  ],
  part2: [
    {
      input,
      expected: 4174379265,
    },
  ],
};
