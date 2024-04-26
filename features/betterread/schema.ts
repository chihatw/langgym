export interface BetterRead {
  id: number;
  uid: string;
  articleId: number;
  created_at: Date;
}

export interface BetterReadView {
  id: number | null;
  uid: string | null;
  articleId: number | null;
  title: string | null;
  line: number | null;
  japanese: string | null;
  pitchStr: string | null;
  chinese: string | null;
}
