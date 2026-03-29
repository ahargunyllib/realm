import type { CompetitiveProblem } from "./types";

// Recent competitive programming problems solved
export const recentProblems: CompetitiveProblem[] = [];

// Get the most recent problem
export const getLatestProblem = (): CompetitiveProblem | null => {
  if (recentProblems.length === 0) {
    return null;
  }

  return (
    recentProblems.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )[0] ?? null
  );
};
