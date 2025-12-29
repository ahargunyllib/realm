import type { Solution } from "./types";

export const solutions: Solution[] = [];

// Get the most recent solutions
export const getRecentSolutions = (limit = 3): Solution[] =>
  solutions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);

// Get the most recent solution
export const getLatestSolution = (): Solution | null => {
  if (solutions.length === 0) {
    return null;
  }

  return (
    solutions.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0] ?? null
  );
};
