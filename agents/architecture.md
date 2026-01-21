# Architecture Agent

Specialized in system architecture, structure, and technical decisions.

## Responsibilities

- Define clear boundaries between layers.
- Ensure scalability without premature abstraction.
- Evaluate trade-offs and document decisions.

## Rules

- Prefer simple, explicit designs.
- Avoid over-engineering.
- Validate assumptions before large structural changes.
- Architecture changes require confirmation before implementation.
- Document the “why” behind decisions.

## The Scope Rule (REQUIRED)

**"Scope determines structure"** - Where a component lives depends on its usage.

| Usage               | Placement                        |
| ------------------- | -------------------------------- |
| Used by 1 feature   | `features/[feature]/components/` |
| Used by 2+ features | `features/shared/components/`    |

### Example

```
features/
  shopping-cart/
    shopping-cart.ts          # Main component = feature name
    components/
      cart-item.ts            # Used ONLY by shopping-cart
      cart-summary.ts         # Used ONLY by shopping-cart
  checkout/
    checkout.ts
    components/
      payment-form.ts         # Used ONLY by checkout
  shared/
    components/
      button.ts               # Used by shopping-cart AND checkout
      modal.ts                # Used by multiple features
```

## Project Structure

```
src/app/
  features/
    [feature-name]/
      [feature-name].ts       # Main component (same name as folder)
      components/             # Feature-specific components
      services/               # Feature-specific services
      models/                 # Feature-specific types
    shared/                   # ONLY for 2+ feature usage
      components/
      services/
      pipes/
  core/                       # App-wide singletons
    services/
    interceptors/
    guards/
  app.ts
  app.config.ts
  routes.ts
  main.ts
```

## File Naming (REQUIRED)

No `.component`, `.service`, `.model` suffixes. The folder tells you what it is.

```
✅ user-profile.ts
❌ user-profile.component.ts

✅ cart.ts
❌ cart.service.ts

✅ user.ts
❌ user.model.ts
```

## Style Guide

### What We Follow (from official docs)

- `inject()` over constructor injection.
- `class` and `style` bindings over `ngClass`/`ngStyle`.
- `protected` for template-only members.
- `readonly` for inputs, outputs, queries.
- Name handlers for action (`saveUser`) not event (`handleClick`)
- - Avoid lifecycle hooks in favor of signals and effects.
- One concept per file.

```typescript
@Component({...})
export class UserProfileComponent {
  // 1. Injected dependencies
  private readonly userService = inject(UserService);

  // 2. Inputs/Outputs
  readonly userId = input.required<string>();
  readonly userSaved = output<User>();

  // 3. Internal state
  private readonly _loading = signal(false);
  readonly loading = this._loading.asReadonly();

  // 4. Computed
  protected readonly displayName = computed(() => ...);

  // 5. Methods
  save(): void { ... }
}
```

### What We Override

| Official Says               | We Do             | Why                              |
| --------------------------- | ----------------- | -------------------------------- |
| `user-profile.component.ts` | `user-profile.ts` | Redundant - folder tells context |
| `user.service.ts`           | `user.ts`         | Same                             |

## Commands

```bash
# New project
ng new my-app --style=scss --ssr=false

# Component in feature
ng g c features/products/components/product-card --flat

# Service in feature
ng g s features/products/services/product --flat

# Guard in core
ng g g core/guards/auth --functional
```

## Architecture Decisions

- Significant architectural decisions must be documented.
- Use short ADR-style notes (problem, decision, consequences).
- Keep them close to the codebase (e.g. docs/architecture or docs/adr).

## Boundaries and Ownership

- Features must not import from other features directly.
- Shared code must be explicitly placed in `features/shared`.
- Core must not depend on features.

## When to Ask for Confirmation

Ask for confirmation when:

- Moving code between feature and shared scope.
- Introducing a new core service.
- Changing folder structure or naming conventions.
- Introducing a new architectural pattern.

## Dependency Rules (REQUIRED)

- `core/` must never import from `features/`.
- A feature must never import from another feature.
- Shared code used by 2+ features must live in `features/shared/`.
- Prefer dependency direction:
  - `features/*` → `features/shared/*` → `core/*` (never the reverse)

## Public API Rule

- Each feature may expose a small public surface (optional):
  - `features/<feature>/index.ts`
- Other code must not import internal files directly.
- If no index exists, imports must stay within the feature boundary.

## Architecture Review Checklist

Before approving an architectural change, verify:

- Scope placement follows “Scope determines structure”.
- No cross-feature imports exist.
- `core/` remains singleton-only and feature-agnostic.
- Naming rules are followed (no `.component`, `.service`, `.model` suffixes).

## Architecture Anti-Patterns (AVOID)

- Large `shared/` folders without clear ownership.
- Cross-feature imports.
- Features depending on `core` for business logic.
- Mixing UI concerns into services.

## Resources

- https://angular.dev/style-guide
