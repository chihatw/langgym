import Breadcrumb from '@/components/Breadcrumb';
import AnswerPane from '@/features/answer/components/AnswerPane/AnswerPane';
import { fetchAnswerRowsbyAnswerIds } from '@/features/answer/services/server';
import { buildArticlePitchQuizScore } from '@/features/answer/services/utils';
import { getUserFromServerSide } from '@/features/auth/services/server';
import PathnameLog from '@/features/pathnameLog/components/PathnameLog';

type Props = {
  params: { id: number };
};

const AnswerPage = async ({ params: { id } }: Props) => {
  const user = await getUserFromServerSide();
  if (!user) return null;

  const answerRows = await fetchAnswerRowsbyAnswerIds([id]);

  if (!answerRows.length) return null;

  const score = buildArticlePitchQuizScore(answerRows);

  return (
    <>
      <div className='grid gap-4 max-w-lg mx-auto pt-4 pb-40'>
        <Breadcrumb label='アクセント問題 回答' />
        <AnswerPane answerRows={answerRows} score={score} />
      </div>
      <PathnameLog uid={user.id} />
    </>
  );
};

export default AnswerPage;
