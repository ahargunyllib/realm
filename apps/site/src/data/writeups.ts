import type { Writeup } from "./types";

export const writeups: Writeup[] = [];

// Get the most recent writeup
export const getLatestWriteup = (): Writeup | null => {
  if (writeups.length === 0) {
    return null;
  }

  return (
    writeups.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0] ?? null
  );
};
