import AnswerPane from '@/features/answer/components/AnswerPane/AnswerPane';
import {
  fetchAnswer,
  fetchAnswerRowsbyAnswerIds,
} from '@/features/answer/services/server';
import { buildArticlePitchQuizScore } from '@/features/answer/services/utils';

type Props = {
  params: { id: number };
};

const AnswerPage = async ({ params: { id } }: Props) => {
  const answer = await fetchAnswer(id);
  if (!answer || !answer.id) return <></>;

  const answerRows = await fetchAnswerRowsbyAnswerIds([answer.id]);

  if (!answerRows) return <></>;

  const score = buildArticlePitchQuizScore(answerRows);

  return <AnswerPane answer={answer} answerRows={answerRows} score={score} />;
};

export default AnswerPage;
