import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const blog = defineCollection({
  loader: glob({
    base: "./src/content/blog",
    pattern: "**/*.{md,mdx}",
  }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    excerpt: z.string(),
    tags: z.array(z.string()),
  }),
});

const solution = defineCollection({
  loader: glob({
    base: "./src/content/solution",
    pattern: "**/*.{md,mdx}",
  }),
  schema: z.object({
    title: z.string(),
    platform: z.enum(["codeforces", "leetcode", "atcoder", "tlx", "other"]),
    problemUrl: z.string(),
    difficulty: z.enum(["easy", "medium", "hard"]),
    tags: z.array(z.string()),
    date: z.string(),
  }),
});

const writeup = defineCollection({
  loader: glob({
    base: "./src/content/writeup",
    pattern: "**/*.{md,mdx}",
  }),
  schema: z.object({
    title: z.string(),
    competition: z.string(),
    category: z.array(z.string()),
    tags: z.array(z.string()),
    date: z.string(),
    difficulty: z.enum(["easy", "medium", "hard"]).optional(),
  }),
});

export const collections = {
  blog,
  solution,
  writeup,
};
