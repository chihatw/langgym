import { HEADERS } from '../constants';

export function buildDraft(original: string, chinese: string) {
  const originalLines = original.split('\n');
  const chineseLines = chinese.split('\n');
  const result: string[] = [];
  for (let i = 0; i < originalLines.length; i++) {
    const original = originalLines.at(i) || '';
    const chinese = chineseLines.at(i) || '';
    result.push(`${i + 1}行目`);
    result.push(`${HEADERS.original}${original}`);
    result.push(`${HEADERS.japanese}${original}`);
    result.push(`${HEADERS.chinese}${chinese}`);
    result.push(``);
  }
  return result.join('\n');
}

export function buildOriginalAndChinese(pairs: string) {
  return pairs.split('\n').reduce(
    (acc, cur, index) => {
      switch (index % 2) {
        case 1:
          if (index === 1) {
            return { ...acc, chinese: cur };
          }
          return { ...acc, chinese: [acc.chinese, cur].join('\n') };
        default:
          if (index === 0) {
            return { original: cur, chinese: '' };
          }
          return { ...acc, original: [acc.original, cur].join('\n') };
      }
    },
    { original: '', chinese: '' }
  );
}

export function exportSelected(
  draft: string,
  type: 'original' | 'japanese' | 'chinese'
) {
  return draft
    .split('\n')
    .reduce((acc, cur) => {
      const head = cur.slice(0, 3);
      const body = cur.slice(3);
      switch (type) {
        case 'original':
          if (head === HEADERS.original) {
            return [...acc, body];
          }
          return acc;
        case 'japanese':
          if (head === HEADERS.japanese) {
            return [...acc, body];
          }
          return acc;
        case 'chinese':
          if (head === HEADERS.chinese) {
            return [...acc, body];
          }
          return acc;
      }
    }, [] as string[])
    .join('\n');
}
