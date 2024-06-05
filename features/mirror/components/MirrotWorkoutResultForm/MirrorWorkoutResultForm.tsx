import Breadcrumb from '@/components/Breadcrumb';
import { Lato } from 'next/font/google';
import { MIRROR_WORKOUTS_LABEL } from '../../constants';
import { MirrorWorkoutResult } from '../../schema';
import MirrorWorkoutResultRow from './MirrorWorkoutResultRow';

type Props = {
  result: MirrorWorkoutResult;
};
const lato = Lato({ subsets: ['latin'], weight: '900' });

const MirrorWorkoutResultForm = ({ result }: Props) => {
  const correctAnswers = result.selectedNumbers.filter((number, index) => {
    const items: number[] = JSON.parse(result.items)[index];
    return number === Math.max(...items);
  });

  const correctRatio = Math.round(
    (correctAnswers.length / result.selectedNumbers.length) * 100
  );
  return (
    <div className='grid gap-4 max-w-lg mx-auto pt-4 pb-40'>
      <Breadcrumb label={`${MIRROR_WORKOUTS_LABEL} 結果`} />
      <div className='grid gap-8'>
        <div className='text-2xl font-extrabold'>
          {`${MIRROR_WORKOUTS_LABEL} 結果`}
        </div>
        <div className='grid grid-cols-2 gap-8'>
          <div>
            <span className='font-bold text-lg'>{`正答率 `}</span>
            <span className='font-bold text-5xl'>{`${correctRatio}`}</span>
            <span className='font-bold text-lg'>{`%`}</span>
          </div>
          <div>
            <span className='font-bold text-lg'>{`時間 `}</span>
            <span className='font-bold text-5xl'>
              {(result.totalTime / 1000).toFixed(2)}
            </span>
            <span className='font-bold text-lg'>{`秒`}</span>
          </div>
        </div>
        <div className='grid gap-4 '>
          <div className='grid grid-cols-[24px,1fr,1fr,1fr,40px,48px] items-center gap-2'>
            <div />
            <div />
            <div />
            <div className='text-xs text-center'>你選的</div>
            <div />
            <div className='text-xs text-center'>回答時間</div>
          </div>
          {JSON.parse(result.items).map((items: number[], index: number) => (
            <MirrorWorkoutResultRow
              key={index}
              index={index}
              items={items}
              selectedNumber={result.selectedNumbers[index]}
              lap={result.laps[index]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MirrorWorkoutResultForm;
