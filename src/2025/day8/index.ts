import type { Solution } from "../../types.ts";
import { getInputLines } from "../../utils/index.ts";

interface Box {
  key: string;
  x: number;
  y: number;
  z: number;
}

interface Pair {
  box1: Box;
  box2: Box;
  distance: number;
}

class UnionFind {
  parent: Map<string, string>;
  size: Map<string, number>;

  constructor(boxes: Box[]) {
    this.parent = new Map();
    this.size = new Map();
    for (const box of boxes) {
      this.parent.set(box.key, box.key);
      this.size.set(box.key, 1);
    }
  }

  find(key: string): string {
    if (this.parent.get(key) !== key) {
      this.parent.set(key, this.find(this.parent.get(key)!));
    }
    return this.parent.get(key)!;
  }

  union(key1: string, key2: string): boolean {
    const root1 = this.find(key1);
    const root2 = this.find(key2);

    if (root1 === root2) return false;

    // size Matching
    const size1 = this.size.get(root1)!;
    const size2 = this.size.get(root2)!;

    if (size1 < size2) {
      this.parent.set(root1, root2);
      this.size.set(root2, size1 + size2);
    } else {
      this.parent.set(root2, root1);
      this.size.set(root1, size1 + size2);
    }

    return true;
  }

  getCircuitSizes(): number[] {
    const sizes = new Map<string, number>();
    for (const [key] of this.parent) {
      const root = this.find(key);
      sizes.set(root, this.size.get(root)!);
    }
    return Array.from(sizes.values()).sort((a, b) => b - a);
  }
}

function generateAllPairs(boxes: Box[]): Pair[] {
  const pairs: Pair[] = [];
  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      const distance = distance3D(boxes[i], boxes[j]);
      pairs.push({ box1: boxes[i], box2: boxes[j], distance });
    }
  }
  return pairs.sort((a, b) => a.distance - b.distance);
}

export const day8: Solution = {
  part1: async (input: string) => {
    const boxes = parseInput(input);
    const pairs = generateAllPairs(boxes);
    const uf = new UnionFind(boxes);

    const maxConnections = boxes.length <= 20 ? 10 : 1000;

    let pairsProcessed = 0;
    let successfulConnections = 0;

    for (const pair of pairs) {
      if (pairsProcessed >= maxConnections) break;
      pairsProcessed++;
      if (uf.union(pair.box1.key, pair.box2.key)) {
        successfulConnections++;
      }
    }

    const circuitSizes = uf.getCircuitSizes();
    const total = circuitSizes[0] * circuitSizes[1] * circuitSizes[2];
    console.log("Total boxes:", boxes.length);
    console.log("Pairs processed:", pairsProcessed);
    console.log("Successful connections:", successfulConnections);
    console.log("Circuit count:", circuitSizes.length);
    console.log("Circuit sizes (sorted desc):", circuitSizes);
    console.log(
      `Top 3:${circuitSizes[0]} × ${circuitSizes[1]} × ${
        circuitSizes[2]
      } = ${total}`,
    );
    return total;
  },

  part2: async (input: string) => {
    const boxes = parseInput(input);
    const pairs = generateAllPairs(boxes);
    const uf = new UnionFind(boxes);

    let lastConnectedPair: Pair | null = null;

    for (const pair of pairs) {
      if (uf.union(pair.box1.key, pair.box2.key)) {
        lastConnectedPair = pair;

        const circuitSizes = uf.getCircuitSizes();
        if (circuitSizes.length === 1) {
          break;
        }
      }
    }

    if (!lastConnectedPair) {
      throw new Error("No connections were made");
    }

    return lastConnectedPair.box1.x * lastConnectedPair.box2.x;
  },
};

function parseInput(input: string): Box[] {
  return getInputLines(input).map((line) => {
    const [x, y, z] = line.split(",").map(Number);
    return { key: `${x},${y},${z}`, x, y, z } as Box;
  });
}

function distance3D(p1: Box, p2: Box): number {
  const { x: x1, y: y1, z: z1 } = p1;
  const { x: x2, y: y2, z: z2 } = p2;
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
}
