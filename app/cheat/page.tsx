import GroupATop from '@/components/GroupATop';
import { getUserFromServerSide } from '@/features/auth/services/server';

type Props = {};

const CheatPage = async (props: Props) => {
  const user = await getUserFromServerSide();

  if (!user) return null;

  return <GroupATop uid={user.id} cheat={true} />;
};

export default CheatPage;
