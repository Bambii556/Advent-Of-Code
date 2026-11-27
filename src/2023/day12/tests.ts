import type { DayTests } from "../../utils/test_utils.ts";

const input = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;

export const tests: DayTests = {
  part1: [
    {
      input,
      expected: 21,
    },
  ],
  part2: [
    {
      input,
      expected: 525152,
    },
  ],
};
