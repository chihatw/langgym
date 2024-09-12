'use client';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { useMemo } from 'react';
import { BetterReadItemView } from '../../schema';
import { updateBetterreadToggleQuestions } from '../../services/actions';

type Props = {
  questions: number[];
  betterreadItem: BetterReadItemView;
  handleUpdateToggleQuestions: (questions: number[]) => void;
};

const MngRealtimeBetterreadItemQuestionQuestionRow = ({
  questions,
  betterreadItem,
  handleUpdateToggleQuestions,
}: Props) => {
  const show = useMemo(
    () => questions.includes(betterreadItem.question_id!),
    [questions, betterreadItem.question_id]
  );

  const action = async () => {
    if (!betterreadItem.question_id) return;

    let cloned: number[] = [...questions];

    if (cloned.includes(betterreadItem.question_id)) {
      cloned = cloned.filter((item) => item !== betterreadItem.question_id!);
    } else {
      cloned.push(betterreadItem.question_id);
    }

    // remote
    updateBetterreadToggleQuestions(cloned);

    // local
    handleUpdateToggleQuestions(cloned);
  };

  return (
    <div className='grid grid-cols-[auto,auto,1fr] gap-2 items-center'>
      <form action={action}>
        <Button
          size={'icon'}
          variant={'ghost'}
          className='w-5 h-5'
          type='submit'
        >
          {show ? <Eye /> : <EyeOff />}
        </Button>
      </form>
      <div>❓</div>
      <div className={show ? 'text-gray-700' : 'text-gray-400'}>
        {betterreadItem.question}
      </div>
    </div>
  );
};

export default MngRealtimeBetterreadItemQuestionQuestionRow;
