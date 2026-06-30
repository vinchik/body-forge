import { Exercise } from '../models/workout.models';

/**
 * Local "database" of bodyweight core exercises. This list is intentionally kept
 * as plain data so it can be extended (or swapped for a real API) later without
 * touching the workout engine.
 */
export const EXERCISE_POOL: readonly Exercise[] = [
  {
    id: 1,
    name: 'Seated In/Outs',
    description:
      'Sit balanced on your glutes, lean back slightly, then extend and tuck both legs in and out without letting your feet touch the floor.',
    targetMuscleGroup: 'Lower Abs',
  },
  {
    id: 2,
    name: 'Laying Leg Raises',
    description:
      'Lie flat on your back and raise both straight legs to vertical, then lower them slowly without touching the ground.',
    targetMuscleGroup: 'Lower Abs',
  },
  {
    id: 3,
    name: 'Chair Sit Ups',
    description:
      'With your calves resting on a chair and knees bent at 90°, perform controlled sit-ups to fully contract the upper abs.',
    targetMuscleGroup: 'Upper Abs',
  },
  {
    id: 4,
    name: 'Russian Twists',
    description:
      'Sit with knees bent and feet lifted, lean back, and rotate your torso side to side, tapping the floor by each hip.',
    targetMuscleGroup: 'Obliques',
  },
  {
    id: 5,
    name: 'Alternating Single Leg Raises',
    description:
      'Lying on your back, raise one straight leg to vertical while the other hovers, alternating in a controlled rhythm.',
    targetMuscleGroup: 'Lower Abs',
  },
  {
    id: 6,
    name: 'Leg Flutters',
    description:
      'Lie on your back with legs straight and slightly raised, then rapidly flutter them up and down in small alternating kicks.',
    targetMuscleGroup: 'Lower Abs',
  },
  {
    id: 7,
    name: 'Plank Hold',
    description:
      'Hold a forearm plank with a straight line from head to heels, bracing your core and glutes the entire time.',
    targetMuscleGroup: 'Core',
  },
  {
    id: 8,
    name: 'Switching Mountain Climbers',
    description:
      'From a high plank, explosively drive your knees toward your chest one at a time as if sprinting in place.',
    targetMuscleGroup: 'Full Core',
  },
  {
    id: 9,
    name: 'Plank Knees to Elbows',
    description:
      'From a forearm plank, alternately bring each knee forward to touch or approach the same-side elbow.',
    targetMuscleGroup: 'Core',
  },
  {
    id: 10,
    name: 'Straight Arm Side Plank',
    description:
      'Balance on one extended arm and the side of your foot, stacking your body in a straight line and holding steady.',
    targetMuscleGroup: 'Obliques',
  },
  {
    id: 11,
    name: 'Side Plank Raises',
    description:
      'In a side plank, lower your hips toward the floor and raise them back up, driving the movement through your obliques.',
    targetMuscleGroup: 'Obliques',
  },
  {
    id: 12,
    name: 'Crucifix',
    description:
      'Lie flat with arms out wide; keep legs straight and lower them to one side, then the other, resisting with your core.',
    targetMuscleGroup: 'Lower Abs',
  },
  {
    id: 13,
    name: 'Bicycles',
    description:
      'Lying on your back, cycle your legs while rotating your torso to bring each elbow toward the opposite knee.',
    targetMuscleGroup: 'Obliques',
  },
  {
    id: 14,
    name: 'Sideway Crunches',
    description:
      'Lie with both knees dropped to one side and crunch straight up to isolate the obliques, then switch sides.',
    targetMuscleGroup: 'Obliques',
  },
  {
    id: 15,
    name: 'Boat Hold',
    description:
      'Balance on your glutes with legs and torso lifted into a V-shape, holding the position while keeping your spine long.',
    targetMuscleGroup: 'Core',
  },
] as const;
