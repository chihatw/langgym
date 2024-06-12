'use client';

import { cn } from '@/lib/utils';
import { MirrorWorkoutResult } from '../../schema';
import { getResultDates, getThisWeek } from '../../services/utils';

type Props = {
  results: MirrorWorkoutResult[];
};

const XINQI = ['日', '一', '二', '三', '四', '五', '六'];

const MirrorWorkoutResultCallender = ({ results }: Props) => {
  const resultDates = getResultDates(results);
  const dates = getThisWeek(new Date());
  return (
    <div className='grid grid-cols-7 mx-4 border-l border-slate-300'>
      {dates.map((date, index) => {
        return (
          <div
            key={index}
            className={cn('border-r border-b border-t border-slate-300')}
          >
            <div className='text-center text-xs py-1 border-b border-slate-300 font-bold h-[25px]'>
              {date.getDate()}
            </div>
            <div
              className={cn(
                'text-center text-xs py-1 font-bold h-[25px] border-b border-slate-300',
                date.getDay() === 6 ? 'text-blue-500' : '',
                date.getDay() === 0 ? 'text-red-500' : ''
              )}
            >
              {XINQI[date.getDay()]}
            </div>
            <div className='h-[25px] text-center leading-[25px]'>
              {resultDates.includes(date.getDate()) ? (
                <span>💪</span>
              ) : (
                <span className='opacity-50'>😴</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MirrorWorkoutResultCallender;
