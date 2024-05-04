'use client';
import AudioSlider from '@/components/AudioSlider';
import { Button } from '@/components/ui/button';

import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import {
  deleteAudioFile,
  downloadAudioFile,
} from '@/features/storage/services/client';
import { cn } from '@/lib/utils';
import { blobToAudioBuffer } from '@/utils';
import { Trash2 } from 'lucide-react';
import { Lato } from 'next/font/google';
import { useEffect, useMemo, useState } from 'react';
import { WorkoutRecordRowView } from '../../schema';
import { deleteWorkoutRecord } from '../../services/actions';

const lato = Lato({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '900'],
});

type Props = {
  recordRows: WorkoutRecordRowView[];
  removeRecord: (action: void) => void;
};

const WorkoutArchive = ({ recordRows, removeRecord }: Props) => {
  const [audioBuffer, setAudioBuffer] = useState<null | AudioBuffer>(null);

  const recordRow = useMemo(() => recordRows.at(0), [recordRows]);

  useEffect(() => {
    if (!recordRow || !recordRow.audioPath) {
      setAudioBuffer(null);
      return;
    }

    (async () => {
      const blob = await downloadAudioFile(recordRow.audioPath!);
      if (!blob) {
        setAudioBuffer(null);
        return;
      }

      const audioBuffer = await blobToAudioBuffer(blob);
      setAudioBuffer(audioBuffer);
    })();
  }, [recordRow]);

  if (!recordRow) return null;

  const action = async () => {
    if (!recordRow) return;

    // storage
    const errMsg = await deleteAudioFile(recordRow.audioPath!);
    if (errMsg) {
      console.error(errMsg);
    }

    // local
    removeRecord();

    // remote
    deleteWorkoutRecord(recordRow.workoutRecordId!);
  };

  return (
    <div className='grid gap-4'>
      <div className='grid grid-cols-[1fr,auto,1fr] items-end gap-2'>
        <div />
        <div className={cn('text-8xl font-extrabold', lato.className)}>
          {recordRow.bpm}
        </div>
        <div className={cn('text-slate-700  pb-2', lato.className)}>bpm</div>
      </div>
      {!!audioBuffer ? (
        <div className='grid grid-cols-[1fr,auto] gap-1 items-center'>
          <AudioSlider
            audioBuffer={audioBuffer}
            start={0}
            end={audioBuffer.duration}
          />
          <form action={action}>
            <Button variant={'ghost'} size={'icon'} type='submit'>
              <Trash2 />
            </Button>
          </form>
        </div>
      ) : null}
      <div className='grid gap-4'>
        {recordRows.map((row, index) => (
          <div key={index} className='p-2 bg-white/60 rounded'>
            <div className='text-xs font-extrabold'>{index + 1}</div>
            <div>
              <SentencePitchLine pitchStr={row.pitchStr!} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutArchive;
