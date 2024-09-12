'use client';

import SubmitServerActionButton from '@/components/SubmitServerActionButton';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useState, useTransition } from 'react';
import { BetterReadItemQuestion, BetterReadItemView } from '../../schema';
import { insertBetterreadItemQuestion } from '../../services/actions';
import MngRealtimeBetterreadItemQuestionRow from './MngRealtimeBetterreadItemQuestionRow';

type Props = {
  questions: number[];
  view_points: number[];
  betterreadItem: BetterReadItemView;
  betterreadItems: BetterReadItemView[];
  handleUpdateToggleQuestions: (questions: number[]) => void;
  handleUpdateToggleViewPoints: (view_points: number[]) => void;
  handleInsertBetterreadItem: (item: BetterReadItemView) => void;
  handleDeleteQuestion: (question_id: number) => void;
  handleUpdateQuestion: (
    question_id: number,
    view_point: string,
    question: string
  ) => void;
};

type FormProps = {
  view_point: string;
  question: string;
  errMsg: string;
};

const INITIAL_STATE: FormProps = {
  view_point: '',
  question: '',
  errMsg: '',
};

const MngRealtimeBetterreadItemRow = ({
  questions,
  view_points,
  betterreadItem,
  betterreadItems,
  handleDeleteQuestion,
  handleUpdateQuestion,
  handleUpdateToggleQuestions,
  handleUpdateToggleViewPoints,
  handleInsertBetterreadItem,
}: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);
  const [isPending, startTransition] = useTransition();

  const action = async () => {
    startTransition(async () => {
      const omitted_question: Omit<
        BetterReadItemQuestion,
        'id' | 'created_at'
      > = {
        betterread_item_id: betterreadItem.id!,
        view_point: value.view_point,
        question: value.question,
      };
      // remote
      const { question, errMsg } = await insertBetterreadItemQuestion(
        omitted_question,
        betterreadItem.betterread_id!
      );

      if (errMsg) {
        setValue((prev) => {
          const value: FormProps = { ...prev, errMsg };
          return value;
        });
        return;
      }

      if (!question) {
        setValue((prev) => {
          const value: FormProps = { ...prev, errMsg: 'something wrong...' };
          return value;
        });
        return;
      }

      // local
      const item: BetterReadItemView = {
        ...betterreadItem,
        question_id: question.id,
        question: question.question,
        view_point: question.view_point,
        question_created_at: question.created_at,
      };
      handleInsertBetterreadItem(item);
    });
  };

  return (
    <div className='grid gap-8'>
      {betterreadItem.image_url ? (
        <div className='grid relative'>
          <Image
            src={betterreadItem.image_url}
            alt=''
            className='rounded-lg'
            width={512}
            height={512}
            sizes='(max-width: 768px) 100vw, (max-height: 1200px) 50vw, 50vw'
            priority={true}
          />
        </div>
      ) : null}
      <div className='grid gap-4'>
        {betterreadItems.map((betterreadItem, index) => {
          if (!betterreadItem.question && !betterreadItem.view_point)
            return null;
          return (
            <MngRealtimeBetterreadItemQuestionRow
              key={index}
              betterreadItem={betterreadItem}
              questions={questions}
              view_points={view_points}
              handleUpdateToggleQuestions={handleUpdateToggleQuestions}
              handleUpdateToggleViewPoints={handleUpdateToggleViewPoints}
              handleDeleteQuestion={handleDeleteQuestion}
              handleUpdateQuestion={handleUpdateQuestion}
            />
          );
        })}
      </div>
      <div className='grid gap-2'>
        <Input
          placeholder='view_point'
          value={value.view_point}
          onChange={(e) =>
            setValue((prev) => {
              const value: FormProps = {
                ...prev,
                errMsg: '',
                view_point: e.target.value,
              };
              return value;
            })
          }
        />
        <Input
          placeholder='question'
          value={value.question}
          onChange={(e) =>
            setValue((prev) => {
              const value: FormProps = {
                ...prev,
                errMsg: '',
                question: e.target.value,
              };
              return value;
            })
          }
        />
        <SubmitServerActionButton
          action={action}
          disabled={!value.view_point || !value.question || isPending}
          isPending={isPending}
          errMsg={value.errMsg}
        >
          追加
        </SubmitServerActionButton>
      </div>
    </div>
  );
};

export default MngRealtimeBetterreadItemRow;
