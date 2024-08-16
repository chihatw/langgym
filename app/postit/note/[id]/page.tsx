import Breadcrumb from '@/components/Breadcrumb';
import HiddenElements from '@/components/HiddenElements';
import { getUserFromServerSide } from '@/features/auth/services/server';
import { fetchLatestMirrorWorkoutResultByUid } from '@/features/mirror/services/server';
import PostitNoteForm from '@/features/postit/components/PostitNoteForm';
import { fetchPostItNoteItemsByPostItNoteId } from '@/features/postit/services/server';

type Props = { params: { id: string } };

const PostItNotePage = async ({ params: { id } }: Props) => {
  const postitNoteItems = await fetchPostItNoteItemsByPostItNoteId(
    parseInt(id)
  );
  const user = await getUserFromServerSide();
  if (!user) return null;

  const latestMirrorResult = await fetchLatestMirrorWorkoutResultByUid(user.id);

  return (
    <>
      <div className='grid gap-4 max-w-lg mx-auto pt-4 pb-40'>
        <Breadcrumb label='語法筆記' />
        <PostitNoteForm
          postitNoteItems={postitNoteItems}
          postitNoteId={parseInt(id)}
        />
      </div>
      <HiddenElements uid={user.id} latestMirrorResult={latestMirrorResult} />
    </>
  );
};

export default PostItNotePage;
