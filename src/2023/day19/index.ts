import { Solution } from "../../types.ts";
import { parseInputs, Part, Workflow } from "./inputParser.ts";

interface Range {
  min: number;
  max: number;
}

interface PartRange {
  x: Range;
  m: Range;
  a: Range;
  s: Range;
}

export const day19: Solution = {
  part1: async (input: string) => {
    const { parts, workflows } = parseInputs(input);

    let sum = 0;

    for (const part of parts) {
      let destination = "in";
      do {
        const workflow = workflows.get(destination);
        if (!workflow) {
          throw new Error(`Workflow ${destination} not found`);
        }

        let matchedRule = false;
        for (const rule of workflow.rules) {
          if (rule.condition) {
            const variables = {
              x: part.x,
              m: part.m,
              a: part.a,
              s: part.s,
            };
            if (parseComparison(rule.condition, variables)) {
              destination = rule.destination;
              matchedRule = true;
              break;
            }
          } else {
            // Default rule
            destination = rule.destination;
            matchedRule = true;
            break;
          }
        }

        if (!matchedRule) {
          throw new Error(
            `No matching rule found in workflow ${workflow.name}`,
          );
        }
      } while (destination !== "A" && destination !== "R");

      if (destination === "A") {
        sum += calcPartSum(part);
      }
    }

    return sum;
  },

  part2: async (input: string) => {
    const { workflows } = parseInputs(input);
    const initialRange: PartRange = {
      x: { min: 1, max: 4000 },
      m: { min: 1, max: 4000 },
      a: { min: 1, max: 4000 },
      s: { min: 1, max: 4000 },
    };

    return processRange(initialRange, "in", workflows);
  },
};

function calcPartSum(part: Part) {
  return part.x + part.m + part.a + part.s;
}

function parseComparison(
  expression: string,
  variables: Record<string, number>,
): boolean {
  // Match pattern: variable operator value
  const match = expression.match(/^(\w+)([<>]=?|==|!=)(\d+)$/);

  if (!match) {
    throw new Error(`Invalid expression: ${expression}`);
  }

  const [, variable, operator, valueStr] = match;
  const value = parseInt(valueStr, 10);
  const varValue = variables[variable];

  if (varValue === undefined) {
    throw new Error(`Variable ${variable} not found`);
  }

  switch (operator) {
    case "<":
      return varValue < value;
    case ">":
      return varValue > value;
    case "<=":
      return varValue <= value;
    case ">=":
      return varValue >= value;
    case "==":
      return varValue === value;
    case "!=":
      return varValue !== value;
    default:
      throw new Error(`Unknown operator: ${operator}`);
  }
}

function processRange(
  range: PartRange,
  workflowName: string,
  workflows: Map<string, Workflow>,
): number {
  // Base cases
  if (workflowName === "A") {
    return countCombinations(range);
  }
  if (workflowName === "R") {
    return 0;
  }

  const workflow = workflows.get(workflowName);
  if (!workflow) {
    throw new Error(`Workflow not found: ${workflowName}`);
  }

  let total = 0;
  let currentRange: PartRange | null = range;

  for (const rule of workflow.rules) {
    if (!currentRange) break;

    if (!rule.condition) {
      total += processRange(currentRange, rule.destination, workflows);
      currentRange = null;
    } else {
      const { passing, failing } = splitRange(currentRange, rule.condition);

      if (passing) {
        total += processRange(passing, rule.destination, workflows);
      }

      currentRange = failing;
    }
  }

  return total;
}

function splitRange(
  range: PartRange,
  condition: string,
): { passing: PartRange | null; failing: PartRange | null } {
  const match = condition.match(/^(\w+)([<>])(\d+)$/);

  if (!match) {
    throw new Error(`Invalid condition: ${condition}`);
  }

  const [, variable, operator, valueStr] = match;
  const value = parseInt(valueStr, 10);
  const key = variable as keyof PartRange;

  const passing = { ...range, [key]: { ...range[key] } };
  const failing = { ...range, [key]: { ...range[key] } };

  if (operator === "<") {
    passing[key] = {
      min: range[key].min,
      max: Math.min(range[key].max, value - 1),
    };
    failing[key] = {
      min: Math.max(range[key].min, value),
      max: range[key].max,
    };
  } else if (operator === ">") {
    passing[key] = {
      min: Math.max(range[key].min, value + 1),
      max: range[key].max,
    };
    failing[key] = {
      min: range[key].min,
      max: Math.min(range[key].max, value),
    };
  }

  return {
    passing: isValidRange(passing) ? passing : null,
    failing: isValidRange(failing) ? failing : null,
  };
}

function countCombinations(range: PartRange): number {
  return (
    (range.x.max - range.x.min + 1) *
    (range.m.max - range.m.min + 1) *
    (range.a.max - range.a.min + 1) *
    (range.s.max - range.s.min + 1)
  );
}

function isValidRange(range: PartRange): boolean {
  return (
    range.x.min <= range.x.max &&
    range.m.min <= range.m.max &&
    range.a.min <= range.a.max &&
    range.s.min <= range.s.max
  );
}
