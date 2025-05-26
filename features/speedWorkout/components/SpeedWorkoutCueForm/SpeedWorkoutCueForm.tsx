'use client';
import { Workout, WorkoutItemView } from '@/features/workout/schema';
import { fetchWorkoutItems } from '@/features/workout/services/client';
import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { useEffect, useMemo, useState } from 'react';
import { SpeedWorkout } from '../../schema';
import {
  fetchSpeedWorkout,
  updateSpeedWorkoutSelectedItemId,
} from '../../services/client';
import FirstRoundList from './FirstRoundList';
import LastRoundList from './LastRoundList';

type Props = {};

export type SpeedWorkoutCueFormProps = SpeedWorkout & {
  checkedItemIds: number[];
  isLastRound: boolean;
  workoutItems: WorkoutItemView[];
};

const INITIAL_STATE: SpeedWorkoutCueFormProps = {
  id: 0,
  isRunning: false,
  selectedId: null,
  selectedItemId: null,
  checkedItemIds: [],
  isLastRound: false,
  workoutItems: [],
};

const SpeedWorkoutCueForm = ({}: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  const selectedWorkoutItems = useMemo(() => {
    return value.workoutItems.filter((i) => i.workoutId === value.selectedId);
  }, [value]);

  const selectedWorkout = useMemo<
    | (Pick<Workout, 'title' | 'id' | 'isReview'> & { display: string })
    | undefined
  >(() => {
    const temp = selectedWorkoutItems.at(0);

    if (!temp) return;

    const { workoutId, title, isReview, display } = temp;

    return {
      id: workoutId!,
      title: title!,
      isReview: isReview!,
      display: display!,
    };
  }, [selectedWorkoutItems]);

  // initialize
  useEffect(() => {
    (async () => {
      const speedWorkout = await fetchSpeedWorkout();
      if (!speedWorkout) {
        setValue(INITIAL_STATE);
        return;
      }
      setValue((prev) => ({ ...prev, ...speedWorkout }));
    })();
  }, []);

  // initialize
  useEffect(() => {
    (async () => {
      const workoutItems = await fetchWorkoutItems();
      setValue((prev) => ({ ...prev, workoutItems }));
    })();
  }, []);

  // subscribe
  useEffect(() => {
    const supabase = createSupabaseClientComponentClient();

    const channel = supabase
      .channel('speed workout speed workout cue form')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'speed_workout' },
        (preload) => {
          const updated = preload.new;
          const { id, isRunning, selectedId } = updated;

          // isRunning, selectedId が変更された時
          if (
            isRunning !== value.isRunning ||
            selectedId !== value.selectedId
          ) {
            // selectedItemId, checkedItemIds, isLastRound もリセット
            setValue((prev) => ({
              ...prev,
              id,
              isRunning,
              selectedId,
              isLastRound: false,
              checkedItemIds: [],
              selectedItemId: null,
            }));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [value]);

  const handleClick = (itemId: number) => {
    // remote
    updateSpeedWorkoutSelectedItemId(value.id, itemId);

    // local

    // selectedItemId を設定、checkedItemId を追加
    const checkedItemIds = [...value.checkedItemIds, itemId];

    if (checkedItemIds.length !== selectedWorkoutItems.length) {
      setValue((prev) => ({
        ...prev,
        checkedItemIds,
        selectedItemId: itemId,
      }));
      return;
    }

    // checkedItemIds とselectedWorkoutItems の長さが同じになった時
    // isLast ならば、そのまま終了
    if (value.isLastRound) {
      setValue((prev) => ({
        ...prev,
        checkedItemIds,
        selectedItemId: itemId,
      }));
      return;
    }

    // isLast じゃなければ、isLast を true にして、checkedItemIds を空にする
    setValue((prev) => ({
      ...prev,
      checkedItemIds: [],
      selectedItemId: itemId,
      isLastRound: true,
    }));
  };

  return (
    <div className='flex justify-center mt-6 '>
      <div className='grid gap-8 grid-rows-[auto_auto_1fr]'>
        <div className='text-center text-gray-700 text-4xl '>
          {`${selectedWorkout?.display} ${selectedWorkout?.title}`}
        </div>
        {value.isRunning ? (
          <div className='grid gap-10 grid-rows-[auto_1fr]'>
            <div className='grid gap-2'>
              <FirstRoundList
                value={value}
                workoutItems={selectedWorkoutItems}
                handleClick={handleClick}
              />
              {value.isLastRound ? (
                <LastRoundList
                  value={value}
                  workoutItems={selectedWorkoutItems}
                  handleClick={handleClick}
                />
              ) : null}
            </div>
            <div />
          </div>
        ) : (
          <div className='text-center text-6xl font-extrabold text-gray-400'>
            Ready
          </div>
        )}
        <div />
      </div>
    </div>
  );
};

export default SpeedWorkoutCueForm;
