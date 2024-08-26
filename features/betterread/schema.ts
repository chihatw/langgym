export interface BetterRead {
  id: number;
  uid: string;
  articleId: number;
  created_at: Date;
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
