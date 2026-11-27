import type { Solution } from "../../types.ts";
import { getInputLines } from "../../utils/index.ts";

interface Machine {
  target: boolean[];
  buttons: number[][];
  joltage: number[];
}

export const day10: Solution = {
  part1: async (input: string) => {
    const machines = parseInput(input);
    let totalPresses = 0;

    for (const machine of machines) {
      const numButtons = machine.buttons.length;
      const numLights = machine.target.length;
      let minPresses = Infinity;

      for (let mask = 0; mask < 1 << numButtons; mask++) {
        const lights = new Array(numLights).fill(false);

        let presses = 0;
        for (let btn = 0; btn < numButtons; btn++) {
          if (mask & (1 << btn)) {
            presses++;
            for (const light of machine.buttons[btn]) {
              lights[light] = !lights[light];
            }
          }
        }

        if (lights.every((val, idx) => val === machine.target[idx])) {
          minPresses = Math.min(minPresses, presses);
        }
      }

      totalPresses += minPresses;
    }

    return totalPresses;
  },

  part2: async (input: string) => {
    const machines = parseInput(input);
    let totalPresses = 0;

    let count = 1;
    for (const machine of machines) {
      const minPresses = solveJoltageILP(machine);
      console.log(
        `Machine ${count++}/${machines.length}: Minimum Presses = ${minPresses}`,
      );
      if (minPresses !== null) {
        totalPresses += minPresses;
      }
    }

    return totalPresses;
  },
};

function solveJoltageILP(machine: Machine): number | null {
  const numButtons = machine.buttons.length;
  const numCounters = machine.joltage.length;

  if (numCounters === 0 || numButtons === 0) {
    return 0;
  }

  // coefficient matrix
  const matrix: number[][] = Array(numCounters)
    .fill(0)
    .map(() => Array(numButtons).fill(0));

  for (let btnIdx = 0; btnIdx < numButtons; btnIdx++) {
    for (const counterIdx of machine.buttons[btnIdx]) {
      if (counterIdx < numCounters) {
        matrix[counterIdx][btnIdx] = 1;
      }
    }
  }

  // augmented matrix [A|b]
  const aug: number[][] = matrix.map((row, i) => [...row, machine.joltage[i]]);

  // Gaussian elimination to reduced row echelon
  const pivotCols: number[] = [];
  let pivotRow = 0;

  for (let col = 0; col < numButtons && pivotRow < numCounters; col++) {
    // Find pivot
    let maxRow = pivotRow;
    for (let row = pivotRow + 1; row < numCounters; row++) {
      if (Math.abs(aug[row][col]) > Math.abs(aug[maxRow][col])) {
        maxRow = row;
      }
    }

    if (aug[maxRow][col] === 0) continue;

    // Swap rows
    [aug[pivotRow], aug[maxRow]] = [aug[maxRow], aug[pivotRow]];
    pivotCols.push(col);

    // Remove below and above
    const pivotVal = aug[pivotRow][col];
    for (let j = 0; j <= numButtons; j++) {
      aug[pivotRow][j] /= pivotVal;
    }

    for (let row = 0; row < numCounters; row++) {
      if (row !== pivotRow && aug[row][col] !== 0) {
        const factor = aug[row][col];
        for (let j = 0; j <= numButtons; j++) {
          aug[row][j] -= factor * aug[pivotRow][j];
        }
      }
    }
    pivotRow++;
  }

  // Get free variables
  const freeVars: number[] = [];
  for (let i = 0; i < numButtons; i++) {
    if (!pivotCols.includes(i)) {
      freeVars.push(i);
    }
  }

  let minTotal = Infinity;
  const maxVal = Math.max(...machine.joltage) + 5;

  function searchFreeVars(freeIdx: number, solution: number[]): void {
    if (freeIdx === freeVars.length) {
      // Calculate pivot variables
      for (let i = 0; i < pivotCols.length; i++) {
        const col = pivotCols[i];
        let val = aug[i][numButtons];
        for (let j = col + 1; j < numButtons; j++) {
          val -= aug[i][j] * solution[j];
        }

        // Check if integer and non-negative
        if (Math.abs(val - Math.round(val)) > 1e-9 || val < -0.5) {
          return;
        }
        solution[col] = Math.round(val);
      }

      const total = solution.reduce((sum, v) => sum + v, 0);
      if (total < minTotal) {
        minTotal = total;
      }
      return;
    }

    const freeVar = freeVars[freeIdx];
    for (let val = 0; val <= maxVal && val < minTotal; val++) {
      solution[freeVar] = val;
      searchFreeVars(freeIdx + 1, solution);
    }
  }

  const solution = Array(numButtons).fill(0);
  searchFreeVars(0, solution);

  return minTotal === Infinity ? null : minTotal;
}

// Parse input: [.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
function parseInput(input: string): Machine[] {
  const lines = getInputLines(input);
  return lines.map((line) => {
    const bracketMatch = line.match(/\[([.#]+)\]/);
    const buttonMatches = line.match(/\([\d,]+\)/g);
    const joltageMatch = line.match(/\{[\d,]+\}/);

    if (!bracketMatch || !buttonMatches) {
      throw new Error(`Invalid line format: ${line}`);
    }

    const target = bracketMatch[1].split("").map((char) => char === "#");

    const buttons = buttonMatches.map((btnStr) => {
      const nums = btnStr.slice(1, -1);
      if (nums === "") return [];
      return nums.split(",").map((n) => parseInt(n, 10));
    });

    const joltage: number[] = joltageMatch
      ? joltageMatch[0]
          .slice(1, -1)
          .split(",")
          .map((n) => parseInt(n, 10))
      : [];

    return { target, buttons, joltage };
  });
}
