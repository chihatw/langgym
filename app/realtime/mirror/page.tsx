import HiddenElements from '@/components/HiddenElements';
import { getUserFromServerSide } from '@/features/auth/services/server';
import MirrorWorkoutRealtimeForm from '@/features/mirror/components/MirrorWorkoutRealtimeForm/MirrorWorkoutRealtimeForm';
import {
  fetchLatestMirrorWorkoutResultByUid,
  fetchMirrorWorkoutRealtime,
} from '@/features/mirror/services/server';

type Props = {};

const RealtimeMirrorPage = async (props: Props) => {
  const user = await getUserFromServerSide();
  if (!user) return null;

  const params = await fetchMirrorWorkoutRealtime();

  if (!params) return null;

  const latestMirrorResult = await fetchLatestMirrorWorkoutResultByUid(user.id);

  return (
    <>
      <MirrorWorkoutRealtimeForm params={params} />
      <HiddenElements uid={user.id} latestMirrorResult={latestMirrorResult} />
    </>
  );
};

export default RealtimeMirrorPage;
