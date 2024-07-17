import HiddenElements from '@/components/HiddenElements';
import { getUserFromServerSide } from '@/features/auth/services/server';

type Props = {};

const GaWoNiPage = async (props: Props) => {
  const user = await getUserFromServerSide();
  if (!user) return null;
  return (
    <>
      <div>under construction</div>
      <HiddenElements uid={user.id} cheat={true} />
    </>
  );
};

export default GaWoNiPage;
