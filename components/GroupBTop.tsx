import WorkoutCountDown from '@/features/workout/components/WorkoutCountDown';
import {
  WORKOUT_FIRST_ITEMS,
  WORKOUT_LABELS,
} from '@/features/workout/constants';
import { fetchWorkoutFirstAudioPaths } from '@/features/workout/services/server';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import Link from 'next/link';
import BorderLabel from './BorderLabel';
import { buttonVariants } from './ui/button';

type Props = {};

const GroupBTop = async (props: Props) => {
  const workoutFirstAudioPaths = await fetchWorkoutFirstAudioPaths();

  return (
    <div className='grid gap-8 max-w-lg mx-auto pt-10 pb-40'>
      <div className='grid gap-4'>
        <WorkoutCountDown />
        <BorderLabel label='練習' />
        <div className='grid gap-4'>
          <div className='rounded bg-white/60 grid p-5'>
            <Link
              href={`/workout/1`}
              className={cn(buttonVariants({ variant: 'link' }))}
            >
              <div className='font-extrabold text-2xl text-slate-700  w-32 text-center'>
                {WORKOUT_LABELS.at(0)}
              </div>
            </Link>
            {workoutFirstAudioPaths.length ? (
              <div className='flex justify-end items-center gap-1'>
                <div className='text-xs text-slate-500'>{`${workoutFirstAudioPaths.length}/${WORKOUT_FIRST_ITEMS.length}`}</div>
                {workoutFirstAudioPaths.length ===
                WORKOUT_FIRST_ITEMS.length ? (
                  <Check className='w-4 h-4 text-teal-600' />
                ) : null}
              </div>
            ) : null}
          </div>
          <Link
            href={`/workout/2`}
            className={cn(
              'p-5 rounded bg-white/60 flex justify-center items-center min-h-20',
              buttonVariants({ variant: 'link' })
            )}
          >
            <div className='font-extrabold text-2xl text-slate-700  w-32 text-center'>
              {WORKOUT_LABELS.at(1)}
            </div>
          </Link>
          <Link
            href={`/workout/3`}
            className={cn(
              'p-5 rounded bg-white/60 flex justify-center items-center min-h-20',
              buttonVariants({ variant: 'link' })
            )}
          >
            <div className='font-extrabold text-2xl text-slate-700  w-32 text-center'>
              {WORKOUT_LABELS.at(2)}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GroupBTop;
