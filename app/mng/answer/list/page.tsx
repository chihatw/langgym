import AnswerList from '@/features/answer/components/AnswerList';
import {
  fetchAnswerRowsbyArticleIds,
  fetchAnswers,
} from '@/features/answer/services/server';

type Props = {};

const AnswerListPage = async (props: Props) => {
  const answers = await fetchAnswers();

  const answerIds: number[] = answers
    .map((item) => item.id)
    .filter((item: null | number): item is number => item !== null);

  const answerIds_uniq = Array.from(new Set(answerIds));

  const answerRows = await fetchAnswerRowsbyArticleIds(answerIds_uniq);

  return <AnswerList answers={answers} answerRows={answerRows || []} />;
};

export default AnswerListPage;
