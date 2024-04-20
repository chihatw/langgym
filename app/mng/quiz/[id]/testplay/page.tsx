import QuizForm from '@/features/quiz/components/MngQuizForm/MngQuizForm';
import { fetchArticlePitchQuizQuestions } from '@/features/quiz/services/server';

type Props = {
  params: { id: number };
};

const QuizTestPlayPage = async ({ params: { id } }: Props) => {
  const questions = await fetchArticlePitchQuizQuestions(id);
  console.log(questions);
  return <QuizForm questions={questions} />;
};

export default QuizTestPlayPage;
