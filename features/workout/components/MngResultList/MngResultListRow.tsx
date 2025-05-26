'use client';
import AudioSlider from '@/components/AudioSlider';
import { Button } from '@/components/ui/button';

import {
  deleteAudioFile,
  downloadAudioFile,
} from '@/features/storage/services/client';
import { blobToAudioBuffer } from '@/utils';
import { formatDistance } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { WorkoutResult } from '../../schema';
import { deleteWorkoutRecord } from '../../services/actions';

type Props = {
  result: WorkoutResult;
  removeWorkoutRecord: () => void;
};

type FormProps = {
  audioBuffer: AudioBuffer | null;
};

const INITIAL_STATE: FormProps = {
  audioBuffer: null,
};

const MngResultListRow = ({ result, removeWorkoutRecord }: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  useEffect(() => {
    if (!result.audioPath) {
      setValue((prev) => ({ ...prev, autioBuffer: null }));
      return;
    }

    (async () => {
      const blob = await downloadAudioFile(result.audioPath!);

      if (!blob) {
        setValue((prev) => ({ ...prev, autioBuffer: null }));
        return;
      }

      const audioBuffer = await blobToAudioBuffer(blob);
      setValue((prev) => ({ ...prev, audioBuffer }));
    })();
  }, [result]);

  const action = async () => {
    // storage
    const errMsg = await deleteAudioFile(result.audioPath!);
    if (errMsg) {
      console.error(errMsg);
    }

    // local
    removeWorkoutRecord();

    // remote
    deleteWorkoutRecord(result.workoutRecordId!);
  };

  return (
    <div className='grid gap-2 p-2 rounded bg-white/60'>
      <div className='grid grid-cols-[1fr_auto_auto] gap-2 items-center'>
        <div className='text-sm'>{`${result.display} ${result.title}`}</div>
        <div className='text-xs text-slate-500 '>
          {formatDistance(result.created_at!, new Date(), {
            addSuffix: true,
            locale: ja,
          })}
        </div>
        <div>{`${result.bpm} / ${result.targetBPM}`}</div>
      </div>
      {!!value.audioBuffer ? (
        <div className='grid grid-cols-[1fr_auto] gap-2'>
          <AudioSlider
            audioBuffer={value.audioBuffer}
            start={0}
            end={value.audioBuffer.duration}
          />
          <form action={action}>
            <Button size='icon' variant={'ghost'} type='submit'>
              <Trash2 />
            </Button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default MngResultListRow;
