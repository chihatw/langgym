import { cn } from '@/lib/utils';
import { MirrorWorkoutResult } from '../../schema';
import { getResultDates } from '../../services/utils';

type Props = {
  results: MirrorWorkoutResult[];
};

const DATES = [7, 8, 9, 10, 11, 12];

const XINQI = ['五', '六', '日', '一', '二', '三'];

const MirrorWorkoutResultCallender = ({ results }: Props) => {
  const resultDates = getResultDates(results);
  return (
    <div className='grid grid-cols-7 mx-4'>
      <div className='border border-slate-300'>
        <div className='h-[25px] border-b border-slate-300' />
        <div className='h-[25px] border-b border-slate-300' />
        <div className='h-[25px]  text-center text-xs py-1 text-slate-500'>
          狀態
        </div>
      </div>
      {DATES.map((date, index) => {
        return (
          <div
            key={index}
            className={cn('border-r border-b border-t border-slate-300')}
          >
            <div className='text-center text-xs py-1 border-b border-slate-300 font-bold h-[25px]'>
              {date}
            </div>
            <div
              className={cn(
                'text-center text-xs py-1 font-bold h-[25px] border-b border-slate-300',
                XINQI[index] === '六' ? 'text-blue-500' : '',
                XINQI[index] === '日' ? 'text-red-500' : ''
              )}
            >
              {XINQI[index]}
            </div>
            <div className='h-[25px] text-center leading-[25px]'>
              {resultDates.includes(date) ? (
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
