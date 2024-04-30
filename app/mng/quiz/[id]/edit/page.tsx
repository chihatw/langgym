import QuizEditForm from '@/features/quiz/components/QuizEditForm/QuizEditForm';
import { fetchArticlePitchQuizQuestions } from '@/features/quiz/services/server';

type Props = {
  params: { id: number };
};

const QuizEditPage = async ({ params: { id } }: Props) => {
  const questions = await fetchArticlePitchQuizQuestions(id);

  return <QuizEditForm questions={questions} />;
};

export default QuizEditPage;
