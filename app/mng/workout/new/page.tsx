import { fetchUsers } from '@/features/user/services/server';
import WorkoutForm from '@/features/workout/components/WorkoutForm';

type Props = {};

const MngWorkoutCreatePage = async (props: Props) => {
  const users = await fetchUsers();
  return <WorkoutForm users={users} title='Create New Workout' />;
};

export default MngWorkoutCreatePage;
