import type { BlogPost } from "./types";

export const blogPosts: BlogPost[] = [];

// Get the most recent blog posts
export const getRecentPosts = (limit = 3): BlogPost[] =>
  blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
