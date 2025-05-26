'use client';
import { Button } from '@/components/ui/button';
import { WorkoutItemView } from '@/features/workout/schema';
import { fetchWorkoutItems } from '@/features/workout/services/client';
import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { PlayCircle, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { SpeedWorkout } from '../schema';
import {
  fetchSpeedWorkout,
  updateSpeedWorkoutIsRunning,
} from '../services/client';

type Props = {};

type FormProps = SpeedWorkout & { workoutItems: WorkoutItemView[] } & {
  checkedItemIds: number[];
};

const INITIAL_STATE: FormProps = {
  id: 0,
  selectedId: null,
  selectedItemId: null,
  isRunning: false,
  checkedItemIds: [],
  workoutItems: [],
};

const SpeedWorkoutForm = ({}: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  const selectedWorkoutItems = useMemo(
    () => value.workoutItems.filter((i) => i.workoutId === value.selectedId),
    [value]
  );

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
      .channel('speed workout speed workout form')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'speed_workout' },
        (payload) => {
          const updated = payload.new;
          const { id, selectedItemId, isRunning, selectedId } = updated;

          let checkedItemIds: number[] = [];
          if (isRunning && selectedItemId) {
            checkedItemIds = [...value.checkedItemIds, selectedItemId];
          }

          setValue((prev) => ({
            ...prev,
            id,
            selectedItemId,
            isRunning,
            selectedId,
            checkedItemIds,
          }));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [value]);

  const handleClick = () => {
    const updatedValue = !value.isRunning;

    // local
    setValue((prev) => ({
      ...prev,
      isRunning: !prev.isRunning,
    }));

    // remote
    updateSpeedWorkoutIsRunning(value.id, updatedValue);
  };

  return (
    <div className='flex justify-center mt-6 '>
      <div className='grid gap-8 grid-rows-[auto_auto_1fr]'>
        <div className='text-center text-gray-700 text-4xl '>
          {`${selectedWorkoutItems?.at(0)?.display} ${
            selectedWorkoutItems?.at(0)?.title
          }`}
        </div>

        <div className='flex justify-center'>
          <SpeedWorkoutCounter
            value={value}
            selectedWorkoutItems={selectedWorkoutItems}
          />
        </div>
        <div className='flex justify-center pt-8'>
          <Button
            size='icon'
            variant='ghost'
            className='h-24 w-24 rounded-full'
            onClick={handleClick}
          >
            {value.isRunning ? (
              <X className='w-24 h-24' />
            ) : (
              <PlayCircle className='w-24 h-24' />
            )}
          </Button>
        </div>
        <div />
      </div>
    </div>
  );
};

export default SpeedWorkoutForm;

const SpeedWorkoutCounter = ({
  value,
  selectedWorkoutItems,
}: {
  value: FormProps;
  selectedWorkoutItems: WorkoutItemView[];
}) => {
  return (
    <div className='flex items-center'>
      <div>
        <span className='font-lato text-[90px] font-black text-gray-700'>
          {value.checkedItemIds.length}
        </span>
        <span className='font-lato text-[48px] font-black text-gray-700'>{`/${
          selectedWorkoutItems.length * 2
        }`}</span>
      </div>
    </div>
  );
};
