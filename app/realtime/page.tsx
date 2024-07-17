import HiddenElements from '@/components/HiddenElements';
import { getUserFromServerSide } from '@/features/auth/services/server';

type Props = {};

const RealtimePage = async (props: Props) => {
  const user = await getUserFromServerSide();
  if (!user) return null;

  return (
    <>
      <HiddenElements uid={user.id} cheat={true} />
    </>
  );
};

export default RealtimePage;
