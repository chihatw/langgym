import BorderLabel from '@/components/BorderLabel';
import QuizListContainer from '@/features/quiz/components/QuizList/QuizListContainer';
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
      {/* todo GroupATop に反応練習を表示 */}
    </div>
  );
};

export default GroupATop;
