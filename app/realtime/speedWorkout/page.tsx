import HiddenElements from '@/components/HiddenElements';
import { getUserFromServerSide } from '@/features/auth/services/server';
import SpeedWorkoutForm from '@/features/speedWorkout/components/SpeedWorkoutForm';

type Props = {};

const SpeedWorkoutPage = async (props: Props) => {
  const user = await getUserFromServerSide();
  if (!user) return null;

  return (
    <>
      <SpeedWorkoutForm />
      <HiddenElements uid={user.id} cheat={true} />
    </>
  );
};

export default SpeedWorkoutPage;
