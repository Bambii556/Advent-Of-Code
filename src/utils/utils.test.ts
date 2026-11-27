import { describe, expect, test } from "bun:test";
import {
  crt,
  Graph,
  gcdArray,
  gcdLarge,
  getAdjacentInBounds,
  getAdjacentWithDiagonalsInBounds,
  getDivisors,
  getPrimeFactors,
  integerSqrt,
  isPerfectSquare,
  mergeRanges,
  modInverse,
  modPow,
  polygonBoundaryPoints,
  polygonInteriorPoints,
  setEquals,
  shoelaceArea,
  symmetricDifference,
  transpose,
} from "./index.ts";

describe("number helpers", () => {
  test("gcdArray", () => {
    expect(gcdArray([12, 18, 24])).toBe(6);
    expect(gcdArray([])).toBe(0);
    expect(gcdLarge(0, 0)).toBe(0);
  });

  test("getDivisors", () => {
    expect(getDivisors(12)).toEqual([1, 2, 3, 4, 6, 12]);
    expect(getDivisors(1)).toEqual([1]);
    expect(getDivisors(0)).toEqual([]);
  });

  test("integerSqrt / isPerfectSquare", () => {
    expect(integerSqrt(99)).toBe(9);
    expect(integerSqrt(0)).toBe(0);
    expect(isPerfectSquare(144)).toBe(true);
    expect(isPerfectSquare(145)).toBe(false);
    expect(isPerfectSquare(-1)).toBe(false);
  });

  test("modPow / modInverse / crt", () => {
    expect(modPow(2, 10, 1000)).toBe(24);
    expect(modInverse(3n, 11n)).toBe(4n);
    expect(modInverse(2n, 4n)).toBeNull();
    expect(crt([2, 3, 2], [3, 5, 7])).toBe(23n);
    expect(crt([0, 0], [2, 3])).toBe(0n);
    expect(crt([0, 0], [2, 4])).toBeNull();
  });

  test("getPrimeFactors handles zero", () => {
    expect(getPrimeFactors(0)).toEqual([]);
    expect(getPrimeFactors(1)).toEqual([]);
    expect(getPrimeFactors(60)).toEqual([2, 2, 3, 5]);
  });
});

describe("grid and polygon helpers", () => {
  const grid = [
    [1, 2],
    [3, 4],
  ];

  test("adjacent coords stay in bounds", () => {
    expect(getAdjacentInBounds(0, 0, grid)).toEqual([
      [1, 0],
      [0, 1],
    ]);
    expect(getAdjacentWithDiagonalsInBounds(0, 0, grid)).toEqual([
      [1, 0],
      [0, 1],
      [1, 1],
    ]);
  });

  test("shoelace area and Pick's theorem", () => {
    const square: [number, number][] = [
      [0, 0],
      [4, 0],
      [4, 3],
      [0, 3],
    ];
    const area = shoelaceArea(square);
    const boundary = polygonBoundaryPoints(square);
    expect(area).toBe(12);
    expect(boundary).toBe(14);
    expect(polygonInteriorPoints(area, boundary)).toBe(6);
  });
});

describe("collection helpers", () => {
  test("mergeRanges does not mutate input", () => {
    const input: [number, number][] = [
      [1, 3],
      [2, 6],
      [8, 10],
    ];
    expect(mergeRanges(input)).toEqual([
      [1, 6],
      [8, 10],
    ]);
    expect(input).toEqual([
      [1, 3],
      [2, 6],
      [8, 10],
    ]);
  });

  test("transpose handles an empty matrix", () => {
    expect(transpose([])).toEqual([]);
  });

  test("set helpers", () => {
    expect([...symmetricDifference(new Set([1, 2]), new Set([2, 3]))]).toEqual([
      1, 3,
    ]);
    expect(setEquals(new Set([1, 2]), new Set([2, 1]))).toBe(true);
    expect(setEquals(new Set([1]), new Set([1, 2]))).toBe(false);
  });
});

describe("Graph.findShortestPath", () => {
  const neighbors: Record<string, string[]> = {
    a: ["b"],
    b: ["a", "c"],
    c: ["b"],
  };
  const getNeighbors = (node: string) => neighbors[node];

  test("start distance of 0 is not treated as missing", () => {
    const graph = new Graph<string>();
    expect(graph.findShortestPath("a", (n) => n === "c", getNeighbors)).toEqual(
      { path: ["a", "b", "c"], cost: 2 },
    );
    expect(graph.findShortestPath("a", (n) => n === "a", getNeighbors)).toEqual(
      { path: ["a"], cost: 0 },
    );
  });
});
