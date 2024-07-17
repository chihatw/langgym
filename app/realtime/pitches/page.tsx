import HiddenElements from '@/components/HiddenElements';
import { getUserFromServerSide } from '@/features/auth/services/server';
import PitchesForm from '@/features/pitches/components/PitchesForm';

type Props = {};

const PitchesPage = async (props: Props) => {
  const user = await getUserFromServerSide();
  if (!user) return null;
  return (
    <>
      <PitchesForm />
      <HiddenElements uid={user.id} cheat={true} />
    </>
  );
};

export default PitchesPage;
