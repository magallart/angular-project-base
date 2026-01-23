## Tailwind Agent

Best practices for a clear and nice CSS.

## Design Profile Integration

- App-specific visual decisions (palette, typography, button/input recipes) live in `DESIGN.md`.
- `tailwind.md` defines Tailwind usage rules;
- `DESIGN.md` defines the app’s look & feel.

## Styling Decision Tree

```
Tailwind class exists?  → className="..."
Dynamic value?          → style={{ width: `${x}%` }}
Conditional styles?     → cn("base", condition && "variant")
Static only?            → className="..." (no cn() needed)
Library can't use class?→ style prop with var() constants
```

## Critical Rules

### Never Use var() in className

> Note: CSS variables are allowed in `styles.css` and `tailwind.config.js`.
> They are forbidden inside `className` strings in components.

```typescript
// ❌ NEVER: var() in className
<div className="bg-[var(--color-primary)]" />
<div className="text-[var(--text-color)]" />

// ✅ ALWAYS: Use Tailwind semantic classes
<div className="bg-primary" />
<div className="text-slate-400" />
```

### Never Use Hex Colors

```typescript
// ❌ NEVER: Hex colors in className
<p className="text-[#ffffff]" />
<div className="bg-[#1e293b]" />

// ✅ ALWAYS: Use Tailwind color classes
<p className="text-white" />
<div className="bg-slate-800" />
```

## Spacing Scale (REQUIRED)

Use consistent spacing tokens to prevent design drift.

- Tight: `gap-2 p-2 space-y-2` (8px)
- Standard: `gap-4 p-4 space-y-4` (16px)
- Comfortable: `gap-6 p-6 space-y-6` (24px)
- Loose: `gap-8 p-8 space-y-8` (32px)
- Section spacing: `py-16 sm:py-24` (64px / 96px)

### Standard Rule

- Prefer increments of 4 for spacing decisions (e.g. `4, 6, 8, 12, 16, 24`).

## The cn() Utility

```typescript
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### When to Use cn()

```typescript
// ✅ Conditional classes
<div className={cn("base-class", isActive && "active-class")} />

// ✅ Merging with potential conflicts
<button className={cn("px-4 py-2", className)} />  // className might override

// ✅ Multiple conditions
<div className={cn(
  "rounded-lg border",
  variant === "primary" && "bg-blue-500 text-white",
  variant === "secondary" && "bg-gray-200 text-gray-800",
  disabled && "opacity-50 cursor-not-allowed"
)} />
```

### When NOT to Use cn()

```typescript
// ❌ Static classes - unnecessary wrapper
<div className={cn("flex items-center gap-2")} />

// ✅ Just use className directly
<div className="flex items-center gap-2" />
```

## Style Constants for Charts/Libraries

When libraries don't accept className (like Recharts):

```typescript
// ✅ Constants with var() - ONLY for library props
const CHART_COLORS = {
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  text: "var(--color-text)",
  gridLine: "var(--color-border)",
};

// Usage with Recharts (can't use className)
<XAxis tick={{ fill: CHART_COLORS.text }} />
<CartesianGrid stroke={CHART_COLORS.gridLine} />
```

## Dynamic Values

```typescript
// ✅ style prop for truly dynamic values
<div style={{ width: `${percentage}%` }} />
<div style={{ opacity: isVisible ? 1 : 0 }} />

// ✅ CSS custom properties for theming
<div style={{ "--progress": `${value}%` } as React.CSSProperties} />
```

## Common Patterns

### Flexbox

```typescript
<div className="flex items-center justify-between gap-4" />
<div className="flex flex-col gap-2" />
<div className="inline-flex items-center" />
```

### Grid

```typescript
<div className="grid grid-cols-3 gap-4" />
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" />
```

### Grid Layouts

- Auto-Responsive Grid

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

- Auto-Fit Grid (Dynamic Columns)

```typescript
<div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
  {/* Automatically adjusts columns based on available space */}
</div>
```

- Masonry-Style Grid

```typescript
<div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
  {items.map(item => (
    <div key={item.id} className="break-inside-avoid">
      <Card {...item} />
    </div>
  ))}
</div>
```

### Button Patterns

```typescript
// Primary
<button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
  Primary
</button>

// Secondary
<button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/80">
  Secondary
</button>

// Outline
<button className="border border-border bg-transparent px-4 py-2 rounded-md hover:bg-accent">
  Outline
</button>

// Ghost
<button className="bg-transparent px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground">
  Ghost
</button>

// Destructive
<button className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md hover:bg-destructive/90">
  Delete
</button>
```

### Spacing

```typescript
// Padding
<div className="p-4" />           // All sides
<div className="px-4 py-2" />     // Horizontal, vertical
<div className="pt-4 pb-2" />     // Top, bottom

// Margin
<div className="m-4" />
<div className="mx-auto" />       // Center horizontally
<div className="mt-8 mb-4" />
```

### Typography

```typescript
<h1 className="text-2xl font-bold text-white" />
<p className="text-sm text-slate-400" />
<span className="text-xs font-medium uppercase tracking-wide" />
```

### Borders & Shadows

```typescript
<div className="rounded-lg border border-slate-700" />
<div className="rounded-full shadow-lg" />
<div className="ring-2 ring-blue-500 ring-offset-2" />
```

### States

```typescript
<button className="hover:bg-blue-600 focus:ring-2 active:scale-95" />
<input className="focus:border-blue-500 focus:outline-none" />
<div className="group-hover:opacity-100" />
```

### Responsive

```typescript
<div className="w-full md:w-1/2 lg:w-1/3" />
<div className="hidden md:block" />
<div className="text-sm md:text-base lg:text-lg" />
```

## Responsive Breakpoints

Mobile-first approach (base styles = mobile, add larger breakpoints):

| Breakpoint | Min Width | Pattern   | Example        |
| ---------- | --------- | --------- | -------------- |
| Base       | 0px       | No prefix | text-base      |
| sm         | 640px     | sm:       | sm:text-lg     |
| md         | 768px     | md:       | md:grid-cols-2 |
| lg         | 1024px    | lg:       | lg:px-8        |
| xl         | 1280px    | xl:       | xl:max-w-7xl   |
| 2xl        | 1536px    | 2xl:      | 2xl:text-6xl   |

```typescript
// Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

### Dark Mode

```typescript
<div className="bg-white dark:bg-slate-900" />
<p className="text-gray-900 dark:text-white" />
```

## Arbitrary Values (Escape Hatch)

```typescript
// ✅ OK for one-off values not in design system
<div className="w-[327px]" />
<div className="top-[117px]" />
<div className="grid-cols-[1fr_2fr_1fr]" />

// ❌ Don't use for colors - use theme instead
<div className="bg-[#1e293b]" />  // NO
```

## Extraction Rules (REQUIRED)

Extract a component when:

- A Tailwind class list is repeated 2+ times.
- A UI pattern appears across pages/features (button, card, panel, empty state).
- A component needs variants (primary/secondary/danger).

## Arbitrary Values Policy

- Allowed for one-off layout values: width/height/spacing/grid templates.
- Avoid arbitrary values for typography and colors.
- If an arbitrary value repeats, promote it into the theme or a component.

## Layout Defaults

- Prefer `flex`/`grid` utilities over custom CSS.
- Prefer `gap-*` over margins between siblings.
- Avoid deep nesting of wrappers. Flatten layout where possible.

## Container & Section Primitives (REQUIRED)

Use these primitives for page layout consistency.

### Page Container

```typescript
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* content */}
</div>
```

### Container Variants

- `max-w-4xl`: narrow content (docs/blog)
- `max-w-5xl`: medium
- `max-w-6xl`: wide
- `max-w-7xl`: default

## Accessibility & Visual Feedback

- Interactive elements must have hover and focus states.
- Color alone must not convey meaning (use icons/text as well).
- Disabled states must be visually distinct and non-interactive.

## Anti-Patterns (AVOID)

- Random spacing values that don’t follow the spacing scale.
- Deeply nested wrappers for layout (prefer simpler structure).
- Using `space-y-*` and `gap-*` together unless intentionally needed.
- Overusing arbitrary values when a Tailwind class exists.
