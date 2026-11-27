import type { DayTests } from "../../utils/test_utils.ts";

const input1 = `broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a`;
const input2 = `broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output`;

export const tests: DayTests = {
  part1: [
    {
      input: input1,
      expected: 32000000,
    },
    {
      input: input2,
      expected: 11687500,
    },
  ],
  part2: [
    // {
    //   input: input1,
    //   expected: 0,
    // },
    // {
    //   input: input2,
    //   expected: 0,
    // },
  ],
};
