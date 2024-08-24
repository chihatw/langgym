import BetterreadContainer from '@/features/betterread/components/BetterreadContainer';

import WritingInfo from '@/features/info/components/WritingInfo';
import MirrorNumbersLoader from '@/features/mirror/components/MirrorWorkoutTopPane/MirrorWorkoutLoader';
import { fetchLatestMirrorWorkoutResultByUid } from '@/features/mirror/services/server';
import PostItLoader from '@/features/postit/components/PostItLoader';
import QuizListContainer from '@/features/quiz/components/QuizList/QuizListContainer';
import WorkoutListContainer from '@/features/workout/components/WorkoutList/WorkoutListContainer';
import ArticleListLoader from '../features/article/components/ArticleList/ArticleListLoader';
import BorderLabel from './BorderLabel';
import HiddenElements from './HiddenElements';

type Props = { uid: string; cheat?: boolean };

const GroupATop = async ({ uid, cheat }: Props) => {
  const latestMirrorResult = await fetchLatestMirrorWorkoutResultByUid(uid);

  return (
    <>
      <div className='grid gap-8 max-w-lg mx-auto pt-10 pb-40'>
        <div className='grid gap-4'>
          <BorderLabel label='連絡事項' />
          <div className='grid gap-2 pl-2'>
            <WritingInfo />
          </div>
        </div>
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
