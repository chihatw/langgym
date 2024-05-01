import { shuffle } from '@/utils';

import * as _ from 'lodash';
import {
  CUE_CARDS,
  INITIAL_PARAMS,
  PAPERCUP_PATTERNS,
  PARAM_CODES,
  PITCH_STRS,
  TARGET,
} from '../constants';
import {
  CuePattern,
  ICueCard,
  PaperCupBooleanParams,
  PaperCupCueObj,
} from '../schema';

export function buildPaperCupBooleanParams(params: string) {
  const result = { ...INITIAL_PARAMS };
  params.split('').forEach((value) => {
    const item = Object.entries(PARAM_CODES).find(
      ([_key, _value]) => _value === value
    );
    if (item) {
      const [_key, _value] = item;
      result[_key as keyof PaperCupBooleanParams] = true;
    }
  });
  return result;
}

export function serializePaperCupParams(value: PaperCupBooleanParams) {
  return Object.entries(value).reduce((acc, [_key, _value]) => {
    // value が false なら終了
    if (!_value) return acc;
    const code = PARAM_CODES[_key];

    if (!code) return acc;
    return acc + code;
  }, '');
}

export const buildCurrentPatterns = (
  listState: PaperCupBooleanParams
): CuePattern[] => {
  return (
    PAPERCUP_PATTERNS
      // 主題
      .filter((pattern) => {
        if (listState.hasWoTopic && pattern.topic === TARGET.wo) {
          return true;
        }
        if (listState.hasNiTopic && pattern.topic === TARGET.ni) {
          return true;
        }
        if (listState.hasNoneTopic && pattern.topic === TARGET.none) {
          return true;
        }
        return false;
      })
      // 分類
      .filter((pattern) => {
        if (listState.hasWoGrouping && pattern.grouping === TARGET.wo) {
          return true;
        }
        if (listState.hasNiGrouping && pattern.grouping === TARGET.ni) {
          return true;
        }
        if (listState.hasNoneGrouping && pattern.grouping === TARGET.none) {
          return true;
        }
        return false;
      })
      // 格順
      .filter((pattern) => {
        if (listState.hasStraightOrder && pattern.isWoFirst) {
          return true;
        }
        if (listState.hasInvertOrder && !pattern.isWoFirst) {
          return true;
        }
        return false;
      })
      // 肯否
      .filter((pattern) => {
        if (listState.hasPositive && !pattern.isNegative) {
          return true;
        }
        if (listState.hasNegative && pattern.isNegative) {
          return true;
        }
        return false;
      })
      // 主題と分類の重複許可
      .filter((pattern) => {
        if (!listState.hasGroupingTopic) {
          if (pattern.topic !== TARGET.none) {
            if (pattern.topic === pattern.grouping) {
              return false;
            }
          }
        }

        return true;
      })
  );
};

export function updateCue(
  params: PaperCupBooleanParams,
  currentCue: string // currentCue と連続を避けるため必要
) {
  // 現在の cue を設定
  let updatedCue = currentCue;

  // ランダムに変更を行い、cuePattern が同じならば、再試行する（最大10回）
  let i = 0;
  while (_.isEqual(currentCue, updatedCue) && i < 10) {
    updatedCue = createCueFromParams(params);
    i++;
  }
  return updatedCue;
}

const createCueFromParams = (patternParams: PaperCupBooleanParams): string => {
  const currentPatterns = buildCurrentPatterns(patternParams);

  if (!currentPatterns.length) return '';

  // 確率の調整
  let pumpedCurrentPatterns: CuePattern[] = [];
  let extra = 0;
  const topicOrder = [TARGET.ni, TARGET.wo, TARGET.none];
  const groupingOrder = [TARGET.none, TARGET.ni, TARGET.wo];
  const sortedCurrentPatterns = currentPatterns.sort(
    (a, b) =>
      topicOrder.indexOf(a.topic) * 10 +
      groupingOrder.indexOf(a.grouping) -
      (topicOrder.indexOf(b.topic) * 10 + groupingOrder.indexOf(b.grouping))
  );
  for (const currentPattern of sortedCurrentPatterns) {
    pumpedCurrentPatterns.push(currentPattern);

    /**
     * 主題有りの場合
     */
    if (currentPattern.topic !== TARGET.none) {
      // 分類無しは＋0
      if (currentPattern.grouping === TARGET.none) {
        for (let i = 0; i < 0; i++) {
          pumpedCurrentPatterns.push(currentPattern);
          extra++;
        }
      }
    }
    // 主題無しの場合
    else {
      switch (currentPattern.grouping) {
        // ニ格分類は＋0
        case TARGET.ni:
          for (let i = 0; i < 0; i++) {
            pumpedCurrentPatterns.push(currentPattern);
            extra++;
          }
          break;
        // ヲ格分類は+0
        case TARGET.wo:
          // const max = Math.floor((sortedCurrentPatterns.length + extra) * 0.5);
          for (let i = 0; i < 0; i++) {
            pumpedCurrentPatterns.push(currentPattern);
          }
          break;
        default:
      }
    }
  }

  const cue = buildCueWorkoutCueAndPattern(pumpedCurrentPatterns);
  return cue;
};

const buildCueWorkoutCueAndPattern = (
  currentPatterns: CuePattern[]
): string => {
  // パターン抽選
  const currentPattern: CuePattern = shuffle(currentPatterns)[0];

  // 色抽選
  const shuffledColors = shuffle(['red', 'blue', 'yellow', 'green']);

  // 色から項と前置きを作成
  const { nouns, header } = buildNouns(shuffledColors, currentPattern);

  // 動詞を作成
  const verb = currentPattern.isNegative
    ? {
        label: '入れない',
        pitchStr: 'いれない',
      }
    : {
        label: '入れる',
        pitchStr: 'いれる',
      };

  const text = [header, nouns[0], nouns[1], verb]
    .map((item) => item.label)
    .join('');

  return text;
};

const buildNouns = (colors: string[], pattern: CuePattern) => {
  const nouns: ICueCard[] = [];

  // 基本順は　ヲ格が先
  const [woNounId, niNounId] = colors.slice(0, 2);
  // 主題がニ格の時だけ、ニ格を先にする
  const nounId1 = pattern.topic !== TARGET.ni ? woNounId : niNounId;
  const nounId2 = pattern.topic !== TARGET.ni ? niNounId : woNounId;

  const joshi1 = pattern.isWoFirst ? pattern.wo : pattern.ni;
  const joshi2 = pattern.isWoFirst ? pattern.ni : pattern.wo;
  const noun1 = buildNounCueCardProps(nounId1, joshi1);
  const noun2 = buildNounCueCardProps(nounId2, joshi2);
  nouns.push(noun1);
  nouns.push(noun2);

  // 主題があれば、前置きを作成
  const header =
    pattern.topic !== TARGET.none
      ? {
          label: `私は${CUE_CARDS[nounId1].label}が好きです`,
          pitchStr: [
            'わたしは',
            `${CUE_CARDS[nounId1].pitchStr}が`,
            'すき＼です',
          ].join(' '),
        }
      : { label: '', pitchStr: '' };

  return { nouns, header };
};

const buildNounCueCardProps = (nounId: string, joshi: string) => {
  const noun = CUE_CARDS[nounId];
  const label = noun.label + joshi;

  // 助詞が「には」で、名詞にアクセントがない場合は、「に＼は」になる
  if (
    joshi === 'には' &&
    !noun.pitchStr.includes('＼') &&
    !noun.hasTailAccent
  ) {
    joshi = 'に＼は';
  }

  const pitchStr = noun.pitchStr + (noun.hasTailAccent ? '＼' : '') + joshi;
  return { label, pitchStr };
};

export function buildCueObject(cue: string) {
  const result: PaperCupCueObj = {
    header: { label: '', pitchStr: '' },
    nouns: [
      { label: '', pitchStr: '' },
      { label: '', pitchStr: '' },
    ],
    verb: { label: '入れない', pitchStr: 'いれない' },
  };

  // verb
  if (cue.includes('入れる')) {
    result.verb = { label: '入れる', pitchStr: 'いれる' };
  }

  // header
  if (cue.includes('私は赤')) {
    result.header = {
      label: '私は赤が好きです',
      pitchStr: 'わたしは　あ＼かが　すき＼です',
    };
  } else if (cue.includes('私は青')) {
    result.header = {
      label: '私は青が好きです',
      pitchStr: 'わたしは　あ＼おが　すき＼です',
    };
  } else if (cue.includes('私は黄色')) {
    result.header = {
      label: '私は黄色が好きです',
      pitchStr: 'わたしは　きーろが　すき＼です',
    };
  } else if (cue.includes('私は緑')) {
    result.header = {
      label: '私は緑が好きです',
      pitchStr: 'わたしは　み＼どりが　すき＼です',
    };
  }

  let headerless = cue.replace(result.header.label, '');

  const re = /(赤|青|黄色|緑)/g;

  // 色を出現順に収納
  const colors = headerless.match(re)!;

  // 色で分割
  const temp = headerless.split(re);

  if (!colors || !colors.length) return result;

  result.nouns = colors.map((color, index) => {
    // 助詞の収納
    // １つ目の助詞はそのまま収納
    // ２つ目の助詞は動詞を削除して収納
    let joshi = !index ? temp[2] : temp[4].replace(result.verb.label, '');

    // 助詞から読点を削除
    joshi = joshi.replace('、', '');

    const label = color + joshi;

    // 色、助詞をそれぞれピッチに変換
    let pitchStr = PITCH_STRS[color] + PITCH_STRS[joshi];

    // アクセントが２つある場合は、先頭のみ残す
    const _temp = pitchStr.split('＼');
    const [first, ...others] = _temp;
    pitchStr = first + (others.length ? '＼' + others.join('') : '');

    return { label, pitchStr };
  });

  return result;
}
