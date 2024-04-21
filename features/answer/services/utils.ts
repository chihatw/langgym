import { FULL_SPACE } from '@/features/pitchLine/constants';
import { ArticlePitchQuizAnswerRowView } from '../schema';

function buildArticlePitchQuizRowScores(
  answerRows: ArticlePitchQuizAnswerRowView[]
): {
  count: number;
  correct: number;
  locked: number;
  total: number;
}[] {
  return answerRows.map(({ answer, pitchStr, lockedIndexes }) => {
    const _answers = answer!.split(FULL_SPACE);
    return pitchStr!.split(FULL_SPACE).reduce(
      (acc, cur, index) => {
        const isLocked = lockedIndexes!.includes(index);

        if (isLocked) {
          // ロックされている場合は、問題数も正答数も増えない
          return {
            ...acc,
            locked: acc.locked + 1,
            total: acc.total + 1,
          };
        }

        // ロックされていない場合は、問題数が増え、正誤により正答数を変更
        return {
          ...acc,
          count: acc.count + 1,
          correct: cur === _answers[index] ? acc.correct + 1 : acc.correct,
          total: acc.total + 1,
        };
      },
      { count: 0, correct: 0, locked: 0, total: 0 }
    );
  });
}

export function buildArticlePitchQuizScore(
  answerRows: ArticlePitchQuizAnswerRowView[]
) {
  const rowScores = buildArticlePitchQuizRowScores(answerRows);
  const score = rowScores.reduce(
    (acc, cur) => ({
      count: acc.count + cur.count,
      correct: acc.correct + cur.correct,
    }),
    { count: 0, correct: 0 }
  );

  const ratio = Math.round((score.correct / score.count) * 100);
  return ratio;
}
