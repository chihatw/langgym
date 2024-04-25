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

  return <WorkoutList workoutRecords={workoutRecords} workouts={workouts} />;
};

export default WorkoutListContainer;
