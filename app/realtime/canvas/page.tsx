import HiddenElements from '@/components/ui/HiddenElements';
import { getUserFromServerSide } from '@/features/auth/services/server';
import CanvasForm from '@/features/canvas/components/CanvasForm';
import RefreshRealtime from '@/features/trigger/components/RefreshRealtime';

type Props = {};

const RealtimeCanvasPage = async (props: Props) => {
  const user = await getUserFromServerSide();
  if (!user) return null;

  return (
    <>
      <CanvasForm />
      <HiddenElements uid={user.id} />
      <RefreshRealtime uid={user.id} />
    </>
  );
};

export default RealtimeCanvasPage;
