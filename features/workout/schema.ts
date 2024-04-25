export interface WorkoutFirstAudioPath {
  id: number;
  itemId: number;
  path: string;
}

export interface WorkoutSecondAudioPath {
  id: number;
  shuffledIds: number[];
  path: string;
}

export interface WorkoutFirst {
  id: number;
  japanese: string;
  pitchStr: string;
  chinese: string;
}

export interface Workout {
  id: number;
  uid: string;
  title: string;
  isReview: boolean;
  targetBPM: number;
  isDev: boolean;
  created_at: Date;
}

export interface WorkoutView {
  id: number | null;
  uid: string | null;
  display: string | null;
  title: string | null;
  isReview: boolean | null;
  targetBPM: number | null;
  isDev: boolean | null;
  created_at: Date | null;
}

export interface WorkoutItem {
  id: number;
  index: number;
  japanese: string;
  pitchStr: string;
  chinese: string;
  workoutId: number;
  created_at: Date;
}

export interface WorkoutItemView {
  id: number | null;
  workoutId: number | null;
  title: string | null;
  isReview: boolean | null;
  targetBPM: number | null;
  index: number | null;
  japanese: string | null;
  pitchStr: string | null;
  chinese: string | null;
  created_at: Date | null;
}

export interface WorkoutRecord {
  id: number;
  workoutId: number;
  bpm: number;
  audioPath: string;
  created_at: Date;
}

export interface WorkoutRecordRow {
  id: number;
  workoutRecordId: number;
  index: number;
  workoutItemId: number;
}
