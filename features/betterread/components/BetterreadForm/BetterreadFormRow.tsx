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
  input: string;
  errMsg: string;
};

const INITIAL_STATE: FormProps = {
  input: '',
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
          question: value.input,
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
        <div className='grid gap-1'>
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
        <Input
          value={value.input}
          placeholder='對方看到這張照片，問什麼？'
          onChange={(e) =>
            setValue((prev) => ({ ...prev, input: e.target.value, errMsg: '' }))
          }
        />
        <SubmitServerActionButton
          errMsg={value.errMsg}
          disabled={!value.input}
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
