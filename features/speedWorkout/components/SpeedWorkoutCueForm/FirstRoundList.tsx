'use client';

import { WorkoutItemView } from '@/features/workout/schema';
import { useMemo } from 'react';
import { SpeedWorkoutCueFormProps } from './SpeedWorkoutCueForm';
import SpeedWorkoutRow from './SpeedWorkoutRow';

type Props = {
  value: SpeedWorkoutCueFormProps;
  workoutItems: WorkoutItemView[];
  handleClick: (itemId: number) => void;
};

const FirstRoundList = ({ value, workoutItems, handleClick }: Props) => {
  const isFirstRound = useMemo(
    () =>
      !value.isLastRound || (value.isLastRound && !value.checkedItemIds.length),
    [value]
  );
  return (
    <div className='grid gap-2'>
      {workoutItems.map((item) => (
        <SpeedWorkoutRow
          key={item.id}
          workoutItem={item}
          handleClick={() => handleClick(item.id!)}
          isChecked={
            value.checkedItemIds.includes(item.id!) || value.isLastRound
          }
          isSelected={isFirstRound && value.selectedItemId === item.id!}
        />
      ))}
    </div>
  );
};

export default FirstRoundList;
