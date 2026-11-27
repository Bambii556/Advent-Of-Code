import type { Solution } from "../../types.ts";
import {
  createGrid,
  getAllCoordsOfCharacter,
  getAllGridRotations,
  getInputGroups,
} from "../../utils/index.ts";

interface Shape {
  id: number;
  grid: string[][];
  width: number;
  height: number;
}

interface Region {
  width: number;
  height: number;
  grid: string[][];
  requiredShapes: number[]; // Count of each shape by index
}

export const day12: Solution = {
  part1: async (input: string) => {
    const { shapes, regions } = parseInput(input);
    let count = 0;

    for (const region of regions) {
      if (canFitAllShapes(shapes, region)) {
        count++;
      }
    }

    return count;
  },

  part2: async (_input: string) => {
    return 0;
  },
};

function parseInput(input: string): {
  shapes: Shape[];
  regions: Region[];
} {
  const shapeGroups = getInputGroups(input);
  const regionLines = shapeGroups.pop()!;

  const shapes: Shape[] = shapeGroups.map((group) => {
    const shapeId = parseInt(group[0].slice(0, -1), 10);
    const grid = group.slice(1).map((line) => line.split(""));

    return {
      id: shapeId,
      grid,
      width: grid[0]?.length ?? 0,
      height: grid.length,
    };
  });

  const regions: Region[] = regionLines
    .map((line) => {
      const match = line.trim().match(/^(\d+)x(\d+):\s*(.+)$/);
      if (!match) return null;

      const width = parseInt(match[1], 10);
      const height = parseInt(match[2], 10);

      return {
        width,
        height,
        grid: createGrid(height, width, "."),
        requiredShapes: match[3].trim().split(/\s+/).map(Number),
      };
    })
    .filter((r): r is Region => r !== null);

  return { shapes, regions };
}

function canFitAllShapes(shapes: Shape[], region: Region): boolean {
  const shapesToPlace: number[] = region.requiredShapes.flatMap((count, i) =>
    Array(count).fill(i),
  );

  if (shapesToPlace.length === 0) return true;

  if (isRegionTooSmall(shapes, region, shapesToPlace)) return false;

  const usedShapeIds = new Set(shapesToPlace);
  const allRotations = new Map<number, string[][][]>();
  for (const shape of shapes) {
    if (usedShapeIds.has(shape.id)) {
      allRotations.set(shape.id, getAllGridRotations(shape.grid));
    }
  }

  const shapeAreas = shapes.map((s) => getShapeCoords(s.grid).length);
  shapesToPlace.sort((a, b) => shapeAreas[b] - shapeAreas[a]);

  return tryPlaceShapes(region, shapes, shapesToPlace, 0, allRotations);
}

function isRegionTooSmall(
  shapes: Shape[],
  region: Region,
  allShapes: number[],
) {
  const totalShapeArea = allShapes.reduce(
    (sum, shapeId) => sum + getShapeCoords(shapes[shapeId].grid).length,
    0,
  );
  return totalShapeArea > region.width * region.height;
}

function tryPlaceShapes(
  region: Region,
  shapes: Shape[],
  shapesToPlace: number[],
  shapeIndex: number,
  allRotations: Map<number, string[][][]>,
): boolean {
  if (shapeIndex >= shapesToPlace.length) return true; // Done

  const shapeId = shapesToPlace[shapeIndex];
  const rotations = allRotations.get(shapeId)!;

  for (const rotation of rotations) {
    const shapeCoords = getShapeCoords(rotation);

    const maxRow = Math.max(...shapeCoords.map(([r]) => r));
    const maxCol = Math.max(...shapeCoords.map(([c]) => c));
    const rowLimit = region.height - maxRow;
    const colLimit = region.width - maxCol;

    for (let row = 0; row <= rowLimit; row++) {
      for (let col = 0; col <= colLimit; col++) {
        if (canPlace(region, shapeCoords, row, col)) {
          place(region, shapeCoords, row, col, shapeIndex);

          if (
            tryPlaceShapes(
              region,
              shapes,
              shapesToPlace,
              shapeIndex + 1,
              allRotations,
            )
          ) {
            return true;
          }

          remove(region, shapeCoords, row, col);
        }
      }
    }
  }

  return false;
}

const shapeCoordCache = new Map<string[][], [number, number][]>();

function getShapeCoords(grid: string[][]): [number, number][] {
  if (shapeCoordCache.has(grid)) {
    return shapeCoordCache.get(grid)!;
  }

  const coords = getAllCoordsOfCharacter(grid, "#");

  shapeCoordCache.set(grid, coords);
  return coords;
}

function canPlace(
  region: Region,
  shapeCoords: [number, number][],
  row: number,
  col: number,
): boolean {
  return shapeCoords.every(([dr, dc]) => {
    const r = row + dr;
    const c = col + dc;
    return (
      r >= 0 &&
      r < region.height &&
      c >= 0 &&
      c < region.width &&
      region.grid[r][c] === "."
    );
  });
}

function place(
  region: Region,
  shapeCoords: [number, number][],
  row: number,
  col: number,
  index: number,
): void {
  const marker = index.toString();
  for (const [dr, dc] of shapeCoords) {
    region.grid[row + dr][col + dc] = marker;
  }
}

function remove(
  region: Region,
  shapeCoords: [number, number][],
  row: number,
  col: number,
): void {
  for (const [dr, dc] of shapeCoords) {
    region.grid[row + dr][col + dc] = ".";
  }
}
