import type { DayTests } from "../../utils/test_utils.ts";

const input = `0:
###
##.
##.

1:
###
##.
.##

2:
.##
###
##.

3:
##.
###
##.

4:
###
#..
###

5:
###
.#.
###

4x4: 0 0 0 0 2 0
12x5: 1 0 1 0 2 2
12x5: 1 0 1 0 3 2`;

export const tests: DayTests = {
  part1: [
    {
      input,
      expected: 2,
    },
  ],
  part2: [],
};
