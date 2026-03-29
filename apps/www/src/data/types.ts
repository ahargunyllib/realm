// Core Profile
export type Profile = {
  name: string;
  role: string;
  bio: string;
  metaDescription: string;
  location: string;
  email: string;
};

// Experience
export type ExperienceType =
  | "full-time"
  | "internship"
  | "contract"
  | "volunteer";

export type Experience = {
  role: string;
  organization: string;
  type: ExperienceType;
  startDate: string;
  endDate: string | null; // null means "Present"
  description: string;
  technologies: string[];
  highlights?: string[];
};

// Projects
export type Project = {
  name: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
};

// Teams
export type Team = {
  name: string;
  description?: string;
  url?: string;
};

// Social Links
export type SocialCategory = "development" | "security" | "competitive";

export type SocialLink = {
  platform: string;
  url: string;
  category: SocialCategory;
};

// Uses (Tools & Setup)
export type UsesCategory = "software" | "hardware" | "os";

export type UseItem = {
  name: string;
  description: string;
  category: UsesCategory;
  url?: string;
};

// Writeups (Future)
export type WriteupCategory = "ctf" | "cp" | "security" | "reverse" | "crypto";

export type Writeup = {
  title: string;
  slug: string;
  competition: string;
  category: WriteupCategory;
  tags: string[];
  date: string;
  content: string;
  difficulty?: "easy" | "medium" | "hard";
};

// Blog (Future)
export type BlogPost = {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
};

// Solutions (Competitive Programming)
export type SolutionPlatform =
  | "codeforces"
  | "leetcode"
  | "atcoder"
  | "tlx"
  | "other";

export type Solution = {
  title: string;
  slug: string;
  platform: SolutionPlatform;
  problemUrl: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  date: string;
  content: string;
};

// Shorts (Future)
export type Short = {
  id: string;
  content: string;
  date: string;
};

// Changelog (Future)
export type ChangelogEntry = {
  version: string;
  date: string;
  changes: string[];
};

// Activity Feed (Future - API)
export type SpotifyTrack = {
  name: string;
  artist: string;
  url: string;
  timestamp: string;
};

export type CompetitiveProblem = {
  platform: "leetcode" | "codeforces" | "tlx";
  problemName: string;
  url: string;
  timestamp: string;
};

export type GitHubActivity = {
  type: "commit" | "pr" | "issue" | "release";
  repo: string;
  message: string;
  url: string;
  timestamp: string;
};

// Guestbook (Future - API)
export type GuestbookEntry = {
  id: string;
  name: string;
  message: string;
  timestamp: string;
  githubUsername?: string;
};

// Statistics
export type Statistics = {
  views: number;
  likes: number;
};
