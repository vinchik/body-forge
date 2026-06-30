import { computed, inject, Service, signal } from '@angular/core';

import { EXERCISE_POOL } from '../data/exercises';
import { Exercise, WorkoutConfig, WorkoutPhase, WorkoutScreen } from '../models/workout.models';
import { AudioService } from './audio.service';

/** Sensible default configuration shown on the setup screen. */
export const DEFAULT_CONFIG: WorkoutConfig = {
  exerciseCount: 6,
  workSeconds: 30,
  restSeconds: 15,
};

/** Length of the "Get Ready" preparation countdown, in seconds. */
const PREPARE_SECONDS = 3;

/**
 * Central, signal-based control service for the entire workout lifecycle. It owns
 * the timer, the active phase, and the selected exercises, exposing read-only
 * signals to the UI. All transitions flow through this single source of truth.
 */
@Service()
export class WorkoutStateService {
  readonly #audio = inject(AudioService);

  // --- Writable state -------------------------------------------------------
  readonly #config = signal<WorkoutConfig>(DEFAULT_CONFIG);
  readonly #exercises = signal<readonly Exercise[]>([]);
  readonly #phase = signal<WorkoutPhase>('idle');
  readonly #currentIndex = signal(0);
  readonly #remaining = signal(0);
  readonly #paused = signal(false);
  readonly #elapsed = signal(0);

  #timerId: ReturnType<typeof setInterval> | null = null;

  // --- Public read-only signals --------------------------------------------
  readonly config = this.#config.asReadonly();
  readonly exercises = this.#exercises.asReadonly();
  readonly phase = this.#phase.asReadonly();
  readonly currentIndex = this.#currentIndex.asReadonly();
  readonly remainingSeconds = this.#remaining.asReadonly();
  readonly isPaused = this.#paused.asReadonly();
  readonly elapsedSeconds = this.#elapsed.asReadonly();

  /** Which top-level screen should be shown. */
  readonly screen = computed<WorkoutScreen>(() => {
    switch (this.#phase()) {
      case 'idle':
        return 'setup';
      case 'complete':
        return 'summary';
      default:
        return 'active';
    }
  });

  readonly totalExercises = computed(() => this.#exercises().length);

  readonly currentExercise = computed<Exercise | null>(
    () => this.#exercises()[this.#currentIndex()] ?? null,
  );

  readonly nextExercise = computed<Exercise | null>(
    () => this.#exercises()[this.#currentIndex() + 1] ?? null,
  );

  /** Total seconds in the current phase, used to drive the progress ring. */
  readonly phaseTotalSeconds = computed(() => {
    switch (this.#phase()) {
      case 'prepare':
        return PREPARE_SECONDS;
      case 'work':
        return this.#config().workSeconds;
      case 'rest':
        return this.#config().restSeconds;
      default:
        return 0;
    }
  });

  /** Fraction (0–1) of the current phase that has elapsed. */
  readonly phaseProgress = computed(() => {
    const total = this.phaseTotalSeconds();
    if (total <= 0) {
      return 0;
    }
    return Math.min(1, (total - this.#remaining()) / total);
  });

  // --- Public commands ------------------------------------------------------

  /** Build a workout from the given config and begin the prepare countdown. */
  startWorkout(config: WorkoutConfig): void {
    this.stopTimer();
    this.#audio.unlock();

    this.#config.set(config);
    this.#exercises.set(this.#pickExercises(config.exerciseCount));
    this.#currentIndex.set(0);
    this.#elapsed.set(0);
    this.#paused.set(false);
    this.#enterPhase('prepare', PREPARE_SECONDS);
    this.startTimer();
  }

  togglePause(): void {
    if (this.#phase() === 'idle' || this.#phase() === 'complete') {
      return;
    }
    if (this.#paused()) {
      this.#paused.set(false);
      this.startTimer();
    } else {
      this.#paused.set(true);
      this.stopTimer();
    }
  }

  /** Immediately end the current phase and advance to the next one. */
  skip(): void {
    if (this.screen() !== 'active') {
      return;
    }
    this.#advancePhase();
  }

  /** Abort the workout and return to the setup screen. */
  reset(): void {
    this.stopTimer();
    this.#phase.set('idle');
    this.#paused.set(false);
    this.#remaining.set(0);
    this.#currentIndex.set(0);
    this.#elapsed.set(0);
  }

  // --- Internal engine ------------------------------------------------------

  #pickExercises(count: number): readonly Exercise[] {
    const clamped = Math.min(count, EXERCISE_POOL.length);
    const shuffled = [...EXERCISE_POOL];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, clamped);
  }

  #enterPhase(phase: WorkoutPhase, seconds: number): void {
    this.#phase.set(phase);
    this.#remaining.set(seconds);
  }

  startTimer(): void {
    this.stopTimer();
    this.#timerId = setInterval(() => this.#tick(), 1000);
  }

  stopTimer(): void {
    if (this.#timerId !== null) {
      clearInterval(this.#timerId);
      this.#timerId = null;
    }
  }

  #tick(): void {
    this.#elapsed.update((value) => value + 1);
    const next = this.#remaining() - 1;

    if (next <= 0) {
      this.#advancePhase();
      return;
    }

    this.#remaining.set(next);
    if (next <= 3) {
      this.#audio.beep();
    }
  }

  #advancePhase(): void {
    const phase = this.#phase();
    const { restSeconds } = this.#config();
    const isLast = this.#currentIndex() >= this.#exercises().length - 1;

    if (phase === 'prepare') {
      this.#beginWork(0);
      return;
    }

    if (phase === 'work') {
      if (isLast) {
        this.#complete();
      } else if (restSeconds > 0) {
        this.#enterPhase('rest', restSeconds);
        this.#audio.restChime();
      } else {
        this.#beginWork(this.#currentIndex() + 1);
      }
      return;
    }

    if (phase === 'rest') {
      this.#beginWork(this.#currentIndex() + 1);
      return;
    }
  }

  #beginWork(index: number): void {
    this.#currentIndex.set(index);
    this.#enterPhase('work', this.#config().workSeconds);
    this.#audio.workChime();
  }

  #complete(): void {
    this.stopTimer();
    this.#phase.set('complete');
    this.#remaining.set(0);
    this.#paused.set(false);
    this.#audio.finishFanfare();
  }
}
