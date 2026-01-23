# Design Profile — <APP_NAME>

This file defines the **unique visual identity** of this application.

It extends the global UI rules defined in:

- `agents/tailwind.md`
- `agents/frontend.md`

All UI built for this application **must follow this design profile**.

## Quick Fill — Design Tokens (REQUIRED)

Fill these values when creating a new app from this template.
These tokens define the app identity and must be reflected in Tailwind config/theme.

### Identity

- App name: `<APP_NAME>`
- Tone: `<calm | playful | professional | bold>`
- Density: `<compact | standard | spacious>`

### Typography (Font Names)

- Primary font (UI): `<e.g. Inter>`
- Secondary font (Headings): `<e.g. Geist>`
- Monospace font (Code): `<e.g. JetBrains Mono>`

### Radius / Shadows / Motion

- Radius: `<rounded-md | rounded-lg | rounded-xl>`
- Shadow level: `<none | subtle | medium>`
- Motion: `<none | minimal | moderate>`

### Semantic Color Tokens (Tailwind Classes)

Neutrals:

- Page: `bg-... text-...`
- Card: `bg-... text-... border-...`
- Muted text: `text-...`

Brand:

- Primary button: `bg-... text-... hover:bg-...`
- Secondary button: `bg-... text-... hover:bg-...`
- Accent: `bg-... text-...`
- Destructive: `bg-... text-... hover:bg-...`

Focus:

- Focus ring: `focus-visible:ring-2 focus-visible:ring-... focus-visible:ring-offset-2 focus-visible:ring-offset-...`

Layout:

- Container: `max-w-... mx-auto px-4 sm:px-6 lg:px-8`
- Section spacing: `py-... sm:py-...`
- Default gap: `gap-...`
- Card padding: `p-...`

---

## 1. Brand Intent

Describe the “feel” of the app in plain language.

- Tone: (e.g. calm / playful / professional / bold)
- Visual density: (compact / standard / spacious)
- Corners: (sharp / rounded / very rounded)
- Shadows: (none / subtle / visible)
- Motion: (none / minimal / moderate)

> If unsure, default to: calm, standard density, rounded, subtle shadows, minimal motion.

## 2. Color System (Semantic Tokens)

Only **semantic Tailwind tokens** are allowed.  
No hex colors. No inline CSS colors. No `var()` in `className`.

### Neutrals

- Page background: `bg-...`
- Card background: `bg-...`
- Foreground text: `text-...`
- Muted text: `text-...`
- Borders: `border-...`

### Brand Colors

- Primary:
  - Background: `bg-...`
  - Text: `text-...`
- Secondary:
  - Background: `bg-...`
  - Text: `text-...`
- Accent:
  - Background: `bg-...`
  - Text: `text-...`
- Destructive:
  - Background: `bg-...`
  - Text: `text-...`

### Examples

- Page: `bg-... text-...`
- Card: `bg-... border border-...`
- Muted text: `text-...`

## 3. Typography

Define the typography scale used across the app.

### Headings

- H1: `text-... font-... tracking-...`
- H2: `text-... font-...`
- H3: `text-... font-...`

### Body Text

- Default body: `text-... leading-...`
- Muted text: `text-...`
- Small text / captions: `text-...`

### Rules

- Headings are used for structure, not styling.
- Body text must remain readable at all breakpoints.
- Avoid custom font sizes outside this scale.

## 4. Spacing & Layout Defaults

These values define the “rhythm” of the app.

- Page container width: `max-w-...`
- Section vertical spacing: `py-... sm:py-...`
- Default gap between elements: `gap-...`
- Card padding: `p-...`

> Spacing must follow the global spacing scale from `tailwind.md`.

## 5. Component Recipes (REQUIRED)

- These are the **approved base styles** for this app.
- All UI components must be based on these recipes.

### Button

### Button (REQUIRED)

Use these as the only approved button styles for this app.

- Primary:

```tsx
<button className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-... text-... hover:bg-... focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-... focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none">
  Primary
</button>
```

- Secondary:

```tsx
<button className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-... text-... hover:bg-... focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-... focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none">
  Secondary
</button>
```

- Outline:

```tsx
<button className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-... bg-transparent hover:bg-... focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-... focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none">
  Outline
</button>
```

- Destructive:

```tsx
<button className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-... text-... hover:bg-... focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-... focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none">
  Delete
</button>
```

### Input / Form Field (REQUIRED)

```tsx
<div className="space-y-2">
  <label className="text-sm font-medium">Label</label>
  <input className="w-full rounded-md border border-... bg-... px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-... focus-visible:ring-offset-2 disabled:opacity-50" />
  <p className="text-xs text-...">Helper text</p>
</div>
```

### Card (REQUIRED)

```tsx
<div className="rounded-lg border border-... bg-... p-... text-... shadow-...">{/* content */}</div>
```

## 6. Interaction States (REQUIRED)

- All interactive elements must define:
  - Hover state: ...
  - Focus state (visible): ...
  - Disabled state: ...
  - Loading state (if applicable): ...
- Focus styles are mandatory and must be clearly visible.

## 7. Do / Don’t

- Do:
  - Follow this file for all UI decisions.
  - Use component recipes as the base.
  - Keep UI consistent across the app.

- Don’t:
  - Introduce new visual styles without updating this file.
  - Use hex colors or inline styles for design.
  - Create one-off button or input styles.

## 8. When to Update This File

- Update this file when:
  - A new UI pattern is introduced.
  - A component recipe changes.
  - The visual identity of the app evolves.
- This file is the source of truth for the app’s design.
