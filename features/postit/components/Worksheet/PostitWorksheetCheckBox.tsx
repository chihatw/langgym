'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { useOptimistic, useTransition } from 'react';
import { PostItWorkout } from '../../schema';
import { updatePostItWorkoutChecked } from '../../services/actions';

type Props = { workout: PostItWorkout; value: number };

const PostitWorksheetCheckBox = ({ workout, value }: Props) => {
  const [, startTransition] = useTransition();

  const [optiChecked, toggleCheck] = useOptimistic<boolean, void>(
    workout.checked.includes(value),
    (state) => !state
  );

  const handleClick = () => {
    startTransition(async () => {
      // local
      toggleCheck();

      // remote
      action();
    });
  };

  const action = async () => {
    let newChecked = [...workout.checked];

    if (workout.checked.includes(value)) {
      newChecked = newChecked.filter((i) => i !== value);
    } else {
      newChecked = [...newChecked, value];
    }

    updatePostItWorkoutChecked(workout.id, newChecked);
  };
  return <Checkbox checked={optiChecked} onClick={handleClick} />;
};

export default PostitWorksheetCheckBox;
