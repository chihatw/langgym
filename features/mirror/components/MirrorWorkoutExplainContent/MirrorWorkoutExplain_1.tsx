'use client';

import FlipWrapper from '@/components/FlipWrapper';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Lato } from 'next/font/google';
import { useState } from 'react';
import ExplainUnitWrapper from './ExplainUnitWrapper';

type Props = {};

const lato = Lato({ subsets: ['latin'], weight: '900' });

type FormProps = {
  isMirror: boolean;
};

const INITIAL_STATE: FormProps = {
  isMirror: false,
};

const MirrorWorkoutExplain_1 = (props: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);
  return (
    <ExplainUnitWrapper title='1. 鏡像數字'>
      <div>鏡映字就是像鏡子映照出來的字</div>
      <div className='grid gap-2'>
        <div className='flex justify-center'>
          <div className='flex gap-4 flex-wrap'>
            <FlipWrapper toggle={value.isMirror}>
              <div
                className={cn('text-6xl bg-white rounded p-4', lato.className)}
              >
                3
              </div>
            </FlipWrapper>
            <FlipWrapper toggle={value.isMirror}>
              <div
                className={cn('text-6xl bg-white rounded p-4', lato.className)}
              >
                37
              </div>
            </FlipWrapper>
            <FlipWrapper toggle={value.isMirror}>
              <div
                className={cn('text-6xl bg-white rounded p-4', lato.className)}
              >
                821
              </div>
            </FlipWrapper>
          </div>
        </div>
        <Button
          onClick={() =>
            setValue((prev) => ({ ...prev, isMirror: !prev.isMirror }))
          }
        >
          <div className='flex gap-1 items-center'>
            <FlipWrapper toggle={value.isMirror}>按我一下</FlipWrapper>
          </div>
        </Button>
      </div>
    </ExplainUnitWrapper>
  );
};

export default MirrorWorkoutExplain_1;
