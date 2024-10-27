import { fetchSentencesByArticleId } from '@/features/article/services/server';
import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';

type Props = {
  params: Promise<{ id: number }>;
};

const PrintArticlePage = async (props: Props) => {
  const params = await props.params;

  const {
    id
  } = params;

  const sentences = await fetchSentencesByArticleId(id);

  return (
    <div className='absolute top-8 left-0 w-screen min-h-screen flex justify-center'>
      <div className='bg-white w-[180mm] space-y-4'>
        {sentences.map((sentence, index) => (
          <div key={sentence.id} className='grid grid-cols-[auto,1fr] mr-8'>
            <div className='pl-4 pt-4 text-xs w-8 '>{index + 1}</div>
            <div className='border-b pb-2'>
              <SentencePitchLine pitchStr={sentence.pitchStr!} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrintArticlePage;
