'use client';

import SubmitServerActionButton from '@/components/SubmitServerActionButton';
import { Textarea } from '@/components/ui/textarea';
import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState, useTransition } from 'react';
import { Workout, WorkoutItem } from '../schema';
import { batchInsertWorkoutItems } from '../services/actions';

type Props = { items: any[]; workout: Workout };

type FormProps = {
  input: string;
  errMsg: string;
};

const INITIAL_STATE: FormProps = {
  input: '',
  errMsg: '',
};

const WorkoutItemsForm = ({ items, workout }: Props) => {
  const router = useRouter();

  const [value, setValue] = useState(INITIAL_STATE);
  const [isPending, startTransition] = useTransition();

  const result = useMemo(() => {
    const lines = value.input.split('\n');

    return lines.reduce(
      (acc, cur, index) => {
        let last = { japanese: '', chinese: '', pitchStr: '' };
        switch (index % 3) {
          case 1:
            last = acc.pop()!;
            return [...acc, { ...last, pitchStr: cur }];
          case 2:
            last = acc.pop()!;
            return [...acc, { ...last, chinese: cur }];
          default:
            return [...acc, { japanese: cur, pitchStr: '', chinese: '' }];
        }
      },
      [] as {
        japanese: string;
        pitchStr: string;
        chinese: string;
      }[]
    );
  }, [value.input]);

  useEffect(() => {
    const input = buildInputFromItems(items);
    setValue((prev) => ({ ...prev, input }));
  }, [items]);

  const action = async () => {
    const items: Omit<WorkoutItem, 'id' | 'created_at'>[] = result.map(
      (item, index) => ({
        ...item,
        index,
        workoutId: workout.id,
      })
    );

    startTransition(async () => {
      const errMsg = await batchInsertWorkoutItems(workout.id, items);
      if (errMsg) {
        setValue((prev) => ({ ...prev, errMsg }));
        return;
      }
      router.push('/mng/workout/list');
    });
  };

  return (
    <div className='grid gap-8'>
      <div className='text-2xl font-extrabold'>Workout Items Form</div>
      <div className='text-2xl font-extrabold'>{workout.title}</div>
      <div className='grid gap-y-4'>
        <Textarea
          value={value.input}
          onChange={(e) => setValue({ input: e.target.value, errMsg: '' })}
        />
        {!!value.input ? <WorkoutItemsMonitor result={result} /> : null}

        <SubmitServerActionButton
          disabled={!value.input || buildInputFromItems(items) === value.input}
          isPending={isPending}
          errMsg={value.errMsg}
          action={action}
        >
          Submit
        </SubmitServerActionButton>
      </div>
    </div>
  );
};

export default WorkoutItemsForm;

const WorkoutItemsMonitor = ({
  result,
}: {
  result: { japanese: string; pitchStr: string; chinese: string }[];
}) => {
  return (
    <div className='grid gap-2'>
      {result.map((item, index) => (
        <div key={index} className='grid gap-1 p-2 rounded bg-white/60'>
          <div className='text-xs font-extrabold'>{index + 1}</div>
          <div>{item.japanese}</div>
          <div className='text-xs text-[#52a2aa]'>{item.chinese}</div>
          <SentencePitchLine pitchStr={item.pitchStr} />
        </div>
      ))}
    </div>
  );
};

function buildInputFromItems(items: WorkoutItem[]) {
  return items
    .reduce(
      (acc, cur) => [...acc, cur.japanese, cur.pitchStr, cur.chinese],
      [] as string[]
    )
    .join('\n');
}
