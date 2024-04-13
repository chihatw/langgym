import { ACCENT_MARK, LONG_VOWELS, MORA_VOWEL_MAP, YOUONS } from '../constants';

export function removeMarks(input: string) {
  return input.replace(/[、。「」？]/g, '');
}

export function markLongVowel(input: string) {
  const moras = buildMoras_no_remove_mark(input);

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

export function buildMoras_no_remove_mark(input: string): string[] {
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

export function buildMoras(input: string) {
  if (!input) return [];
  const _input = input.replace(ACCENT_MARK, '');
  return buildMoras_no_remove_mark(_input);
}

export const buildPitches = (pitchStr: string) => {
  // アクセントの位置からピッチを計算
  const moras_with_mark = buildMoras_no_remove_mark(pitchStr);

  // 「＼」の位置確認、ない場合は0
  const pitchPoint = Math.max(moras_with_mark.indexOf(ACCENT_MARK), 0);
  // 「＼」の削除
  const moras = moras_with_mark.filter((m) => m !== ACCENT_MARK);

  const pitches = moras.map((_, index) => {
    switch (pitchPoint) {
      // 平板型の場合、先頭以外が高ピッチ
      case 0:
        return index !== 0;
      // 頭高型の場合、先頭だけが高ピッチ
      case 1:
        return index === 0;
      // それ以外は、先頭が低ピッチ、その後はピッチポイントまでが高ピッチ
      default:
        if (index === 0) {
          return false;
        } else {
          return index < pitchPoint;
        }
    }
  });

  return pitches;
};

export const buildHasAccent = (pitches: boolean[], isOdaka: boolean) => {
  return pitches.map((pitch, index) => {
    if (isOdaka) {
      return index === pitches.length - 1;
    }
    const postPitch = pitches.at(index + 1);
    return index < pitches.length - 1 && pitch && !postPitch;
  });
};

// MORA_VOWEL_MAP 作成用

const hira2Kana = (str: string): string => {
  return str.replace(/[\u3041-\u3096]/g, function (match) {
    var chr = match.charCodeAt(0) + 0x60;
    return String.fromCharCode(chr);
  });
};

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
