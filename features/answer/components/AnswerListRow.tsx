'use client';
import SubmitServerActionButton from '@/components/SubmitServerActionButton';
import { buttonVariants } from '@/components/ui/button';
import { formatDistance } from 'date-fns';
import { ja } from 'date-fns/locale';
import { File, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';
import {
  ArticlePitchQuizAnswerRowView,
  ArticlePitchQuizAnswerView,
} from '../schema';
import { deleteAnswer } from '../services/actions';
import { buildArticlePitchQuizScore } from '../services/utils';

type Props = {
  answer: ArticlePitchQuizAnswerView;
  answerRows: ArticlePitchQuizAnswerRowView[];
  removeAnswer: (id: number) => void;
};

const AnswerListRow = ({ answer, answerRows, removeAnswer }: Props) => {
  const score = useMemo(
    () => buildArticlePitchQuizScore(answerRows),
    [answerRows]
  );

  const action = async () => {
    if (!answer.id) return;
    // local
    removeAnswer(answer.id);

    // remote
    deleteAnswer(answer.id);
  };

  return (
    <div className='border-slate-400 border-b grid grid-cols-[auto_1fr_auto] items-center gap-x-2'>
      <div className='text-xs text-slate-500'>{answer.display}</div>
      <div className='text-sm '>{answer.title}</div>
      <div className='grid grid-cols-[auto_40px_auto_auto] items-center gap-x-0'>
        <div className='text-xs text-slate-500 '>
          {formatDistance(answer.created_at!, new Date(), {
            addSuffix: true,
            locale: ja,
          })}
        </div>

        <div className='text-xs text-slate-500 text-end'>{score}</div>
        <Link
          href={`/mng/answer/${answer.id}`}
          className={buttonVariants({ size: 'icon', variant: 'ghost' })}
        >
          <File />
        </Link>
        <SubmitServerActionButton size='icon' variant={'ghost'} action={action}>
          <Trash2 />
        </SubmitServerActionButton>
      </div>
    </div>
  );
};

export default AnswerListRow;
