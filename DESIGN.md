# Design Profile - App Template

Rellena solo estos campos al clonar el template.

## Quick Fill (Required)

### Identity

- `app_name`: `<My App>`
- `style`: `<calm | professional | bold | playful>`
- `density`: `<compact | standard | spacious>`

### Typography

- `font_ui`: `<Inter>`
- `font_heading`: `<Geist>`
- `font_mono`: `<JetBrains Mono>`

### Shape and Depth

- `radius`: `<sm | md | lg | xl>`
- `shadow`: `<none | subtle | medium>`
- `motion`: `<none | minimal | moderate>`

### Core Colors (HSL)

Use `H S L` values without `hsl()`.

- `light_primary`: `<221 83% 53%>`
- `light_background`: `<0 0% 100%>`
- `light_foreground`: `<222 47% 11%>`
- `dark_primary`: `<221 83% 60%>`
- `dark_background`: `<222 47% 11%>`
- `dark_foreground`: `<210 40% 98%>`

## Rules

- Always use Tailwind semantic tokens (`bg-primary`, `text-foreground`, `border-border`).
- Do not use hex colors in component classes.
- If you change visual direction, update this file first.

## Mapping

- `light_*` maps to `:root` tokens in `src/styles.css`.
- `dark_*` maps to `.dark` tokens in `src/styles.css`.
