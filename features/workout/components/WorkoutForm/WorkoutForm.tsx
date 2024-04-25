'use client';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { shuffle } from '@/utils';
import { useEffect, useMemo, useState } from 'react';
import { WorkoutItemView } from '../../schema';
import WorkoutPrepare from './WorkoutPrepare';
import WorkoutRecord from './WorkoutRecord';

type State = 'prepare' | 'record';

type Props = {
  workoutItems: WorkoutItemView[];
};

export type WorkoutFormProps = {
  state: State;
  items: WorkoutItemView[];
  shuffledIds: number[];
  index: number; // 回答の現在 Index
  elapsedTime: number;
  isRecording: boolean;
  isChecking: boolean;
  blob: Blob | null; // blob は描画と無関係だが、ref で子コンポーネントに渡すのは難しい
  audioBuffer: AudioBuffer | null;
  audio: HTMLAudioElement | null; // useEffect の中で定義をする必要がある;
};

const INITIAL_STATE: WorkoutFormProps = {
  state: 'prepare',
  items: [],
  shuffledIds: [],
  index: 0,
  elapsedTime: 0,
  blob: null,
  isRecording: false,
  isChecking: false,
  audioBuffer: null,
  audio: null,
};

const WorkoutForm = ({ workoutItems }: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  const workoutItem = useMemo(() => workoutItems.at(0), [workoutItems]);

  useEffect(() => {
    const workoutItem = workoutItems.at(0);
    if (!workoutItem) return;

    const ids = workoutItems.map((item) => item.id!);
    const shuffledIds = workoutItem.isReview
      ? [...shuffle(ids), ...shuffle(ids)]
      : shuffle(ids);
    setValue({
      ...INITIAL_STATE,
      items: workoutItems,
      shuffledIds,
    });
  }, [workoutItems]);

  if (!workoutItem) return <></>;
  return (
    <div className='grid gap-4'>
      <div className='text-2xl font-extrabold'>{workoutItem.title}</div>

      <Tabs
        value={value.state}
        onValueChange={(value) =>
          setValue((prev) => ({
            ...prev,
            state: value as State,
          }))
        }
      >
        <TabsList className='w-full grid grid-cols-2 h-6 text-xs bg-slate-200'>
          <TabsTrigger value='prepare' className='h-4 text-xs'>
            清單
          </TabsTrigger>
          <TabsTrigger value='record' className='h-4 text-xs'>
            錄音
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {value.state === 'prepare' ? (
        <WorkoutPrepare value={value} setValue={setValue} />
      ) : null}
      {value.state === 'record' ? (
        <WorkoutRecord value={value} setValue={setValue} />
      ) : null}
    </div>
  );
};

export default WorkoutForm;
