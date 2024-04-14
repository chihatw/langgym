import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { ArticleMark, Sentence } from '../../schema';

type Props = {
  sentence: Sentence;
  index: number;
  isShowAccents: boolean;
  articleMark?: ArticleMark;
};

const SentenceRow = ({
  sentence,
  index,
  isShowAccents,
  articleMark,
}: Props) => {
  return (
    <div key={sentence.id} className='bg-white/60 rounded p-4 space-y-2'>
      <div className='text-xs font-extrabold'>{index + 1}</div>
      <div className='p-0 text-sm'>{sentence.japanese}</div>
      <div className='text-[11px] text-[#52a2aa]'>{sentence.chinese}</div>
      <div className='text-[11px] p-2 rounded bg-gray-200 text-gray-500'>
        {sentence.original}
      </div>
      {isShowAccents ? (
        <div>
          <div className='p-2 rounded border-[0.5px] border-gray-500'>
            <SentencePitchLine pitchStr={sentence.pitchStr} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SentenceRow;
