import Breadcrumb from '@/components/Breadcrumb';
import HiddenElements from '@/components/HiddenElements';
import { getUserFromServerSide } from '@/features/auth/services/server';
import MirrorWorkoutForm from '@/features/mirror/components/MirrorWorkoutForm';
import { MIRROR_WORKOUTS_LABEL } from '@/features/mirror/constants';
import { fetchLatestMirrorWorkoutResultByUid } from '@/features/mirror/services/server';

type Props = {};

const MirrorWorkoutPage = async (params: Props) => {
  const user = await getUserFromServerSide();
  if (!user) return null;

  const latestMirrorResult = await fetchLatestMirrorWorkoutResultByUid(user.id);

  return (
    <>
      <div className='grid gap-4 max-w-lg mx-auto pt-4 pb-40'>
        <Breadcrumb label={MIRROR_WORKOUTS_LABEL} />
        <MirrorWorkoutForm uid={user.id} />
      </div>
      <HiddenElements
        uid={user.id}
        cheat={true}
        latestMirrorResult={latestMirrorResult}
      />
    </>
  );
};

export default MirrorWorkoutPage;
