import AudioSlider from '@/components/AudioSlider';
import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { ArticleMark, Sentence } from '../../../schema';

type Props = {
  sentence: Sentence;
  articleMark?: ArticleMark;
  audioBuffer: AudioBuffer | null;
};

const RecordPaneSentenceMonitor = ({
  sentence,
  articleMark,
  audioBuffer,
}: Props) => {
  return (
    <div className='grid gap-y-2 border-[0.5px] p-2 rounded'>
      <div className='p-0 text-sm'>{sentence.japanese}</div>
      <div className='text-[11px] text-[#52a2aa]'>{sentence.chinese}</div>
      <div className='text-[11px] p-2 rounded bg-slate-200 text-slate-500'>
        {sentence.original}
      </div>
      <div className='space-y-2'>
        <div className='p-2 rounded border-[0.5px] border-slate-500'>
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
    </div>
  );
};

export default RecordPaneSentenceMonitor;
