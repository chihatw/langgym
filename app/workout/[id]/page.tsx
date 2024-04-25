import Breadcrumb from '@/components/Breadcrumb';
import WorkoutForm from '@/features/workout/components/WorkoutForm/WorkoutForm';
import { fetchWorkoutItemsByWorkoutId } from '@/features/workout/services/server';

type Props = {
  params: { id: number };
};

const WorkoutPage = async ({ params: { id } }: Props) => {
  const workoutItems = await fetchWorkoutItemsByWorkoutId(id);

  return (
    <div className='grid gap-4 max-w-lg mx-auto pt-4 pb-40'>
      <Breadcrumb label='反応練習' />
      <WorkoutForm workoutItems={workoutItems} />
    </div>
  );
};

export default WorkoutPage;
