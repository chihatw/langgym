import Breadcrumb from '@/components/Breadcrumb';
import HiddenElements from '@/components/HiddenElements';
import { getUserFromServerSide } from '@/features/auth/services/server';
import { fetchLatestMirrorWorkoutResultByUid } from '@/features/mirror/services/server';
import QuizForm from '@/features/quiz/components/QuizForm/QuizForm';
import { fetchArticlePitchQuizQuestions } from '@/features/quiz/services/server';

type Props = { params: Promise<{ id: number }> };

const QuizPage = async (props: Props) => {
  const params = await props.params;

  const {
    id
  } = params;

  const user = await getUserFromServerSide();
  if (!user) return null;

  const questions = await fetchArticlePitchQuizQuestions(id);

  const latestMirrorResult = await fetchLatestMirrorWorkoutResultByUid(user.id);

  return (
    <>
      <div className='grid gap-4 max-w-lg mx-auto pt-4 pb-40'>
        <Breadcrumb label='アクセント問題' />
        <QuizForm questions={questions} redirectPath='/answer' />
      </div>
      <HiddenElements uid={user.id} latestMirrorResult={latestMirrorResult} />
    </>
  );
};

export default QuizPage;
