import { Article, Sentence } from './schema';

export const INITIAL_ARTICLE: Article = {
  id: 0,
  uid: '',
  date: '',
  title: '',
  audioPath: '',
  isShowAccents: false,
  created_at: new Date(),
};

export const INITIAL_SENTENCE: Sentence = {
  id: 0,
  line: 0,
  articleId: 0,
  chinese: '',
  japanese: '',
  pitchStr: '',
  original: '',
  created_at: new Date(),
};
