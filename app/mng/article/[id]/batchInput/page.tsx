import BatchInputForm from '@/features/article/components/BatchInputForm/BatchInputForm';
import {
  fetchArticleById,
  fetchArticleMarks,
  fetchSentencesByArticleId,
} from '@/features/article/services/server';

type Props = { params: { id: number } };

const SentencesBatchInputPage = async ({ params: { id } }: Props) => {
  const article = await fetchArticleById(id);
  if (!article) return <></>;
  const sentences = await fetchSentencesByArticleId(article.id);
  const articleMarks = await fetchArticleMarks(article.id);

  return (
    <div className='space-y-8'>
      <div className='text-2xl font-extrabold'>Batch Input</div>
      <div className='text-2xl font-extrabold'>{article.title}</div>
      <BatchInputForm
        article={article}
        sentences={sentences}
        articleMarks={articleMarks}
      />
    </div>
  );
};

export default SentencesBatchInputPage;
