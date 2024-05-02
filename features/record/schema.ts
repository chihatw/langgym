export interface Record {
  id: number;
  path: string;
  title: string;
  pitchStr: string;
  created_at: Date;
}

export interface RecordParams {
  id: number;
  title: string;
  pitchStr: string;
  created_at: Date;
}
