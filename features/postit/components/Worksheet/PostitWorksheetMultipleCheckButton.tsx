'use client';

import SubmitServerActionButton from '@/components/SubmitServerActionButton';
import { useTransition } from 'react';
import { PostItWorkout } from '../../schema';
import { updatePostItWorkoutChecked } from '../../services/actions';

type Props = { workout: PostItWorkout; values: number[]; disabled: boolean };

const PostitWorksheetMultipleCheckButton = ({
  workout,
  values,
  disabled,
}: Props) => {
  const [isPending, startTransition] = useTransition();

  const action = async () => {
    startTransition(async () => {
      const newChecked = Array.from(new Set([...workout.checked, ...values]));
      updatePostItWorkoutChecked(workout.id, newChecked);
    });
  };

  return (
    <div className='grid gap-2'>
      {values.some((i) => !workout.checked.includes(i)) ? (
        <div className='pl-[0.5em] text-xs text-slate-500 pt-4'>{`還有${
          values.filter((i) => !workout.checked.includes(i)).length
        }個項目要打勾`}</div>
      ) : null}
      <SubmitServerActionButton
        action={action}
        disabled={
          values.every((i) => workout.checked.includes(i)) ||
          isPending ||
          disabled
        }
        isPending={isPending}
      >
        全選打勾
      </SubmitServerActionButton>
    </div>
  );
};

export default PostitWorksheetMultipleCheckButton;
