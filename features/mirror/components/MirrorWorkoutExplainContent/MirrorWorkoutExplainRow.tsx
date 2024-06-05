import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';
import { Lato } from 'next/font/google';

type Props = {
  left: number;
  right: number;
  isCorrect: boolean;
  toggle?: boolean;
  Wrapper: ({
    number,
    toggle,
  }: {
    number: number;
    toggle?: boolean;
  }) => JSX.Element;
};

const lato = Lato({ subsets: ['latin'], weight: '900' });

const MirrorWorkoutExplainRow = ({
  left,
  right,
  isCorrect,
  toggle,
  Wrapper,
}: Props) => {
  const correctComparison = left > right ? '>' : '<';
  const incorrectComparison = left > right ? '<' : '>';
  return (
    <div className='flex'>
      <div className={'flex items-center gap-6'}>
        {isCorrect ? (
          <Check className='h-8 w-8 text-green-500' />
        ) : (
          <X className='h-8 w-8 text-red-500' />
        )}
        <Wrapper number={left} toggle={toggle} />
        <div className={cn(lato.className, 'text-6xl')}>
          {isCorrect ? correctComparison : incorrectComparison}
        </div>
        <Wrapper number={right} toggle={toggle} />
      </div>
    </div>
  );
};

export default MirrorWorkoutExplainRow;
