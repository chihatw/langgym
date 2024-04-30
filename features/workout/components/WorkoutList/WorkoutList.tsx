'use client';

import { useOptimistic } from 'react';
import { Workout, WorkoutRecord } from '../../schema';
import WorkoutListRow from './WorkoutListRow';

type Props = {
  workouts: Workout[];
  workoutRecords: WorkoutRecord[];
};

const WorkoutList = ({ workouts, workoutRecords }: Props) => {
  const [optiRecords, removeWorkoutRecords] = useOptimistic<
    WorkoutRecord[],
    number
  >(workoutRecords, (state, id) => state.filter((item) => item.id !== id));

  return (
    <div className='grid gap-4'>
      {workouts.map((workout, index) => (
        <WorkoutListRow
          key={index}
          workout={workout}
          record={optiRecords.find((record) => record.workoutId === workout.id)}
          removeWorkoutRecords={removeWorkoutRecords}
        />
      ))}
    </div>
  );
};

export default WorkoutList;
