import BatchInputForm from '@/features/article/components/BatchInputForm/BatchInputForm';
import { fetchSentencesByArticleId } from '@/features/article/services/server';

type Props = { params: { id: number } };

const SentencesBatchInputPage = async ({ params: { id } }: Props) => {
  const sentences = await fetchSentencesByArticleId(id);

  const sentence = sentences.at(0);

  if (!sentence) return <></>;

  return (
    <div className='space-y-8'>
      <div className='text-2xl font-extrabold'>Batch Input</div>
      <div className='text-2xl font-extrabold'>{sentence.title}</div>
      <BatchInputForm sentences={sentences} />
    </div>
  );
};

export default SentencesBatchInputPage;
