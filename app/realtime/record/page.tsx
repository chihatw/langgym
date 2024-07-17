import HiddenElements from '@/components/HiddenElements';
import { getUserFromServerSide } from '@/features/auth/services/server';
import RecordForm from '@/features/record/components/RecordForm';

type Props = {};

const RecordPage = async (props: Props) => {
  const user = await getUserFromServerSide();
  if (!user) return null;
  return (
    <>
      <RecordForm />
      <HiddenElements uid={user.id} cheat={true} />
    </>
  );
};

export default RecordPage;
