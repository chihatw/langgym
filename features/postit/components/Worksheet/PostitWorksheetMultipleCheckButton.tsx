'use client';

import SubmitServerActionButton from '@/components/SubmitServerActionButton';
import { useTransition } from 'react';
import { PostItWorkout } from '../../schema';
import { updatePostItWorkoutChecked } from '../../services/actions';

type Props = { workout: PostItWorkout; values: number[] };

const PostitWorksheetMultipleCheckButton = ({ workout, values }: Props) => {
  const [isPending, startTransition] = useTransition();

  const action = async () => {
    startTransition(async () => {
      const newChecked = Array.from(new Set([...workout.checked, ...values]));
      updatePostItWorkoutChecked(workout.id, newChecked);
    });
  };

  return (
    <SubmitServerActionButton
      action={action}
      disabled={values.every((i) => workout.checked.includes(i)) || isPending}
      isPending={isPending}
    >
      全選打勾
    </SubmitServerActionButton>
  );
};

export default PostitWorksheetMultipleCheckButton;
