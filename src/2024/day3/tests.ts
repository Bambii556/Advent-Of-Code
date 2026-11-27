import type { DayTests } from "../../utils/test_utils.ts";

const input = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;

export const tests: DayTests = {
  part1: [
    {
      input,
      expected: 161,
    },
  ],
  part2: [
    {
      input,
      expected: 48,
    },
  ],
};
