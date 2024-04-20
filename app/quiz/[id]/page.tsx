import { getUserFromServerSide } from '@/features/auth/services/server';
import { fetchArticlePitchQuizQuestions } from '@/features/quiz/services/server';

type Props = { params: { id: number } };

const QuizPage = async ({ params: { id } }: Props) => {
  const user = await getUserFromServerSide();
  if (!user) return <></>;
  const questions = await fetchArticlePitchQuizQuestions(id);

  return <div className='space-y-4 max-w-lg mx-auto pt-10 pb-40'>QuizPage</div>;
};

export default QuizPage;
