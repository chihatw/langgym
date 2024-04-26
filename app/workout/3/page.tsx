import Breadcrumb from '@/components/Breadcrumb';
import WorkoutSecondPane from '@/features/workout/components/WorkoutSecondPane/WorkoutSecondPane';
import {
  WORKOUT_LABELS,
  WORKOUT_THIRD_ITEMS,
} from '@/features/workout/constants';
import { fetchWorkoutSecondAudioPath } from '@/features/workout/services/server';

type Props = {};

const WorkoutThirdPage = async (props: Props) => {
  const audioPath = await fetchWorkoutSecondAudioPath(3);
  return (
    <div className='grid gap-4 max-w-lg mx-auto pt-4 pb-40'>
      <Breadcrumb label={WORKOUT_LABELS.at(2)} />
      <WorkoutSecondPane
        label={WORKOUT_LABELS.at(2)!}
        items={WORKOUT_THIRD_ITEMS}
        workoutIndex={3}
        audioPath={audioPath}
      />
    </div>
  );
};

export default WorkoutThirdPage;
