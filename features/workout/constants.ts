import { WorkoutFirst } from './schema';

export const END_DATE = '2024-04-27 01:00:00';

export const WORKOUT_LABELS = ['單字發音', '一連錄音 單字', '一連錄音 句子'];

export const WORKOUT_FIRST_ITEMS: WorkoutFirst[] = [
  { id: 0, japanese: '雨', pitchStr: 'あ＼め', chinese: '下雨' },
  { id: 1, japanese: '飴', pitchStr: 'あめ', chinese: '糖果' },
  { id: 3, japanese: '内容', pitchStr: 'ないよー', chinese: '內容' },
  { id: 4, japanese: '顧客', pitchStr: 'こきゃく', chinese: '客戶' },
  {
    id: 5,
    japanese: '20文字以内',
    pitchStr: 'にじゅーもじい＼ない',
    chinese: '20個字以內',
  },
  {
    id: 6,
    japanese: '見ない',
    pitchStr: 'み＼ない',
    chinese: '不看',
  },
  {
    id: 7,
    japanese: '食べない',
    pitchStr: 'たべ＼ない',
    chinese: '不吃',
  },
  {
    id: 8,
    japanese: '手伝わない',
    pitchStr: 'てつだわ＼ない',
    chinese: '不幫助',
  },
  // { id: 6, japanese: '行く', pitchStr: 'いく', chinese: '去' },
  // { id: 7, japanese: '行かない', pitchStr: 'いかない', chinese: '不去' },
  // { id: 8, japanese: '行った', pitchStr: 'いった', chinese: '當時去' },
  // {
  //   id: 9,
  //   japanese: '行かなかった',
  //   pitchStr: 'いかな＼かった',
  //   chinese: '當時不去',
  // },
  // { id: 10, japanese: '見る', pitchStr: 'み＼る', chinese: '看' },
  // { id: 11, japanese: '見ない', pitchStr: 'み＼ない', chinese: '不看' },
  // { id: 12, japanese: '見た', pitchStr: 'み＼た', chinese: '當時看' },
  // {
  //   id: 13,
  //   japanese: '見なかった',
  //   pitchStr: 'み＼なかった',
  //   chinese: '當時不看',
  // },
];

export const WORKOUT_THIRD_ITEMS: WorkoutFirst[] = [
  {
    id: 1,
    japanese: '簡潔にわかりやすくまとめる。',
    chinese: '彙整成簡單易讀的形式',
    pitchStr: 'かんけつに　わかりやす＼く　まとめる',
  },
  {
    id: 2,
    japanese: '顧客からのメールが優先される',
    chinese: '以客戶的信件優先',
    pitchStr: 'こきゃくから＼の　メールが　ゆーせん　される',
  },
  {
    id: 3,
    japanese: '概要がわかるようにしておかなければならない',
    chinese: '需要讓人一看就能了解概要',
    pitchStr: 'がいよーが　わか＼るよーに　して　おかな＼ければ　なら＼ない',
  },
  {
    id: 4,
    japanese: '長すぎても短すぎてもいけない。',
    chinese: '不宜過長或過短',
    pitchStr: 'ながす＼ぎても　みじかす＼ぎても　いけない',
  },
];
