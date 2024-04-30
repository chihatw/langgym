'use client';

import { Button } from '@/components/ui/button';
import { WorkoutItemView } from '@/features/workout/schema';
import { Check } from 'lucide-react';

type Props = {
  workoutItem: WorkoutItemView;
  handleClick: () => void;
  isChecked: boolean;
  isSelected: boolean;
};

const SpeedWorkoutRow = ({
  workoutItem,
  handleClick,
  isChecked,
  isSelected,
}: Props) => {
  return (
    <div className='rounded grid'>
      <Button
        className='text-left text-gray-700'
        variant={'ghost'}
        onClick={handleClick}
        disabled={isChecked}
      >
        <div className='grid flex-1 items-center gap-1'>
          <div className='grid grid-cols-[1fr,auto] items-center'>
            <div className={isSelected ? 'text-red-500 bg-white' : ''}>
              {workoutItem.chinese}
            </div>
            {isChecked ? <Check className='text-[#52a2aa]' /> : null}
          </div>
        </div>
      </Button>
    </div>
  );
};

export default SpeedWorkoutRow;
