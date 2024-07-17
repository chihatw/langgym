import HiddenElements from '@/components/HiddenElements';
import { getUserFromServerSide } from '@/features/auth/services/server';
import CanvasForm from '@/features/canvas/components/CanvasForm';

type Props = {};

const RealtimeCanvasPage = async (props: Props) => {
  const user = await getUserFromServerSide();
  if (!user) return null;

  return (
    <>
      <CanvasForm />
      <HiddenElements uid={user.id} cheat={true} />
    </>
  );
};

export default RealtimeCanvasPage;
