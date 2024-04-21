'use client';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';
import { WORKOUT_FIRST_ITEMS } from '../../constants';
import { WorkoutFirstAudioPath } from '../../schema';
import WorkoutFirstRow from './WorkoutFirstRow';

type Props = {
  label: string;
  audioPaths: WorkoutFirstAudioPath[];
};

const WorkoutFirstPane = ({ audioPaths, label }: Props) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progress = Math.round(
      (audioPaths.length / WORKOUT_FIRST_ITEMS.length) * 100
    );
    const timer = setTimeout(() => setProgress(progress), 500);
    return () => clearTimeout(timer);
  }, [audioPaths]);

  return (
    <div className='grid gap-8'>
      <div className='text-2xl font-extrabold'>{label}</div>
      <div className='grid grid-cols-[1fr,auto] items-center mx-4 gap-4'>
        <Progress value={progress} className='h-1' />
        <div className='text-xs text-slate-500'>{`${audioPaths.length}/${WORKOUT_FIRST_ITEMS.length}`}</div>
      </div>
      <div className='grid gap-4'>
        {WORKOUT_FIRST_ITEMS.map((item, index) => (
          <WorkoutFirstRow
            key={index}
            index={index}
            item={item}
            audioPath={audioPaths.find((i) => i.itemId === item.id)?.path}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkoutFirstPane;
