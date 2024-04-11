import { hira2Kana } from '@/utils';
import { ACCENT_MARK, LONG_VOWELS, MORA_VOWEL_MAP, YOUONS } from '../constants';

export function buildMoras(input: string): string[] {
  return input.split('').reduce((acc, cur, index) => {
    // 拗音が含まれていない場合
    if (!YOUONS.includes(cur)) {
      return [...acc, cur];
    }

    // 拗音が含まれている場合
    if (index === 0) throw new Error('拗音が先頭にある！');

    acc[acc.length - 1] = acc.at(-1)! + cur;
    return acc;
  }, [] as string[]);
}

export function removeMarks(input: string) {
  return input.replace(/[、。「」？]/g, '');
}

export function markLongVowel(input: string) {
  const moras = buildMoras(input);

  const result: string[] = [];
  for (let i = 0; i < moras.length; i++) {
    const mora = moras[i];

    // 先頭に長音「ー」はない
    if (!i) {
      result.push(mora);
      continue;
    }

    // 自身が母音でなければ、長音「ー」にもならない
    if (
      !['あ', 'い', 'う', 'え', 'お', 'ア', 'イ', 'ウ', 'エ', 'オ'].includes(
        mora
      )
    ) {
      result.push(mora);
      continue;
    }

    // 自身が母音の場合、直前のモーラと長音関係にあるか調べる
    const isPostAccent = moras[i - 1] === '＼';
    const preMora = isPostAccent ? moras[i - 2] : moras[i - 1];
    const preVowel = MORA_VOWEL_MAP[preMora];
    if (LONG_VOWELS[mora].includes(preVowel)) {
      result.push('ー');
    } else {
      result.push(mora);
    }
  }

  return result.join('');
}

export const buildPitches = (pitchStr: string) => {
  // アクセントの位置からピッチを計算
  const moras_with_mark = buildMoras(pitchStr);

  // 最後尾が「＼」かどうか
  const isOdaka = moras_with_mark.at(-1) === ACCENT_MARK;

  // 「＼」の位置確認、ない場合は0
  const pitchPoint = Math.max(moras_with_mark.indexOf(ACCENT_MARK), 0);
  // 「＼」の削除
  const moras = moras_with_mark.filter((m) => m !== ACCENT_MARK);

  const pitches = moras.map((mora, index) => {
    switch (pitchPoint) {
      // 平板型の場合、先頭以外が高ピッチ
      case 0:
        return index !== 0 ? [mora, 'h'] : [mora];
      // 頭高型の場合、先頭だけが高ピッチ
      case 1:
        return index === 0 ? [mora, 'h'] : [mora];
      // それ以外は、先頭が低ピッチ、その後はピッチポイントまでが高ピッチ
      default:
        if (index === 0) {
          return [mora];
        } else {
          return index < pitchPoint ? [mora, 'h'] : [mora];
        }
    }
  });

  // 尾高の場合、最後に空文字を追加
  if (isOdaka) pitches.push(['']);

  return pitches;
};

export const checkIsOdaka = (pitches: string[][]) => {
  return (
    pitches.length > 1 && // pitchesの長さが1より大きい
    // pitchesの最後から二つ目が高ピッチ
    !!pitches.at(-2)?.at(1) &&
    // pitchesの最後が空文字列
    pitches.at(-1)?.at(0) === ''
  );
};

// MORA_VOWEL_MAP 作成用
const VOWELS = 'aiueo'.split('');

function temp() {
  const vowels: { [key: string]: string } = {};

  // 直音
  for (let line of Object.values(CHOKUONS)) {
    const chars = line.split('');
    for (let i = 0; i < chars.length; i++) {
      vowels[chars.at(i)!] = VOWELS.at(i)!;
    }
  }

  // 拗音
  for (let line of Object.values(_YOUONS)) {
    const chars = line.split('').reduce((acc, cur, index) => {
      if (!(index % 2)) {
        return [...acc, cur];
      }
      acc[acc.length - 1] = acc[acc.length - 1] + cur;
      return acc;
    }, [] as string[]);
    for (let i = 0; i < chars.length; i++) {
      vowels[chars.at(i)!] = VOWELS.at(i * 2)!;
    }
  }

  // 小さい「ぃ」「ぇ」
  for (let line of Object.values(SMALL_IES)) {
    const chars = line.split('').reduce((acc, cur, index) => {
      if (!(index % 2)) {
        return [...acc, cur];
      }
      acc[acc.length - 1] = acc[acc.length - 1] + cur;
      return acc;
    }, [] as string[]);

    for (let i = 0; i < chars.length; i++) {
      vowels[chars.at(i)!] = VOWELS.at(1 + i * 2)!;
    }
  }

  const q = ['くぁ', 'くぃ', 'くぅ', 'くぇ', 'くぉ'];
  const f = ['ふぁ', 'ふぃ', 'ふ', 'ふぇ', 'ふぉ'];
  const v = ['ゔぁ', 'ゔぃ', 'ゔ', 'ゔぇ', 'ゔぉ'];

  const items = [q, f, v];

  for (let i = 0; i < items.length; i++) {
    const chars = items[i];
    for (let i = 0; i < chars.length; i++) {
      vowels[chars.at(i)!] = VOWELS.at(i)!;
    }
  }

  const cloned = { ...vowels };

  for (let [key, value] of Object.entries(cloned)) {
    const kana = hira2Kana(key);
    vowels[kana] = value;
  }

  return vowels;
}

const CHOKUONS = {
  a: 'あいうえお',
  x: 'ぁぃぅぇぉ',
  k: 'かきくけこ',
  g: 'がぎぐげご',
  s: 'さしすせそ',
  z: 'ざじずぜぞ',
  t: 'たちつてと',
  d: 'だぢづでど',
  n: 'なにぬねの',
  h: 'はひふへほ',
  b: 'ばびぶべぼ',
  p: 'ぱぴぷぺぽ',
  m: 'まみむめも',
  y: 'やいゆえよ',
  xy: 'ゃぃゅぇょ',
  r: 'らりるれろ',
  w: 'わゐうゑを',
};

const _YOUONS = {
  k: 'きゃきゅきょ',
  g: 'ぎゃぎゅぎょ',
  s: 'しゃしゅしょ',
  z: 'じゃじゅじょ',
  t: 'ちゃちゅちょ',
  d: 'ぢゃぢゅぢょ',
  n: 'にゃにゅにょ',
  h: 'ひゃひゅひょ',
  b: 'びゃびゅびょ',
  p: 'ぴゃぴゅぴょ',
  m: 'みゃみゅみょ',
  r: 'りゃりゅりょ',
};

const SMALL_IES = {
  k: 'きぃきぇ', // kyi　kye
  g: 'ぎぃぎぇ', // gyi　gye
  s: 'しぃしぇ', // syi　sye
  z: 'じぃじぇ', // zyi　zye
  t: 'ちぃちぇ', // tyi　tye
  d: 'ぢぃぢぇ', // dyi　dye
  n: 'にぃにぇ', // nyi　nye
  h: 'ひぃひぇ', // hyi　hye
  b: 'びぃびぇ', // byi　bye
  p: 'ぴぃぴぇ', // pyi　pye
  m: 'みぃみぇ', // myi　mye
  r: 'りぃりぇ', // ryi　rye
};
