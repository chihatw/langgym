'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, MoveRight, X } from 'lucide-react';
import { Lato } from 'next/font/google';
import ExplainUnitWrapper from './ExplainUnitWrapper';
type Props = {
  handleSetState: () => void;
};

const lato = Lato({ subsets: ['latin'], weight: '900' });

const MirrorWorkoutExplainContent = ({ handleSetState }: Props) => {
  return (
    <div className='grid gap-16'>
      <div className='grid gap-4'>
        <MirrorWorkoutExplain_1 />
        <MirrorWorkoutExplain_2 />
        <MirrorWorkoutExplain_3 />
        <MirrorWorkoutExplain_4 />
      </div>
      <Button onClick={handleSetState}>開始練習</Button>
    </div>
  );
};

export default MirrorWorkoutExplainContent;

const MirrorWorkoutExplain_1 = () => {
  return (
    <ExplainUnitWrapper title='1. 鏡像數字'>
      <div>鏡映字就是像鏡子映照出來的字</div>
      <div className='flex'>
        <div
          className={cn(
            lato.className,
            'text-6xl bg-white rounded p-4 flex items-center gap-6'
          )}
        >
          <div>3</div>
          <MoveRight className='h-12 w-12' />
          <div className='p-0 scale-x-[-1]'>3</div>
        </div>
      </div>
    </ExplainUnitWrapper>
  );
};

const MirrorWorkoutExplain_2 = () => {
  return (
    <ExplainUnitWrapper title='2. 大小比較'>
      <div>大小比較就是大小比較</div>
      <div className='grid gap-2'>
        <div className='flex'>
          <div
            className={cn(
              lato.className,
              'text-6xl bg-white rounded p-4 flex items-center gap-6'
            )}
          >
            <Check className='h-8 w-8 text-green-500' />
            <div>81</div>
            <div>{`>`}</div>
            <div>37</div>
          </div>
        </div>
        <div className='flex'>
          <div
            className={cn(
              lato.className,
              'text-6xl bg-white rounded p-4 flex items-center gap-6'
            )}
          >
            <X className='h-8 w-8 text-red-500' />
            <div>81</div>
            <div>{`<`}</div>
            <div>37</div>
          </div>
        </div>
      </div>
    </ExplainUnitWrapper>
  );
};

const MirrorWorkoutExplain_3 = () => {
  return (
    <ExplainUnitWrapper title='3. 鏡像數字 + 大小比較'>
      <div>⚠️ 符號不是鏡像字</div>
      <div className='grid gap-2'>
        <div className='flex'>
          <div
            className={cn(
              lato.className,
              'text-6xl bg-white rounded p-4 flex items-center gap-6'
            )}
          >
            <Check className='h-8 w-8 text-green-500' />
            <div className='scale-x-[-1]'>81</div>
            <div>{`>`}</div>
            <div className='scale-x-[-1]'>37</div>
          </div>
        </div>
        <div className='flex'>
          <div
            className={cn(
              lato.className,
              'text-6xl bg-white rounded p-4 flex items-center gap-6'
            )}
          >
            <X className='h-8 w-8 text-red-500' />
            <div className='scale-x-[-1]'>81</div>
            <div>{`<`}</div>
            <div className='scale-x-[-1]'>37</div>
          </div>
        </div>
      </div>
    </ExplainUnitWrapper>
  );
};

const MirrorWorkoutExplain_4 = () => {
  return (
    <ExplainUnitWrapper title='4. 比較鏡像數字跟日文有沒有關係？'>
      <div>有！理解日文與比較鏡像數字，策略很像。</div>
    </ExplainUnitWrapper>
  );
};
