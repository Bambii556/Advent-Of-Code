import type { DayTests } from "../../utils/test_utils.ts";

const input = `12
6x6
5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`;

export const tests: DayTests = {
  part1: [
    {
      input,
      expected: 22,
    },
  ],
  part2: [
    {
      input,
      expected: "6,1",
    },
  ],
};
