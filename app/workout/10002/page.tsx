import Breadcrumb from '@/components/Breadcrumb';
import WorkoutSecondPane from '@/features/workout/components/WorkoutSecondPane/WorkoutSecondPane';
import {
  WORKOUT_FIRST_ITEMS,
  WORKOUT_LABELS,
} from '@/features/workout/constants';
import { fetchWorkoutSecondAudioPath } from '@/features/workout/services/server';

type Props = {};

const WorkoutSecondPage = async (props: Props) => {
  const audioPath = await fetchWorkoutSecondAudioPath(2);

  return (
    <div className='grid gap-4 max-w-lg mx-auto pt-4 pb-40'>
      <Breadcrumb label={WORKOUT_LABELS.at(1)} />
      <WorkoutSecondPane
        label={WORKOUT_LABELS.at(1)!}
        items={WORKOUT_FIRST_ITEMS}
        workoutIndex={2}
        audioPath={audioPath}
      />
    </div>
  );
};

export default WorkoutSecondPage;
