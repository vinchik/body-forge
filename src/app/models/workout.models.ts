/** Muscle groups targeted by the exercises in the local pool. */
export type MuscleGroup =
  | 'Upper Abs'
  | 'Lower Abs'
  | 'Obliques'
  | 'Core'
  | 'Full Core';

/** A single bodyweight exercise from the local database. */
export interface Exercise {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly targetMuscleGroup: MuscleGroup;
}

/** User-defined workout configuration captured on the setup screen. */
export interface WorkoutConfig {
  /** Number of unique exercises to perform (3–15). */
  readonly exerciseCount: number;
  /** Active work period per exercise, in seconds (10–60). */
  readonly workSeconds: number;
  /** Rest period between exercises, in seconds (0–60). */
  readonly restSeconds: number;
}

/** Lifecycle phase of the workout engine. */
export type WorkoutPhase = 'idle' | 'prepare' | 'work' | 'rest' | 'complete';

/** High-level screen derived from the current phase. */
export type WorkoutScreen = 'setup' | 'active' | 'summary';
