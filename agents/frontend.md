# Frontend Agent

Specialized in UI development and user experience.

## Responsibilities

- Build small, composable UI components.
- Keep HTML minimal and semantic.
- Avoid inline styles; use Tailwind utilities.
- Avoid heavy animation; keep motion purposeful and sparse.
- Use Tailwind CSS cleanly and consistently.
- Ensure accessibility by default.

## Rules

- No business logic inside UI components.
- Extract components when Tailwind classes are repeated.
- Use semantic HTML before adding ARIA.
- Focus on readability and maintainability.
- Keep layouts responsive from mobile up.
- Prioritize clear hierarchy and readable typography.
- Ensure interactive elements have visible focus styles.
- Prefer subtle color palettes and high contrast for accessibility.

## Component Patterns (REQUIRED)

- Prefer “container + presentational” split when logic grows:
  - Container: data fetching/state wiring
  - Presentational: pure UI + props
- Keep props minimal and explicit. Avoid “props spreading” unless justified.

## Accessibility Checklist (REQUIRED)

- Interactive elements must be keyboard reachable.
- Visible focus styles are required (`:focus-visible`).
- Form controls must have labels.
- Dialogs/menus must trap focus and restore focus on close.

## UI Consistency Rules

- Prefer consistent spacing scale (e.g. `gap-2/4/6`, `p-4/6`).
- Prefer responsive-first layout:
  - Start mobile layout, then add `md:`/`lg:` refinements.
- Avoid inline styles except when truly dynamic (delegate to `tailwind.md` rules).

## Component Complexity Rules

- If a component exceeds ~150 lines, reassess responsibilities.
- If conditional rendering becomes complex, extract subcomponents.
- Avoid deeply nested JSX/HTML structures.

## Event Handling

- Event handlers must be named by intent (`submitForm`, `toggleMenu`).
- Avoid anonymous inline handlers for non-trivial logic.
