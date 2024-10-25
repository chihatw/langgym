import Breadcrumb from '@/components/Breadcrumb';
import HiddenElements from '@/components/HiddenElements';
import { getUserFromServerSide } from '@/features/auth/services/server';
import { fetchLatestMirrorWorkoutResultByUid } from '@/features/mirror/services/server';
import PostitWorksheetContainer from '@/features/postit/components/Worksheet/PostitWorksheetContainer';
import { fetchPostItWorkoutByUid } from '@/features/postit/services/server';

type Props = {};

const PostItWorkoutPage = async (props: Props) => {
  const user = await getUserFromServerSide();
  if (!user) return null;

  const latestMirrorResult = await fetchLatestMirrorWorkoutResultByUid(user.id);

  const workout = await fetchPostItWorkoutByUid(user.id);

  if (!workout) return null;

  return (
    <>
      <div className='grid gap-4 max-w-lg mx-auto pt-4 pb-40'>
        <Breadcrumb label='利貼學習單' />
        <PostitWorksheetContainer workout={workout} />
        <HiddenElements uid={user.id} latestMirrorResult={latestMirrorResult} />
      </div>
    </>
  );
};

export default PostItWorkoutPage;
