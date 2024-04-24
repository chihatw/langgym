import MngWorkoutList from '@/features/workout/components/MngWorkoutList/MngWorkoutList';
import { fetchWorkouts } from '@/features/workout/services/server';

type Props = {};

const MngWorkoutListPage = async (props: Props) => {
  const workouts = await fetchWorkouts();
  return <MngWorkoutList workouts={workouts} />;
};

export default MngWorkoutListPage;
