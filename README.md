# BOB CSS Framework

BOB CSS Framework is a minimal, token-driven CSS foundation built for fast product delivery,
high conversion and Apple/Linear-level visual quality with minimal code.

---

## Philosophy

BOB is built on one principle: **the right decision at the token level makes every component correct by default.**

Instead of writing many component-specific rules, BOB defines a small set of design decisions
once — in tokens — and lets them propagate across the entire system automatically.
Change one primitive and the whole interface updates. No find-and-replace. No inconsistencies.

This is the same approach used by Linear, Stripe, Vercel and Apple’s design systems.

BOB is NOT Tailwind (utility-first). BOB is NOT Bootstrap (component library).
BOB is a design system foundation: tokens + reset + semantic base + composable layout primitives.

---

## Principles

- **Mobile-first** — base styles target mobile, desktop is progressive enhancement.
- **Accessible by default** — 44px touch targets, visible focus, reduced-motion support.
- **Semantic HTML** — correct HTML tags, not `<div>` for everything.
- **Token-driven** — all visual decisions live in tokens, never hardcoded.
- **Minimal CSS** — write less, get more consistency.
- **GPU-safe animations** — only `transform` and `opacity` are animated, never layout properties.

---

## Naming Convention

BOB uses a custom BEM-inspired convention optimized for easy selection (double-click = full class name):

| Part | Separator | Example |
|---|---|---|
| Block | `bob_` prefix | `bob_button` |
| Element | `__` double underscore | `bob_button__icon` |
| Modifier | `_` single underscore | `bob_button__icon_primary` |

### Decision rule

- Style **specific to one component** → component modifier: `bob_button__ghost`
- Style **reusable across elements** → global utility: `bob_bg_dark`
- Style **theme-wide** → token only, never a class

---

## Semantic HTML

BOB is designed to work with native HTML semantic elements.
Every BOB class must be applied to the correct semantic tag — not a generic `<div>`.

Using the right HTML element gives you accessibility, SEO and keyboard navigation
for free, before writing a single line of CSS.

| BOB Class | Correct HTML tag | Why |
|---|---|---|
| `bob_nav` | `<nav>` | Landmark for screen readers and keyboard navigation |
| `bob_hero` | `<section>` or `<header>` | Self-contained page region |
| `bob_section` | `<section>` | Thematic group of content |
| `bob_page` | `<body>` or `<main>` | Top-level page grid |
| `bob_container` | `<div>` inside `<section>` | Layout wrapper, no semantic meaning |
| `bob_card` | `<article>` | Self-contained, reusable content unit |
| `bob_button` | `<button>` or `<a>` | `<button>` for actions, `<a>` for navigation |
| `bob_stack` / `bob_cluster` | `<div>`, `<ul>`, `<ol>` | Match content meaning |
| `bob_lead` / `bob_muted` | `<p>` | Paragraph-level text |

### Native elements styled automatically

- `<figure>` + `<figcaption>` — responsive image with muted caption.
- `<details>` + `<summary>` — accessible accordion, no JS required.
- `<aside>` — secondary content, muted style.
- `<main>` — correct block display on all browsers.
- `<h1>`–`<h4>` — fluid typographic scale.

---

## Responsive Images

BOB handles responsive images at the reset level. Images never overflow their container.

**Always add `width` and `height` on every `<img>`.**
The browser uses them to reserve space before the image loads,
preventing layout shift (CLS) — a Core Web Vitals metric that affects Google ranking.

```html
<!-- Simple image -->
<img src="photo.jpg" alt="Description" width="1200" height="800" loading="lazy">

<!-- Art direction: different image per breakpoint -->
<picture>
  <source media="(min-width: 48rem)" srcset="desktop.webp" type="image/webp">
  <img src="mobile.webp" alt="Description" width="800" height="600" loading="lazy">
</picture>

<!-- Responsive image with caption -->
<figure class="bob_figure">
  <img class="bob_img" src="photo.jpg" alt="Description" width="1200" height="800" loading="lazy">
  <figcaption>Caption text</figcaption>
</figure>
```

Use `loading="eager"` only on above-the-fold hero images.

| Class | Use |
|---|---|
| `bob_img` | Fluid, fills container, `object-fit: cover` |
| `bob_img__contain` | Logos, illustrations — no cropping |
| `bob_img__square` | Avatars, thumbnails — 1:1 ratio |
| `bob_img__video` | Video covers, banners — 16:9 ratio |

---

## Architecture

```
src/
  tokens.css          ← primitives + semantic design tokens
  reset.css           ← modern accessible CSS reset
  base.css            ← typography, semantic elements, responsive images
  layout/
    layout.css        ← container, hero, section, grid, page
  components/
    button.css
    card.css
    nav.css           ← includes mobile hamburger + side drawer
  utilities/
    utilities.css
  bob.css             ← main entry point (import order is critical)
docs/
  naming-convention.md
  architecture.md
AGENTS.md             ← technical philosophy for AI agents and contributors
```

---

## Token System

Tokens are split into two levels:

1. **Primitives** — raw values, never used in components directly.
2. **Semantics** — meaningful tokens used by all components.

Change one primitive → all semantic tokens that reference it update automatically.
Change a semantic token → all components update automatically.

---

## Dark Section Pattern

Any section becomes dark without modifying its children:

```html
<section class="bob_section bob_section__dark bob_section__inset">
  <!-- children automatically inherit dark tokens -->
</section>
```

`bob_section__dark` overrides semantic tokens locally via CSS custom property inheritance.
`bob_section__inset` floats the block over the body background with lateral margins and rounded corners — the Apple product page pattern.

---

## Semantic Sections

One `<section class="bob_section">` per content block — this is the default way to structure any
bob page, nav or no nav. It gives every block a landmark for screen readers, a stable id for
SEO/deep-linking, and a clean hook for JS/data attributes instead of div-soup:

```html
<section id="servizi" class="bob_section">...</section>
<section id="portfolio" class="bob_section">...</section>
```

Give each section its own `id` as a matter of course, independent of whether anything currently
links to it — it costs nothing and keeps the option open. When a nav *does* link to it (the main
nav, or an internal tab/segmented menu — see `BOB_UI_collections` BLOCK-025 "Tabs con icone"), the
id becomes that link's target:

```html
<nav class="bob_nav__links">
  <li><a href="#servizi">Servizi</a></li>
</nav>
```

`bob_section` already carries `scroll-margin-top: var(--bob_nav_height)`, so clicking the link
(or calling `element.scrollIntoView()` from JS) lands with the section heading visible below the
sticky nav — never hidden underneath it. No manual scroll-offset math in JS, and the property is
inert when nothing links to the section.

---

## Accessibility

- 44px minimum touch target on all interactive elements.
- Focus always visible via `:focus-visible`.
- Motion respects `prefers-reduced-motion`.
- Semantic HTML throughout — no ARIA patches for wrong elements.
- Hamburger nav uses `aria-expanded` and `aria-controls`.

---

## Usage

```html
<link rel="stylesheet" href="src/bob.css">
```

With Vite or PostCSS:

```js
import './src/bob.css'
```

For AI agents and contributors, read `AGENTS.md` before modifying any file.
