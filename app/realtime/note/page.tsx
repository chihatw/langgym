import HiddenElements from '@/components/HiddenElements';
import { getUserFromServerSide } from '@/features/auth/services/server';
import NoteForm from '@/features/note/components/NoteForm';

type Props = {};

const NotePage = async (props: Props) => {
  const user = await getUserFromServerSide();
  if (!user) return null;

  return (
    <>
      <NoteForm />
      <HiddenElements uid={user.id} cheat={true} />
      {/* <RefreshRealtime uid={user.id} /> */}
    </>
  );
};

export default NotePage;
