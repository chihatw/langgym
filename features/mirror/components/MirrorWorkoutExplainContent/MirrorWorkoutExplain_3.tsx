'use client';

import FlipWrapper from '@/components/FlipWrapper';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Lato } from 'next/font/google';
import { useState } from 'react';
import ExplainUnitWrapper from './ExplainUnitWrapper';
import MirrorWorkoutExplainRow from './MirrorWorkoutExplainRow';

type Props = {};

const lato = Lato({ subsets: ['latin'], weight: '900' });

type FormProps = {
  isMirror: boolean;
};

const INITIAL_STATE: FormProps = {
  isMirror: true,
};

const MirrorWorkoutExplain_3 = (props: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);
  return (
    <ExplainUnitWrapper title='3. 鏡像數字 + 大小比較'>
      <div className='grid gap-2'>
        <MirrorWorkoutExplainRow
          left={81}
          right={37}
          isCorrect={true}
          toggle={value.isMirror}
          Wrapper={NumberWrapper}
        />
        <MirrorWorkoutExplainRow
          left={81}
          right={37}
          isCorrect={false}
          toggle={value.isMirror}
          Wrapper={NumberWrapper}
        />
        <Button
          onClick={() =>
            setValue((prev) => ({ ...prev, isMirror: !prev.isMirror }))
          }
        >
          <div className='flex gap-1 items-center'>
            <FlipWrapper toggle={!value.isMirror}>確認一下</FlipWrapper>
          </div>
        </Button>
      </div>
    </ExplainUnitWrapper>
  );
};

export default MirrorWorkoutExplain_3;

const NumberWrapper = ({
  number,
  toggle,
}: {
  number: number;
  toggle?: boolean;
}) => {
  return (
    <FlipWrapper toggle={toggle ?? true}>
      <div className={cn('text-6xl bg-white rounded p-4', lato.className)}>
        {number}
      </div>
    </FlipWrapper>
  );
};
