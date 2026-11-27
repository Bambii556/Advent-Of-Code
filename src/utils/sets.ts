/**
 * Returns a new Set containing elements present in both input Sets.
 *
 * @example
 * const set1 = new Set([1, 2, 3]);
 * const set2 = new Set([2, 3, 4]);
 * setIntersection(set1, set2) // Returns Set(2, 3)
 *
 * Common use cases:
 * - Finding common items between groups
 * - Finding shared characteristics
 * - Identifying overlapping elements
 */
export function setIntersection<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  return new Set([...setA].filter((x) => setB.has(x)));
}

/**
 * Returns a new Set containing all unique elements from both input Sets.
 *
 * @example
 * const set1 = new Set([1, 2]);
 * const set2 = new Set([2, 3]);
 * setUnion(set1, set2) // Returns Set(1, 2, 3)
 *
 * Common use cases:
 * - Combining collections
 * - Finding all possible options
 * - Merging groups
 */
export function setUnion<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  return new Set([...setA, ...setB]);
}

/**
 * Returns a new Set containing elements in setA that aren't in setB.
 *
 * @example
 * const set1 = new Set([1, 2, 3]);
 * const set2 = new Set([2, 3, 4]);
 * setDifference(set1, set2) // Returns Set(1)
 *
 * Common use cases:
 * - Finding unique elements
 * - Removing common elements
 * - Identifying distinct items
 */
export function setDifference<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  return new Set([...setA].filter((x) => !setB.has(x)));
}

/**
 * Returns elements present in exactly one of the two Sets.
 *
 * @example
 * symmetricDifference(new Set([1, 2]), new Set([2, 3])) // Returns Set(1, 3)
 */
export function symmetricDifference<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  const result = new Set<T>();
  for (const item of setA) if (!setB.has(item)) result.add(item);
  for (const item of setB) if (!setA.has(item)) result.add(item);
  return result;
}

/**
 * Check whether two Sets contain exactly the same elements.
 *
 * @example
 * setEquals(new Set([1, 2]), new Set([2, 1])) // Returns true
 */
export function setEquals<T>(setA: Set<T>, setB: Set<T>): boolean {
  if (setA.size !== setB.size) return false;
  for (const item of setA) if (!setB.has(item)) return false;
  return true;
}
