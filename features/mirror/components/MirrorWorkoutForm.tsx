'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { MIRROR_WORKOUTS_LABEL } from '../constants';
import MirrorWorkoutExplainContent from './MirrorWorkoutExplainContent/MirrorWorkoutExplainContent';
import MirrorWorkoutWorkoutContent from './MirrowWorkoutWorkoutContent/MirrorWorkoutWorkoutContent';

type State = 'explain' | 'workout';

type Props = {
  uid: string;
};

type FormProps = {
  state: State;
};

const INITIAL_STATE: FormProps = {
  state: 'explain',
};

const MirrorWorkoutForm = ({ uid }: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);
  return (
    <div className='grid gap-8'>
      <div className='grid gap-2'>
        <div className='text-2xl font-extrabold'>{MIRROR_WORKOUTS_LABEL}</div>
        <Tabs
          value={value.state}
          onValueChange={(value) =>
            setValue((prev) => ({
              ...prev,
              state: value as State,
            }))
          }
        >
          <TabsList className='w-full grid h-6 grid-cols-2 bg-slate-200'>
            <TabsTrigger value='explain' className='h-4 text-xs'>
              說明
            </TabsTrigger>
            <TabsTrigger value='workout' className='h-4 text-xs'>
              練習
            </TabsTrigger>
          </TabsList>
          <TabsContent value='explain'>
            <MirrorWorkoutExplainContent
              handleSetState={() =>
                setValue((prev) => ({ ...prev, state: 'workout' }))
              }
            />
          </TabsContent>
          <TabsContent value='workout'>
            <MirrorWorkoutWorkoutContent uid={uid} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MirrorWorkoutForm;
