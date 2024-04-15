import AudioSlider from '@/features/audioSlider/components/AudioSlider';
import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { ArticleMark, Sentence } from '../../schema';

type Props = {
  sentence: Sentence;
  index: number;
  isShowAccents: boolean;
  articleMark?: ArticleMark;
  audioBuffer: AudioBuffer | null;
};

const SentenceRow = ({
  audioBuffer,
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
      <div className='text-[11px] p-2 rounded bg-slate-200 text-slate-500'>
        {sentence.original}
      </div>
      {isShowAccents ? (
        <div className='space-y-2'>
          <div className='p-2 rounded border-[0.5px] border-gray-500'>
            <SentencePitchLine pitchStr={sentence.pitchStr} />
          </div>
          {articleMark && audioBuffer ? (
            <AudioSlider
              start={articleMark.start}
              end={articleMark.end}
              audioBuffer={audioBuffer}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default SentenceRow;
