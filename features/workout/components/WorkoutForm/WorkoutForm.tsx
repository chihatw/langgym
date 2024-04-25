'use client';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { shuffle } from '@/utils';
import { TabsContent } from '@radix-ui/react-tabs';
import { useEffect, useMemo, useOptimistic, useState } from 'react';
import { WorkoutItemView, WorkoutRecordRowView } from '../../schema';
import WorkoutArchive from './WorkoutArchive';
import WorkoutPrepare from './WorkoutPrepare';
import WorkoutRecord from './WorkoutRecord';

type State = 'prepare' | 'record' | 'archive';

type Props = {
  workoutItems: WorkoutItemView[];
  recordRows: WorkoutRecordRowView[];
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

const WorkoutForm = ({ workoutItems, recordRows }: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  const [optiRecordRows, removeRecord] = useOptimistic<
    WorkoutRecordRowView[],
    void
  >(recordRows, (state) => []);

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
        <TabsList
          className={cn(
            'w-full grid grid-cols-2 h-6 text-xs bg-slate-200',
            !!optiRecordRows.length ? 'grid-cols-3' : 'grid-cols-2'
          )}
        >
          <TabsTrigger value='prepare' className='h-4 text-xs'>
            清單
          </TabsTrigger>
          <TabsTrigger value='record' className='h-4 text-xs'>
            錄音
          </TabsTrigger>
          {!!optiRecordRows.length ? (
            <TabsTrigger value='archive' className='h-4 text-xs'>
              記錄
            </TabsTrigger>
          ) : null}
        </TabsList>
        <TabsContent value='prepare'>
          <div className='pt-8'>
            <WorkoutPrepare value={value} setValue={setValue} />
          </div>
        </TabsContent>
        <TabsContent value='record'>
          <div className='pt-4'>
            <WorkoutRecord value={value} setValue={setValue} />
          </div>
        </TabsContent>
        <TabsContent value='archive'>
          <div className='pt-4'>
            <WorkoutArchive
              recordRows={optiRecordRows}
              removeRecord={removeRecord}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkoutForm;
