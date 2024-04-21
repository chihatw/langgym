import MngQuizList from '@/features/quiz/components/MngQuizList/MngQuizList';
import { fetchArticlePitchQuizzes } from '@/features/quiz/services/server';

type Props = {};

const MngQuizListPage = async (props: Props) => {
  const quizzes = await fetchArticlePitchQuizzes(10);

  return <MngQuizList quizzes={quizzes} />;
};

export default MngQuizListPage;
