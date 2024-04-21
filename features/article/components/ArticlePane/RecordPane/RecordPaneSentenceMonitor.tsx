import AudioSlider from '@/components/AudioSlider';
import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { SentenceView } from '../../../schema';

type Props = {
  sentence: SentenceView;
  audioBuffer: AudioBuffer | null;
};

const RecordPaneSentenceMonitor = ({ sentence, audioBuffer }: Props) => {
  const { start, end } = sentence;
  return (
    <div className='grid gap-y-2 border-[0.5px] p-2 rounded'>
      <div className='p-0 text-sm'>{sentence.japanese}</div>
      <div className='text-[11px] text-[#52a2aa]'>{sentence.chinese}</div>
      <div className='text-[11px] p-2 rounded bg-slate-200 text-slate-500'>
        {sentence.original}
      </div>
      <div className='space-y-2'>
        <div className='p-2 rounded border-[0.5px] border-slate-500'>
          <SentencePitchLine pitchStr={sentence.pitchStr!} />
        </div>
        {start && end && audioBuffer ? (
          <AudioSlider start={start} end={end} audioBuffer={audioBuffer} />
        ) : null}
      </div>
    </div>
  );
};

export default RecordPaneSentenceMonitor;
