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

## Architecture

```
src/
  tokens.css          ← design tokens (primitives + semantics)
  reset.css           ← modern accessible CSS reset
  base.css            ← typography, links, base utilities
  layout/
    layout.css        ← container, section, grid, stack, cluster
  components/
    button.css
    card.css
    nav.css
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

- Minimum touch target: 44px recommended for primary interactive controls.
- Focus states are always visible.
- Motion respects `prefers-reduced-motion`.
- Components use semantic HTML and correct ARIA where needed.

---

## Button Policy

Primary CTA buttons are full width on mobile when that improves clarity and conversion.

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
