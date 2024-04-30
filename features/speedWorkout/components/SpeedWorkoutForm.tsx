'use client';
import { Button } from '@/components/ui/button';
import { WorkoutItemView } from '@/features/workout/schema';
import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { PlayCircle, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { SpeedWorkout } from '../schema';
import { updateSpeedWorkoutIsRunning } from '../services/client';

type Props = {
  speedWorkout: SpeedWorkout | undefined;
  workoutItems: WorkoutItemView[];
};

type FormProps = SpeedWorkout & { checkedItemIds: number[] };

const INITIAL_STATE: FormProps = {
  id: 0,
  selectedId: null,
  selectedItemId: null,
  isRunning: false,
  checkedItemIds: [],
};

const SpeedWorkoutForm = ({ workoutItems, speedWorkout }: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  const selectedWorkoutItems = useMemo(
    () => workoutItems.filter((i) => i.workoutId === value.selectedId),
    [workoutItems, value]
  );

  useEffect(() => {
    if (!speedWorkout) return;
    setValue((prev) => ({ ...prev, ...speedWorkout }));
  }, [speedWorkout]);

  useEffect(() => {
    const supabase = createSupabaseClientComponentClient();

    const channel = supabase
      .channel('speed workout')
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
    updateSpeedWorkoutIsRunning(speedWorkout?.id!, updatedValue);
  };

  return (
    <div className='flex justify-center mt-6 '>
      <div className='grid gap-8 grid-rows-[auto,auto,1fr]'>
        <div className='text-center text-gray-700 text-4xl font-extralight'>
          {selectedWorkoutItems?.at(0)?.title}
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
        <span className='font-lato text-[90px] font-[900] text-gray-700'>
          {value.checkedItemIds.length}
        </span>
        <span className='font-lato text-[48px] font-[900] text-gray-700'>{`/${
          selectedWorkoutItems.length * 2
        }`}</span>
      </div>
    </div>
  );
};
