import BatchInputForm from '@/features/article/components/BatchInputForm';
import { fetchArticleById } from '@/features/article/services/server';

type Props = { params: { id: number } };

const SentencesBatchInputPage = async ({ params: { id } }: Props) => {
  const article = await fetchArticleById(id);

  if (!article) return <></>;

  return (
    <div className='space-y-8'>
      <div className='text-2xl font-extrabold'>Batch Input</div>
      <div className='text-2xl font-extrabold'>{article.title}</div>
      <BatchInputForm article={article} />
    </div>
  );
};

export default SentencesBatchInputPage;
