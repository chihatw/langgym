export interface BetterRead {
  id: number;
  uid: string;
  articleId: number;
  created_at: Date;
}

export interface BetterReadView {
  id: number | null;
  uid: string | null;
  display: string | null;
  articleId: number | null;
  title: string | null;
  line: number | null;
  japanese: string | null;
  chinese: string | null;
}

export interface BetterReadItem {
  id: number;
  betterread_id: number;
  image_url: string;
  created_at: Date;
}

export interface BetterReadItemQuestion {
  id: number;
  betterread_item_id: number;
  question: string;
  created_at: Date;
}

export interface BetterReadImagePath {
  id: number;
  betterreadId: number;
  index: number;
  imageUrl: string | null;
  created_at: Date;
}

export interface BetterReadImagePathView {
  betterreadId: number | null;
  uid: string | null;
  display: string | null;
  articleId: number | null;
  title: string | null;
  index: number | null;
  japanese: string | null;
  chinese: string | null;
  imageUrl: string | null;
  created_at: Date | null;
}
