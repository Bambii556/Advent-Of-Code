import type { DayTests } from "../../utils/test_utils.ts";

const input = `aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out`;

const input2 = `svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out`;

export const tests: DayTests = {
  part1: [
    {
      input,
      expected: 5,
    },
  ],
  part2: [
    {
      input: input2,
      expected: 2,
    },
  ],
};
