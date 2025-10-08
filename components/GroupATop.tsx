import MirrorNumbersLoader from '@/features/mirror/components/MirrorWorkoutTopPane/MirrorWorkoutLoader';
import PostItLoader from '@/features/postit/components/PostItLoader';
import ArticleListLoader from '../features/article/components/ArticleList/ArticleListLoader';

type Props = { uid: string; cheat?: boolean };

const GroupATop = async ({ uid, cheat }: Props) => {
  return (
    <>
      <div className='grid gap-8 max-w-lg mx-auto pt-10 pb-40'>
        <ArticleListLoader uid={uid} />
        <PostItLoader uid={uid} />
        <MirrorNumbersLoader uid={uid} />
      </div>
    </>
  );
};

export default GroupATop;
