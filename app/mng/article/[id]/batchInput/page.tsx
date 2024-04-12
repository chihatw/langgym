import BatchInputForm from '@/features/article/components/BatchInputForm';
import {
  fetchArticleById,
  fetchSentencesByArticleId,
} from '@/features/article/services/server';

type Props = { params: { id: number } };

const SentencesBatchInputPage = async ({ params: { id } }: Props) => {
  const article = await fetchArticleById(id);
  if (!article) return <></>;
  const sentences = await fetchSentencesByArticleId(article.id);

  return (
    <div className='space-y-8'>
      <div className='text-2xl font-extrabold'>Batch Input</div>
      <div className='text-2xl font-extrabold'>{article.title}</div>
      <BatchInputForm article={article} sentences={sentences} />
    </div>
  );
};

export default SentencesBatchInputPage;
