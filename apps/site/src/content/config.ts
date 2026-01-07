import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    excerpt: z.string(),
    tags: z.array(z.string()),
  }),
});

const solution = defineCollection({
  type: "content",
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
  type: "content",
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
