import { getInputLines } from "../../utils/index.ts";
import { Solution } from "../../types.ts";

interface Point {
  x: number;
  y: number;
}

export const day9: Solution = {
  part1: async (input: string) => {
    const redTiles = parseInputs(input);

    let maxArea = 0;
    for (let i = 0; i < redTiles.length; i++) {
      for (let j = i + 1; j < redTiles.length; j++) {
        const width = Math.abs(redTiles[i].x - redTiles[j].x) + 1;
        const height = Math.abs(redTiles[i].y - redTiles[j].y) + 1;
        const area = width * height;
        maxArea = Math.max(maxArea, area);
      }
    }
    return maxArea;
  },

  part2: async (input: string) => {
    const redTiles = parseInputs(input);

    // Get unique x and y values for coordinate compression
    const xValues = [...new Set(redTiles.map((t) => t.x))].sort((a, b) =>
      a - b
    );
    const yValues = [...new Set(redTiles.map((t) => t.y))].sort((a, b) =>
      a - b
    );

    // Create a grid with compressed coordinates
    const grid: number[][] = Array(xValues.length + 2)
      .fill(0)
      .map(() => Array(yValues.length + 2).fill(0));

    // Draw lines between consecutive red tiles
    const drawLine = (x1: number, y1: number, x2: number, y2: number) => {
      if (x1 === x2) {
        for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
          grid[x1][y] = 1;
        }
      } else if (y1 === y2) {
        for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
          grid[x][y1] = 1;
        }
      }
    };

    // Draw the boundary
    for (let i = 0; i < redTiles.length; i++) {
      const current = redTiles[i];
      const next = redTiles[(i + 1) % redTiles.length];
      const x1 = xValues.indexOf(current.x) + 1;
      const y1 = yValues.indexOf(current.y) + 1;
      const x2 = xValues.indexOf(next.x) + 1;
      const y2 = yValues.indexOf(next.y) + 1;
      drawLine(x1, y1, x2, y2);
    }

    // Flood fill from outside to mark all tiles outside
    const fill = () => {
      const stack: Point[] = [{ x: 0, y: 0 }];
      grid[0][0] = 2;

      while (stack.length > 0) {
        const current = stack.pop()!;
        const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

        for (const [dx, dy] of directions) {
          const nx = current.x + dx;
          const ny = current.y + dy;

          if (
            nx >= 0 && nx < grid.length &&
            ny >= 0 && ny < grid[0].length &&
            grid[nx][ny] === 0
          ) {
            grid[nx][ny] = 2;
            stack.push({ x: nx, y: ny });
          }
        }
      }
    };

    fill();

    // Check if a rectangle contains any outside tiles
    const containsOutsideField = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
    ): boolean => {
      for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
        for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
          if (grid[x][y] === 2) {
            return true;
          }
        }
      }
      return false;
    };

    // Find the largest rectangle that doesn't contain outside tiles
    let maxArea = 0;
    for (let i = 0; i < redTiles.length; i++) {
      for (let j = i + 1; j < redTiles.length; j++) {
        const width = Math.abs(redTiles[i].x - redTiles[j].x) + 1;
        const height = Math.abs(redTiles[i].y - redTiles[j].y) + 1;
        const area = width * height;

        const x1 = xValues.indexOf(redTiles[i].x) + 1;
        const y1 = yValues.indexOf(redTiles[i].y) + 1;
        const x2 = xValues.indexOf(redTiles[j].x) + 1;
        const y2 = yValues.indexOf(redTiles[j].y) + 1;

        if (!containsOutsideField(x1, y1, x2, y2)) {
          maxArea = Math.max(maxArea, area);
        }
      }
    }

    return maxArea;
  },
};

function parseInputs(input: string) {
  return getInputLines(input).map((line) => {
    const [x, y] = line.split(",");
    return { x: parseInt(x), y: parseInt(y) } as Point;
  });
}
