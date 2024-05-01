'use client';
import AudioSlider from '@/components/AudioSlider';
import { Button } from '@/components/ui/button';
import {
  deleteAudioFile,
  downloadAudioFile,
} from '@/features/article/services/client';
import { blobToAudioBuffer } from '@/utils';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Workout, WorkoutRecord } from '../../schema';
import { deleteWorkoutRecord } from '../../services/actions';

type Props = {
  workout: Workout;
  record?: WorkoutRecord;
  removeWorkoutRecords: (action: number) => void;
};

const WorkoutListRow = ({ workout, record, removeWorkoutRecords }: Props) => {
  const [audioBuffer, setAudioBuffer] = useState<null | AudioBuffer>(null);

  useEffect(() => {
    if (!record) {
      setAudioBuffer(null);
      return;
    }

    (async () => {
      const blob = await downloadAudioFile(record.audioPath);
      if (!blob) {
        setAudioBuffer(null);
        return;
      }

      const audioBuffer = await blobToAudioBuffer(blob);

      setAudioBuffer(audioBuffer);
    })();
  }, [record]);

  const action = async () => {
    if (!record) return;

    // storage
    const errMsg = await deleteAudioFile(record.audioPath);
    if (errMsg) {
      console.error(errMsg);
    }

    // local
    removeWorkoutRecords(record.id);

    // remote
    deleteWorkoutRecord(record.id);
  };
  return (
    <div className='p-5 bg-white/60 rounded-lg grid gap-4'>
      <Link href={`/workout/${workout.id}`} className='hover:cursor-pointer'>
        <div className='grid gap-4 '>
          <div className='flex gap-3'>
            <div>{workout.title}</div>
            {workout.isReview ? <div>復習</div> : null}
          </div>
          <div className='grid grid-cols-[auto,48px,1fr,auto,48px,1fr] items-center text-xs  text-slate-500 '>
            <div>目標BPM</div>
            <div className='text-xl text-end'>{workout.targetBPM}</div>
            <div />

            <div>到達BPM</div>
            <div className='text-xl text-end'>{record ? record.bpm : '--'}</div>
            <div />
          </div>
        </div>
      </Link>
      {audioBuffer ? (
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
    </div>
  );
};

export default WorkoutListRow;
