import BetterreadContainer from '@/features/betterread/components/BetterreadContainer';
import QuizListContainer from '@/features/quiz/components/QuizList/QuizListContainer';
import RealtimeModalContainer from '@/features/realtime/components/RealtimeModalContainer';
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
      <RealtimeModalContainer uid={uid} />
    </div>
  );
};

export default GroupATop;
