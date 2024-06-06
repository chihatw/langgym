import HiddenElements from '@/components/ui/HiddenElements';
import { getUserFromServerSide } from '@/features/auth/services/server';
import MirrorWorkoutRealtimeForm from '@/features/mirror/components/MirrorWorkoutRealtimeForm/MirrorWorkoutRealtimeForm';
import { fetchMirrorWorkoutRealtime } from '@/features/mirror/services/server';

type Props = {};

const RealtimeMirrorPage = async (props: Props) => {
  const user = await getUserFromServerSide();
  if (!user) return null;

  const params = await fetchMirrorWorkoutRealtime();

  if (!params) return null;

  return (
    <>
      <MirrorWorkoutRealtimeForm params={params} />
      <HiddenElements uid={user.id} />
    </>
  );
};

export default RealtimeMirrorPage;
