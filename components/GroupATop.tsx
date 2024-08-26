import BetterreadContainer from '@/features/betterread/components/BetterreadContainer';

import HomepageInfoListLoader from '@/features/homepageInfo/components/HomepageInfoListLoader';
import MirrorNumbersLoader from '@/features/mirror/components/MirrorWorkoutTopPane/MirrorWorkoutLoader';
import { fetchLatestMirrorWorkoutResultByUid } from '@/features/mirror/services/server';
import PostItLoader from '@/features/postit/components/PostItLoader';
import QuizListContainer from '@/features/quiz/components/QuizList/QuizListContainer';
import WorkoutListContainer from '@/features/workout/components/WorkoutList/WorkoutListContainer';
import ArticleListLoader from '../features/article/components/ArticleList/ArticleListLoader';
import HiddenElements from './HiddenElements';

type Props = { uid: string; cheat?: boolean };

const GroupATop = async ({ uid, cheat }: Props) => {
  const latestMirrorResult = await fetchLatestMirrorWorkoutResultByUid(uid);

  return (
    <>
      <div className='grid gap-8 max-w-lg mx-auto pt-10 pb-40'>
        <HomepageInfoListLoader uid={uid} />
        <ArticleListLoader uid={uid} />
        <QuizListContainer uid={uid} />
        <WorkoutListContainer uid={uid} />
        <BetterreadContainer uid={uid} />
        <PostItLoader uid={uid} />
        <MirrorNumbersLoader uid={uid} />
      </div>
      <HiddenElements
        uid={uid}
        cheat={cheat}
        latestMirrorResult={latestMirrorResult}
      />
    </>
  );
};

export default GroupATop;
