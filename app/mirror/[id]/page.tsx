import Breadcrumb from '@/components/Breadcrumb';
import HiddenElements from '@/components/ui/HiddenElements';
import { getUserFromServerSide } from '@/features/auth/services/server';
import MirrorWorkoutForm from '@/features/mirror/components/MirrorWorkoutForm';
import { MIRROR_WORKOUTS_LABEL } from '@/features/mirror/constants';
import { fetchMirrorWorkoutById_Uid } from '@/features/mirror/services/server';

type Props = {
  params: { id: string };
};

const MirrorWorkoutPage = async ({ params: { id } }: Props) => {
  const user = await getUserFromServerSide();
  if (!user) return null;

  const workout = await fetchMirrorWorkoutById_Uid(parseInt(id), user.id);

  if (!workout) return null;

  return (
    <>
      <div className='grid gap-4 max-w-lg mx-auto pt-4 pb-40'>
        <Breadcrumb label={MIRROR_WORKOUTS_LABEL} />
        <MirrorWorkoutForm workout={workout} />
      </div>
      <HiddenElements uid={user.id} />
    </>
  );
};

export default MirrorWorkoutPage;
