'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { Lato } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { MirrorWorkoutResult } from '../../schema';
import { insertMirrorWorkoutResult } from '../../services/actions';
import {
  buildMirrorWorkoutItems,
  convertTimezone_TW,
  getCorrectRatio,
} from '../../services/utils';
import MirrorWorkoutWorkoutButtonWrapper from './MirrorWorkoutWorkoutButtonWrapper';
import MirrorWorkoutWorkoutPane from './MirrorWorkoutWorkoutPane';

type Props = { uid: string };

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

const LENGTH = 10;

const MirrorWorkoutWorkoutContent = ({ uid }: Props) => {
  const router = useRouter();

  const [value, setValue] = useState(INITIAL_STATE);

  const [isPending, startTransition] = useTransition();

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
      uid,
      created_at: convertTimezone_TW(new Date()),
      correctRatio: getCorrectRatio(_value.selectedNumbers, _value.items),
    };

    startTransition(async () => {
      const id = await insertMirrorWorkoutResult(result);

      if (!id) return;
      router.push(`/mirror/${id}`);
    });
  };

  const handleStart = () => {
    const items = buildMirrorWorkoutItems(5, LENGTH);
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
      } / ${LENGTH}`}</div>
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
            <>
              <div className='flex justify-center'>
                <MirrorWorkoutWorkoutButtonWrapper>
                  {['開始', '開始'].map((item, index) => (
                    <Button
                      key={index}
                      onClick={handleStart}
                      className='bg-white h-48 hover:bg-slate-300 w-full'
                    >
                      <span
                        className={cn(
                          'text-slate-400 text-6xl  select-none',
                          lato.className
                        )}
                      >
                        {item}
                      </span>
                    </Button>
                  ))}
                </MirrorWorkoutWorkoutButtonWrapper>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MirrorWorkoutWorkoutContent;
