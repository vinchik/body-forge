import { Component, inject, signal } from '@angular/core';

import { WorkoutConfig } from '../../models/workout.models';
import { DEFAULT_CONFIG, WorkoutStateService } from '../../services/workout-state.service';

/** Setup screen: lets the user configure the workout before starting. */
@Component({
  selector: 'app-workout-setup',
  templateUrl: './workout-setup.html',
  styleUrl: './workout-setup.scss',
})
export class WorkoutSetupComponent {
  readonly #workout = inject(WorkoutStateService);

  protected readonly exerciseCount = signal(DEFAULT_CONFIG.exerciseCount);
  protected readonly workSeconds = signal(DEFAULT_CONFIG.workSeconds);
  protected readonly restSeconds = signal(DEFAULT_CONFIG.restSeconds);

  protected readonly minExercises = 3;
  protected readonly maxExercises = 15;
  protected readonly minWork = 10;
  protected readonly maxWork = 60;
  protected readonly minRest = 0;
  protected readonly maxRest = 60;

  protected onExerciseCount(value: string): void {
    this.exerciseCount.set(Number(value));
  }

  protected onWorkSeconds(value: string): void {
    this.workSeconds.set(Number(value));
  }

  protected onRestSeconds(value: string): void {
    this.restSeconds.set(Number(value));
  }

  protected start(): void {
    const config: WorkoutConfig = {
      exerciseCount: this.exerciseCount(),
      workSeconds: this.workSeconds(),
      restSeconds: this.restSeconds(),
    };
    this.#workout.startWorkout(config);
  }
}
