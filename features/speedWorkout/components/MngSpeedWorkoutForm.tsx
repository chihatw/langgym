'use client';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { WorkoutItemView } from '@/features/workout/schema';
import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { useEffect, useMemo, useState } from 'react';
import { SpeedWorkout } from '../schema';
import {
  updateSpeedWorkoutIsRunning,
  updateSpeedWorkoutSelectedId,
} from '../services/client';

type Props = {
  speedWorkout: SpeedWorkout | undefined;
  workoutItems: WorkoutItemView[];
};

type FormProps = SpeedWorkout;

const INITIAL_STATE: FormProps = {
  id: 0,
  selectedId: null,
  isRunning: false,
  selectedItemId: null,
};

const MngSpeedWorkoutForm = ({ speedWorkout, workoutItems }: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  const workouts = useMemo(() => {
    return workoutItems.reduce((acc, cur) => {
      const ids = acc.map((i) => i.id);

      if (ids.includes(cur.workoutId!)) {
        return acc;
      }

      return [...acc, { id: cur.workoutId!, title: cur.title! }];
    }, [] as { id: number; title: string }[]);
  }, [workoutItems]);

  const selectedWorkoutItems = useMemo(
    () => workoutItems.filter((w) => w.workoutId === value.selectedId),
    [workoutItems, value]
  );

  // from RSC
  useEffect(() => {
    if (!speedWorkout) {
      setValue(INITIAL_STATE);
      return;
    }
    setValue(speedWorkout);
  }, [speedWorkout]);

  // subscribe
  useEffect(() => {
    const supabase = createSupabaseClientComponentClient();
    const channel = supabase
      .channel('speed workout')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'speed_workout',
        },
        (preload) => {
          const updated = preload.new;
          const { isRunning } = updated;
          setValue((prev) => ({ ...prev, isRunning }));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSelect = (value: string) => {
    if (!speedWorkout) return;

    const selectedId = parseInt(value);

    // local
    setValue((prev) => ({ ...prev, selectedId }));

    // remote
    updateSpeedWorkoutSelectedId(speedWorkout.id, selectedId);
  };

  const handleClick = () => {
    if (!speedWorkout) return;

    const isRunning = !value.isRunning;

    // local
    setValue((prev) => ({ ...prev, isRunning }));

    // remote
    updateSpeedWorkoutIsRunning(speedWorkout.id, isRunning);
  };

  return (
    <div className='grid gap-4'>
      <div className='text-xs font-extrabold'>Speed Workout</div>
      <Select
        value={value.selectedId ? value.selectedId.toString() : ''}
        onValueChange={handleSelect}
      >
        <SelectTrigger>
          <SelectValue placeholder='workout' />
        </SelectTrigger>
        <SelectContent>
          {workouts.map((workout, index) => (
            <SelectItem key={index} value={workout.id!.toString()}>
              {workout.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={handleClick}>
        {value.isRunning ? 'Pause' : 'Play'}
      </Button>
      {selectedWorkoutItems ? (
        <div className='grid gap-4'>
          {selectedWorkoutItems.map((item) => (
            <div
              key={item.id!}
              className='text-xs p-2 rounded bg-white/60 grid gap-1'
            >
              <div>{item.japanese}</div>
              <div className='text-[#52a2aa]'>{item.chinese}</div>
              <div className='p-2 rounded bg-slate-200'>
                <SentencePitchLine pitchStr={item.pitchStr!} />
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default MngSpeedWorkoutForm;
