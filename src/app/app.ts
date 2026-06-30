import { Component, inject } from '@angular/core';

import { TimerDisplayComponent } from './components/timer-display/timer-display';
import { WorkoutSetupComponent } from './components/workout-setup/workout-setup';
import { WorkoutSummaryComponent } from './components/workout-summary/workout-summary';
import { WorkoutStateService } from './services/workout-state.service';

@Component({
  selector: 'app-root',
  imports: [WorkoutSetupComponent, TimerDisplayComponent, WorkoutSummaryComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly workout = inject(WorkoutStateService);
  protected readonly screen = this.workout.screen;
}
