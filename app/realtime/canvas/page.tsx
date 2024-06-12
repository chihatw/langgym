import HiddenElements from '@/components/HiddenElements';
import { getUserFromServerSide } from '@/features/auth/services/server';
import CanvasForm from '@/features/canvas/components/CanvasForm';
import { fetchLatestMirrorWorkoutResultByUid } from '@/features/mirror/services/server';
import RefreshRealtime from '@/features/trigger/components/RefreshRealtime';

type Props = {};

const RealtimeCanvasPage = async (props: Props) => {
  const user = await getUserFromServerSide();
  if (!user) return null;

  const latestMirrorResult = await fetchLatestMirrorWorkoutResultByUid(user.id);

  return (
    <>
      <CanvasForm />
      <HiddenElements uid={user.id} latestMirrorResult={latestMirrorResult} />
      <RefreshRealtime uid={user.id} />
    </>
  );
};

export default RealtimeCanvasPage;
