import HiddenElements from '@/components/HiddenElements';
import { getUserFromServerSide } from '@/features/auth/services/server';
import PaperCupForm from '@/features/paperCup/components/PaperCupForm';

type Props = {};

const PaperCupPage = async (props: Props) => {
  const user = await getUserFromServerSide();
  if (!user) return null;
  return (
    <>
      <PaperCupForm />
      <HiddenElements uid={user.id} cheat={true} />
    </>
  );
};

export default PaperCupPage;
