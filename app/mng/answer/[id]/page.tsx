import AnswerPane from '@/features/answer/components/AnswerPane/AnswerPane';
import { fetchAnswerRowsbyAnswerIds } from '@/features/answer/services/server';
import { buildArticlePitchQuizScore } from '@/features/answer/services/utils';

type Props = {
  params: Promise<{ id: number }>;
};

const AnswerPage = async (props: Props) => {
  const params = await props.params;

  const {
    id
  } = params;

  const answerRows = await fetchAnswerRowsbyAnswerIds([id]);

  if (!answerRows.length) return null;

  const score = buildArticlePitchQuizScore(answerRows);

  return <AnswerPane answerRows={answerRows} score={score} />;
};

export default AnswerPage;
