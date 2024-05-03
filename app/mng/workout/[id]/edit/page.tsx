import { fetchUsers } from '@/features/user/services/server';
import WorkoutEditForm from '@/features/workout/components/WorkoutEditForm';
import { fetchWorkoutById } from '@/features/workout/services/server';

type Props = {
  params: { id: number };
};

const WorkoutEditPage = async ({ params: { id } }: Props) => {
  if (typeof id === undefined) {
    return null;
  }
  const users = await fetchUsers();
  const workout = await fetchWorkoutById(id);

  if (!workout) return null;

  return (
    <WorkoutEditForm users={users} title={'Edit Workout'} workout={workout} />
  );
};

export default WorkoutEditPage;
