import Breadcrumb from '@/components/Breadcrumb';
import HiddenElements from '@/components/HiddenElements';
import { getUserFromServerSide } from '@/features/auth/services/server';
import { fetchLatestMirrorWorkoutResultByUid } from '@/features/mirror/services/server';
import PostitForm from '@/features/postit/components/PostitForm';
import { fetchPostItItemsByPostitId } from '@/features/postit/services/server';

type Props = { params: { id: string } };

const PostItPage = async ({ params: { id } }: Props) => {
  const user = await getUserFromServerSide();
  if (!user) return null;

  const latestMirrorResult = await fetchLatestMirrorWorkoutResultByUid(user.id);

  const postitItems = await fetchPostItItemsByPostitId(parseInt(id));

  return (
    <>
      <div className='grid gap-4 max-w-lg mx-auto pt-4 pb-40'>
        <Breadcrumb label={'利貼日文練習'} />
        <PostitForm postItItems={postitItems} />
      </div>
      <HiddenElements uid={user.id} latestMirrorResult={latestMirrorResult} />
    </>
  );
};

export default PostItPage;
