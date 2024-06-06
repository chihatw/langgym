export interface MirrorWorkout {
  id: number;
  uid: string;
  isDev: boolean;
}

export interface MirrorWorkoutView {
  id: number | null;
  uid: string | null;
  display: string | null;
  isDev: boolean | null;
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

export interface MirrorWorkoutResultItem {
  id: number;
  resultId: number;
  shuffledIndex: number;
  workoutItemIndex: number;
  isCorrect: boolean;
  lap: number;
}

export interface MirrorWorkoutResultItemView {
  id: number | null;
  resultId: number | null;
  shuffledIndex: number | null;
  workoutItemIndex: number | null;
  isCorrect: boolean | null;
  number: number | null;
  lap: number | null;
  totalTime: number | null;
  workoutId: number | null;
  uid: string | null;
  display: string | null;
  isDev: boolean | null;
}

export interface MirrorWorkoutRealtime {
  id: number;
  selectedId: string;
  isMirror: boolean;
}

export interface MirrorWorkoutRealtimeItem {
  id: string;
  item_1: string;
  item_2: string;
  item_back: string;
  highlights: number[];
  highlights_back: number[];
}
