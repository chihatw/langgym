export interface ArticlePitchQuizAnswer {
  id: number;
  quizId: number;
  created_at: Date;
}

export interface ArticlePitchQuizAnswerView {
  id: number | null;
  title: string | null;
  display: string | null;
  articleId: number | null;
  quizId: number | null;
  hasAudio: boolean | null;
  audioPath: string | null;
  created_at: Date | null;
}

export interface ArticlePitchQuizAnswerRow {
  id: number;
  answerId: number;
  line: number;
  pitchStr: string;
  created_at: Date;
}

export interface ArticlePitchQuizAnswerRowView {
  id: number | null;
  answerId: number | null;
  hasAudio: boolean | null;
  audioPath: string | null;
  quizId: number | null;
  title: string | null;
  line: number | null;
  pitchStr: string | null;
  answer: string | null;
  lockedIndexes: number[] | null;
  start: number | null;
  end: number | null;
  created_at: Date | null;
}
