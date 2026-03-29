import type { UseItem } from "./types";

export const uses: UseItem[] = [
  // Hardware
  {
    name: "MacBook Air M4",
    description: "16GB unified memory for development and security research",
    category: "hardware",
  },
  {
    name: "Asus Vivobook 14",
    description:
      "Dual-boot laptop for Windows development and NixOS experimentation",
    category: "hardware",
  },

  // Operating System
  {
    name: "macOS Sequoia",
    description:
      "Primary operating system with nix-darwin for declarative configuration",
    category: "os",
  },
  {
    name: "Windows 11",
    description: "Secondary OS for Windows-specific development and testing",
    category: "os",
  },
  {
    name: "NixOS",
    description:
      "Declarative Linux distribution for reproducible system configuration",
    category: "os",
    url: "https://nixos.org",
  },

  // Software
  {
    name: "LazyVim",
    description:
      "Neovim distribution for lightweight editing and rapid workflows",
    category: "software",
    url: "https://www.lazyvim.org",
  },
  {
    name: "VS Code",
    description:
      "Primary IDE for heavy refactoring, debugging, and complex codebases",
    category: "software",
    url: "https://code.visualstudio.com",
  },
  {
    name: "Ghostty",
    description: "GPU-accelerated terminal emulator written in Zig",
    category: "software",
    url: "https://ghostty.org",
  },
  {
    name: "Zsh",
    description: "Unix shell for command-line interaction and scripting",
    category: "software",
  },
  {
    name: "nix-darwin",
    description:
      "Declarative macOS package management and system configuration with Nix",
    category: "software",
    url: "https://github.com/LnL7/nix-darwin",
  },
  {
    name: "Claude Code",
    description: "AI-powered coding agent for autonomous development workflows",
    category: "software",
    url: "https://claude.com/claude-code",
  },
  {
    name: "Arc",
    description: "Chromium-based browser with vertical tabs and workspaces",
    category: "software",
    url: "https://arc.net",
  },
  {
    name: "Burp Suite",
    description:
      "Integrated platform for web application security testing and penetration testing",
    category: "software",
    url: "https://portswigger.net/burp",
  },
  {
    name: "OrbStack",
    description: "Lightweight Docker and Linux VM runtime optimized for macOS",
    category: "software",
    url: "https://orbstack.dev",
  },
  {
    name: "Raycast",
    description:
      "Extensible launcher and productivity tool for macOS automation",
    category: "software",
    url: "https://raycast.com",
  },
];
