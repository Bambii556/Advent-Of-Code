import type { DayTests } from "../../utils/test_utils.ts";

const input = `11x7
p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`;

export const tests: DayTests = {
  part1: [
    //     {
    //       input: `11x7
    // p=2,4 v=2,-3`,
    //       expected: 1,
    //     },
    {
      input,
      expected: 12,
    },
  ],
  part2: [
    // {
    //   input,
    //   expected: 0,
    // },
  ],
};
