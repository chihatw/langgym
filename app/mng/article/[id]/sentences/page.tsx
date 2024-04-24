import SentencesForm from '@/features/article/components/SentencesForm/SentencesForm';
import {
  fetchArticleById,
  fetchSentencesByArticleId,
} from '@/features/article/services/server';

type Props = { params: { id: number } };

const SentencesPage = async ({ params: { id } }: Props) => {
  // sentences がない場合のため
  const article = await fetchArticleById(id);
  if (!article) return;

  const sentences = await fetchSentencesByArticleId(id);

  return <SentencesForm sentences={sentences} article={article} />;
};

export default SentencesPage;
