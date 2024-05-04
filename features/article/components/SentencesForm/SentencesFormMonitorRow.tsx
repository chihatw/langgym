'use client';
import AudioSlider from '@/components/AudioSlider';
import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { downloadAudioFile } from '@/features/storage/services/client';
import { blobToAudioBuffer } from '@/utils';
import { CassetteTape } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SentenceView } from '../../schema';

type Props = {
  index: number;
  result: {
    japanese: string;
    original: string;
    pitchStr: string;
    chinese: string;
  };
  sentence: SentenceView | undefined;
  audioBuffer: AudioBuffer | null;
};

type FormProps = {
  audioBuffer: AudioBuffer | null;
};

const INITIAL_STATE: FormProps = {
  audioBuffer: null,
};

const SentencesFormMonitorRow = ({
  index,
  result,
  sentence,
  audioBuffer,
}: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  useEffect(() => {
    if (!sentence?.recorded_audioPath) {
      setValue((prev) => ({ ...prev, audioBuffer: null }));
      return;
    }

    (async () => {
      const blob = await downloadAudioFile(sentence.recorded_audioPath!);
      if (!blob) {
        setValue((prev) => ({ ...prev, audioBuffer: null }));
        return;
      }

      const audioBuffer = await blobToAudioBuffer(blob);
      setValue((prev) => ({ ...prev, audioBuffer }));
    })();
  }, [sentence]);
  return (
    <div className='grid gap-1 text-xs p-2 bg-white/60 rounded'>
      <div className='font-extrabold'>{index + 1}</div>
      <div>{result.japanese}</div>
      <div className='text-gray-500'>{result.original}</div>
      <div className='text-[#52a2aa]'>{result.chinese}</div>
      <div>
        <SentencePitchLine pitchStr={result.pitchStr} />
      </div>
      {sentence && audioBuffer ? (
        <AudioSlider
          start={sentence.start!}
          end={sentence.end!}
          audioBuffer={audioBuffer}
        />
      ) : null}
      {value.audioBuffer ? (
        <div className='grid gap-2'>
          <CassetteTape className='w-4 h-4 ml-2' />
          <AudioSlider
            start={0}
            end={value.audioBuffer.duration}
            audioBuffer={value.audioBuffer}
          />
        </div>
      ) : null}
    </div>
  );
};

export default SentencesFormMonitorRow;
