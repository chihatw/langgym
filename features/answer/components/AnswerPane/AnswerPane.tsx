'use client';

import AudioSlider from '@/components/AudioSlider';
import { downloadAudioFile } from '@/features/article/services/client';
import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { blobToAudioBuffer } from '@/utils';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  ArticlePitchQuizAnswerRowView,
  ArticlePitchQuizAnswerView,
} from '../../schema';
import WrongAnswer from './WrongAnswer';

type Props = {
  score: number;
  answer: ArticlePitchQuizAnswerView;
  answerRows: ArticlePitchQuizAnswerRowView[];
};

const AnswerPane = ({ answer, answerRows, score }: Props) => {
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);

  useEffect(() => {
    if (!answer.hasAudio) return;

    (async () => {
      const blob = await downloadAudioFile(answer.audioPath!);
      if (!blob) return;

      const audioBuffer = await blobToAudioBuffer(blob);

      setAudioBuffer(audioBuffer);
    })();
  }, [answer]);

  return (
    <div className='grid gap-y-8'>
      <div className='text-2xl font-extrabold'>{answer.title}</div>
      <div className='flex justify-center items-center rounded-lg  h-24 text-9xl font-extrabold'>
        {score}
      </div>
      <div className='grid gap-y-2'>
        {answerRows.map((row) => (
          <div key={row.id} className='rounded p-2 bg-white/60 grid gap-y-2'>
            <div className='text-xs font-extrabold'>{row.line! + 1}</div>
            {answer.hasAudio && audioBuffer ? (
              <AudioSlider
                audioBuffer={audioBuffer}
                start={row.start!}
                end={row.end!}
              />
            ) : null}
            {row.answer === row.pitchStr ? (
              <div className='p-2 rounded bg-[#52a2aa] bg-opacity-10 grid grid-cols-[32px,1fr] items-center'>
                <Check className='text-[#52a2aa]' />
                <SentencePitchLine pitchStr={row.answer!} />
              </div>
            ) : (
              <WrongAnswer row={row} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnswerPane;
