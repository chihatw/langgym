import BetterreadContainer from '@/features/betterread/components/BetterreadContainer';
import PathnameLog from '@/features/pathnameLog/components/PathnameLog';
import QuizListContainer from '@/features/quiz/components/QuizList/QuizListContainer';
import RealtimeModal from '@/features/realtime/components/RealtimeModal';
import WorkoutListContainer from '@/features/workout/components/WorkoutList/WorkoutListContainer';
import ArticleListContainer from '../features/article/components/ArticleList/ArticleListContainer';

type Props = { uid: string };

const GroupATop = async ({ uid }: Props) => {
  return (
    <div className='grid gap-8 max-w-lg mx-auto pt-10 pb-40'>
      <ArticleListContainer uid={uid} />
      <QuizListContainer uid={uid} />
      <WorkoutListContainer uid={uid} />
      <BetterreadContainer uid={uid} />
      <RealtimeModal />
      <PathnameLog uid={uid} />
    </div>
  );
};

export default GroupATop;
