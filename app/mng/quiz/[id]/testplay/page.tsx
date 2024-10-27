import QuizForm from '@/features/quiz/components/QuizForm/QuizForm';
import { fetchArticlePitchQuizQuestions } from '@/features/quiz/services/server';

type Props = {
  params: Promise<{ id: number }>;
};

const QuizTestPlayPage = async (props: Props) => {
  const params = await props.params;

  const {
    id
  } = params;

  const questions = await fetchArticlePitchQuizQuestions(id);

  return (
    <QuizForm
      questions={questions}
      redirectPath='/mng/answer'
      isTestPlay={true}
    />
  );
};

export default QuizTestPlayPage;
