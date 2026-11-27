// src/utils/index.ts

import FastQ from "./classes/fastQ.ts";
import Graph from "./classes/Graph.ts";

// Export commonly used types
export type Point = [number, number];
export type Grid<T> = T[][];
export type NumberGrid = Grid<number>;
export type StringGrid = Grid<string>;

export * from "./algos.ts";
export * from "./array.ts";
export * from "./conversions.ts";
export * from "./grid.ts";
// Re-export everything from each module
export * from "./input.ts";
export * from "./logger.ts";
export * from "./numbers.ts";
export * from "./pathfinding.ts";
export * from "./ranges.ts";
export * from "./sets.ts";
export * from "./utils.ts";

export { FastQ, Graph };
