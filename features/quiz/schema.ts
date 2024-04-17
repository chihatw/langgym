export interface ArticlePitchQuiz {
  id: number;
  title: string;
  hasAudio: boolean;
  articleId: number;
  isDev: boolean;
  created_at: Date;
}

export interface ArticlePitchQuestion {
  id: number;
  line: number;
  lockedIndexes: number[]; // remote は text
  quizId: number;
  created_at: Date;
}

export interface ArticlePitchQuizAnswer {
  id: number;
  pitchStr: number;
  quizId: number;
  created_at: Date;
}
