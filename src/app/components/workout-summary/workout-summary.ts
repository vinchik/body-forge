import { Component, computed, inject } from '@angular/core';

import { WorkoutStateService } from '../../services/workout-state.service';

/** Celebration screen shown once the workout completes. */
@Component({
  selector: 'app-workout-summary',
  templateUrl: './workout-summary.html',
  styleUrl: './workout-summary.scss',
})
export class WorkoutSummaryComponent {
  private readonly workout = inject(WorkoutStateService);

  protected readonly exercises = this.workout.exercises;
  protected readonly totalExercises = this.workout.totalExercises;

  protected readonly elapsedLabel = computed<string>(() => {
    const total = this.workout.elapsedSeconds();
    const minutes = Math.floor(total / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (total % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  });

  protected newWorkout(): void {
    this.workout.reset();
  }
}
