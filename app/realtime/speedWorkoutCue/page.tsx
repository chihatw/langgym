import HiddenElements from '@/components/HiddenElements';
import { getUserFromServerSide } from '@/features/auth/services/server';
import SpeedWorkoutCueForm from '@/features/speedWorkout/components/SpeedWorkoutCueForm/SpeedWorkoutCueForm';

type Props = {};

const SpeedWorkoutCuePage = async (props: Props) => {
  const user = await getUserFromServerSide();
  if (!user) return null;

  return (
    <>
      <SpeedWorkoutCueForm />
      <HiddenElements uid={user.id} cheat={true} />
    </>
  );
};

export default SpeedWorkoutCuePage;
