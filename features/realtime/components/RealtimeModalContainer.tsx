import { fetchPageStateByUid } from '@/features/pageState/services/server';
import { fetchSpeedWorkout } from '@/features/speedWorkout/services/server';
import { fetchWorkoutItems } from '@/features/workout/services/server';
import RealtimeModal from './RealtimeModal';

type Props = { uid: string };

const RealtimeModalContainer = async ({ uid }: Props) => {
  const pageState = await fetchPageStateByUid(uid);
  const workoutItems = await fetchWorkoutItems();
  const speedWorkout = await fetchSpeedWorkout();

  if (!pageState || !speedWorkout) return <></>;
  return (
    <RealtimeModal
      uid={uid}
      pageState={pageState}
      workoutItems={workoutItems}
      speedWorkout={speedWorkout}
    />
  );
};

export default RealtimeModalContainer;
