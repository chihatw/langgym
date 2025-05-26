'use client';

import { Button } from '@/components/ui/button';
import { formatDistance } from 'date-fns';
import { ja } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import { ArticlePitchQuizAnswerRowView } from '../schema';
import { buildArticlePitchQuizScore } from '../services/utils';

type Props = {
  answer: { id: number | null; created_at: Date | null };
  answerRows: ArticlePitchQuizAnswerRowView[];
};

const QuizListAnswerRow = ({ answer, answerRows }: Props) => {
  const router = useRouter();
  const score = buildArticlePitchQuizScore(answerRows);
  return (
    <div className='flex justify-end'>
      <Button
        size={'sm'}
        variant={'link'}
        onClick={() => router.push(`/answer/${answer.id}`)}
        className='grid grid-cols-[auto_24px] gap-2 justify-end text-xs text-slate-700   p-0 m-0 h-6'
      >
        <div className='text-slate-500'>
          {formatDistance(answer.created_at!, new Date(), {
            addSuffix: true,
            locale: ja,
          })}
        </div>
        <div className='text-end'>{score}</div>
      </Button>
    </div>
  );
};

export default QuizListAnswerRow;
