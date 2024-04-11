import { Article, Sentence } from './schema';

export const DUMMY_ARTICLES: Article[] = [
  {
    id: 1,
    uid: 'dummy',
    date: '20240101',
    title: 'ダミー1',
    audioPath: '',
    isShowAccents: true,
    created_at: 1712716400705,
  },
  {
    id: 2,
    uid: 'dummy',
    date: '20240102',
    title: 'ダミー2',
    audioPath: '',
    isShowAccents: true,
    created_at: 1712716400706,
  },
];

export const DUMMY_SENTENCES: Sentence[] = [
  {
    id: 1,
    line: 0,
    articleId: 1,
    chinese: '你好',
    japanese: 'こんにちは',
    pitchStr: 'こんにちは',
    original: 'こんにちは',
    created_at: 1712716400705,
  },
  {
    id: 2,
    line: 1,
    articleId: 1,
    chinese: '這是麵包',
    japanese: 'これはパンです。',
    pitchStr: 'これは　パ＼ンです',
    original: 'これはラーメンです。',
    created_at: 1712716400706,
  },
  {
    id: 3,
    line: 0,
    articleId: 2,
    chinese: '謝謝',
    japanese: 'ありがとうございます。',
    pitchStr: 'ありがと＼ー　ございま＼す',
    original: 'ありがとございす',
    created_at: 1712716400707,
  },
];

export const INITIAL_ARTICLE: Article = {
  id: 0,
  uid: '',
  date: '',
  title: '',
  audioPath: '',
  isShowAccents: false,
  created_at: 0,
};

export const INITIAL_SENTENCE: Sentence = {
  id: 0,
  line: 0,
  articleId: 0,
  chinese: '',
  japanese: '',
  pitchStr: '',
  original: '',
  created_at: 0,
};
