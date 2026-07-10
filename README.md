# BOB CSS Framework

BOB CSS Framework is a small, modern, accessible CSS foundation built for fast product delivery and high conversion.

---

## Principles

- Mobile-first.
- Accessible by default.
- Minimal CSS, maximum consistency.
- Token-driven design.
- Component-based architecture.

---

## Naming Convention

BOB uses a custom BEM-inspired convention optimized for easy selection and fast copying (double-click selects the entire class name):

| Part | Separator | Example |
|---|---|---|
| Block | `bob_` prefix | `bob_button` |
| Element | `__` double underscore | `bob_button__icon` |
| Modifier | `_` single underscore | `bob_button__icon_primary` |

### Rules

- If a style is **specific to one component**, use a component modifier: `bob_button__ghost`.
- If a style is **reusable across any element**, use a global utility: `bob_bg_dark`.
- If a visual change is **global or theme-wide**, define it with tokens — not component modifiers.

---

## Semantic HTML

BOB is designed to work with native HTML semantic elements. Every BOB class is meant to be applied to the correct semantic tag — not a generic `<div>`.

Using the right HTML element gives you accessibility, SEO and keyboard navigation for free, before writing a single line of CSS.

| BOB Class | Correct HTML tag | Why |
|---|---|---|
| `bob_nav` | `<nav>` | Landmark for screen readers and keyboard navigation |
| `bob_hero` | `<section>` or `<header>` | Self-contained page region |
| `bob_section` | `<section>` | Thematic group of content |
| `bob_section__dark` | `<section>` | Same — modifier changes theme, not meaning |
| `bob_section__inset` | `<section>` | Same — modifier changes layout, not meaning |
| `bob_page` | `<body>` or `<main>` | Top-level page grid |
| `bob_container` | `<div>` inside `<section>` | Layout wrapper only, no semantic meaning |
| `bob_card` | `<article>` | Self-contained, reusable content unit |
| `bob_button` | `<button>` or `<a>` | Use `<button>` for actions, `<a>` for navigation |
| `bob_stack` / `bob_cluster` | `<div>`, `<ul>`, `<ol>` | Pure layout — match the list meaning if content is a list |
| `bob_lead` / `bob_muted` | `<p>` | Paragraph-level text |

### Native elements styled by default

BOB provides base styles for these semantic elements without any class needed:

- `<figure>` + `<figcaption>` — responsive image with muted caption.
- `<details>` + `<summary>` — accessible accordion / FAQ, no JS required.
- `<aside>` — secondary content, muted style.
- `<main>` — correct block display guaranteed.
- `<h1>`–`<h4>` — fluid typographic scale with tight line-height.

---

## Responsive Images

BOB handles responsive images at the reset level so they never overflow their container.

For simple images:
```html
<img src="image.jpg" alt="Description" width="800" height="600">
```

For art-direction (different image per breakpoint) use `<picture>`:
```html
<picture>
  <source media="(min-width: 48rem)" srcset="image-desktop.webp">
  <source media="(min-width: 30rem)" srcset="image-tablet.webp">
  <img src="image-mobile.webp" alt="Description" width="800" height="600" loading="lazy">
</picture>
```

For fluid responsive images in a content area use `bob_img`:
```html
<figure class="bob_figure">
  <img class="bob_img" src="image.jpg" alt="Description" width="1200" height="800" loading="lazy">
  <figcaption>Caption text here</figcaption>
</figure>
```

**Always include `width` and `height` attributes** on `<img>` tags.
This lets the browser reserve the correct space before the image loads,
preventing Cumulative Layout Shift (CLS) — a Core Web Vitals metric.

---

## Architecture

```
src/
  tokens.css          ← design tokens (primitives + semantics)
  reset.css           ← modern accessible CSS reset
  base.css            ← typography, semantic elements, layout primitives
  layout/
    layout.css        ← container, section, hero, grid
  components/
    button.css
    card.css
    nav.css           ← includes mobile hamburger + side drawer
  utilities/
    utilities.css
  bob.css             ← main entry point, imports all layers
docs/
  naming-convention.md
  architecture.md
```

---

## Token System

Tokens are split into two levels:

1. **Primitives** — raw values, never used directly in components.
2. **Semantics** — meaningful tokens used by all components.

Changing a primitive automatically updates all semantic tokens that reference it.

---

## Accessibility

- Minimum touch target: 44px on all interactive elements.
- Focus states always visible via `:focus-visible`.
- Motion respects `prefers-reduced-motion`.
- Semantic HTML elements used throughout — no ARIA hacks.
- Drawer navigation uses `aria-expanded` and `aria-controls`.

---

## Dark Section Pattern

Any section can become dark without touching its children:

```html
<section class="bob_section bob_section__dark bob_section__inset">
  <!-- all children automatically read the dark tokens -->
</section>
```

`bob_section__inset` adds lateral margins so the dark block floats over the light body, like Apple product pages.

---

## Usage

```html
<link rel="stylesheet" href="src/bob.css">
```

Or with Vite/PostCSS build:

```js
import './src/bob.css'
```
