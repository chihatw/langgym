import QuizEditForm from '@/features/quiz/components/QuizEditForm/QuizEditForm';
import { fetchArticlePitchQuizQuestions } from '@/features/quiz/services/server';

type Props = {
  params: Promise<{ id: number }>;
};

const QuizEditPage = async (props: Props) => {
  const params = await props.params;

  const {
    id
  } = params;

  const questions = await fetchArticlePitchQuizQuestions(id);

  return <QuizEditForm questions={questions} />;
};

export default QuizEditPage;
