import Breadcrumb from '@/components/Breadcrumb';
import HiddenElements from '@/components/ui/HiddenElements';
import { getUserFromServerSide } from '@/features/auth/services/server';
import { MIRROR_WORKOUTS_LABEL } from '@/features/mirror/constants';
import { fetchMirrorWorkoutResultById } from '@/features/mirror/services/server';
import { cn } from '@/lib/utils';
import { Lato } from 'next/font/google';

type Props = { params: { resultId: string } };

const lato = Lato({ subsets: ['latin'], weight: '900' });

const MirrorWorkoutResultPage = async ({ params: { resultId } }: Props) => {
  const user = await getUserFromServerSide();
  if (!user) return null;

  const result = await fetchMirrorWorkoutResultById(parseInt(resultId));

  if (!result) return null;

  const correctAnswers = result.selectedNumbers.filter((number, index) => {
    const items: number[] = JSON.parse(result.items)[index];
    return number === Math.max(...items);
  });

  const correctRatio = Math.round(
    (correctAnswers.length / result.selectedNumbers.length) * 100
  );

  return (
    <>
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
            <div className='grid grid-cols-[24px,1fr,1fr,1fr,1fr] items-center gap-2'>
              <div />
              <div />
              <div />
              <div className='text-xs text-center'>你選的</div>
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
      <HiddenElements uid={user.id} />
    </>
  );
};

export default MirrorWorkoutResultPage;

const MirrorWorkoutResultRow = ({
  index,
  items,
  selectedNumber,
  lap,
}: {
  index: number;
  items: number[];
  selectedNumber: number;
  lap: number;
}) => {
  const isCorrect = Math.max(...items) === selectedNumber;
  return (
    <div className='grid grid-cols-[24px,1fr,1fr,1fr,1fr] items-center gap-2'>
      <div className='text-xs'>{index + 1}</div>

      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            lato.className,
            'p-4 rounded bg-white text-center scale-x-[-1] text-2xl'
          )}
        >
          {item}
        </div>
      ))}
      <div
        key={index}
        className={cn(
          lato.className,
          isCorrect ? 'bg-green-100' : 'bg-red-100',
          'p-4 rounded  text-center scale-x-[-1] text-2xl'
        )}
      >
        {selectedNumber}
      </div>
      <div className='text-center'>{`${(lap / 1000).toFixed(2)}秒`}</div>
    </div>
  );
};
