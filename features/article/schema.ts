export interface Article {
  id: number;
  uid: string;
  date: string;
  title: string;
  audioPath: string;
  isShowAccents: boolean;
  createdAt: number;
}

export interface Sentence {
  id: number;
  line: number;
  articleId: number;
  chinese: string;
  japanese: string;
  pitchStr: string;
  original: string;
  createdAt: number;
}
