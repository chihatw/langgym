'use client';
import Link from 'next/link';
import { MirrorWorkoutResult } from '../../schema';

type Props = { results: MirrorWorkoutResult[] };

const MirrorWorkoutResultList = ({ results }: Props) => {
  if (!results.length) return null;
  return (
    <div className='grid gap-2'>
      <div className='grid grid-cols-[150px,48px,40px] items-center gap-4'>
        <div></div>
        <div className='text-xs text-center'>時間</div>
        <div className='text-xs text-center'>正答率</div>
      </div>
      {results.map((result) => {
        return (
          <Link
            key={result.id}
            className='grid grid-cols-[150px,48px,40px] items-center gap-4'
            href={`/mirror/${result.uid}/${result.id}`}
          >
            <div className='text-xs'>
              {result.created_at.toLocaleString('zh-TW')}
            </div>
            <div className='text-xs text-end'>
              {`${(result.totalTime / 1000).toFixed(2)}秒`}
            </div>
            <div className='text-xs text-end'>{`${result.correctRatio}%`}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default MirrorWorkoutResultList;
