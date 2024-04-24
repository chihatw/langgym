import WorkoutItemsForm from '@/features/workout/components/WorkoutItemsForm';
import {
  fetchWorkoutById,
  fetchWorkoutItemsByWorkoutId,
} from '@/features/workout/services/server';

type Props = { params: { id: number } };

const WorkoutItemsPage = async ({ params: { id } }: Props) => {
  // workoutItems がない場合のため
  const workout = await fetchWorkoutById(id);
  if (!workout) return <></>;

  const workoutItems = await fetchWorkoutItemsByWorkoutId(id);

  return <WorkoutItemsForm items={workoutItems} workout={workout} />;
};

export default WorkoutItemsPage;
