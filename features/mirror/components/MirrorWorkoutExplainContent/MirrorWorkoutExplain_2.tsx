import { cn } from '@/lib/utils';
import { Lato } from 'next/font/google';
import ExplainUnitWrapper from './ExplainUnitWrapper';
import MirrorWorkoutExplainRow from './MirrorWorkoutExplainRow';

type Props = {};

const lato = Lato({ subsets: ['latin'], weight: '900' });

const MirrorWorkoutExplain_2 = (props: Props) => {
  return (
    <ExplainUnitWrapper title='2. 大小比較'>
      <div>大小比較就是大小比較</div>
      <div className='grid gap-2'>
        <MirrorWorkoutExplainRow
          left={81}
          right={37}
          isCorrect={true}
          Wrapper={NumberWrapper}
        />
        <MirrorWorkoutExplainRow
          left={81}
          right={37}
          isCorrect={false}
          Wrapper={NumberWrapper}
        />
      </div>
    </ExplainUnitWrapper>
  );
};

export default MirrorWorkoutExplain_2;

const NumberWrapper = ({ number }: { number: number }) => {
  return <div className={cn(lato.className, 'text-6xl')}>{number}</div>;
};
