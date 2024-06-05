'use client';
import FlipWrapper from '@/components/FlipWrapper';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { RotateCw } from 'lucide-react';
import { Lato } from 'next/font/google';
import { useState } from 'react';

type Props = {
  index: number;
  items: number[];
  selectedNumber: number;
  lap: number;
};

type FormProps = {
  isMirror: boolean;
};

const INITIAL_STATE: FormProps = {
  isMirror: true,
};

const lato = Lato({ subsets: ['latin'], weight: '900' });

const MirrorWorkoutResultRow = ({
  index,
  items,
  selectedNumber,
  lap,
}: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);
  const isCorrect = Math.max(...items) === selectedNumber;
  return (
    <div className='grid grid-cols-[12px,1fr,1fr,1fr,40px,48px] items-center gap-2'>
      <div className='text-xs text-end'>{index + 1}</div>

      {items.map((item, index) => (
        <Cell
          key={index}
          number={item}
          backGround='bg-white'
          toggle={value.isMirror}
        />
      ))}
      <Cell
        number={selectedNumber}
        backGround={isCorrect ? 'bg-green-100' : 'bg-red-100'}
        toggle={value.isMirror}
      />
      <Button
        size={'icon'}
        onClick={() =>
          setValue((prev) => ({ ...prev, isMirror: !prev.isMirror }))
        }
      >
        <FlipWrapper toggle={!value.isMirror}>
          <RotateCw className='h-4 w-4' />
        </FlipWrapper>
      </Button>
      <div className='text-center text-xs'>{`${(lap / 1000).toFixed(
        2
      )}秒`}</div>
    </div>
  );
};

export default MirrorWorkoutResultRow;

const Cell = ({
  number,
  backGround,
  toggle,
}: {
  number: number;
  backGround: string;
  toggle: boolean;
}) => {
  return (
    <FlipWrapper toggle={toggle}>
      <div
        className={cn(
          lato.className,
          backGround,
          'p-2 rounded text-center  text-lg'
        )}
      >
        {number}
      </div>
    </FlipWrapper>
  );
};
