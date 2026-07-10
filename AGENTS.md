# AGENTS.md — BOB CSS Framework

This file documents the technical philosophy, architectural decisions and coding rules
for BOB CSS Framework. It is intended for AI agents, contributors and developers
working on or extending this codebase.

Any AI tool (Copilot, Cursor, Claude, Codex, or similar) should read this file
before generating, modifying or reviewing any CSS in this project.

---

## What BOB is

BOB CSS Framework is a minimal, token-driven CSS foundation designed for:
- Fast product delivery.
- High conversion rate on landing pages and product sites.
- Accessible, mobile-first layouts.
- Apple/Linear/Stripe-level visual quality with minimal code.

BOB is NOT a utility-first framework like Tailwind.
BOB is NOT a component library like Bootstrap.
BOB is a design system foundation: tokens + reset + semantic base + composable primitives.

---

## Naming Convention

BOB uses a custom BEM-inspired convention. Rules are strict and must never be broken.

```
bob_block
bob_block__element
bob_block__element_modifier
```

- Separator between block and element: `__` (double underscore).
- Separator between element and modifier: `_` (single underscore).
- All classes start with `bob_` prefix — no exceptions.
- No hyphens anywhere: double-click selects the full class name in any editor.

### Decision rule for where a style lives

| Situation | Where it goes |
|---|---|
| Style is specific to one component | Component modifier: `bob_button__ghost` |
| Style is reusable across any element | Global utility: `bob_bg_dark` |
| Visual change is theme-wide | Token only — never a class |

---

## Token Architecture

Tokens are split into two levels. This is non-negotiable.

### Level 1: Primitives
Raw values. **Never use primitives directly in component styles.**

```css
--bob_primitive_light_plus
--bob_primitive_light
--bob_primitive_dark
--bob_primitive_dark_plus
--bob_primitive_brand
```

### Level 2: Semantics
Meaningful tokens. **Always use these in components.**

```css
--bob_color_bg
--bob_color_surface
--bob_color_text
--bob_color_muted
--bob_color_accent
--bob_color_border
```

### Why this separation matters
Changing `--bob_primitive_brand` to a new color updates every semantic token
that references it across every component — without touching a single component file.
This is how top design systems (Figma, Linear, Radix) work.

### Deriving colors
Always use `color-mix(in oklab, ...)` to derive intermediate colors.
Never hardcode intermediate grays. `oklab` produces perceptually accurate blending
— no muddy or washed-out results.

```css
/* correct */
--bob_color_muted: color-mix(in oklab, var(--bob_primitive_dark) 45%, var(--bob_primitive_light));

/* wrong */
--bob_color_muted: #6b7280;
```

---

## Units — What to Use and When

| Unit | Use for | Never use for |
|---|---|---|
| `rem` | Global spacing, font-size, breakpoints | Component-scoped padding |
| `em` | Component-scoped padding (scales with font-size) | Global spacing |
| `fr` | Grid column/row sizing only | Padding, margin, font-size |
| `%` | Fluid widths, container ratios | Fixed measurements |
| `vw/vh` | Viewport-relative sizes inside `clamp()` | Standalone font-size |
| `dvh` | Hero min-height | Anything else |
| `ch` | Max-width on text elements (65ch body, 55ch lead) | Layout widths |
| `px` | Never — only acceptable for 1px borders | Everything else |

### Why rem for breakpoints
Breakpoints in `rem` respect the user’s browser font-size preference.
A user with 20px base font gets proportionally larger breakpoints.
This is more accessible than fixed `px` breakpoints.

### Why dvh for hero
`vh` on mobile includes the browser address bar and toolbars in its calculation.
When the user scrolls and the browser UI hides, the visible area grows
but `vh` stays fixed — causing overflow or layout jumps.
`dvh` updates dynamically to the actual visible viewport at all times.

### Why em for button padding
Button padding in `em` scales proportionally with the button’s own `font-size`.
If you create a `bob_button__sm` modifier that changes `font-size`,
the padding adjusts automatically — no padding override needed.

---

## Spacing Scale

4pt scale. All spacing, padding, margin and gap values must come from this scale.
Never use arbitrary values.

```
--bob_space_1:  0.25rem  (4px)
--bob_space_2:  0.5rem   (8px)
--bob_space_3:  0.75rem  (12px)
--bob_space_4:  1rem     (16px)
--bob_space_5:  1.5rem   (24px)
--bob_space_6:  2rem     (32px)
--bob_space_7:  2.5rem   (40px)
--bob_space_8:  3rem     (48px)
--bob_space_9:  4rem     (64px)
--bob_space_10: 6rem     (96px)
```

Gap uses the same tokens as padding and margin — no separate gap variables.

---

## Layout Philosophy

### --bob_bleed
The single most important layout token. It controls the lateral breathing room
between content and the screen edge, and grows with the viewport:

```css
--bob_bleed: clamp(1rem, 5vw, 4rem);
```

This token is used for:
- `padding-inline` on sections.
- `margin-inline` on inset blocks.
- `padding-inline` on the nav inner row.

This creates automatic visual rhythm: the gap between a floating dark section
and the page edge is the same as the internal padding of adjacent sections.

### Mobile-first
All base styles target mobile. Desktop enhancements use `min-width` media queries.
Never write `max-width` media queries except for the mobile-only overrides
already present in the framework (e.g. `bob_button__mobile_full`).

### Grid vs Flexbox
- **CSS Grid**: page-level layout, sections with rows and columns.
- **Flexbox**: component-level alignment (nav, button, card header).
- Never use Flexbox for page structure. Never use Grid where Flexbox suffices.

### auto-fit vs auto-fill
- `auto-fit`: empty tracks collapse. Items stretch to fill the row. Use for cards, features, listings.
- `auto-fill`: empty tracks are preserved. Items stay at fixed width. Use for galleries, avatars, thumbnails.

### Dark section pattern
Dark sections override semantic tokens locally via CSS custom property inheritance.
Children automatically receive the dark theme without extra classes.
This is the same pattern used by Apple product pages.

```css
.bob_section__dark {
  color-scheme: dark;
  --bob_color_bg: var(--bob_primitive_dark);
  /* ... all semantics overridden locally ... */
  background: var(--bob_color_bg);
  color: var(--bob_color_text);
}
```

### Inset sections
`bob_section__inset` adds `margin-inline: var(--bob_bleed)` and `border-radius`
so a block floats over the body background. Combine with `bob_section__dark`
for the Apple-style dark card floating on a light page.

---

## Semantic HTML Rules

BOB classes must always be applied to the correct semantic HTML element.
Using a `<div>` when a semantic element exists is not acceptable.

| Class | Correct tag |
|---|---|
| `bob_nav` | `<nav>` |
| `bob_hero`, `bob_section` | `<section>` or `<header>` |
| `bob_page` | `<body>` or `<main>` |
| `bob_card` | `<article>` |
| `bob_button` | `<button>` (actions) or `<a>` (navigation) |
| `bob_container` | `<div>` — layout only, no semantic meaning |

Native elements (`figure`, `details`, `aside`, `main`) get base styles
automatically without any class.

---

## Responsive Images Rules

1. Always add `width` and `height` attributes on `<img>` to prevent CLS.
2. Always use `loading="lazy"` except on above-the-fold hero images.
3. Use `<picture>` + `srcset` for art-direction (different image per breakpoint).
4. Use `object-fit: cover` for images that must fill a container without distortion.
5. Use `object-fit: contain` for logos and illustrations where cropping is wrong.
6. Never use `background-image` for content images — it breaks accessibility and SEO.

---

## Overflow and Mobile Safety Rules

1. `overflow-x: hidden` is set on both `html` and `body` in the reset.
2. Never use `position: absolute` with `left` or `right` values larger than the viewport without testing on mobile.
3. Never animate `left`, `top`, `width` or `height` — always animate `transform` for GPU performance.
4. Transitions on `transform` run on the compositor thread and never cause layout recalculation — they are always smooth on mobile.
5. The nav side drawer uses `transform: translateX` for exactly this reason.

---

## Accessibility Rules

1. Minimum touch target: `var(--bob_touch_min)` = 2.75rem (44px) on all interactive elements.
2. Focus states must always be visible via `:focus-visible`.
3. Motion must respect `prefers-reduced-motion` — handled globally in reset.css.
4. `aria-expanded` and `aria-controls` must be present on hamburger buttons.
5. Never use `display: none` to hide content from screen readers if it should be accessible. Use `.bob_sr_only` instead.
6. Color contrast must meet WCAG AA minimum (4.5:1 for text, 3:1 for UI components).

---

## Shadows

Shadows must always be soft and layered. Never use heavy, decorative shadows.
Always use the three-level scale:

```
--bob_shadow_sm  → subtle elevation (cards at rest)
--bob_shadow_md  → medium elevation (hover states, dropdowns)
--bob_shadow_lg  → high elevation (modals, floating panels)
```

---

## File Import Order

The order of imports in `bob.css` is critical. Never change it.

```
tokens.css    → variables must exist before anything uses them
reset.css     → normalize before adding styles
base.css      → semantic base before components
layout.css    → structural primitives before components
components/   → components before utilities
utilities.css → utilities last so they can override components
```

---

## What AI Agents Should Never Do

- Never add `px` values except for `1px` borders.
- Never use primitive tokens directly in component styles.
- Never create a new color value outside the token system.
- Never write `max-width` media queries (except for the existing mobile-only overrides).
- Never animate `left`, `top`, `width`, `height` — always use `transform`.
- Never use `!important` except in utility overrides.
- Never apply a BOB class to a `<div>` when a semantic element exists.
- Never add spacing variables outside the 4pt scale.
- Never break the import order in `bob.css`.
