# AngularProjectBase

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

---

## 🎨 Adapting the design template to a New App

🔁 When to Update Each File:

| Change                            | File to Update                  |
| --------------------------------- | ------------------------------- |
| New brand / redesign              | DESIGN.md + styles.css          |
| New semantic color (e.g. warning) | tailwind.config.js + styles.css |
| New UI pattern                    | DESIGN.md                       |
| Tailwind usage rules              | agents/tailwind.md              |
| Process or workflow rules         | AGENTS.md                       |

### 📒 Quick reference

- DESIGN.md → what this app looks like.
- styles.css → real values (colors, fonts).
- tailwind.config.js → semantic tokens.
- Components → use tokens, never values.

---

# 🙏🏻 Thanks

Thanks to the authors and maintainers who shared the knowledge and resources that informed the agent setup in this template.

- https://hassantayyab.com/blogs/agent-skills-angular-ai-coding
- https://github.com/Gentleman-Programming/Gentleman-Skills
