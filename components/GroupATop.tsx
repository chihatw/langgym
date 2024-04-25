import BorderLabel from '@/components/BorderLabel';
import QuizListContainer from '@/features/quiz/components/QuizList/QuizListContainer';
import WorkoutListContainer from '@/features/workout/components/WorkoutList/WorkoutListContainer';
import ArticleListContainer from '../features/article/components/ArticleList/ArticleListContainer';

type Props = { uid: string };

const GroupATop = async ({ uid }: Props) => {
  return (
    <div className='grid gap-8 max-w-lg mx-auto pt-10 pb-40'>
      <div className='grid gap-4'>
        <BorderLabel label='作文' />
        <ArticleListContainer uid={uid} />
      </div>
      <div className='grid gap-4'>
        <BorderLabel label='アクセント問題' />
        <QuizListContainer uid={uid} />
      </div>
      <BorderLabel label='反応練習' />
      <WorkoutListContainer uid={uid} />
    </div>
  );
};

export default GroupATop;
