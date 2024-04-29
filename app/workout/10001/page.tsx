import Breadcrumb from '@/components/Breadcrumb';
import WorkoutFirstPane from '@/features/workout/components/WorkoutFirstPane/WorkoutFirstPane';
import { WORKOUT_LABELS } from '@/features/workout/constants';
import { fetchWorkoutFirstAudioPaths } from '@/features/workout/services/server';

type Props = {};

const WorkoutFirstPage = async (prop: Props) => {
  const audioPaths = await fetchWorkoutFirstAudioPaths();

  return (
    <div className='grid gap-4 max-w-lg mx-auto pt-4 pb-40'>
      <Breadcrumb label={WORKOUT_LABELS.at(0)} />
      <WorkoutFirstPane audioPaths={audioPaths} label={WORKOUT_LABELS.at(0)!} />
    </div>
  );
};

export default WorkoutFirstPage;
