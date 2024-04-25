'use client';

import AudioSlider from '@/components/AudioSlider';
import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { SentenceView } from '../../schema';

type Props = {
  sentence: SentenceView;
  audioBuffer: AudioBuffer | null;
};

const SentenceRow = ({ sentence, audioBuffer }: Props) => {
  const { isShowAccents, pitchStr, start, end, line } = sentence;
  return (
    <div className='grid gap-2'>
      <div className='text-xs font-extrabold'>{line! + 1}</div>
      <div className='p-0 text-sm'>{sentence.japanese}</div>
      <div className='text-[11px] text-[#52a2aa]'>{sentence.chinese}</div>
      <div className='text-[11px] p-2 rounded bg-slate-200 text-slate-500'>
        {sentence.original}
      </div>

      {isShowAccents ? (
        <div className='p-2 rounded border-[0.5px] border-slate-500'>
          <SentencePitchLine pitchStr={pitchStr!} />
        </div>
      ) : null}

      {isShowAccents ? (
        <>
          {start && end && audioBuffer ? (
            <AudioSlider start={start} end={end} audioBuffer={audioBuffer} />
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default SentenceRow;
