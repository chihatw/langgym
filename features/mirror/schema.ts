export interface MirrorWorkout {
  id: number;
  uid: string;
  items: string;
  isDev: boolean;
}

export interface MirrorWorkoutResult {
  id: number;
  items: string;
  selectedNumbers: number[];
  laps: number[];
  totalTime: number;
  workoutId: number;
}
