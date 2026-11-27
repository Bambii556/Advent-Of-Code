import type { DayTests } from "../../utils/test_utils.ts";

const input = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

export const tests: DayTests = {
  part1: [
    {
      input,
      expected: 1320,
    },
  ],
  part2: [
    {
      input,
      expected: 145,
    },
  ],
};
