export interface MirrorWorkout {
  id: number;
  uid: string;
  // items: string;
  isDev: boolean;
}
export interface MirrorWorkoutItem {
  id: number;
  index: number;
  number: number;
  workoutId: number;
}

export interface MirrorWorkoutItemView {
  id: number | null;
  index: number | null;
  number: number | null;
  workoutId: number | null;
  uid: string | null;
  isDev: boolean | null;
}

export interface MirrorWorkoutResult {
  id: number;
  items: string;
  selectedNumbers: number[];
  laps: number[];
  totalTime: number;
  workoutId: number;
}
