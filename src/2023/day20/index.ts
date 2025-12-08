import { Solution } from "../../types.ts";
import { getInputLines } from "../../utils/input.ts";

type Pulse = "HIGH" | "LOW";
type Switch = "ON" | "OFF";
type ModuleType = "Conjunction" | "Flip-Flop" | "Broadcaster";

interface Action {
  pulse: Pulse;
  module: string;
}

class Module {
  key: string;
  type: ModuleType;
  connections: Set<Module>;
  outputs: string[];
  state: Pulse = "LOW";
  switch: Switch = "OFF";

  // &qt -> sm, rh, nd, jx, nt, pl
  // %bh -> nl, fr
  constructor(line: string) {
    const typeChar = line.charAt(0);
    this.type = typeChar === "%"
      ? "Flip-Flop"
      : typeChar === "&"
      ? "Conjunction"
      : "Broadcaster";

    const [name, connections] = line.split("->");
    this.key = this.type !== "Broadcaster"
      ? name.substring(1).trim()
      : name.trim();
    this.outputs = connections
      ? connections.split(",").map((s) => s.trim())
      : [];

    this.connections = new Set<Module>();
  }

  addConnection(module: Module) {
    this.connections.add(module);
  }

  trigger(pulse: Pulse): Action[] {
    switch (this.type) {
      case "Conjunction": {
        const allHigh = Array.from(this.connections).every((mod) =>
          mod.state === "HIGH"
        );
        this.state = allHigh ? "LOW" : "HIGH";
        break;
      }

      case "Flip-Flop":
        if (pulse === "HIGH") {
          return [];
        }

        if (this.switch === "OFF") {
          this.switch = "ON";
          this.state = "HIGH";
        } else {
          this.switch = "OFF";
          this.state = "LOW";
        }
        break;
    }

    return this.outputs.map((mod) => ({ pulse: this.state, module: mod }));
  }

  reset() {
    this.state = "LOW";
    this.switch = "OFF";
  }
}

export const day20: Solution = {
  part1: async (input: string) => {
    const lines = getInputLines(input);

    const { modules, broadcaster } = buildModuleList(lines);

    let low = 0;
    let high = 0;

    for (let i = 0; i < 1000; i++) {
      // Process Pulses
      const queue: Array<Action> = [];
      queue.push(...broadcaster.trigger("LOW"));
      low++;

      do {
        const action = queue.shift();
        if (!action) break;
        if (action.pulse === "HIGH") {
          high++;
        } else {
          low++;
        }
        const targetModule = modules.get(action.module);
        if (targetModule) {
          const newActions = targetModule.trigger(action.pulse);
          queue.push(...newActions);
        }
      } while (queue.length > 0);
    }
    console.log(`Low: ${low}, High: ${high}`);
    return low * high;
  },

  part2: async (input: string) => {
    const lines = getInputLines(input);

    const { modules, broadcaster } = buildModuleList(lines);

    const rxFeeder: Module = modules.values().find((mod) =>
      mod.outputs.includes("rx")
    )!;

    const cycleLengths = new Map<string, number>();
    const inputModules = Array.from(rxFeeder.connections);

    let count = 0;
    while (cycleLengths.size < inputModules.length) {
      count++;

      const queue: Array<Action> = [];
      queue.push(...broadcaster.trigger("LOW"));

      while (queue.length > 0) {
        const action = queue.shift();
        if (!action) break;

        if (action.pulse === "HIGH" && action.module === rxFeeder.key) {
          // Find which input module sent this
          for (const inputMod of inputModules) {
            if (inputMod.state === "HIGH" && !cycleLengths.has(inputMod.key)) {
              cycleLengths.set(inputMod.key, count);
            }
          }
        }

        const targetModule = modules.get(action.module);
        if (targetModule) {
          const newActions = targetModule.trigger(action.pulse);
          queue.push(...newActions);
        }
      }
    }

    return lcm(Array.from(cycleLengths.values()));
  },
};

function lcm(numbers: number[]): number {
  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
  const lcm2 = (a: number, b: number): number => (a * b) / gcd(a, b);
  return numbers.reduce(lcm2);
}

function buildModuleList(lines: string[]) {
  // Build list of Modules
  const modules = new Map<string, Module>();
  for (const line of lines) {
    const module = new Module(line);
    modules.set(module.key, module);
  }

  // Link Modules to Conjunctions
  for (const mod of modules.values()) {
    if (mod.type === "Broadcaster") continue;

    for (const outputKey of mod.outputs) {
      const outputModule = modules.get(outputKey);
      if (outputModule && outputModule.type === "Conjunction") {
        outputModule.addConnection(mod);
      }
    }
  }

  const broadcaster = modules.get("broadcaster")!;

  return { modules, broadcaster };
}
