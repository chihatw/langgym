import QuizForm from '@/features/quiz/components/QuizForm/QuizForm';
import { fetchArticlePitchQuizQuestions } from '@/features/quiz/services/server';

type Props = {
  params: { id: number };
};

const QuizTestPlayPage = async ({ params: { id } }: Props) => {
  const questions = await fetchArticlePitchQuizQuestions(id);

  return <QuizForm questions={questions} redirectPath='/mng/answer' />;
};

export default QuizTestPlayPage;
