'use client';
import MngPaneContainer from '@/components/MngPaneContainer';
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
import { cn } from '@/lib/utils';
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

      return [
        ...acc,
        {
          id: cur.workoutId!,
          title: cur.title!,
          display: cur.display!,
        },
      ];
    }, [] as { id: number; title: string; display: string }[]);
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
    setValue((prev) => ({ ...prev, ...speedWorkout }));
  }, [speedWorkout]);

  // subscribe
  useEffect(() => {
    const supabase = createSupabaseClientComponentClient();
    const channel = supabase
      .channel('speed workout mng speed workout form')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'speed_workout',
        },
        (preload) => {
          const updated = preload.new;
          const { isRunning, selectedItemId } = updated;

          setValue((prev) => ({
            ...prev,
            isRunning,
            selectedItemId: selectedItemId, // null を反映させるため
          }));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [value]);

  const handleSelect = (value: string) => {
    if (!speedWorkout) throw new Error('no speedd workout');

    const selectedId = parseInt(value);

    // local
    setValue((prev) => ({ ...prev, selectedId }));

    // remote

    updateSpeedWorkoutSelectedId(speedWorkout.id, selectedId);
  };

  const handleClick = () => {
    if (!speedWorkout) throw new Error('no speedd workout');

    const isRunning = !value.isRunning;

    // local
    setValue((prev) => ({ ...prev, isRunning, checkedItemIds: [] }));

    // remote
    updateSpeedWorkoutIsRunning(speedWorkout.id, isRunning);
  };

  return (
    <MngPaneContainer label='Speed Workout'>
      <div className='grid gap-4'>
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
                {`${workout.display} ${workout.title}`}
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
                className={cn(
                  'text-xs p-2 rounded grid gap-1 bg-white/60',
                  value.selectedItemId === item.id
                    ? 'border border-red-500'
                    : ''
                )}
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
    </MngPaneContainer>
  );
};

export default MngSpeedWorkoutForm;
