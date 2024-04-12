export interface Article {
  id: number;
  uid: string;
  date: string;
  title: string;
  audioPath: string;
  isShowAccents: boolean;
  created_at: Date;
}

export interface Sentence {
  id: number;
  line: number;
  articleId: number;
  chinese: string;
  japanese: string;
  pitchStr: string;
  original: string;
  created_at: Date;
}
