/**
 * Grid/Graph Helper Functions
 * --------------------------
 * Functions for working with 2D grids and graph-like structures
 */

/**
 * Returns the four adjacent coordinates (up, right, down, left) for a given point.
 * Commonly used in grid-based puzzles where diagonal movement isn't allowed.
 *
 * @example
 * getAdjacent(1, 1) // Returns [[1,0], [2,1], [1,2], [0,1]]
 */
export const ADJACENT_COORDS = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
export function getAdjacent(x: number, y: number): [number, number][] {
  return ADJACENT_COORDS.map(([dx, dy]) => [x + dx, y + dy]);
}

/**
 * Returns all eight adjacent coordinates including diagonals.
 * Useful for games like Game of Life or when diagonal movement is allowed.
 *
 * @example
 * getAdjacentWithDiagonals(1, 1)
 * // Returns [[0,0], [1,0], [2,0], [0,1], [2,1], [0,2], [1,2], [2,2]]
 */
export const DIAGONAL_COORDS = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];
export function getAdjacentWithDiagonals(
  x: number,
  y: number,
): [number, number][] {
  return DIAGONAL_COORDS.map(([dx, dy]) => [x + dx, y + dy]);
}

const TOP_BOTTOM_COORDS: [number, number][] = [
  [-1, -1], // top left
  [0, -1], // top middle
  [1, -1], // top right
  [-1, 1], // bottom left
  [0, 1], // bottom middle
  [1, 1], // bottom right
];

export function getAdjacentWithTopAndBottom(
  x: number,
  y: number,
): [number, number][] {
  return TOP_BOTTOM_COORDS.map(([dx, dy]) => [x + dx, y + dy]);
}

/**
 * Checks if given coordinates are within the bounds of a grid.
 * Prevents array out-of-bounds errors in grid traversal.
 *
 * @example
 * const grid = [[1,2], [3,4]];
 * isInBounds(0, 0, grid) // true
 * isInBounds(2, 2, grid) // false
 */
export function isInBounds<T>(row: number, col: number, grid: T[][]): boolean {
  return col >= 0 && col < grid[0].length && row >= 0 && row < grid.length;
}

/**
 * Rotate a grid 90 degrees clockwise
 *
 * When to use:
 * - Pattern matching with rotations
 * - Grid transformation puzzles
 * - Need to check all orientations
 * - Mirror/symmetry problems
 *
 * When not to use:
 * - Large grids (memory intensive)
 * - Non-square grids
 * - Simple grid traversal
 *
 * @example
 * // Rotate a simple grid
 * const grid = [
 *   [1, 2],
 *   [3, 4]
 * ];
 * rotateGrid(grid)
 * // Returns: [
 * //   [3, 1],
 * //   [4, 2]
 * // ]
 *
 * // Check all rotations for pattern
 * let currentGrid = grid;
 * for (let i = 0; i < 4; i++) {
 *   if (checkPattern(currentGrid)) break;
 *   currentGrid = rotateGrid(currentGrid);
 * }
 *
 * // Find symmetrical patterns
 * const isSymmetrical = grid.toString() === rotateGrid(grid).toString();
 */
export function rotateGrid<T>(grid: T[][]): T[][] {
  const N = grid.length;
  const rotated = Array(N)
    .fill(0)
    .map(() => Array(N).fill(0));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      rotated[j][N - 1 - i] = grid[i][j];
    }
  }

  return rotated;
}

/**
 * Rotate a uniform grid 90 degrees clockwise
 *
 * When to use:
 * - Pattern matching with rotations
 * - Grid transformation puzzles
 * - Need to check all orientations
 * - Mirror/symmetry problems
 *
 * When not to use:
 * - Large grids (memory intensive)
 * - Simple grid traversal
 *
 * @example
 * // Rotate a simple grid
 * const grid = [
 *   [1, 2, 3],
 *   [4, 5, 6]
 * ];
 * rotateUniformGrid(grid)
 * // Returns: [
 * //   [4, 1],
 * //   [5, 2],
 * //   [6, 3]
 * // ]
 *
 * // Check all rotations for pattern
 * let currentGrid = grid;
 * for (let i = 0; i < 4; i++) {
 *   if (checkPattern(currentGrid)) break;
 *   currentGrid = rotateUniformGrid(currentGrid);
 * }
 *
 * // Find symmetrical patterns
 * const isSymmetrical = grid.toString() === rotateUniformGrid(grid).toString();
 */
export function rotateUniformGrid(grid: string[][]): string[][] {
  const rows = grid.length;
  const cols = grid[0].length;
  const rotated: string[][] = [];

  for (let col = 0; col < cols; col++) {
    const newRow: string[] = [];
    for (let row = rows - 1; row >= 0; row--) {
      newRow.push(grid[row][col]);
    }
    rotated.push(newRow);
  }

  return rotated;
}

/**
 * Flip a grid horizontally
 *
 * When to use:
 * - Pattern matching with flips
 * - Grid transformation puzzles
 * - Need to check mirrored orientations
 * - Symmetry problems
 *
 * When not to use:
 * - Large grids (memory intensive)
 * - Simple grid traversal
 *
 * @example
 * // Flip a simple grid
 * const grid = [
 *   [1, 2, 3],
 *   [4, 5, 6]
 * ];
 * flipGrid(grid)
 * // Returns: [
 * //   [3, 2, 1],
 * //   [6, 5, 4]
 * // ]
 *
 * // Check flipped patterns
 * const flipped = flipGrid(grid);
 * if (checkPattern(flipped)) { ... }
 *
 * // Find symmetrical patterns
 * const isSymmetrical = grid.toString() === flipGrid(grid).toString();
 */
export function flipGrid(grid: string[][]): string[][] {
  return grid.map((row) => [...row].reverse());
}

/**
 * Count occurrences of a value in a 2D array
 *
 * When to use:
 * - Need to count specific elements in grid
 * - Finding frequency of items in 2D array
 * - Grid pattern analysis
 *
 * @example
 * const grid = [['A','B','A'], ['A','C','B']]
 * countInGrid(grid, 'A') // Returns 3
 *
 * const numGrid = [[1,2,1], [1,3,2]]
 * countInGrid(numGrid, 1) // Returns 3
 */
export function countOccurrencesInGrid<T>(grid: T[][], value: T): number {
  return grid.reduce(
    (count, row) =>
      count +
      row.reduce((rowCount, cell) => rowCount + (cell === value ? 1 : 0), 0),
    0,
  );
}

/**
 * Finds the first occurrence of a value in a 2D grid
 * @param grid The 2D grid to search
 * @param value The value to search for
 * @returns The position of the first occurrence or null if not found
 */
export function findFirstOccurrencesIndexInGrid<T>(
  grid: T[][],
  value: T,
): { row: number; col: number } | null {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === value) {
        return { row, col };
      }
    }
  }
  return null;
}

/**
 * Finds all occurrences of a value in a 2D grid
 * @param grid The 2D grid to search
 * @param value The value to search for
 * @returns Array of positions where the value was found
 */
export function findAllOccurrencesIndexesInGrid<T>(
  grid: T[][],
  value: T,
): [number, number][] {
  const positions: [number, number][] = [];

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === value) {
        positions.push([row, col]);
      }
    }
  }

  return positions;
}

/**
 * Create a 2D array (grid) with optimizations for numeric types
 *
 * When to use:
 * - Creating grids/matrices
 * - Need memory efficient 2D arrays
 * - Working with numeric grids
 * - Dynamic programming tables
 *
 * When not to use:
 * - Need jagged arrays
 * - Dynamic sizing needed
 * - Need sparse matrix
 * - Complex objects as values
 *
 * @example
 * create2DArray(3, 3, 0)  // number[][]
 * create2DArray(2, 2, false)  // boolean[][]
 * create2DArray(2, 2, '.') // string[][]
 */
export function createGrid<T>(
  rows: number,
  cols: number,
  defaultValue: T,
): T[][] {
  // Special case for small unsigned integers
  if (
    typeof defaultValue === "number" &&
    Number.isInteger(defaultValue) &&
    defaultValue >= 0 &&
    defaultValue < 256
  ) {
    const buffer = new Array(rows);
    const uint8Array = new Uint8Array(cols);
    uint8Array.fill(defaultValue);

    for (let i = 0; i < rows; i++) {
      buffer[i] = new Uint8Array(cols);
      buffer[i].set(uint8Array);
    }

    return buffer as unknown as T[][];
  }

  // For all other types
  const grid: T[][] = new Array(rows);
  for (let i = 0; i < rows; i++) {
    grid[i] = new Array(cols).fill(defaultValue);
  }

  return grid;
}

/**
 * Get all unique rotations and flips of a grid
 *
 * When to use:
 * - Pattern matching with rotations and flips
 * - Grid transformation puzzles
 * - Need to check all orientations
 * - Mirror/symmetry problems
 *
 * When not to use:
 * - Large grids (memory intensive)
 * - Simple grid traversal
 *
 * @example
 * // Get all transformations of a simple grid
 * const grid = [
 *   [1, 2],
 *   [3, 4]
 * ];
 * getAllGridRotations(grid)
 * // Returns: [
 * //   [[1,2],[3,4]],  // original
 * //   [[3,1],[4,2]],  // 90 deg
 * //   [[4,3],[2,1]],  // 180 deg
 * //   [[2,4],[1,3]],  // 270 deg
 * //   [[2,1],[4,3]],  // flipped original
 * //   [[4,2],[3,1]],  // flipped 90 deg
 * //   [[3,4],[1,2]],  // flipped 180 deg
 * //   [[1,3],[2,4]]   // flipped 270 deg
 * // ]
 *
 * // Check all transformations for pattern
 * const transformations = getAllGridRotations(grid);
 * for (const transformedGrid of transformations) {
 *   if (checkPattern(transformedGrid)) {
 *     // Found a match
 *     break;
 *   }
 * }
 *
 * // Find symmetrical patterns
 * const transformations = getAllGridRotations(grid);
 * const isSymmetrical = transformations.some(
 *   (transformedGrid) => grid.toString() === transformedGrid.toString()
 * );
 */
export function getAllGridRotations(grid: string[][]): string[][][] {
  const transformations: string[][][] = [];
  const seen = new Set<string>();

  let current = grid;
  for (let flip = 0; flip < 2; flip++) {
    for (let rot = 0; rot < 4; rot++) {
      const key = current.map((row) => row.join("")).join("|");
      if (!seen.has(key)) {
        seen.add(key);
        transformations.push(current.map((row) => [...row]));
      }
      current = rotateUniformGrid(current);
    }
    current = flipGrid(current);
  }

  return transformations;
}

/**
 * Get all coordinates of a specific character in a grid
 * @param grid The 2D grid to search
 * @param character The character to search for
 * @returns Array of coordinates where the character was found
 *
 * When to use:
 * - Locating specific elements in a grid
 * - Analyzing grid patterns
 * - Preparing for grid-based algorithms
 *
 * When not to use:
 * - Large grids with few target characters (inefficient)
 * - Simple presence checks (use findFirstOccurrencesIndexInGrid instead)
 *
 * @example
 * const grid = [
 *   ['A', 'B', 'A'],
 *   ['C', 'A', 'D']
 * ];
 * getAllCoordsOfCharacter(grid, 'A')
 * // Returns: [[0,0], [0,2], [1,1]]
 */
export function getAllCoordsOfCharacter(
  grid: string[][],
  character: string,
): [number, number][] {
  const coords: [number, number][] = [];
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === character) {
        coords.push([r, c]);
      }
    }
  }
  return coords;
}

/**
 * Adjacent coordinates (up, right, down, left) that are inside the grid.
 *
 * @example
 * getAdjacentInBounds(0, 0, [[1, 2], [3, 4]]) // Returns [[1, 0], [0, 1]]
 */
export function getAdjacentInBounds(
  row: number,
  col: number,
  grid: unknown[][],
): [number, number][] {
  return getAdjacent(row, col).filter(([r, c]) => isInBounds(r, c, grid));
}

/**
 * Adjacent coordinates including diagonals that are inside the grid.
 *
 * @example
 * getAdjacentWithDiagonalsInBounds(0, 0, [[1, 2], [3, 4]])
 */
export function getAdjacentWithDiagonalsInBounds(
  row: number,
  col: number,
  grid: unknown[][],
): [number, number][] {
  return getAdjacentWithDiagonals(row, col).filter(([r, c]) =>
    isInBounds(r, c, grid),
  );
}
