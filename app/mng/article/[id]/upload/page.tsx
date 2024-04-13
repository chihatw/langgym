import UploadAudioForm from '@/features/article/components/UploadAudioForm';
import {
  fetchArticleById,
  fetchSentencesByArticleId,
} from '@/features/article/services/server';

type Props = {
  params: { id: number };
};

const UploadAudioPage = async ({ params: { id } }: Props) => {
  const article = await fetchArticleById(id);
  if (!article) return <></>;
  const sentences = await fetchSentencesByArticleId(article.id);

  return (
    <div className='space-y-8'>
      <div className='text-2xl font-extrabold'>Upload Audio</div>
      <UploadAudioForm article={article} sentences={sentences} />
    </div>
  );
};

export default UploadAudioPage;
