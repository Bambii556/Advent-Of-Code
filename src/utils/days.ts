import { readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import type { Solution } from "../types.ts";

const SRC_ROOT = fileURLToPath(new URL("..", import.meta.url));

export interface DayMeta {
  year: number;
  day: number;
}

export function discoverDays(): DayMeta[] {
  const days: DayMeta[] = [];

  for (const yearEntry of readdirSync(SRC_ROOT, { withFileTypes: true })) {
    if (!yearEntry.isDirectory() || !/^\d{4}$/.test(yearEntry.name)) continue;
    const year = Number(yearEntry.name);

    for (const dayEntry of readdirSync(join(SRC_ROOT, yearEntry.name), {
      withFileTypes: true,
    })) {
      const match = /^day(\d+)$/.exec(dayEntry.name);
      if (!dayEntry.isDirectory() || !match) continue;
      days.push({ year, day: Number(match[1]) });
    }
  }

  return days.sort((a, b) => a.year - b.year || a.day - b.day);
}

export async function loadDay(
  year: number,
  day: number,
): Promise<Solution | undefined> {
  try {
    const module = await import(`../${year}/day${day}/index.ts`);
    return module.default ?? module[`day${day}`];
  } catch {
    return undefined;
  }
}
