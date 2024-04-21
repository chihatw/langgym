'use client';
import { downloadAudioFile } from '@/features/article/services/client';
import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { blobToAudioBuffer } from '@/utils';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { WorkoutFirst } from '../../schema';
import WorkoutFirstAudioMonitor from './WorkoutFirstAudioMonitor';
import WorkoutFirstRecordPane from './WorkoutFirstRecordPane';

type Props = {
  index: number;
  item: WorkoutFirst;
  audioPath?: string;
};

type FormProps = {
  audioBuffer: AudioBuffer | null;
};

const INITIAL_STATE: FormProps = {
  audioBuffer: null,
};

const WorkoutFirstRow = ({ index, item, audioPath }: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  useEffect(() => {
    if (!audioPath) {
      setValue((prev) => ({ ...prev, audioBuffer: null }));
      return;
    }

    (async () => {
      const blob = await downloadAudioFile(audioPath);
      if (!blob) return;

      const audioBuffer = await blobToAudioBuffer(blob);
      if (!audioBuffer) return;

      setValue((prev) => ({ ...prev, audioBuffer }));
    })();
  }, [audioPath]);

  return (
    <div className='rounded bg-white/60 p-5 grid gap-2'>
      <div className='flex items-center gap-1'>
        <div className='text-xs font-extrabold'>{index + 1}</div>
        {value.audioBuffer ? <Check className='text-teal-600 w-4 h-4' /> : null}
      </div>
      <div className='text-sm'>{item.japanese}</div>
      <div className='text-xs text-teal-600'>{item.chinese}</div>
      <div className='p-2 rounded bg-slate-200'>
        <SentencePitchLine pitchStr={item.pitchStr} />
      </div>
      {value.audioBuffer ? (
        <WorkoutFirstAudioMonitor
          audioBuffer={value.audioBuffer}
          itemId={item.id}
        />
      ) : (
        <WorkoutFirstRecordPane item={item} />
      )}
    </div>
  );
};

export default WorkoutFirstRow;
