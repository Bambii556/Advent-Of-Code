import type { Solution } from "../../types.ts";
import { getInputLines } from "../../utils/index.ts";

export const day23: Solution = {
  part1: async (input: string) => {
    const lines = getInputLines(input);
    const sum = 0;

    return sum;
  },

  part2: async (input: string) => {
    const lines = getInputLines(input);
    const sum = 0;

    return sum;
  },
};

type TileType = "#" | "S" | "O" | "." | ">" | "<" | "^" | "v";

class Tile {
  nextTiles: Tile[] = [];

  //refs
  up: Tile | null = null;
  down: Tile | null = null;
  left: Tile | null = null;
  right: Tile | null = null;

  constructor(
    public type: TileType,
    public x: number,
    public y: number,
  ) {}

  navigate() {}
}

export class Grid {
  private nodes: Map<string, Tile> = new Map();
  width: number;
  height: number;
  private startTile: Tile | null = null;

  constructor(map: string[][]) {
    this.height = map.length;
    this.width = map[0]?.length || 0;
    this.buildMap(map);
  }

  private buildMap(grid: string[][]): void {
    // First pass: create all nodes
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        const char = grid[y][x] as TileType;
        const tile = new Tile(char, x, y);
        if (tile.type === "S") {
          this.startTile = tile;
        }
        this.nodes.set(this.getKey(x, y), tile);
      }
    }

    // Second pass: link nodes together
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        const current = this.getTile(x, y)!;

        // Link to neighbors
        current.up = this.getTile(x, y - 1);
        current.down = this.getTile(x, y + 1);
        current.left = this.getTile(x - 1, y);
        current.right = this.getTile(x + 1, y);
      }
    }
  }

  private getKey(x: number, y: number): string {
    return `${x},${y}`;
  }

  getTile(x: number, y: number): Tile | null {
    if (x >= this.width || y >= this.height || x < 0 || y < 0) {
      return null;
    }
    return this.nodes.get(this.getKey(x, y)) || null;
  }

  getStart(): Tile {
    return this.startTile!;
  }
}
