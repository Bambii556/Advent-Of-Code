import { getInputLines } from "../../utils/index.ts";
import { Solution } from "../../types.ts";

export const day11: Solution = {
  part1: async (input: string) => {
    const devices = parseDevices(input);
    return countPaths(devices, "you", "out");
  },

  part2: async (input: string) => {
    const devices = parseDevices(input);
    return countPathsWithRequired(devices, "svr", "out", ["dac", "fft"]);
  },
};

function parseDevices(input: string): Map<string, string[]> {
  const lines = getInputLines(input);
  const devices = new Map<string, string[]>();

  for (const line of lines) {
    const [name, destinations] = line.split(": ");
    const outputs = destinations.split(" ");
    devices.set(name, outputs);
  }

  return devices;
}

function countPaths(
  devices: Map<string, string[]>,
  start: string,
  end: string,
  visited: Set<string> = new Set(),
): number {
  if (start === end) {
    return 1;
  }

  visited.add(start);
  let pathCount = 0;
  const neighbors = devices.get(start) || [];

  for (const neighbor of neighbors) {
    if (!visited.has(neighbor)) {
      pathCount += countPaths(devices, neighbor, end, visited);
    }
  }

  visited.delete(start);
  return pathCount;
}

function countPathsWithRequired(
  devices: Map<string, string[]>,
  start: string,
  end: string,
  required: string[],
  visited: Set<string> = new Set(),
  foundRequired: Set<string> = new Set(),
  memo: Map<string, number> = new Map(),
): number {
  const foundArray = Array.from(foundRequired).sort();
  const cacheKey = `${start}|${foundArray.join(",")}`;

  if (memo.has(cacheKey)) {
    return memo.get(cacheKey)!;
  }

  visited.add(start);

  if (required.includes(start)) {
    foundRequired.add(start);
  }

  if (start === end) {
    const isValid = required.every((node) => foundRequired.has(node));

    // Clean up
    visited.delete(start);
    if (required.includes(start)) {
      foundRequired.delete(start);
    }

    return isValid ? 1 : 0;
  }

  let pathCount = 0;
  const neighbors = devices.get(start) || [];

  for (const neighbor of neighbors) {
    if (!visited.has(neighbor)) {
      pathCount += countPathsWithRequired(
        devices,
        neighbor,
        end,
        required,
        visited,
        foundRequired,
        memo,
      );
    }
  }

  // Backtrack
  visited.delete(start);
  if (required.includes(start)) {
    foundRequired.delete(start);
  }

  memo.set(cacheKey, pathCount);
  return pathCount;
}
