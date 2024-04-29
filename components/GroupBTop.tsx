import WorkoutCountDown from '@/features/workout/components/WorkoutCountDown';
import WorkoutFirstTopRow from '@/features/workout/components/WorkoutFirstPane/WorkoutFirstTopRow';
import WorkoutSecondTopRow from '@/features/workout/components/WorkoutSecondPane/WorkoutSecondTopRow';
import { WORKOUT_LABELS } from '@/features/workout/constants';
import {
  fetchWorkoutFirstAudioPaths,
  fetchWorkoutSecondAudioPath,
} from '@/features/workout/services/server';
import BorderLabel from './BorderLabel';

type Props = {};

const GroupBTop = async (props: Props) => {
  const workoutFirstAudioPaths = await fetchWorkoutFirstAudioPaths();
  const workoutSecondAudioPath = await fetchWorkoutSecondAudioPath(2);
  const workoutThirdAudioPath = await fetchWorkoutSecondAudioPath(3);

  return (
    <div className='grid gap-8 max-w-lg mx-auto pt-10 pb-40'>
      <div className='grid gap-4'>
        <WorkoutCountDown />
        <BorderLabel label='練習' />
        <div className='grid gap-4'>
          <WorkoutFirstTopRow audioPaths={workoutFirstAudioPaths} />
          <WorkoutSecondTopRow
            href='/workout/10002'
            label={WORKOUT_LABELS.at(1)}
            audioPath={workoutSecondAudioPath}
          />
          <WorkoutSecondTopRow
            href='/workout/10003'
            label={WORKOUT_LABELS.at(2)}
            audioPath={workoutThirdAudioPath}
          />
        </div>
      </div>
    </div>
  );
};

export default GroupBTop;
