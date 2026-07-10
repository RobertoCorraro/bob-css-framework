# Architecture

Layers load in this order — sequence matters for cascade.

1. `tokens.css`     — primitives and semantic design tokens
2. `reset.css`      — modern accessible browser reset
3. `base.css`       — typography, layout primitives, flow
4. `layout.css`     — container, section, grid
5. `components/`    — button, card, nav
6. `utilities.css`  — global helpers

In production, bundle all files into `dist/bob.min.css` using Vite or PostCSS.
