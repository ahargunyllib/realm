# Content Writing Guide

All content is written in MDX format and stored in `src/content/`.

## File Structure

```
src/content/
├── blog/           # Blog posts
├── solution/       # Coding problem solutions
└── writeup/        # CTF/Security writeups
```

## Blog Posts

**Location:** `src/content/blog/*.mdx`

**Required Frontmatter:**
```yaml
---
title: "Your Blog Post Title"
date: "2026-01-08"
excerpt: "Brief description (1-2 sentences)"
tags: ["tag1", "tag2", "tag3"]
---
```

**Fields:**
- `title` (string, required): Post title
- `date` (string, required): `YYYY-MM-DD` format
- `excerpt` (string, required): Short summary for listings/SEO
- `tags` (array, required): Relevant keywords

**Structure:**
1. H1 title
2. H2 sections (Why? What? How?)
3. Code examples with syntax highlighting
4. Conclusion

---

## Coding Solutions

**Location:** `src/content/solution/*.mdx`

**Required Frontmatter:**
```yaml
---
title: "Problem Name"
platform: "leetcode"
problemUrl: "https://leetcode.com/problems/problem-name/"
difficulty: "medium"
tags: ["array", "hash-table"]
date: "2026-01-08"
---
```

**Fields:**
- `title` (string, required): Problem name
- `platform` (enum, required): `"codeforces"` | `"leetcode"` | `"atcoder"` | `"tlx"` | `"other"`
- `problemUrl` (string, required): Direct URL to problem
- `difficulty` (enum, required): `"easy"` | `"medium"` | `"hard"`
- `tags` (array, required): Algorithm/data structure tags
- `date` (string, required): Date solved `YYYY-MM-DD`

**Required Sections:**
1. **Problem Statement** - Problem description, constraints, examples
2. **Approach** - Strategy and intuition
3. **Algorithm** - Step-by-step breakdown
4. **Time/Space Complexity** - Big O analysis
5. **Solution** - Code with comments
6. **Example Walkthrough** - Trace through example
7. **Alternative Approaches** - Other solutions (optional)
8. **Key Takeaways** - Important lessons
9. **Related Problems** - Similar problems (optional)

---

## CTF Writeups

**Location:** `src/content/writeup/*.mdx`

**Required Frontmatter:**
```yaml
---
title: "Challenge Name"
competition: "CTF Name 2024"
category: ["web", "crypto"]
tags: ["sqli", "xss"]
date: "2026-01-08"
difficulty: "medium"
---
```

**Fields:**
- `title` (string, required): Challenge name
- `competition` (string, required): CTF name and year
- `category` (array, required): Categories (web, pwn, crypto, forensics, rev, misc)
- `tags` (array, required): Specific techniques/vulnerabilities
- `date` (string, required): Date completed `YYYY-MM-DD`
- `difficulty` (enum, optional): `"easy"` | `"medium"` | `"hard"`

**Required Sections:**
1. **Challenge Description** - Points, category, description, URL, files
2. **Initial Reconnaissance** - Port scanning, enumeration
3. **Vulnerability Discovery** - How vulnerability was found
4. **Exploitation** - Step-by-step exploit process
5. **Flag** - Captured flag in code block
6. **Lessons Learned** - Vulnerabilities exploited, exploitation chain, mitigations
7. **Tools Used** - List of tools
8. **References** - Links to resources (OWASP, CVEs, etc.)

---

## File Naming

Use lowercase with hyphens:
- ✅ `two-sum.mdx`, `getting-started.mdx`, `picoctf-2024-web.mdx`
- ❌ `TwoSum.mdx`, `Getting_Started.mdx`

---

## Best Practices

**General:**
- Use clear, descriptive titles
- Proper heading hierarchy (H1 once, H2 for sections, H3 for subsections)
- Include code with syntax highlighting
- Add relevant tags
- Proofread before publishing

**Code Examples:**
- Use proper language tags for syntax highlighting
- Add comments for complex logic
- Show input/output
- Format consistently

**Security Writeups:**
- Wait until CTF ends before publishing
- Explain vulnerabilities clearly
- Include mitigation strategies
- Show responsible disclosure

---

## Schema Reference

Full schema: `src/content/config.ts`


Siap. Ini **struktur final yang ringkas + rapi** (bahasa Inggris), sudah **menggabungkan semuanya**: build process, leadership, AI usage, dan team appreciation. Tinggal kamu isi detail seperlunya.

---

