import HiddenElements from '@/components/ui/HiddenElements';
import { getUserFromServerSide } from '@/features/auth/services/server';
import PageSwitchLoader from '@/features/pageState/components/PageSwitchLoader';
import RefreshRealtime from '@/features/trigger/components/RefreshRealtime';

type Props = {};

const RealtimePage = async (props: Props) => {
  const user = await getUserFromServerSide();
  if (!user) return null;
  return (
    <>
      <PageSwitchLoader uid={user.id} />
      <HiddenElements uid={user.id} />
      <RefreshRealtime />
    </>
  );
};

export default RealtimePage;
