import type { DayTests } from "../../utils/test_utils.ts";

export const tests: DayTests = {
  part1: [
    {
      input: `AAAA
BBCD
BBCC
EEEC`,
      expected: 140,
    },
    {
      input: `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`,
      expected: 772,
    },
    {
      input: `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`,
      expected: 1930,
    },
  ],
  part2: [
    {
      input: `AAAA
BBCD
BBCC
EEEC`,
      expected: 80,
    },
    {
      input: `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`,
      expected: 436,
    },
    {
      input: `EEEEE
EXXXX
EEEEE
EXXXX
EEEEE`,
      expected: 236,
    },
    {
      input: `AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA`,
      expected: 368,
    },
    {
      input: `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`,
      expected: 1206,
    },
  ],
};
