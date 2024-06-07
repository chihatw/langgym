import Breadcrumb from '@/components/Breadcrumb';
import HiddenElements from '@/components/ui/HiddenElements';
import { getUserFromServerSide } from '@/features/auth/services/server';
import MirrorWorkoutForm from '@/features/mirror/components/MirrorWorkoutForm';
import { MIRROR_WORKOUTS_LABEL } from '@/features/mirror/constants';

type Props = {
  params: { uid: string };
};

const MirrorWorkoutPage = async ({ params: { uid } }: Props) => {
  const user = await getUserFromServerSide();
  if (!user) return null;

  return (
    <>
      <div className='grid gap-4 max-w-lg mx-auto pt-4 pb-40'>
        <Breadcrumb label={MIRROR_WORKOUTS_LABEL} />
        <MirrorWorkoutForm uid={user.id} />
      </div>
      <HiddenElements uid={user.id} />
    </>
  );
};

export default MirrorWorkoutPage;
