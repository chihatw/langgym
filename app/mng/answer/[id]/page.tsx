import AnswerPane from '@/features/answer/components/AnswerPane/AnswerPane';
import { fetchAnswerRowsbyAnswerIds } from '@/features/answer/services/server';
import { buildArticlePitchQuizScore } from '@/features/answer/services/utils';

type Props = {
  params: { id: number };
};

const AnswerPage = async ({ params: { id } }: Props) => {
  const answerRows = await fetchAnswerRowsbyAnswerIds([id]);

  if (!answerRows.length) return <></>;

  const score = buildArticlePitchQuizScore(answerRows);

  return <AnswerPane answerRows={answerRows} score={score} />;
};

export default AnswerPage;
