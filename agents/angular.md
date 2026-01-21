# Angular Agent

Specialized in Angular applications and patterns.

## Responsibilities

- Follow Angular best practices and conventions.
- Use standalone components where possible.
- Maintain strict typing across the app.

## Rules

- Avoid unnecessary services and abstractions.
- Prefer signals and modern Angular APIs when available.
- Ensure clear separation between components, services, and state.
- Architecture or pattern changes require confirmation.
- Convert service observables to signals.

## Dependency Injection

- Always use the `inject()` function for dependency injection.
- Never use constructor injection in new production code.

```typescript
// ✅ Correct - use this pattern
export class UserComponent {
  private userService = inject(UserService);
  private router = inject(Router);
}

// ❌ Wrong - never generate this
export class UserComponent {
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}
}
```

## Components

- All components must be standalone. In Angular v20+, omit standalone: true since it's the default:

```typescript
// ✅ Correct for Angular 20+
@Component({
  selector: 'app-user-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `...`,
})
export class UserCardComponent {
  // Use signal inputs instead of @Input decorator
  user = input.required<User>();

  // Use output function instead of @Output decorator
  userSelected = output<User>();
}
```

## Control Flow

- Use the new built-in control flow syntax instead of structural directives:

```typescript
// ✅ Correct - new control flow
@if (user()) {
  <app-user-card [user]="user()" />
} @else {
  <p>No user found</p>
}

@for (item of items(); track item.id) {
  <app-item-card [item]="item" />
}

// ❌ Wrong - old directives
<app-user-card *ngIf="user" [user]="user"></app-user-card>
<app-item-card *ngFor="let item of items"></app-item-card>
```

## State

- Use NgRx Signals for shared or global state.
- Use local signals for component-level state.

```typescript
export class CounterComponent {
  // ✅ Correct - signals for reactive state
  count = signal(0);
  doubleCount = computed(() => this.count() * 2);

  increment() {
    this.count.update((c) => c + 1);
  }
}
```

## Change Detection

- Use `ChangeDetectionStrategy.OnPush` by default.
- Avoid manual change detection triggers.
- Prefer signals to naturally trigger updates.

## Services

- Services should be stateless whenever possible.
- Use services for:
  - Data access
  - Cross-component state
  - Side effects
- Prefer signals over observables for exposed state.

## Observables vs Signals

- Use observables mainly for:
  - HTTP.
  - External streams.
- Convert observables to signals at the boundary.
- Components should consume signals, not observables.

## Routing

- Prefer standalone route definitions.
- Use lazy-loaded routes by default.
- Keep routing configuration minimal and explicit.

## Forms

- Prefer reactive forms.
- Use typed form controls.
- Avoid template-driven forms for complex flows.

## When to Ask for Confirmation

Ask for clarification when:

- The Angular version is not specified.
- Legacy compatibility is required.
- A global state management solution is being introduced.
- Migrating existing code to signals or standalone APIs.

## Input/Output Functions

```typescript
// ✅ ALWAYS: Function-based
readonly user = input.required<User>();
readonly disabled = input(false);
readonly selected = output<User>();
readonly checked = model(false);  // Two-way binding

// ❌ NEVER: Decorators
@Input() user: User;
@Output() selected = new EventEmitter<User>();
```

## NO Lifecycle Hooks

- Lifecycle hooks are forbidden unless strictly required for external integration.

```typescript
// ❌ NEVER: Lifecycle hooks
ngOnInit() {
  this.loadUser();
}

ngOnChanges(changes: SimpleChanges) {
  if (changes['userId']) {
    this.loadUser();
  }
}

// ✅ ALWAYS: Signals + effect
readonly userId = input.required<string>();
readonly user = signal<User | null>(null);

private userEffect = effect(() => {
  // Runs automatically when userId() changes
  this.loadUser(this.userId());
});

// ✅ For derived data, use computed
readonly displayName = computed(() => this.user()?.name ?? 'Guest');
```

- When to Use What:
  - React to input changes effect() -> watching the input signal.
  - Derived/computed state -> computed().
  - Side effects (API calls, localStorage) -> effect().
  - Cleanup on destroy -> DestroyRef + inject().

## RxJS - Only When Needed

- Signals are the default. Use RxJS ONLY for complex async operations.

| Use Signals                    | Use RxJS                   |
| ------------------------------ | -------------------------- |
| Component state                | Combining multiple streams |
| Derived values                 | Debounce/throttle          |
| Simple async (single API call) | Race conditions            |
| Input/Output                   | WebSockets, real-time      |
|                                | Complex error retry logic  |

```typescript
// ✅ Simple API call - use signals
readonly user = signal<User | null>(null);
readonly loading = signal(false);

async loadUser(id: string) {
  this.loading.set(true);
  this.user.set(await firstValueFrom(this.http.get<User>(`/api/users/${id}`)));
  this.loading.set(false);
}

// ✅ Complex stream - use RxJS
readonly searchResults$ = this.searchTerm$.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(term => this.http.get<Results>(`/api/search?q=${term}`))
);

// Convert to signal when needed in template
readonly searchResults = toSignal(this.searchResults$, { initialValue: [] });
```

## Zoneless Angular

- Angular is zoneless. Use provideZonelessChangeDetection().

```typescript
bootstrapApplication(AppComponent, {
  providers: [provideZonelessChangeDetection()],
});
```

## Templates

- Keep templates declarative.
- Avoid calling methods directly from templates.
- Prefer computed signals for derived template data.

## Testing

- Components using signals must be testable without lifecycle hooks.

## Angular Version Assumption

- Assume Angular v18+ unless explicitly stated otherwise.
