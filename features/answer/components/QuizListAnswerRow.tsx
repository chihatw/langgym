'use client';

import { formatDistance } from 'date-fns';
import { ja } from 'date-fns/locale';
import { ArticlePitchQuizAnswerRowView } from '../schema';
import { buildArticlePitchQuizScore } from '../services/utils';

type Props = {
  answer: { id: number | null; created_at: Date | null };
  answerRows: ArticlePitchQuizAnswerRowView[];
};

const QuizListAnswerRow = ({ answer, answerRows }: Props) => {
  const score = buildArticlePitchQuizScore(answerRows);
  return (
    <div className='grid grid-cols-[auto,24px] gap-2 justify-end text-xs text-slate-700 font-extralight'>
      <div className='text-slate-500'>
        {formatDistance(answer.created_at!, new Date(), {
          addSuffix: true,
          locale: ja,
        })}
      </div>
      <div className='text-end'>{score}</div>
    </div>
  );
};

export default QuizListAnswerRow;
