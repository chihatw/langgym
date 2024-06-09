import Breadcrumb from '@/components/Breadcrumb';
import HiddenElements from '@/components/HiddenElements';
import { getUserFromServerSide } from '@/features/auth/services/server';
import WorkoutForm from '@/features/workout/components/WorkoutForm/WorkoutForm';
import {
  fetchWorkoutItemsByWorkoutId,
  fetchWorkoutRecordRowsByWorkoutId,
} from '@/features/workout/services/server';

type Props = {
  params: { id: number };
};

const WorkoutPage = async ({ params: { id } }: Props) => {
  const user = await getUserFromServerSide();
  if (!user) return null;

  const workoutItems = await fetchWorkoutItemsByWorkoutId(id);
  const workoutRecordRows = await fetchWorkoutRecordRowsByWorkoutId(id);
  return (
    <>
      <div className='grid gap-4 max-w-lg mx-auto pt-4 pb-40'>
        <Breadcrumb label='反応練習' />
        <WorkoutForm
          workoutItems={workoutItems}
          recordRows={workoutRecordRows}
        />
      </div>
      <HiddenElements uid={user.id} />
    </>
  );
};

export default WorkoutPage;
