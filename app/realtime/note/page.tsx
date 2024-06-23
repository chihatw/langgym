import HiddenElements from '@/components/HiddenElements';
import { getUserFromServerSide } from '@/features/auth/services/server';
import NoteForm from '@/features/note/components/NoteForm';
import RefreshRealtime from '@/features/trigger/components/RefreshRealtime';
import { fetchUserByUid } from '@/features/user/services/server';

type Props = {};

const RealtimeNotePage = async (props: Props) => {
  const user = await getUserFromServerSide();
  if (!user) return null;

  const appUser = await fetchUserByUid(user.id);

  if (!appUser) return null;

  return (
    <>
      <NoteForm />
      <HiddenElements uid={user.id} />
      <RefreshRealtime uid={user.id} />
    </>
  );
};

export default RealtimeNotePage;
