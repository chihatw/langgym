'use client';

import AudioSlider from '@/components/AudioSlider';
import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { blobToAudioBuffer } from '@/utils';
import { useEffect, useState } from 'react';
import { ArticleMark, ArticleRecordedAssignment, Sentence } from '../../schema';
import { downloadAudioFile } from '../../services/client';
import AssignmentMonitor from './AssignmentMonitor';
import RecordPane from './RecordPane/RecordPane';

type Props = {
  line: number;
  index: number;
  sentence: Sentence;
  articleId: number;
  audioBuffer: AudioBuffer | null;
  articleMark?: ArticleMark;
  isShowAccents: boolean;
  articleRecordedAssignment?: ArticleRecordedAssignment;
};

const SentenceRow = ({
  line,
  index,
  sentence,
  articleId,
  audioBuffer,
  articleMark,
  isShowAccents,
  articleRecordedAssignment,
}: Props) => {
  const [assignmentAudioBuffer, setAssignmentAudioBuffer] =
    useState<AudioBuffer | null>(null);

  useEffect(() => {
    if (!articleRecordedAssignment) {
      setAssignmentAudioBuffer(null);
      return;
    }

    (async () => {
      const blob = await downloadAudioFile(articleRecordedAssignment.audioPath);
      if (!blob) return;

      const audioBuffer = await blobToAudioBuffer(blob);
      if (!audioBuffer) return;

      setAssignmentAudioBuffer(audioBuffer);
    })();
  }, [articleRecordedAssignment]);

  return (
    <div key={sentence.id} className='grid gap-y-2 bg-white/60 rounded p-4 '>
      <div className='text-xs font-extrabold'>{index + 1}</div>
      <div className='p-0 text-sm'>{sentence.japanese}</div>
      <div className='text-[11px] text-[#52a2aa]'>{sentence.chinese}</div>
      <div className='text-[11px] p-2 rounded bg-slate-200 text-slate-500'>
        {sentence.original}
      </div>
      {isShowAccents ? (
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
      ) : null}
      {assignmentAudioBuffer ? (
        <AssignmentMonitor
          audioBuffer={assignmentAudioBuffer}
          articleId={articleId}
          line={line}
          articleRecordedAssignmentId={articleRecordedAssignment?.id!}
        />
      ) : (
        <RecordPane
          sentence={sentence}
          articleMark={articleMark}
          audioBuffer={audioBuffer}
          articleId={articleId}
          line={line}
        />
      )}
    </div>
  );
};

export default SentenceRow;
