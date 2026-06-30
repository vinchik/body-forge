---
applyTo: '**/*.ts, **/*.html, **/*.scss'
description: 'Angular v22 coding standards and best practices'
---

# Angular v22 Instructions

Follow the project-wide Angular and TypeScript conventions captured in
[copilot-instructions.md](../copilot-instructions.md). Key reminders:

- Standalone components only; never set `standalone: true` (it is the default).
- Do not set `changeDetection: ChangeDetectionStrategy.OnPush` explicitly — it is the default in v22+.
- Use signals (`signal`, `computed`, `linkedSignal`, `resource`) for state.
- Use `input()` / `output()` functions, not decorators.
- Use `inject()` instead of constructor injection.
- Prefer the `@Service` decorator over `@Injectable({ providedIn: 'root' })` for new singletons.
- Use native control flow (`@if`, `@for`, `@switch`) — never `*ngIf`/`*ngFor`/`*ngSwitch`.
- Use `class`/`style` bindings instead of `ngClass`/`ngStyle`.
- Use `NgOptimizedImage` for static images.
- Prefer Signal Forms (`@angular/forms/signals`) for new forms; otherwise Reactive forms.
- Lazy-load feature routes.
