'use client';
import AudioSlider from '@/components/AudioSlider';
import { blobToAudioBuffer } from '@/utils';
import { useEffect, useMemo, useState } from 'react';
import { SentenceView } from '../../schema';
import { downloadAudioFile } from '../../services/client';
import { getYMDFromDateString } from '../../services/utils';
import RecordPane from './RecordPane/RecordPane';
import SentenceRow from './SentenceRow';

type Props = {
  sentences: SentenceView[];
};

type FormProps = {
  audioBuffer: AudioBuffer | null;
};

const INITIAL_STATE: FormProps = {
  audioBuffer: null,
};

const ArticlePane = ({ sentences }: Props) => {
  const sentence = useMemo(() => sentences.at(0), [sentences]);
  const lastSentence = useMemo(() => sentences.at(-1), [sentences]);

  const { year, month, day } = getYMDFromDateString(sentence!.date!);
  const [value, setValue] = useState(INITIAL_STATE);

  useEffect(() => {
    if (!sentence) return;
    const { audioPath } = sentence;

    if (!audioPath) return;
    (async () => {
      const blob = await downloadAudioFile(audioPath);
      if (!blob) return;

      const audioBuffer = await blobToAudioBuffer(blob);
      if (!audioBuffer) return;

      setValue((prev) => ({ ...prev, audioBuffer }));
    })();
  }, [sentence]);

  if (!sentence || !lastSentence) return null;

  const { title, isShowAccents, start } = sentence;
  const { end } = lastSentence;

  return (
    <div className='grid gap-8'>
      <div className='grid gap-2'>
        <div className='text-2xl font-extrabold'>{title}</div>
        <div className='text-xs '>{`${year}年${month}月${day}日`}</div>
        {isShowAccents && value.audioBuffer && start && end ? (
          <AudioSlider
            start={start}
            end={end}
            audioBuffer={value.audioBuffer}
          />
        ) : null}
      </div>
      <div className='grid gap-4'>
        {sentences.map((sentence, index) => (
          <div key={index} className='grid gap-2 bg-white/60 rounded p-4'>
            <SentenceRow sentence={sentence} audioBuffer={value.audioBuffer} />
            {sentence.isShowAccents ? (
              <RecordPane sentence={sentence} audioBuffer={value.audioBuffer} />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlePane;
