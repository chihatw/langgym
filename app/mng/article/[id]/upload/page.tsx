import UploadAudioForm from '@/features/article/components/UploadAudioForm/UploadAudioForm';
import { fetchSentencesByArticleId } from '@/features/article/services/server';

type Props = {
  params: Promise<{ id: number }>;
};

const UploadAudioPage = async (props: Props) => {
  const params = await props.params;

  const {
    id
  } = params;

  const sentences = await fetchSentencesByArticleId(id);

  return (
    <div className='space-y-8'>
      <div className='text-2xl font-extrabold'>Upload Audio</div>
      <UploadAudioForm sentences={sentences} />
    </div>
  );
};

export default UploadAudioPage;
