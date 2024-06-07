export interface MirrorWorkoutResult {
  id: number;
  items: string; // JSON.stringify で出題を保存
  selectedNumbers: number[];
  laps: number[]; // 復活？
  totalTime: number;
  created_at: Date;
  correctRatio: number;
  uid: string;
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
