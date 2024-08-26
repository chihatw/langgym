'use client';
import SubmitServerActionButton from '@/components/SubmitServerActionButton';
import { Input } from '@/components/ui/input';
import { useState, useTransition } from 'react';
import { BetterReadItem, BetterReadItemQuestion } from '../../schema';
import { insertBetterreadItemQuestion } from '../../services/actions';
import BetterreadFormRowImage from './BetterreadFormRowImage';
import BetterreadItemQuestionRow from './BetterreadItemQuestionRow';

type Props = {
  betterreadItem: BetterReadItem;
  betterreadItemQuestions: BetterReadItemQuestion[];
};

type FormProps = {
  viewPoint: string;
  question: string;
  errMsg: string;
};

const INITIAL_STATE: FormProps = {
  viewPoint: '',
  question: '',
  errMsg: '',
};

const BetterreadFormRow = ({
  betterreadItem,
  betterreadItemQuestions,
}: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);
  const [isPending, startTransition] = useTransition();

  const action = async () => {
    startTransition(async () => {
      const errMsg = await insertBetterreadItemQuestion(
        {
          betterread_item_id: betterreadItem.id,
          view_point: value.viewPoint,
          question: value.question,
        },
        betterreadItem.betterread_id
      );

      if (errMsg) {
        setValue((prev) => ({ ...prev, errMsg }));
        return;
      }
      setValue(INITIAL_STATE);
    });
  };

  return (
    <div className='grid gap-4 rounded-lg bg-white bg-opacity-60 p-3'>
      <BetterreadFormRowImage betterreadItem={betterreadItem} />

      {betterreadItemQuestions.length ? (
        <div className='grid gap-4'>
          {betterreadItemQuestions
            .sort((a, b) => a.created_at.getTime() - b.created_at.getTime())
            .map((question, index) => (
              <BetterreadItemQuestionRow
                key={index}
                question={question}
                betterreadId={betterreadItem.betterread_id}
              />
            ))}
        </div>
      ) : null}

      <div className='grid gap-2'>
        <div className='grid grid-cols-[auto,1fr] gap-2 items-center'>
          <div className='text-2xl'>👀</div>
          <Input
            value={value.viewPoint}
            placeholder='對方注意到哪裡？'
            onChange={(e) =>
              setValue((prev) => ({
                ...prev,
                viewPoint: e.target.value,
                errMsg: '',
              }))
            }
          />
        </div>
        <div className='grid grid-cols-[auto,1fr] gap-2 items-center'>
          <div className='text-2xl'>❓</div>
          <Input
            value={value.question}
            placeholder='對方問什麼？'
            onChange={(e) =>
              setValue((prev) => ({
                ...prev,
                question: e.target.value,
                errMsg: '',
              }))
            }
          />
        </div>
        <SubmitServerActionButton
          errMsg={value.errMsg}
          disabled={!value.question || !value.viewPoint}
          isPending={isPending}
          action={action}
        >
          確定
        </SubmitServerActionButton>
      </div>
    </div>
  );
};

export default BetterreadFormRow;
