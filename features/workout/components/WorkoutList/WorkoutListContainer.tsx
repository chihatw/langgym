import BorderLabel from '@/components/BorderLabel';
import {
  fetchWorkoutRecordsByWorkoutIds,
  fetchWorkoutsByUid,
} from '../../services/server';
import WorkoutList from './WorkoutList';

type Props = { uid: string };

const WorkoutListContainer = async ({ uid }: Props) => {
  const workouts = await fetchWorkoutsByUid(uid);

  const workoutRecords = await fetchWorkoutRecordsByWorkoutIds(
    workouts.map((item) => item.id)
  );

  if (!workouts.length) return null;

  return (
    <div className='grid gap-4'>
      <BorderLabel label='反応練習' />
      <WorkoutList workoutRecords={workoutRecords} workouts={workouts} />
    </div>
  );
};

export default WorkoutListContainer;
