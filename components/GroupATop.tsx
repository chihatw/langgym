import BetterreadContainer from '@/features/betterread/components/BetterreadContainer';

import MirrorNumbersLoader from '@/features/mirror/components/MirrorWorkoutTopPane/MirrorWorkoutLoader';
import QuizListContainer from '@/features/quiz/components/QuizList/QuizListContainer';
import WorkoutListContainer from '@/features/workout/components/WorkoutList/WorkoutListContainer';
import ArticleListLoader from '../features/article/components/ArticleList/ArticleListLoader';
import HiddenElements from './ui/HiddenElements';

type Props = { uid: string };

const GroupATop = async ({ uid }: Props) => {
  return (
    <>
      <div className='grid gap-8 max-w-lg mx-auto pt-10 pb-40'>
        <ArticleListLoader uid={uid} />
        <QuizListContainer uid={uid} />
        <WorkoutListContainer uid={uid} />
        <BetterreadContainer uid={uid} />
        <MirrorNumbersLoader uid={uid} />
      </div>
      <HiddenElements uid={uid} />
    </>
  );
};

export default GroupATop;
