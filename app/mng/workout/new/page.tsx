import { fetchUsers } from '@/features/user/services/server';
import WorkoutEditForm from '@/features/workout/components/WorkoutEditForm';

type Props = {};

const MngWorkoutCreatePage = async (props: Props) => {
  const users = await fetchUsers();
  return <WorkoutEditForm users={users} title='Create New Workout' />;
};

export default MngWorkoutCreatePage;
