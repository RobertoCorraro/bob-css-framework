# Naming Convention

BOB uses a custom BEM-inspired convention with underscores only.
No hyphens — classes can be selected entirely with a double-click.

## Structure

| Part | Separator | Example |
|---|---|---|
| Block | `bob_` prefix | `bob_button` |
| Element | `__` double underscore | `bob_button__icon` |
| Modifier | `_` single underscore | `bob_button__icon_primary` |

## Rules

1. If a style is specific to one component → component modifier.
2. If a style is reusable across any element → global utility `bob_name`.
3. If a visual change is theme-wide → define it with tokens, not modifiers.
