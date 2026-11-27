import type { Solution } from "../../types.ts";
import { getInputLines } from "../../utils/index.ts";

interface TachyonManifold {
  grid: string[][];
  startCol: number;
  width: number;
  height: number;
}

interface Beam {
  row: number;
  col: number;
}

export const day7: Solution = {
  part1: async (input: string) => {
    const { grid, startCol, height, width } = parseInput(input);

    let beamsSplit = 0;
    let beams: Beam[] = [{ row: 1, col: startCol }];

    while (beams.length > 0) {
      const newBeams: Beam[] = [];

      for (const beam of beams) {
        const { row, col } = beam;
        if (row >= height || col < 0 || col >= width) {
          continue; // Beam exits
        }

        const currentItem = grid[row][col];

        if (currentItem === "^") {
          beamsSplit += 1;
          newBeams.push({ row: row + 1, col: col - 1 }); // left
          newBeams.push({ row: row + 1, col: col + 1 }); // right
        } else if (currentItem === "." || currentItem === "S") {
          newBeams.push({ row: row + 1, col });
        }
      }

      const beamSet = new Set(newBeams.map((b) => `${b.row},${b.col}`));
      beams = Array.from(beamSet).map((key) => {
        const [row, col] = key.split(",").map(Number);
        return { row, col };
      });
    }

    return beamsSplit;
  },

  part2: async (input: string) => {
    const { grid, startCol, height, width } = parseInput(input);
    const memo = new Map<string, number>();

    function countTimelinesFrom(row: number, col: number): number {
      const key = `${row},${col}`;

      if (memo.has(key)) {
        return memo.get(key)!;
      }

      // only one exists
      if (row >= height || col < 0 || col >= width) {
        return 1;
      }

      const currentItem = grid[row][col];
      let count = 0;

      if (currentItem === "^") {
        count =
          countTimelinesFrom(row + 1, col - 1) +
          countTimelinesFrom(row + 1, col + 1);
      } else {
        count = countTimelinesFrom(row + 1, col);
      }

      memo.set(key, count);
      return count;
    }

    return countTimelinesFrom(1, startCol);
  },
};

function parseInput(input: string): TachyonManifold {
  const lines = getInputLines(input);
  const grid = lines.map((line) => line.split(""));

  const height = grid.length;
  const width = grid[0]?.length || 0;

  let startCol = -1;
  for (let col = 0; col < width; col++) {
    if (grid[0][col] === "S") {
      startCol = col;
      break;
    }
  }

  return {
    grid,
    startCol,
    width,
    height,
  };
}
