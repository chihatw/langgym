'use client';

import AudioSlider from '@/components/AudioSlider';
import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { blobToAudioBuffer } from '@/utils';
import { useEffect, useState } from 'react';
import { SentenceView } from '../../schema';
import { downloadAudioFile } from '../../services/client';
import AssignmentMonitor from './AssignmentMonitor';
import RecordPane from './RecordPane/RecordPane';

type Props = {
  sentence: SentenceView;
  audioBuffer: AudioBuffer | null;
};

const SentenceRow = ({ sentence, audioBuffer }: Props) => {
  const [assignmentAudioBuffer, setAssignmentAudioBuffer] =
    useState<AudioBuffer | null>(null);

  useEffect(() => {
    const { recorded_audioPath } = sentence;
    if (!recorded_audioPath) {
      setAssignmentAudioBuffer(null);
      return;
    }

    (async () => {
      const blob = await downloadAudioFile(recorded_audioPath);
      if (!blob) return;

      const audioBuffer = await blobToAudioBuffer(blob);
      if (!audioBuffer) return;

      setAssignmentAudioBuffer(audioBuffer);
    })();
  }, [sentence]);

  const {
    isShowAccents,
    pitchStr,
    start,
    end,
    articleId,
    line,
    articleRecordedAssignmentId,
  } = sentence;

  return (
    <div key={sentence.id} className='grid gap-y-2 bg-white/60 rounded p-4 '>
      <div className='text-xs font-extrabold'>{line! + 1}</div>
      <div className='p-0 text-sm'>{sentence.japanese}</div>
      <div className='text-[11px] text-[#52a2aa]'>{sentence.chinese}</div>
      <div className='text-[11px] p-2 rounded bg-slate-200 text-slate-500'>
        {sentence.original}
      </div>
      {isShowAccents ? (
        <>
          <div className='space-y-2'>
            <div className='p-2 rounded border-[0.5px] border-slate-500'>
              <SentencePitchLine pitchStr={pitchStr!} />
            </div>
            {start && end && audioBuffer ? (
              <AudioSlider start={start} end={end} audioBuffer={audioBuffer} />
            ) : null}
          </div>
          {assignmentAudioBuffer ? (
            <AssignmentMonitor
              audioBuffer={assignmentAudioBuffer}
              articleId={articleId!}
              line={line!}
              articleRecordedAssignmentId={articleRecordedAssignmentId!}
            />
          ) : (
            <RecordPane sentence={sentence} audioBuffer={audioBuffer} />
          )}
        </>
      ) : null}
    </div>
  );
};

export default SentenceRow;
