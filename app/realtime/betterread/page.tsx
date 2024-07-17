import HiddenElements from '@/components/HiddenElements';
import { getUserFromServerSide } from '@/features/auth/services/server';
import BetterreadView from '@/features/betterread/components/BetterreadView/BetterreadView';

type Props = {};

const RealtimeBetterReadPage = async (props: Props) => {
  const user = await getUserFromServerSide();
  if (!user) return null;

  return (
    <>
      <BetterreadView />
      <HiddenElements uid={user.id} cheat={true} />
    </>
  );
};

export default RealtimeBetterReadPage;
