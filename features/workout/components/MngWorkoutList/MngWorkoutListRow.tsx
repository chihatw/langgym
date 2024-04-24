'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { AlignJustify, Edit2, Eye, EyeOff, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useOptimistic } from 'react';
import { WorkoutView } from '../../schema';
import {
  deleteWorkout,
  updateWorkoutIsDev,
  updateWorkoutIsReview,
} from '../../services/actions';

type Props = {
  workout: WorkoutView;
  removeWorkout: (id: number) => void;
};

const MngWorkoutListRow = ({ workout, removeWorkout }: Props) => {
  return (
    <div className='grid grid-cols-[60px,1fr,28px,auto] items-center gap-2 px-2 py-1 text-sm border-b border-black/20 '>
      <div className='pr-2 text-xs font-extralight text-gray-500 whitespace-nowrap overflow-hidden'>
        {workout.display}
      </div>
      <div className='overflow-hidden whitespace-nowrap'>{workout.title}</div>
      <div className='text-end '>{workout.targetBPM}</div>
      <div className='flex flex-nowrap items-center'>
        <Link
          href={`/mng/workout/${workout.id}/edit`}
          className={buttonVariants({ size: 'icon', variant: 'ghost' })}
        >
          <Edit2 className='h-5 w-5' />
        </Link>
        <Link
          href={`/mng/workout/${workout.id}/items`}
          className={buttonVariants({ size: 'icon', variant: 'ghost' })}
        >
          <AlignJustify className='h-5 w-5' />
        </Link>
        <IsDevToggle workout={workout} />
        <IsReviewToggle workout={workout} />
        <RemoveWorkoutButton
          workoutId={workout.id!}
          removeWorkout={removeWorkout}
        />
      </div>
    </div>
  );
};

export default MngWorkoutListRow;

const IsDevToggle = ({ workout }: { workout: WorkoutView }) => {
  const [optValue, setOptValue] = useOptimistic<boolean, boolean>(
    workout.isDev!,
    (_, newValue) => newValue
  );

  const action = async () => {
    // local
    setOptValue(!optValue);

    // remote
    updateWorkoutIsDev(workout.id!, !optValue);
  };
  return (
    <form action={action}>
      <Button size={'icon'} variant={'ghost'} type='submit'>
        {optValue ? (
          <EyeOff className='h-5 w-5' />
        ) : (
          <Eye className='h-5 w-5' />
        )}
      </Button>
    </form>
  );
};

const IsReviewToggle = ({ workout }: { workout: WorkoutView }) => {
  const [optValue, setOptValue] = useOptimistic<boolean, boolean>(
    workout.isReview!,
    (_, newValue) => newValue
  );

  const action = async () => {
    // local
    setOptValue(!optValue);

    // remote
    updateWorkoutIsReview(workout.id!, !optValue);
  };
  return (
    <form action={action}>
      <Button
        size={'icon'}
        variant={'ghost'}
        type='submit'
        className='text-xl font-extrabold'
      >
        {optValue ? 2 : 1}
      </Button>
    </form>
  );
};

const RemoveWorkoutButton = ({
  workoutId,
  removeWorkout,
}: {
  workoutId: number;
  removeWorkout: (value: number) => void;
}) => {
  const action = () => {
    // local
    removeWorkout(workoutId);

    // remote
    deleteWorkout(workoutId);
  };
  return (
    <form action={action}>
      <Button size={'icon'} variant={'ghost'} type='submit'>
        <Trash2 className='h-5 w-5' />
      </Button>
    </form>
  );
};
