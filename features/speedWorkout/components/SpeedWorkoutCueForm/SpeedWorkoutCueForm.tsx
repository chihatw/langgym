'use client';
import { Workout, WorkoutItemView } from '@/features/workout/schema';
import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { useEffect, useMemo, useState } from 'react';
import { SpeedWorkout } from '../../schema';
import { updateSpeedWorkoutSelectedItemId } from '../../services/client';
import FirstRoundList from './FirstRoundList';
import LastRoundList from './LastRoundList';

type Props = {
  speedWorkout: SpeedWorkout | undefined;
  workoutItems: WorkoutItemView[];
};

export type SpeedWorkoutCueFormProps = SpeedWorkout & {
  checkedItemIds: number[];
  isLastRound: boolean;
};

const INITIAL_STATE: SpeedWorkoutCueFormProps = {
  id: 0,
  isRunning: false,
  selectedId: null,
  selectedItemId: null,
  checkedItemIds: [],
  isLastRound: false,
};

const SpeedWorkoutCueForm = ({ speedWorkout, workoutItems }: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  const selectedWorkoutItems = useMemo(() => {
    return workoutItems.filter((i) => i.workoutId === value.selectedId);
  }, [value.selectedId, workoutItems]);

  const selectedWorkout = useMemo<
    Pick<Workout, 'title' | 'id' | 'isReview'> | undefined
  >(() => {
    const temp = selectedWorkoutItems.at(0);

    if (!temp) return;

    const { workoutId, title, isReview } = temp;

    return {
      id: workoutId!,
      title: title!,
      isReview: isReview!,
    };
  }, [selectedWorkoutItems]);

  // from RSC
  useEffect(() => {
    if (!speedWorkout) return;

    setValue((prev) => ({
      ...prev,
      ...speedWorkout,
    }));
  }, [speedWorkout]);

  // subscribe
  useEffect(() => {
    const supabase = createSupabaseClientComponentClient();

    const channel = supabase
      .channel('speed workout')
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
    if (!speedWorkout) return;

    // remote
    updateSpeedWorkoutSelectedItemId(speedWorkout.id, itemId);

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
      <div className='grid gap-8 grid-rows-[auto,auto,1fr]'>
        <div className='text-center text-gray-700 text-4xl '>
          {selectedWorkout?.title}
        </div>
        {value.isRunning ? (
          <div className='grid gap-10 grid-rows-[auto,1fr]'>
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
