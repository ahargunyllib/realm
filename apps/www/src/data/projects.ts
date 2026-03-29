import type { Project } from "./types";

export const projects: Project[] = [
  {
    name: "realm",
    description:
      "A monorepo for my personal apps consisting portfolio, tools, bot, etc",
    techStack: ["TypeScript", "Monorepo", "Astro", "Tailwind CSS"],
    githubUrl: "https://github.com/ahargunyllib/realm",
    liveUrl: "https://ahargunyllib.dev",
  },
  {
    name: "Info Kode Enroll Bg",
    description:
      "A modern web application that extracts enrollment codes from class schedule screenshots using OCR technology for FILKOM UB students.",
    techStack: ["TypeScript", "Next.js", "Tailwind CSS", "Tesseract.js"],
    githubUrl: "https://github.com/ahargunyllib/info-kode-enroll-bg",
    liveUrl: "https://info-kode-enroll-bg.ahargunyllib.dev/",
  },
  {
    name: "MarkView",
    description:
      "A lightweight web application that generates readable documentation from GitHub repository Markdown files with interactive Table of Contents, regex filtering, and syntax highlighting.",
    techStack: ["TypeScript", "Bun", "React", "Tailwind CSS"],
    githubUrl: "https://github.com/ahargunyllib/mark-view",
  },
  {
    name: "Qulo",
    description:
      "Qulo is a POS and table management application for billiard places that focuses on simplicity, speed, and ease of use.",
    techStack: ["TypeScript", "Bun", "React", "Tailwind CSS", "Effect-TS"],
    githubUrl: "https://github.com/ahargunyllib/qulo",
  },
  {
    name: "VGym",
    description:
      "An immersive 3D web application that provides an interactive virtual gym experience.",
    techStack: ["TypeScript", "Three.js", "Tailwind CSS"],
    liveUrl: "https://vgym.ahargunyllib.dev",
    githubUrl: "https://github.com/ahargunyllib/vgym",
  },
  {
    name: "Growth",
    description:
      "Growth is a waste management application that helps users contribute to creating a cleaner and more sustainable environment.",
    techStack: ["Kotlin", "Jetpack Compose", "Firebase"],
    githubUrl: "https://github.com/ahargunyllib/growth",
  },
  {
    name: "SEA Catering",
    description:
      "SEA Catering is a modern web application for managing catering services, built with a focus on type safety and developer experience",
    techStack: [
      "TypeScript",
      "TanStack Router",
      "TailwindCSS",
      "Hono",
      "tRPC",
      "Bun",
      "Drizzle",
      "PostgreSQL",
      "Better Auth",
      "Biome",
      "Husky",
      "Turborepo",
    ],
    githubUrl: "https://github.com/ahargunyllib/sea-catering",
  },
  {
    name: "Profolio",
    description:
      "Profolio is a web-based CV builder that helps users create professional, ATS-friendly resumes using structured templates and guided inputs.",
    techStack: ["TypeScript", "Next.js", "Tailwind CSS", "AI SDK"],
    githubUrl: "https://github.com/ahargunyllib/profolio",
  },
];
