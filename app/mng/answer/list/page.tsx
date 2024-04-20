import AnswerList from '@/features/answer/components/AnswerList';
import {
  fetchAnswerRowsbyAnswerIds,
  fetchAnswers,
} from '@/features/answer/services/server';

type Props = {};

const AnswerListPage = async (props: Props) => {
  const answers = await fetchAnswers();

  const answerIds: number[] = answers
    .map((item) => item.id)
    .filter((item: null | number): item is number => item !== null);

  const answerIds_uniq = Array.from(new Set(answerIds));

  const answerRows = await fetchAnswerRowsbyAnswerIds(answerIds_uniq);

  return <AnswerList answers={answers} answerRows={answerRows || []} />;
};

export default AnswerListPage;
