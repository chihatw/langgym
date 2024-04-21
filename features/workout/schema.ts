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
