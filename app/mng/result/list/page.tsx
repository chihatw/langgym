import MngResultList from '@/features/workout/components/MngResultList/MngResultList';
import { fetchWorkoutRecordRows } from '@/features/workout/services/server';

type Props = {};

const WorkoutResultList = async (props: Props) => {
  const recordRows = await fetchWorkoutRecordRows();

  return <MngResultList recordRows={recordRows} />;
};

export default WorkoutResultList;
