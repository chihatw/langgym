'use client';

import SubmitServerActionButton from '@/components/SubmitServerActionButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit2 } from 'lucide-react';
import { useState, useTransition } from 'react';
import { BetterReadItemView } from '../../schema';
import { updateBetterreadItemQuestion } from '../../services/actions';
import DeleteBetterreadItemQuestionButton from './DeleteBetterreadItemQuestionButton';
import MngRealtimeBetterreadItemQuestionQuestionRow from './MngRealtimeBetterreadItemQuestionQuestionRow';
import MngRealtimeBetterreadItemQuestionViewPointRow from './MngRealtimeBetterreadItemQuestionViewPointRow';

type Props = {
  questions: number[];
  view_points: number[];
  betterreadItem: BetterReadItemView;
  handleUpdateToggleQuestions: (questions: number[]) => void;
  handleUpdateToggleViewPoints: (view_points: number[]) => void;
  handleDeleteQuestion: (question_id: number) => void;
  handleUpdateQuestion: (
    question_id: number,
    view_point: string,
    question: string
  ) => void;
};

type FormProps = {
  open: boolean;
  view_point: string;
  question: string;
};

const INITIAL_STATE: FormProps = {
  open: false,
  view_point: '',
  question: '',
};

const MngRealtimeBetterreadItemQuestionRow = ({
  questions,
  view_points,
  betterreadItem,
  handleDeleteQuestion,
  handleUpdateQuestion,
  handleUpdateToggleQuestions,
  handleUpdateToggleViewPoints,
}: Props) => {
  const [value, setValue] = useState({
    ...INITIAL_STATE,
    view_point: betterreadItem.view_point || '',
    question: betterreadItem.question || '',
  });

  const [isPending, startTransition] = useTransition();

  const action = async () => {
    startTransition(() => {
      // remote
      updateBetterreadItemQuestion(
        betterreadItem.question_id!,
        value.view_point,
        value.question,
        betterreadItem.betterread_id!
      );
      // local
      handleUpdateQuestion(
        betterreadItem.question_id!,
        value.view_point,
        value.question
      );
    });

    setValue((prev) => {
      const value: FormProps = { ...prev, open: false };
      return value;
    });
  };

  return (
    <div className='grid gap-4'>
      <div className='grid grid-cols-[1fr,auto,auto] gap-2 items-center pl-2'>
        <div className='text-sm grid gap-2 '>
          <MngRealtimeBetterreadItemQuestionViewPointRow
            betterreadItem={betterreadItem}
            view_points={view_points}
            handleUpdateToggleViewPoints={handleUpdateToggleViewPoints}
          />
          <MngRealtimeBetterreadItemQuestionQuestionRow
            betterreadItem={betterreadItem}
            questions={questions}
            handleUpdateToggleQuestions={handleUpdateToggleQuestions}
          />
        </div>
        <Button
          size='icon'
          variant={'ghost'}
          onClick={() =>
            setValue((prev) => {
              const value: FormProps = { ...prev, open: !prev.open };
              return value;
            })
          }
        >
          <Edit2 />
        </Button>
        <DeleteBetterreadItemQuestionButton
          betterreadItem={betterreadItem}
          handleDeleteQuestion={handleDeleteQuestion}
        />
      </div>
      {value.open ? (
        <div className='grid gap-2'>
          <Input
            placeholder='view_point(for update)'
            value={value.view_point}
            onChange={(e) =>
              setValue((prev) => {
                const value: FormProps = {
                  ...prev,
                  view_point: e.target.value,
                };
                return value;
              })
            }
          />
          <Input
            placeholder='question(for update)'
            value={value.question}
            onChange={(e) =>
              setValue((prev) => {
                const value: FormProps = {
                  ...prev,
                  question: e.target.value,
                };
                return value;
              })
            }
          />
          <SubmitServerActionButton
            action={action}
            isPending={isPending}
            disabled={!value.question || !value.view_point || isPending}
          >
            更新
          </SubmitServerActionButton>
        </div>
      ) : null}
    </div>
  );
};

export default MngRealtimeBetterreadItemQuestionRow;
