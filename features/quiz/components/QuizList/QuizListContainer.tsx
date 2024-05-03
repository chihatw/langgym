import BorderLabel from '@/components/BorderLabel';
import { fetchAnswerRowsbyQuizIds } from '@/features/answer/services/server';
import { fetchArticlePitchQuizzesByUid } from '../../services/server';
import QuizList from './QuizList';

type Props = {
  uid: string;
};

const QuizListContainer = async ({ uid }: Props) => {
  const quizzes = await fetchArticlePitchQuizzesByUid(uid);
  const answerRows = await fetchAnswerRowsbyQuizIds(
    quizzes.map(({ id }) => id!)
  );

  if (!quizzes.length) return null;

  return (
    <div className='grid gap-4'>
      <BorderLabel label='アクセント問題' />
      <QuizList quizzes={quizzes} answerRows={answerRows} />
    </div>
  );
};

export default QuizListContainer;
