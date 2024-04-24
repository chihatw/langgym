import { fetchUsers } from '@/features/user/services/server';
import WorkoutForm from '@/features/workout/components/WorkoutForm';
import { fetchWorkoutById } from '@/features/workout/services/server';

type Props = {
  params: { id: number };
};

const WorkoutEditPage = async ({ params: { id } }: Props) => {
  if (typeof id === undefined) {
    return <></>;
  }
  const users = await fetchUsers();
  const workout = await fetchWorkoutById(id);

  if (!workout) return <></>;

  return <WorkoutForm users={users} title={'Edit Workout'} workout={workout} />;
};

export default WorkoutEditPage;
