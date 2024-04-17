import QuizForm from '@/features/quiz/components/QuizForm/QuizForm';
import { fetchArticlePitchQuiz } from '@/features/quiz/services/server';

type Props = {
  params: { id: number };
};

const QuizEditPage = async ({ params: { id } }: Props) => {
  const { quiz, sentences, questions } = await fetchArticlePitchQuiz(id);

  if (!quiz) return <></>;

  return <QuizForm quiz={quiz} sentences={sentences} questions={questions} />;
};

export default QuizEditPage;
