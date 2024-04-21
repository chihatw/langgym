'use client';

import { Progress } from '@/components/ui/progress';
import { downloadAudioFile } from '@/features/article/services/client';
import { blobToAudioBuffer, shuffle } from '@/utils';
import { useEffect, useState } from 'react';
import { WorkoutFirst, WorkoutSecondAudioPath } from '../../schema';
import WorkoutSecondPrepare from './WorkoutSecondPrepare';
import WorkoutSecondRecord from './WorkoutSecondRecord';
import WorkoutSecondStorageMonitor from './WorkoutSecondStorageMonitor';

type Props = {
  label: string;
  items: WorkoutFirst[];
  workoutIndex: number;
  audioPath?: WorkoutSecondAudioPath;
};

export type WorkoutSecondFormProps = {
  workoutIndex: number;
  state: 'prepare' | 'record' | 'check';
  items: WorkoutFirst[];
  shuffledIds: number[];
  index: number;
  blob: Blob | null; // blob は描画と無関係だが、ref で子コンポーネントに渡すのは難しい
  isChecking: boolean;
  isRecording: boolean;
  audioBuffer: AudioBuffer | null;
  audio: HTMLAudioElement | null; // useEffect の中で定義をする必要がある;
  storage?: {
    id: number;
    path: string;
    shuffledIds: number[];
    audioBuffer: AudioBuffer | null;
  };
};

const INITIAL_STATE: WorkoutSecondFormProps = {
  workoutIndex: 0,
  state: 'prepare',
  items: [],
  shuffledIds: [],
  index: 0,
  blob: null,
  isRecording: false,
  isChecking: false,
  audioBuffer: null,
  audio: null,
  storage: {
    id: 0,
    path: '',
    audioBuffer: null,
    shuffledIds: [],
  },
};

const PROGRESS: { [key: string]: number } = {
  prepare: 33,
  record: 66,
  check: 100,
};

const WorkoutSecondPane = ({
  label,
  items,
  workoutIndex,
  audioPath,
}: Props) => {
  const [progress, setProgress] = useState(33);
  const [value, setValue] = useState(INITIAL_STATE);

  useEffect(() => {
    const progress = PROGRESS[value.state];
    const timer = setTimeout(() => setProgress(progress), 500);
    return () => clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    const ids = items.map((item) => item.id);
    const shuffledIds = shuffle(ids);
    setValue((prev) => ({
      ...prev,
      items,
      shuffledIds,
      workoutIndex,
    }));
  }, [workoutIndex, items]);

  useEffect(() => {
    if (!audioPath) {
      setValue((prev) => ({
        ...prev,
        storage: undefined,
      }));
      return;
    }

    (async () => {
      const blob = await downloadAudioFile(audioPath.path);
      if (!blob) return;

      const audioBuffer = await blobToAudioBuffer(blob);
      if (!audioBuffer) return;
      setValue((prev) => ({
        ...prev,
        storage: {
          ...audioPath,
          audioBuffer,
        },
      }));
    })();
  }, [audioPath]);

  return (
    <div className='grid gap-0'>
      <div className='text-2xl font-extrabold'>{label}</div>
      {value.storage &&
      value.storage.audioBuffer &&
      value.storage.shuffledIds.length ? (
        <WorkoutSecondStorageMonitor value={value} setValue={setValue} />
      ) : (
        <>
          <div className='grid gap-1 mx-4 pt-8 pb-4'>
            <div className='grid grid-cols-3'>
              {['背誦', '錄音', '確認'].map((label, index) => (
                <div className='text-center text-xs text-slate-500' key={index}>
                  {label}
                </div>
              ))}
            </div>
            <Progress value={progress} className='h-1' />
          </div>
          {value.state === 'prepare' ? (
            <WorkoutSecondPrepare value={value} setValue={setValue} />
          ) : null}
          {value.state === 'record' ? (
            <WorkoutSecondRecord value={value} setValue={setValue} />
          ) : null}
        </>
      )}
    </div>
  );
};

export default WorkoutSecondPane;
