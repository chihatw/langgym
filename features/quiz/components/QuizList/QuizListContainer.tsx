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
  return <QuizList quizzes={quizzes} answerRows={answerRows} />;
};

export default QuizListContainer;
