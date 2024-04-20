export interface ArticlePitchQuiz {
  id: number;
  title: string;
  hasAudio: boolean;
  articleId: number;
  isDev: boolean;
  created_at: Date;
}

export interface ArticlePitchQuizView {
  id: number | null;
  articleId: number | null;
  uid: string | null;
  display: string | null;
  title: string | null;
  hasAudio: boolean | null;
  isDev: boolean | null;
  audioPath: string | null;
  created_at: Date | null;
}

export interface ArticlePitchQuestion {
  id: number;
  line: number;
  lockedIndexes: number[];
  quizId: number;
  created_at: Date;
}

export interface ArticlePitchQuestionView {
  id: number | null;
  quizId: number | null;
  title: string | null;
  hasAudio: boolean | null;
  isDev: boolean | null;
  articleId: number | null;
  audioPath: string | null;
  uid: string | null;
  line: number | null;
  japanese: string | null;
  pitchStr: string | null;
  start: number | null;
  end: number | null;
  lockedIndexes: number[] | null;
}
