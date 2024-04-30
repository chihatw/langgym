'use client';

import { WorkoutItemView } from '@/features/workout/schema';
import { useMemo } from 'react';
import { SpeedWorkoutCueFormProps } from './SpeedWorkoutCueForm';
import SpeedWorkoutRow from './SpeedWorkoutRow';

type Props = {
  value: SpeedWorkoutCueFormProps;
  workoutItems: WorkoutItemView[];
  handleClick: (id: number) => void;
};

const LastRoundList = ({ value, workoutItems, handleClick }: Props) => {
  const isLastRound = useMemo(() => {
    return value.isLastRound && !!value.checkedItemIds.length;
  }, [value]);

  return (
    <div className='grid gap-2'>
      {workoutItems.map((item) => (
        <SpeedWorkoutRow
          key={item.id}
          workoutItem={item}
          handleClick={() => handleClick(item.id!)}
          isChecked={isLastRound && value.checkedItemIds.includes(item.id!)}
          isSelected={isLastRound && value.selectedItemId === item.id!}
        />
      ))}
    </div>
  );
};

export default LastRoundList;
