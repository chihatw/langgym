import Breadcrumb from '@/components/Breadcrumb';
import { getUserFromServerSide } from '@/features/auth/services/server';
import QuizForm from '@/features/quiz/components/QuizForm/QuizForm';
import { fetchArticlePitchQuizQuestions } from '@/features/quiz/services/server';

type Props = { params: { id: number } };

const QuizPage = async ({ params: { id } }: Props) => {
  const user = await getUserFromServerSide();
  if (!user) return <></>;
  const questions = await fetchArticlePitchQuizQuestions(id);

  return (
    <div className='grid gap-4 max-w-lg mx-auto pt-4 pb-40'>
      <Breadcrumb label='アクセント問題' />
      <QuizForm questions={questions} redirectPath='/answer' />
    </div>
  );
};

export default QuizPage;
