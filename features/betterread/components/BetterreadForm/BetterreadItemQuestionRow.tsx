'use client';

import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useOptimistic } from 'react';
import { BetterReadItemQuestion } from '../../schema';
import { deleteBetterreadItemQuestion } from '../../services/actions';

type Props = { question: BetterReadItemQuestion; betterreadId: number };

const BetterreadItemQuestionRow = ({ question, betterreadId }: Props) => {
  const [optiQuestion, removeQuestion] = useOptimistic<
    BetterReadItemQuestion | null,
    void
  >(question, () => null);
  // todo
  const action = async () => {
    // local
    removeQuestion();
    // remote
    deleteBetterreadItemQuestion(question.id, betterreadId);
  };

  if (!optiQuestion) return null;
  return (
    <div className='grid grid-cols-[1fr,auto] gap-2 items-center pl-2'>
      <div className='text-sm'>
        <div className='grid grid-cols-[auto,1fr] gap-2 items-center'>
          <div>👀</div>
          <div className='text-gray-500'>{optiQuestion.view_point}</div>
        </div>
        <div className='grid grid-cols-[auto,1fr] gap-2 items-center'>
          <div>❓</div>
          <div>{optiQuestion.question}</div>
        </div>
      </div>
      <form action={action}>
        <Button size={'icon'} variant={'ghost'}>
          <X className='text-red-500' />
        </Button>
      </form>
    </div>
  );
};

export default BetterreadItemQuestionRow;
