import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { WORKOUT_FIRST_ITEMS, WORKOUT_LABELS } from '../../constants';
import { WorkoutFirstAudioPath } from '../../schema';

type Props = {
  audioPaths: WorkoutFirstAudioPath[];
};

const WorkoutFirstTopRow = ({ audioPaths }: Props) => {
  return (
    <div className='rounded bg-white/60 grid p-5'>
      <Link href={`/`} className={cn(buttonVariants({ variant: 'link' }))}>
        <div className='flex gap-1 items-center justify-center'>
          <div className='font-extrabold text-2xl text-slate-700  '>
            {WORKOUT_LABELS.at(0)}
          </div>
          {audioPaths.length === WORKOUT_FIRST_ITEMS.length ? (
            <Check className=' text-teal-600' />
          ) : null}
        </div>
      </Link>
      {audioPaths.length ? (
        <div className='text-xs text-slate-500 text-end'>{`${audioPaths.length}/${WORKOUT_FIRST_ITEMS.length}`}</div>
      ) : null}
    </div>
  );
};

export default WorkoutFirstTopRow;
