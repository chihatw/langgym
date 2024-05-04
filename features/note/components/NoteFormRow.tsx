'use client';
import AudioSlider from '@/components/AudioSlider';
import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { downloadAudioFile } from '@/features/storage/services/client';
import { blobToAudioBuffer } from '@/utils';
import { useEffect, useState } from 'react';

type Props = {
  label: string;
  pitchStr: string;
  audioPath?: string;
};

const NoteFormRow = ({ label, pitchStr, audioPath }: Props) => {
  const [value, setValue] = useState<{
    audioBuffer: AudioBuffer | null;
  }>({
    audioBuffer: null,
  });

  // initialize
  useEffect(() => {
    if (!audioPath) {
      setValue({
        audioBuffer: null,
      });
      return;
    }

    (async () => {
      let audioBuffer: AudioBuffer | null = null;

      const blob = await downloadAudioFile(audioPath);
      if (!!blob) {
        audioBuffer = await blobToAudioBuffer(blob);
      }

      setValue((prev) => ({
        ...prev,
        audioBuffer,
      }));
    })();
  }, [audioPath]);

  return (
    <div className='grid gap-2 rounded bg-white/60 p-2'>
      <div className='grid gap-1'>
        {label.split('\n').map((line, index) => (
          <div key={index} className='text-xs'>
            {line}
          </div>
        ))}
      </div>
      {!!pitchStr ? (
        <div className='p-1 rounded bg-slate-200'>
          <SentencePitchLine pitchStr={pitchStr} />
        </div>
      ) : null}

      {value.audioBuffer ? (
        <AudioSlider
          audioBuffer={value.audioBuffer}
          start={0}
          end={value.audioBuffer.duration}
        />
      ) : null}
    </div>
  );
};

export default NoteFormRow;
