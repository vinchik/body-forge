Act as a Senior Angular Architect and Senior UX/UI Developer. Implement a mobile-first, highly attractive, modern, and fully responsive HIIT/Tabata workout application. This is a client-only (frontend-only) application using Angular 22.

Ensure the code adheres strictly to modern Angular best practices: standalone components, strict typing, clean architecture, and reactive state management using Angular Signals.

\### 1. UX/UI & Design Requirements

\- \*\*Mobile-First Design:\*\* Optimized entirely for mobile viewports (clean, centered container if viewed on desktop).

\- \*\*Theme:\*\* Modern, high-energy dark mode (e.g., deep slates/blacks with vibrant neon accents like emerald green for work, coral red for rest, and electric blue for interactive elements).

\- \*\*Visual Feedback:\*\* Large, high-visibility countdown timer, progress bars, and smooth micro-interactions/transitions. Use Tailwind CSS or standard CSS variables for styling.

\### 2. Functional Requirements & Application Flow

\- \*\*Setup Screen:\*\* Form inputs allowing the user to configure:

&#x20; \- Number of exercises (Dropdown or Slider, e.g., 3 to 15).

&#x20; \- Work period (10 seconds to 60 seconds).

&#x20; \- Rest period (0 seconds to 60 seconds).

&#x20; \- A "Start Workout" action button.

\- \*\*Workout Engine & Local Data:\*\*

&#x20; \- Mock a local database array of at least 15 distinct bodyweight/calisthenics exercises (e.g., Push-ups, Squats, Plank, Burpees, Lunges) with a \`name\`, \`description\`, and \`targetMuscleGroup\`.

&#x20; \- On start, randomly select the requested number of unique exercises from this pool.

\- \*\*Active Workout Screen:\*\* - \*\*Preparation Phase:\*\* A 3-second countdown before the first exercise starts.

&#x20; \- \*\*Work/Rest Cycles:\*\* Loops sequentially through the chosen exercises. For each exercise, alternate between the specified Work period and Rest period.

&#x20; \- \*\*Visuals:\*\* Display the current exercise name, an indication of the next upcoming exercise, a massive countdown timer, and a global progress indicator (e.g., "Exercise 3 of 8").

&#x20; \- \*\*Audio/Haptic Cues:\*\* Use the Web Audio API to play a clean beep sound during the last 3 seconds of any countdown and a distinct chime when transitioning between work and rest.

&#x20; \- \*\*Controls:\*\* Pause, Resume, and Skip/Reset buttons.

\- \*\*Summary Screen:\*\* Once the workout completes, show a celebration state detailing the total time elapsed and a summary list of the completed exercises.

\### 3. Technical & Code Quality Constraints

\- \*\*State Management:\*\* Use Angular Signals exclusively for managing timer states, active phases, and UI configurations. No legacy RxJS interval logic unless wrapped safely within an effect or signal pipeline.

\- \*\*Component Architecture:\*\* Split into clean standalone components (e.g., \`WorkoutSetupComponent\`, \`TimerDisplayComponent\`, \`WorkoutSummaryComponent\`) managed by a central control service (\`WorkoutStateService\`).

\- \*\*Clean Code:\*\* Use strict TypeScript types/interfaces for all models (\`Exercise\`, \`WorkoutConfig\`, \`WorkoutState\`). Ensure zero \`any\` types.

\- \*\*Performance:\*\* Optimize change detection using \`ChangeDetectionStrategy.OnPush\` implicitly enforced by Signals. Clean up all browser intervals/timeouts on component destruction (\`ngOnDestroy\` or \`destroyRef\`).

Provide the complete, clean code implementation across logical file boundaries (Components, Services, Interfaces) without omitting core logic.
