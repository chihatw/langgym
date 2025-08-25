import Breadcrumb from '@/components/Breadcrumb';
import HiddenElements from '@/components/HiddenElements';
import { getUserFromServerSide } from '@/features/auth/services/server';
import PostitForm from '@/features/postit/components/PostitForm';
import { fetchPostItItemsByPostitId } from '@/features/postit/services/server';

type Props = { params: Promise<{ id: string }> };

const PostItPage = async (props: Props) => {
  const params = await props.params;

  const { id } = params;

  const user = await getUserFromServerSide();
  if (!user) return null;

  const postitItems = await fetchPostItItemsByPostitId(parseInt(id));

  return (
    <>
      <div className='grid gap-4 max-w-lg mx-auto pt-4 pb-40'>
        <Breadcrumb label={'利貼日文練習'} />
        <PostitForm postItItems={postitItems} />
      </div>
      <HiddenElements uid={user.id} />
    </>
  );
};

export default PostItPage;
