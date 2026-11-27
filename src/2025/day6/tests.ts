import type { DayTests } from "../../utils/test_utils.ts";

const input = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;

export const tests: DayTests = {
  part1: [
    {
      input,
      expected: 4277556,
    },
  ],
  part2: [
    {
      input,
      expected: 3263827,
    },
  ],
};
