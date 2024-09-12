import HiddenElements from '@/components/HiddenElements';
import { getUserFromServerSide } from '@/features/auth/services/server';
import BetterreadRealtimeView from '@/features/betterread/components/BetterreadRealtimeView/BetterreadRealtimeView';

type Props = {};

const RealtimeBetterReadPage = async (props: Props) => {
  const user = await getUserFromServerSide();
  if (!user) return null;

  return (
    <>
      <BetterreadRealtimeView />
      <HiddenElements uid={user.id} cheat={true} />
    </>
  );
};

export default RealtimeBetterReadPage;
