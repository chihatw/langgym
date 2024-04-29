import { fetchPageStateByUid } from '@/features/pageState/services/server';
import { fetchSpeedWorkout } from '@/features/speedWorkout/services/server';
import { fetchWorkoutItems } from '@/features/workout/services/server';
import { fetchOpenByUid } from '../services/server';
import RealtimeModal from './RealtimeModal';

type Props = { uid: string };

const RealtimeModalContainer = async ({ uid }: Props) => {
  const isOpen = await fetchOpenByUid(uid);
  const pageState = await fetchPageStateByUid(uid);
  const workoutItems = await fetchWorkoutItems();
  const speedWorkout = await fetchSpeedWorkout();
  return (
    <RealtimeModal
      uid={uid}
      isOpen={isOpen}
      pageState={pageState}
      workoutItems={workoutItems}
      speedWorkout={speedWorkout}
    />
  );
};

export default RealtimeModalContainer;
