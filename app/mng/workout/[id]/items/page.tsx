import WorkoutItemsForm from '@/features/workout/components/WorkoutItemsForm/WorkoutItemsForm';
import {
  fetchWorkoutById,
  fetchWorkoutItemsByWorkoutId,
} from '@/features/workout/services/server';

type Props = { params: Promise<{ id: number }> };

const WorkoutItemsPage = async (props: Props) => {
  const params = await props.params;

  const {
    id
  } = params;

  // workoutItems がない場合のため
  const workout = await fetchWorkoutById(id);
  if (!workout) return null;

  const workoutItems = await fetchWorkoutItemsByWorkoutId(id);

  return <WorkoutItemsForm items={workoutItems} workout={workout} />;
};

export default WorkoutItemsPage;
