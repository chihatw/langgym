import WorkoutCountDown from '@/features/workout/components/WorkoutCountDown';
import WorkoutFirstTopRow from '@/features/workout/components/WorkoutFirstPane/WorkoutFirstTopRow';
import WorkoutSecondTopRow from '@/features/workout/components/WorkoutSecondPane/WorkoutSecondTopRow';
import { WORKOUT_LABELS } from '@/features/workout/constants';
import {
  fetchWorkoutFirstAudioPaths,
  fetchWorkoutSecondAudioPath,
} from '@/features/workout/services/server';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import BorderLabel from './BorderLabel';
import { buttonVariants } from './ui/button';

type Props = {};

const GroupBTop = async (props: Props) => {
  const workoutFirstAudioPaths = await fetchWorkoutFirstAudioPaths();
  const workoutSecondAudioPath = await fetchWorkoutSecondAudioPath(2);

  return (
    <div className='grid gap-8 max-w-lg mx-auto pt-10 pb-40'>
      <div className='grid gap-4'>
        <WorkoutCountDown />
        <BorderLabel label='練習' />
        <div className='grid gap-4'>
          <WorkoutFirstTopRow audioPaths={workoutFirstAudioPaths} />
          <WorkoutSecondTopRow
            href='/workout/2'
            label={WORKOUT_LABELS.at(1)}
            audioPath={workoutSecondAudioPath}
          />
          <div className='rounded bg-white/60 grid p-5'>
            <Link
              href={`/workout/3`}
              className={cn(buttonVariants({ variant: 'link' }))}
            >
              <div className='font-extrabold text-2xl text-slate-700  w-32 text-center'>
                {WORKOUT_LABELS.at(2)}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupBTop;
