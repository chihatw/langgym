'use client';

import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { useOptimistic } from 'react';
import { WorkoutView } from '../../schema';
import MngWorkoutListRow from './MngWorkoutListRow';

type Props = {
  workouts: WorkoutView[];
};

const MngWorkoutList = ({ workouts }: Props) => {
  const [opti_workouts, removeWorkout] = useOptimistic<WorkoutView[], number>(
    workouts,
    (state, id) => state.filter((item) => item.id !== id)
  );
  return (
    <div className='grid gap-y-4'>
      <div className='text-2xl font-extrabold'>Workout List</div>
      <div>
        <Link href={'/mng/workout/new'} className={buttonVariants()}>
          Create New Workout
        </Link>
      </div>
      <div className='grid'>
        {opti_workouts.map((workout) => (
          <MngWorkoutListRow
            key={workout.id}
            workout={workout}
            removeWorkout={removeWorkout}
          />
        ))}
      </div>
    </div>
  );
};

export default MngWorkoutList;
