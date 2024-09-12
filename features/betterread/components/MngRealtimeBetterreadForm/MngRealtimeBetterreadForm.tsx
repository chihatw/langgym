'use client';
import MngPaneContainer from '@/components/MngPaneContainer';
import { useEffect, useState } from 'react';
import {
  BetterReadItemView,
  BetterreadToggle,
  BetterReadView,
} from '../../schema';
import { fetchBetterreadItemsByBetterreadId } from '../../services/client';
import MngRealtimeBetterreadItemRow from './MngRealtimeBetterreadItemRow';
import SelectBetterread from './SelectBetterread';

type Props = {
  betterreads: BetterReadView[];
  betterreadToggle: BetterreadToggle;
};

type FormProps = {
  selectedId: string;
  betterreadItems: BetterReadItemView[];
  uniqBetterreadItemIds: number[];
  view_points: number[];
  questions: number[];
};

const INITIAL_STATE: FormProps = {
  selectedId: '',
  view_points: [],
  questions: [],
  betterreadItems: [],
  uniqBetterreadItemIds: [],
};

const MngRealtimeBetterreadForm = ({
  betterreads,
  betterreadToggle,
}: Props) => {
  const [value, setValue] = useState({
    ...INITIAL_STATE,
    selectedId: String(betterreadToggle.betterread_id),
    view_points: betterreadToggle.view_points,
    questions: betterreadToggle.questions,
  });

  useEffect(() => {
    if (!value.selectedId) return;

    (async () => {
      const betterreadItems = await fetchBetterreadItemsByBetterreadId(
        parseInt(value.selectedId)
      );

      setValue((prev) => {
        const value: FormProps = {
          ...prev,
          betterreadItems,
          uniqBetterreadItemIds: Array.from(
            new Set(betterreadItems.map((item) => item.id!))
          ),
        };
        return value;
      });
    })();
  }, [value.selectedId]);

  const handleValueChange = (selectedId: string) => {
    setValue((prev) => {
      const value: FormProps = { ...prev, selectedId };
      return value;
    });
  };

  const handleInsertBetterreadItem = (item: BetterReadItemView) => {
    setValue((prev) => {
      let { betterreadItems } = prev;
      betterreadItems = [...betterreadItems, item];
      const value: FormProps = { ...prev, betterreadItems };
      return value;
    });
  };

  const handleUpdateToggleViewPoints = (view_points: number[]) => {
    setValue((prev) => {
      const value: FormProps = { ...prev, view_points };
      return value;
    });
  };

  const handleUpdateToggleQuestions = (questions: number[]) => {
    setValue((prev) => {
      const value: FormProps = { ...prev, questions };
      return value;
    });
  };

  const handleUpdateQuestion = (
    question_id: number,
    view_point: string,
    question: string
  ) => {
    setValue((prev) => {
      let { betterreadItems } = prev;

      betterreadItems = betterreadItems.map((item) => {
        if (item.question_id !== question_id) {
          return item;
        }
        return { ...item, view_point, question };
      });

      const value: FormProps = { ...prev, betterreadItems };
      return value;
    });
  };

  const handleDeleteQuestion = (question_id: number) => {
    setValue((prev) => {
      let { betterreadItems } = prev;
      betterreadItems = betterreadItems.filter(
        (item) => item.question_id !== question_id
      );
      const value: FormProps = { ...prev, betterreadItems };
      return value;
    });
  };

  return (
    <MngPaneContainer label='Better Read' open>
      <div className='grid gap-4'>
        <SelectBetterread
          selectedId={value.selectedId}
          betterreads={betterreads}
          handleValueChange={handleValueChange}
        />
        <div className='grid gap-8 '>
          {value.uniqBetterreadItemIds.map((betterreadItemId) => {
            const betterreadItem = value.betterreadItems.find(
              (item) => item.id === betterreadItemId
            );
            const betterreadItems = value.betterreadItems.filter(
              (item) => item.id === betterreadItemId
            );
            if (!betterreadItem) return null;
            return (
              <MngRealtimeBetterreadItemRow
                key={betterreadItemId}
                betterreadItem={betterreadItem}
                betterreadItems={betterreadItems}
                view_points={value.view_points}
                questions={value.questions}
                handleUpdateToggleViewPoints={handleUpdateToggleViewPoints}
                handleInsertBetterreadItem={handleInsertBetterreadItem}
                handleUpdateToggleQuestions={handleUpdateToggleQuestions}
                handleDeleteQuestion={handleDeleteQuestion}
                handleUpdateQuestion={handleUpdateQuestion}
              />
            );
          })}
        </div>
      </div>
    </MngPaneContainer>
  );
};

export default MngRealtimeBetterreadForm;
