import { Component, inject } from '@angular/core';

import { TimerDisplayComponent } from './components/timer-display/timer-display';
import { WorkoutSetupComponent } from './components/workout-setup/workout-setup';
import { WorkoutSummaryComponent } from './components/workout-summary/workout-summary';
import { AudioService } from './services/audio.service';
import { WorkoutStateService } from './services/workout-state.service';

@Component({
  selector: 'app-root',
  imports: [WorkoutSetupComponent, TimerDisplayComponent, WorkoutSummaryComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly workout = inject(WorkoutStateService);
  private readonly audio = inject(AudioService);

  protected readonly screen = this.workout.screen;
  protected readonly soundEnabled = this.audio.enabled;

  protected toggleSound(): void {
    this.audio.toggle();
  }
}
