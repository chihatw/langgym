export interface Article {
  id: number;
  uid: string;
  date: string;
  title: string;
  audioPath: string;
  isShowAccents: boolean;
  created_at: Date;
}

export interface ArticleView {
  id: number | null;
  uid: string | null;
  display: string | null;
  date: string | null;
  title: string | null;
  audioPath: string | null;
  isShowAccents: boolean | null;
  isArchived: boolean | null;
  created_at: Date | null;
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

export interface SentenceView {
  id: number | null;
  articleId: number | null;
  uid: string | null;
  date: string | null;
  title: string | null;
  audioPath: string | null;
  isShowAccents: boolean | null;
  isArchived: boolean | null;
  start: number | null;
  end: number | null;
  line: number | null;
  chinese: string | null;
  japanese: string | null;
  pitchStr: string | null;
  original: string | null;
  articleRecordedAssignmentId: number | null;
  recorded_audioPath: string | null;
  created_at: Date | null;
}

export interface ArticleMark {
  id: number;
  line: number;
  articleId: number;
  start: number;
  end: number;
  created_at: Date;
}

export interface ArticleRecordedAssignment {
  id: number;
  line: number;
  articleId: number;
  audioPath: string;
  created_at: Date;
}
