# 🎄 Advent of Code: The Annual December Debugging Marathon 🎄

> _Where sleep schedules go to die and off-by-one errors multiply like rabbits_

## What is this madness?

This is my personal collection of [Advent of Code](https://adventofcode.com/)
solutions, spanning multiple years of festive algorithmic suffering. Think of it
as a digital advent calendar, except instead of chocolate, you get graph
traversal problems at midnight.

## 🏆 Years Conquered (or at least attempted)

- **2023** - The year I learned that "simple string parsing" is an oxymoron
- **2024** - When I finally understood why everyone hates Day 19
- **2025** - Currently in progress! (Send coffee ☕)

## 🛠️ Tech Stack

- **TypeScript** - Because I like my bugs to be type-safe
- **Bun** - Runs the code and installs the packages
- **Biome** - Formats, lints, and sorts imports
- **Pure determination** - The most important dependency

## 🚀 Running the Code

```bash
bun install

# Scaffold a new day
bun run scaffold 2025 13

# Run one day: example tests, then the real input
bun run day 2025 4

# Run example tests for every day (or one year)
bun run test
bun run test 2025

# Format, lint, and organise imports
bun run check

# Type-check
bun run typecheck

# Cry into your keyboard (not included in package.json)
```

`bun test` runs the unit tests in `src/utils`; `bun run test` runs the Advent of
Code day examples.

## 📁 Project Structure

```
src/
├── 2023/          # The good old days
├── 2024/          # When things got serious
├── 2025/          # Current suffering
└── utils/         # My growing collection of "I'll need this again" functions
```

Adding a day is just creating `src/<year>/day<n>/` with `index.ts`,
`tests.ts`, and `input.txt`. Days are discovered automatically — no
registration list.

`tests.ts` only holds the examples:

```ts
import type { DayTests } from "../../utils/test_utils.ts";

export const tests: DayTests = {
  part1: [{ input: "example", expected: 42 }],
  part2: [],
};
```

Add `part1Expected` / `part2Expected` to assert the real-input answer too.

## 🎯 Personal Goals

- [ ] Finish all 25 days (narrator: _they didn't_)
- [ ] Write clean, maintainable code (narrator: _they tried_)
- [ ] Get on the global leaderboard (narrator: _HAHAHAHA_)
- [x] Have fun and learn stuff
- [x] Collect utility functions like Pokémon

## 🤔 Fun Facts

- **Lines of utility code written**: Too many
- **Times I've implemented Dijkstra**: Yes
- **Regex patterns that made me question my sanity**: All of them
- **Days where Part 2 made me rewrite everything**: More than I'd like to admit

## 💡 Lessons Learned

1. Always read the problem statement **twice**
2. The example input is lying to you
3. "This will be quick" - Famous last words
4. Off-by-one errors are a lifestyle choice
5. Sometimes the brute force solution is the right solution (looking at you,
   Day 5)
6. Your first instinct is probably wrong, but your second instinct is definitely
   wrong too

## 🐛 Known Issues

- My code occasionally works on the first try (this is the real bug)
- Some solutions are O(n²) when they should be O(n log n) - we don't talk about
  those
- Day 24 of 2024 has a Python file because TypeScript and I had a disagreement

## 🤝 Contributing

Feel free to:

- Judge my code (constructively, please)
- Suggest optimizations (I know it's slow, okay?)
- Share your own war stories from AoC

## 📜 License

MIT - Because sharing is caring, even when it's spaghetti code

## 🙏 Acknowledgments

- Eric Wastl for creating this beautiful torture
- Coffee, for obvious reasons
- Stack Overflow, my silent partner
- Future me, who will have to maintain this code (sorry buddy)

---

_"It's not a bug, it's an undocumented feature"_ - Me, probably, at 2 AM on
December 15th

**Remember**: If your code works but you don't know why, that's Advent of Code.
If your code doesn't work and you don't know why, that's also Advent of Code. 🎅
