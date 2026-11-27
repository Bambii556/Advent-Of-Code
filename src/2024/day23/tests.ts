import type { DayTests } from "../../utils/test_utils.ts";

const input = `kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn`;

export const tests: DayTests = {
  part1: [
    {
      input,
      expected: 7,
    },
  ],
  part2: [
    {
      input,
      expected: "co,de,ka,ta",
    },
  ],
};
