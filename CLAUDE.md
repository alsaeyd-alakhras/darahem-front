# CLAUDE.md — Azlynt Project

## Project Overview

**Azlynt** (أزلينت) is a marketing website for an Arabic-first SaaS platform targeting freelancers in the MENA region (project management, client relations, invoicing, and payment collection tools).

- Delivered as static HTML to a client — must be clean and production-ready
- Default language: Arabic (RTL)
- Future: language toggle (AR/EN) via page reload — prepare now, implement later

---

## Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Markup     | HTML5                               |
| Styling    | Tailwind CSS v4 (local CLI build)   |
| Scripts    | jQuery (local)                      |
| Font       | Readex Pro (Google Fonts)           |
| No         | Vue, React, Laravel, any framework  |

---

## File Structure

```
/
├── CLAUDE.md
├── package.json
├── index.html              # Home page
├── features.html           # Features page
├── pricing.html            # Pricing page
├── faq.html                # FAQ page
└── assets/
    ├── css/
    │   ├── app.css         # Tailwind source (edit this)
    │   └── output.css      # Compiled output (never edit manually)
    ├── js/
    │   ├── jquery.min.js   # jQuery local copy
    │   ├── script.js       # Shared JS (navbar, global behavior)
    │   ├── home.js         # JS specific to index.html
    │   ├── features.js     # JS specific to features.html
    │   ├── pricing.js      # JS specific to pricing.html
    │   └── faq.js          # JS specific to faq.html
    └── imgs/               # All images and icons
        └── (descriptive names: hero-laptop.png, icon-cashflow.svg)
```

### JS Loading per page
Each HTML page loads:
1. `jquery.min.js`
2. `script.js` (shared)
3. Its own page JS file (e.g. `home.js`)

---

## Design Tokens (app.css)

Define all tokens inside `@theme {}` in `assets/css/app.css`.
When implementing from Figma, extract exact values and update here first.

```css
@import "tailwindcss";

@theme {
  /* Typography */
  --font-sans:    "Readex Pro", sans-serif;
  --font-heading: "IBM Plex Sans Arabic", sans-serif;

  /* Brand Colors */
  --color-g-green:       #157A70;
  --color-g-green-lt:    #1D9E92;
  --color-g-purple:      #2B0A8C;
  --color-g-purple-mid:  #2E4E96;
  --color-g-navy:        #002452;
  --color-g-dark:        #191C1F;
  --color-g-body:        #484553;
  --color-g-muted:       #6B7280;
  --color-g-light:       #F8F9FD;
  --color-g-light2:      #F2F3F7;
  --color-g-orange:      #F0995A;
  --color-g-border:      #E5E7EB;
  --color-g-border2:     #C4C6D0;
  --color-g-mint-soft:   #EAFAF7;
  --color-g-mint-bright: #4FD9C4;

  /* Spacing scale — extend only if Figma uses non-standard values */
  --spacing-section: 5rem;
}
```

Usage examples:
- `bg-g-green` · `text-g-purple` · `border-g-border` · `text-g-body`

---

## RTL / LTR Rules — CRITICAL

The site is RTL by default. It must also support LTR cleanly in the future without refactoring.

### HTML root
```html
<html lang="ar" dir="rtl">   <!-- default -->
<html lang="en" dir="ltr">   <!-- future EN version -->
```

### Rules (strictly follow these)

| ❌ Wrong | ✅ Correct |
|----------|-----------|
| `ml-4` `mr-4` | `ms-4` `me-4` |
| `pl-6` `pr-6` | `ps-6` `pe-6` |
| `left-0` `right-0` | `start-0` `end-0` |
| `border-l-` `border-r-` | `border-s-` `border-e-` |
| `text-right` `text-left` | `text-start` `text-end` |
| `rounded-l-` `rounded-r-` | `rounded-s-` `rounded-e-` |
| `dir="rtl"` on section | ❌ Never on individual sections |
| `flex-row-reverse` for RTL | ❌ Never — use `flex-row` and let dir handle it |

### Directional variants (use when behavior differs per direction)
```html
<!-- Icon that should flip -->
<svg class="rtl:scale-x-[-1]">

<!-- Text alignment that differs -->
<p class="text-start">        <!-- follows dir automatically -->

<!-- Absolute positioned element -->
<div class="absolute start-4 top-4">
```

---

## Figma → Code Workflow

When given a Figma frame link:

1. **Read the Figma frame fully** using the MCP tool before writing any code
2. **Extract exact values**: px sizes, colors (hex), font weights, border-radius, gaps
3. **Update design tokens** in `app.css` if new colors/values appear
4. **Implement the section** as a standalone HTML snippet
5. **Verify RTL**: mentally walk through every margin, padding, flex direction, and absolute position — confirm they use logical properties
6. **Add interactivity** in the correct JS file with a section comment header

---

## script.js Structure

All JS files follow this comment structure:

```javascript
// ============================================================
// SECTION: Navbar
// Handles: sticky behavior, mobile menu toggle, lang switcher
// ============================================================

$(document).ready(function () {
  // ...
});


// ============================================================
// SECTION: Scroll Animations
// Handles: fade-in on scroll for shared elements
// ============================================================
```

Page-specific files follow the same pattern:

```javascript
// home.js
// ============================================================
// SECTION: Hero
// Handles: stats counter animation
// ============================================================
```

---

## HTML Page Template

Every HTML file starts with this base:

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>أزلينت — [Page Title]</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/assets/css/output.css" />
</head>
<body class="font-sans text-g-body bg-white">

  <!-- Navbar (shared) -->

  <!-- Page sections here -->

  <!-- Footer (shared) -->

  <script src="/assets/js/jquery.min.js"></script>
  <script src="/assets/js/script.js"></script>
  <script src="/assets/js/[page].js"></script>  <!-- replace with actual page js -->
</body>
</html>
```
---

### Asset Paths
Always use relative paths with `./` prefix:
- `./assets/css/output.css`
- `./assets/js/jquery.min.js`
- `./assets/js/script.js`
- `./assets/js/[page].js`
- `./assets/imgs/[filename]`

Never use absolute paths (`/assets/...`) — breaks on GitHub Pages and subdirectory hosting.

---

## Responsiveness

Use Tailwind breakpoints consistently:

| Breakpoint | Width   | Usage               |
|------------|---------|---------------------|
| (default)  | < 640px | Mobile first        |
| `sm:`      | 640px+  | Large mobile        |
| `md:`      | 768px+  | Tablet              |
| `lg:`      | 1024px+ | Desktop             |
| `xl:`      | 1280px+ | Wide desktop        |

- Mobile: single column, stacked layout
- Tablet: 2 columns where applicable
- Desktop: full layout as Figma

---

## Images

- All images in `/assets/imgs/`
- Naming: `[section]-[description].[ext]` — e.g. `hero-laptop.png`, `feature-cashflow-icon.svg`
- Use `<img>` with `alt` text in Arabic
- For decorative images: `alt=""`
- Prefer SVG for icons

---

## Code Quality Rules

- No inline styles — Tailwind classes only
- No custom CSS except design tokens in `app.css`
- Semantic HTML: use `<section>`, `<nav>`, `<header>`, `<footer>`, `<main>`
- Each section has an HTML comment: `<!-- Section: Hero -->`
- No unused classes
- All text content in Arabic unless explicitly told otherwise