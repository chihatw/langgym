'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { shuffle } from '@/utils';
import { Loader2 } from 'lucide-react';
import { Lato } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useMemo, useState, useTransition } from 'react';
import { MirrorWorkoutItemView, MirrorWorkoutResult } from '../../schema';
import { insertMirrorWorkoutResult } from '../../services/actions';
import MirrorWorkoutWorkoutPane from './MirrorWorkoutWorkoutPane';

type Props = {
  workoutItems: MirrorWorkoutItemView[];
};

type FormProps = {
  items: number[][];
  index: number;
  isRunning: boolean;
  start_at: number;
  selectedNumbers: number[];
  laps: number[];
};

const INITIAL_STATE: FormProps = {
  laps: [],
  items: [],
  index: 0,
  start_at: 0,
  isRunning: false,
  selectedNumbers: [],
};

const lato = Lato({ subsets: ['latin'], weight: '900' });

const MirrorWorkoutWorkoutContent = ({ workoutItems }: Props) => {
  const router = useRouter();

  const [value, setValue] = useState(INITIAL_STATE);

  const [isPending, startTransition] = useTransition();

  const _workout = useMemo(() => workoutItems.at(0), [workoutItems]);

  const _workoutItems = useMemo(() => {
    return workoutItems.reduce((acc, cur, index) => {
      const cloned = [...acc];

      // 奇数 index は 最後の項の要素を追加
      if (index % 2) {
        cloned.splice(cloned.length - 1, 1, [...cloned.at(-1)!, cur.number!]);
        return cloned;
      }

      // 偶数 index は 新しい項を追加
      cloned.push([cur.number!]);

      return cloned;
    }, [] as number[][]);
  }, [workoutItems]);

  const action = async (selectedNumber: number) => {
    if (value.index + 1 < value.items.length) {
      setValue((prev) => ({
        ...prev,
        laps: [...prev.laps, performance.now()],
        index: prev.index + 1,
        selectedNumbers: [...prev.selectedNumbers, selectedNumber],
      }));
      return;
    }

    const _value = {
      ...value,
      laps: [...value.laps, performance.now()],
      index: 0,
      isRunning: false,
      selectedNumbers: [...value.selectedNumbers, selectedNumber],
    };

    setValue(_value);
    const result: Omit<MirrorWorkoutResult, 'id'> = {
      items: JSON.stringify(_value.items),
      selectedNumbers: _value.selectedNumbers,
      laps: _value.laps.map(
        (lap, index, self) =>
          (lap - (index > 0 ? self.at(index - 1)! : _value.start_at)) >> 0
      ),
      totalTime: (_value.laps.at(-1)! - _value.start_at) >> 0,
      workoutId: _workout?.workoutId!,
    };

    startTransition(async () => {
      const id = await insertMirrorWorkoutResult(result);

      if (!id) return;
      router.push(`/mirror/${_workout?.workoutId!}/${id}`);
    });
  };

  const handleStart = () => {
    const items = shuffle(_workoutItems).map((items) =>
      shuffle(items as number[])
    );
    setValue({
      ...INITIAL_STATE,
      items,
      isRunning: true,
      start_at: performance.now(),
    });
  };

  return (
    <div className='grid gap-4'>
      <div className='grid gap-0'>
        <div className='font-extrabold text-xl'>哪個鏡像數字比較大</div>
        <div>請點擊比較大的鏡像數字</div>
      </div>
      <div className={cn('text-center text-4xl', lato.className)}>{`${
        value.isRunning ? value.index + 1 : 0
      } / ${_workoutItems.length}`}</div>
      {isPending ? (
        <div className='flex justify-center items-center h-96'>
          <Loader2 className='animate-spin h-32 w-32 text-slate-300' />
        </div>
      ) : (
        <>
          {value.isRunning ? (
            <MirrorWorkoutWorkoutPane
              action={action}
              items={value.items}
              valueIndex={value.index}
            />
          ) : (
            <Button onClick={handleStart}>開始</Button>
          )}
        </>
      )}
    </div>
  );
};

export default MirrorWorkoutWorkoutContent;
