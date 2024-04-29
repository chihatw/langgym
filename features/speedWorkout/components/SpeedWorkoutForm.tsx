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

const SpeedWorkoutForm = ({ workoutItems, speedWorkout }: Props) => {
  const [value, setValue] = useState<SpeedWorkout>({
    id: 0,
    selectedId: 0,
    checkedIndexes: [],
    isRunning: false,
  });

  const selectedWorkoutItems = useMemo(
    () => workoutItems.filter((i) => i.workoutId === value.selectedId),
    [workoutItems, value]
  );

  useEffect(() => {
    if (!speedWorkout) return;
    setValue(speedWorkout);
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
          const { id, checkedIndexes, isRunning, selectedId } = updated;
          setValue({ id, checkedIndexes, isRunning, selectedId });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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
    <div className='flex justify-center mt-6 items-center'>
      <div className='grid gap-20'>
        <div className='text-center text-gray-700 text-4xl p-0 font-extralight'>
          {selectedWorkoutItems?.at(0)?.title}
        </div>

        <div className='flex justify-center'>
          <SpeedWorkoutCounter
            value={value}
            selectedWorkoutItems={selectedWorkoutItems}
          />
        </div>
        <div className='flex justify-center'>
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
      </div>
    </div>
  );
};

export default SpeedWorkoutForm;

const SpeedWorkoutCounter = ({
  value,
  selectedWorkoutItems,
}: {
  value: SpeedWorkout;
  selectedWorkoutItems: WorkoutItemView[];
}) => {
  return (
    <div className='flex items-center'>
      <div>
        <span className='font-lato text-[90px] font-[900] text-gray-700'>
          {value.checkedIndexes.length}
        </span>
        <span className='font-lato text-[48px] font-[900] text-gray-700'>{`/${
          selectedWorkoutItems.length *
          (selectedWorkoutItems.at(0)?.isReview ? 2 : 1)
        }`}</span>
      </div>
    </div>
  );
};
