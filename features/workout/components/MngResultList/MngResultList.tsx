'use client';

import { useMemo, useOptimistic } from 'react';
import { WorkoutRecordRowView, WorkoutResult } from '../../schema';
import MngResultListRow from './MngResultListRow';

type Props = {
  recordRows: WorkoutRecordRowView[];
};

const MngResultList = ({ recordRows }: Props) => {
  const results = useMemo(() => {
    return recordRows.reduce((acc, cur) => {
      const workoutIds = acc.map((i) => i.workoutId);
      if (workoutIds.includes(cur.workoutId)) {
        return acc;
      }
      const {
        workoutId,
        title,
        targetBPM,
        audioPath,
        bpm,
        created_at,
        workoutRecordId,
      } = cur;
      return [
        ...acc,
        {
          workoutId,
          title,
          targetBPM,
          audioPath,
          bpm,
          created_at,
          workoutRecordId,
        },
      ];
    }, [] as WorkoutResult[]);
  }, [recordRows]);

  const [optiResults, removeWorkoutRecord] = useOptimistic<
    WorkoutResult[],
    number
  >(results, (state, workoutRecordId) =>
    state.filter((item) => item.workoutRecordId !== workoutRecordId)
  );

  return (
    <div className='grid gap-y-4'>
      <div className='text-2xl font-extrabold'>Result List</div>
      <div className='grid gap-4'>
        {optiResults.map((result) => (
          <MngResultListRow
            key={result.workoutId}
            result={result}
            removeWorkoutRecord={() =>
              removeWorkoutRecord(result.workoutRecordId!)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default MngResultList;
