# Design System Documentation

## Overview

The site employs an **editorial/magazine aesthetic** characterized by sophisticated restraint, typography-driven design, and minimal decoration. The design prioritizes readability, content hierarchy, and elegant simplicity.

## Design Philosophy

**Core Principles:**
- **Typography-First**: Font choices and hierarchy drive the visual experience
- **Monochromatic Palette**: Restrained use of color creates focus and sophistication
- **Generous Whitespace**: Breathing room enhances readability and elegance
- **Subtle Interactions**: Understated hover states and transitions maintain refinement
- **Editorial Restraint**: Every element serves the content—no decoration for decoration's sake

## Typography

The typographic system uses a two-font hierarchy that balances personality with readability:

### Font Stack

```css
--font-serif: "Cormorant", Georgia, "Times New Roman", serif;
--font-sans: "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
--font-mono: "Fira Code", "SF Mono", Monaco, "Cascadia Code", "Courier New", monospace;
```

**Usage:**
- **Cormorant (Serif)**: Headlines, section titles, hero elements. Provides elegance and editorial character.
- **Plus Jakarta Sans**: Body text, UI elements, descriptions. Clean and highly readable.
- **Fira Code (Mono)**: Code snippets, technical content. Includes programming ligatures.

### Type Scale

```css
--text-display: 48px;  /* Hero/Landing headlines */
--text-2xl: 36px;      /* Major section headers */
--text-xl: 28px;       /* Sub-headers */
--text-lg: 24px;       /* Large body/intro text */
--text-h1: 32px;       /* H1 elements */
--text-h2: 20px;       /* H2 elements */
--text-body: 16px;     /* Default body text */
--text-small: 14px;    /* Captions, metadata, labels */
```

### Line Heights

```css
--leading-tight: 1.1;      /* Display text, headlines */
--leading-snug: 1.3;       /* Subheadings */
--leading-normal: 1.5;     /* UI elements, compact text */
--leading-relaxed: 1.65;   /* Body copy, prose */
```

**Best Practices:**
- Use `--leading-tight` (1.1) for large serif headings
- Use `--leading-relaxed` (1.65) for body paragraphs
- Apply negative letter-spacing (-0.01em) to serif headings for optical balance

## Color System

The color palette is intentionally minimal and monochromatic, relying on subtle variations of gray:

### Core Colors

```css
--color-bg: #fafafa;              /* Page background */
--color-surface: #ffffff;         /* Card/surface background */
--color-text-primary: #1a1a1a;    /* Headlines, emphasis */
--color-text-secondary: #666666;  /* Body text, descriptions */
--color-text-tertiary: #9e9e9e;   /* Meta info, captions */
--color-border: #e8e8e8;          /* Dividers, borders */
--color-link: #1a1a1a;            /* Link color (same as primary) */
--color-link-hover: #404040;      /* Link hover state */
```

**Color Usage:**
- **Primary text** (#1a1a1a): Section titles, navigation, buttons, emphasized content
- **Secondary text** (#666666): Body paragraphs, descriptions, supporting content
- **Tertiary text** (#9e9e9e): Timestamps, labels, metadata
- **Border** (#e8e8e8): Subtle dividers, outline buttons, underlines

**Dark Mode Considerations:**
Currently not implemented, but future dark mode should invert the scale while maintaining the same subtle contrast ratios.

## Spacing System

Consistent spacing creates rhythm and visual hierarchy:

```css
--space-1: 8px;    /* Tight spacing */
--space-2: 16px;   /* Standard component spacing */
--space-3: 24px;   /* Medium gaps */
--space-4: 32px;   /* Large gaps */
--space-6: 48px;   /* Section separation */
--space-8: 64px;   /* Major sections */
--space-12: 96px;  /* Hero/footer spacing */
```

**Application:**
- Use `--space-1` and `--space-2` for within-component spacing
- Use `--space-3` and `--space-4` for between-component gaps
- Use `--space-6` and above for major section divisions

## Layout

### Content Width

```css
--content-width: 680px;
```

The 680px max-width optimizes readability for body text (~65-75 characters per line) and creates a centered, focused reading experience.

### Section Spacing

```css
--section-spacing: var(--space-12); /* 96px */
```

Consistent vertical rhythm between major page sections.

## Components

### Links

Links use a subtle underline pattern that reveals on hover:

```css
a {
  color: var(--color-link);
  text-decoration: none;
  border-bottom: 1px solid var(--color-border);
  transition: opacity 0.15s ease;
}

a:hover {
  opacity: 0.6;
}
```

**Characteristics:**
- 1px bottom border in `--color-border`
- Opacity reduces to 0.6 on hover
- 0.15s ease transition
- Focus state: 2px outline with 2px offset

### Buttons

Buttons styled as minimal text links with underlines:

```css
.btn {
  font-size: var(--text-small);
  padding: 0;
  background: none;
  border: none;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text-primary);
  transition: opacity 0.15s ease;
}

.btn:hover {
  opacity: 0.6;
}
```

**No heavy buttons**: Avoid filled backgrounds, rounded corners, or shadows. Keep actions text-based.

### Cookie Consent Notice

The cookie consent follows the editorial aesthetic:

**Design Pattern: "Editorial Notice"**
- Appears as a subtle bottom bar, not a heavy modal
- Uses serif title (Cormoant, 20px) for "Analytics"
- Body text in small sans-serif (14px, secondary color)
- Buttons styled as underlined text links
- Smooth slide-up animation with cubic-bezier easing
- Matches the content-width container

```astro
<!-- apps/www/src/components/cookie-consent.astro -->
<div class="cookie-notice">
  <div class="notice-container">
    <div class="notice-content">
      <h3 class="notice-title">Analytics</h3>
      <p class="notice-text">...</p>
    </div>
    <div class="notice-actions">
      <button class="notice-btn notice-btn-accept">Accept</button>
      <button class="notice-btn notice-btn-decline">Decline</button>
    </div>
  </div>
</div>
```

**Key Details:**
- Title uses `--font-serif` and `--text-h2`
- Text uses `--text-small` with `--color-text-secondary`
- Actions aligned to top with subtle 2px padding for optical alignment
- Accept button slightly bolder (font-weight: 500) for emphasis
- Slide-up animation: `cubic-bezier(0.16, 1, 0.3, 1)` over 0.4s

## Interactions & Animation

### Principles

- **Understated**: Animations should enhance, not distract
- **Fast**: Keep transitions quick (0.15s) for responsiveness
- **Purposeful**: Every animation serves a functional or communicative purpose

### Hover States

Standard hover pattern across all interactive elements:

```css
transition: opacity 0.15s ease;

:hover {
  opacity: 0.6;
}
```

### Focus States

Keyboard navigation accessibility:

```css
:focus-visible {
  outline: 2px solid var(--color-text-primary);
  outline-offset: 4px;
}
```

### Entrances

For components that appear dynamically (modals, notices):

```css
@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
```

Use smooth, spring-like easing (`cubic-bezier(0.16, 1, 0.3, 1)`) for natural motion.

## Responsive Design

### Breakpoints

```css
@media (max-width: 640px) {
  /* Mobile adjustments */
}
```

**Mobile Strategy:**
- Reduce font sizes (e.g., display: 48px → 36px)
- Stack horizontal layouts vertically
- Reduce padding (e.g., `--space-8` → `--space-4`)
- Maintain readability and hierarchy

## Accessibility

### Color Contrast

All text meets WCAG AA standards:
- Primary text (#1a1a1a) on background (#fafafa): **13.7:1** (AAA)
- Secondary text (#666666) on background (#fafafa): **5.7:1** (AA)
- Tertiary text (#9e9e9e) on background (#fafafa): **3.1:1** (AA Large)

### Keyboard Navigation

- All interactive elements focusable
- Clear focus indicators (2px outline, 4px offset)
- Logical tab order

### Semantic HTML

- Proper heading hierarchy (h1 → h2 → h3)
- Semantic elements (`<nav>`, `<section>`, `<article>`)
- ARIA labels where needed

## Implementation Guidelines

### DO:
✓ Use CSS custom properties for all colors, spacing, and typography
✓ Maintain consistent spacing rhythm with the spacing scale
✓ Keep interactions subtle and fast (0.15s transitions)
✓ Use serif fonts for headings/titles, sans-serif for body/UI
✓ Style buttons as minimal text links with underlines
✓ Ensure proper semantic HTML and accessibility

### DON'T:
✗ Introduce loud colors or heavy gradients
✗ Use filled buttons with backgrounds and border-radius
✗ Add drop shadows or depth effects
✗ Use system fonts (prefer the chosen web fonts)
✗ Create heavy, modal-style overlays
✗ Add decorative elements that don't serve the content

## File References

**Core Styles:**
- `apps/www/src/styles/global.css` - Design tokens, base styles, typography
- `apps/www/src/components/layout.astro` - Page layout structure
- `apps/www/src/components/cookie-consent.astro` - Editorial consent notice

**Component Examples:**
- `apps/www/src/components/hero.astro` - Typography hierarchy
- `apps/www/src/components/footer.astro` - Navigation patterns
- `apps/www/src/components/section.astro` - Spacing rhythm

**Documentation:**
- `apps/www/docs/CONTENT_GUIDE.md` - Content writing guidelines
- `apps/www/docs/DESIGN_SYSTEM.md` - This document
- `apps/www/docs/ANALYTICS.md` - Analytics implementation and tracking

---

**Last Updated:** January 2026
**Aesthetic Direction:** Editorial / Magazine / Sophisticated Minimalism
