import { Component, computed, inject } from '@angular/core';

import { WorkoutPhase } from '../../models/workout.models';
import { WorkoutStateService } from '../../services/workout-state.service';

/** Active workout screen: timer, current/next exercise, and transport controls. */
@Component({
  selector: 'app-timer-display',
  templateUrl: './timer-display.html',
  styleUrl: './timer-display.scss',
})
export class TimerDisplayComponent {
  private readonly workout = inject(WorkoutStateService);

  protected readonly phase = this.workout.phase;
  protected readonly remaining = this.workout.remainingSeconds;
  protected readonly isPaused = this.workout.isPaused;
  protected readonly currentExercise = this.workout.currentExercise;
  protected readonly nextExercise = this.workout.nextExercise;
  protected readonly currentIndex = this.workout.currentIndex;
  protected readonly totalExercises = this.workout.totalExercises;

  /** Circumference of the progress ring (r = 140). */
  protected readonly ringCircumference = 2 * Math.PI * 140;

  protected readonly phaseLabel = computed<string>(() => {
    switch (this.phase()) {
      case 'prepare':
        return 'Get Ready';
      case 'work':
        return 'Work';
      case 'rest':
        return 'Rest';
      default:
        return '';
    }
  });

  protected readonly isResting = computed(() => this.phase() === 'rest');
  protected readonly isPreparing = computed(() => this.phase() === 'prepare');

  /** Stroke offset that shrinks as the phase progresses. */
  protected readonly ringOffset = computed(
    () => this.ringCircumference * (1 - this.workout.phaseProgress()),
  );

  protected readonly headline = computed<string>(() => {
    const phase: WorkoutPhase = this.phase();
    if (phase === 'prepare') {
      return this.currentExercise()?.name ?? 'First exercise';
    }
    if (phase === 'rest') {
      return 'Rest & breathe';
    }
    return this.currentExercise()?.name ?? '';
  });

  protected togglePause(): void {
    this.workout.togglePause();
  }

  protected skip(): void {
    this.workout.skip();
  }

  protected reset(): void {
    this.workout.reset();
  }
}
