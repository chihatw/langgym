export interface BetterRead {
  id: number;
  uid: string;
  articleId: number;
  created_at: Date;
}

export interface BetterReadView {
  id: number | null;
  display: string | null;
  title: string | null;
  auther: string | null;
}

export interface BetterReadItem {
  id: number;
  betterread_id: number;
  image_url: string;
  created_at: Date;
}

export interface BetterReadItemView {
  id: number | null;
  image_url: string | null;
  item_created_at: Date | null;
  betterread_id: number | null;
  title: string | null;
  question_id: number | null;
  question: string | null;
  view_point: string | null;
  question_created_at: Date | null;
}

export interface BetterReadItemQuestion {
  id: number;
  betterread_item_id: number;
  view_point: string;
  question: string;
  created_at: Date;
}

export interface BetterreadToggle {
  id: number;
  betterread_id: number | null;
  view_points: number[];
  questions: number[];
}
