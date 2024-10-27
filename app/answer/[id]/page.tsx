import Breadcrumb from '@/components/Breadcrumb';
import HiddenElements from '@/components/HiddenElements';
import AnswerPane from '@/features/answer/components/AnswerPane/AnswerPane';
import { fetchAnswerRowsbyAnswerIds } from '@/features/answer/services/server';
import { buildArticlePitchQuizScore } from '@/features/answer/services/utils';
import { getUserFromServerSide } from '@/features/auth/services/server';
import { fetchLatestMirrorWorkoutResultByUid } from '@/features/mirror/services/server';

type Props = {
  params: Promise<{ id: number }>;
};

const AnswerPage = async (props: Props) => {
  const params = await props.params;

  const {
    id
  } = params;

  const user = await getUserFromServerSide();
  if (!user) return null;

  const answerRows = await fetchAnswerRowsbyAnswerIds([id]);

  if (!answerRows.length) return null;

  const score = buildArticlePitchQuizScore(answerRows);

  const latestMirrorResult = await fetchLatestMirrorWorkoutResultByUid(user.id);

  return (
    <>
      <div className='grid gap-4 max-w-lg mx-auto pt-4 pb-40'>
        <Breadcrumb label='アクセント問題 回答' />
        <AnswerPane answerRows={answerRows} score={score} />
      </div>
      <HiddenElements uid={user.id} latestMirrorResult={latestMirrorResult} />
    </>
  );
};

export default AnswerPage;
