import QuizList from '@/features/quiz/components/QuizList/QuizList';
import { fetchArticlePitchQuizzes } from '@/features/quiz/services/server';
import { fetchUsers } from '@/features/user/services/server';

type Props = {};

const QuizListPage = async (props: Props) => {
  const users = await fetchUsers();
  const { quizzes, articles } = await fetchArticlePitchQuizzes(10);

  return <QuizList users={users} quizzes={quizzes} articles={articles} />;
};

export default QuizListPage;
