import Breadcrumb from '@/components/Breadcrumb';
import HiddenElements from '@/components/HiddenElements';
import { getUserFromServerSide } from '@/features/auth/services/server';
import PostitNoteForm from '@/features/postit/components/PostitNoteForm';
import { fetchPostItNoteItemsByPostItNoteId } from '@/features/postit/services/server';

type Props = { params: Promise<{ id: string }> };

const PostItNotePage = async (props: Props) => {
  const params = await props.params;

  const { id } = params;

  const postitNoteItems = await fetchPostItNoteItemsByPostItNoteId(
    parseInt(id)
  );
  const user = await getUserFromServerSide();
  if (!user) return null;

  return (
    <>
      <div className='grid gap-4 max-w-lg mx-auto pt-4 pb-40'>
        <Breadcrumb label='語法筆記' />
        <PostitNoteForm
          postitNoteItems={postitNoteItems}
          postitNoteId={parseInt(id)}
        />
      </div>
      <HiddenElements uid={user.id} />
    </>
  );
};

export default PostItNotePage;
