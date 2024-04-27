export interface BetterRead {
  id: number;
  uid: string;
  articleId: number;
  created_at: Date;
}

export interface BetterReadImagePath {
  id: number;
  betterreadId: number;
  index: number;
  imagePath: string;
  created_at: Date;
}

export interface BetterReadImagePathView {
  betterreadId: number | null;
  uid: string | null;
  articleId: number | null;
  title: string | null;
  index: number | null;
  japanese: string | null;
  chinese: string | null;
  imagePath: string | null;
  created_at: Date | null;
}
