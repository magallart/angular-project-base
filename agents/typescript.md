## TypeScript Agent

Better practices and strict paterns.

## Const Types Pattern

```typescript
// ✅ ALWAYS: Create const object first, then extract type
const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
} as const;

type Status = (typeof STATUS)[keyof typeof STATUS];

// ❌ NEVER: Direct union types
type Status = 'active' | 'inactive' | 'pending';
```

**Why?** Single source of truth, runtime values, autocomplete, easier refactoring.

## Flat Interfaces

```typescript
// ✅ ALWAYS: One level depth, nested objects → dedicated interface
interface UserAddress {
  street: string;
  city: string;
}

interface User {
  id: string;
  name: string;
  address: UserAddress; // Reference, not inline
}

interface Admin extends User {
  permissions: string[];
}

// ❌ NEVER: Inline nested objects
interface User {
  address: { street: string; city: string }; // NO!
}
```

## Never Use `any`

```typescript
// ✅ Use unknown for truly unknown types
function parse(input: unknown): User {
  if (isUser(input)) return input;
  throw new Error('Invalid input');
}

// ✅ Use generics for flexible types
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

// ❌ NEVER
function parse(input: any): any {}
```

## Utility Types

```typescript
Pick<User, 'id' | 'name'>; // Select fields
Omit<User, 'id'>; // Exclude fields
Partial<User>; // All optional
Required<User>; // All required
Readonly<User>; // All readonly
Record<string, User>; // Object type
Extract<Union, 'a' | 'b'>; // Extract from union
Exclude<Union, 'a'>; // Exclude from union
NonNullable<T | null>; // Remove null/undefined
ReturnType<typeof fn>; // Function return type
Parameters<typeof fn>; // Function params tuple
```

## Type Guards

```typescript
function isUser(value: unknown): value is User {
  return typeof value === 'object' && value !== null && 'id' in value && 'name' in value;
}
```

## Import Types

```typescript
import type { User } from './types';
import { createUser, type Config } from './utils';
```

## Nullability

- Prefer explicit unions for nullable values:
  - `User | null` (not implicit undefined)
- Avoid optional chaining cascades that hide logic.
- Always handle the “empty” state explicitly.

## `unknown` Policy

- `unknown` is allowed only when immediately narrowed:
  - Type guards
  - Schema validation (`zod`, etc.)
  - Exhaustive checks
- Never cast `unknown as T` without validation.

## Enums (Preferred Pattern)

- Prefer const objects + derived union types over TS enums.
- TS `enum` is discouraged unless interop requires it.

## Error Handling

- Never swallow errors silently.
- Prefer typed error results where appropriate:
  - `Result<T, E>` pattern or discriminated unions.

## Imports

- Use `import type` for types.
- Avoid circular dependencies; refactor shared types into dedicated modules.

## Type Design Principles

- Types should describe intent, not just shape.
- Prefer domain-specific types over primitives (`UserId` vs `string`).
- Avoid boolean flags when a union communicates better intent.

## Anti-Patterns

- Overusing generics where a concrete type is clearer.
- Large “god interfaces” reused across unrelated domains.
