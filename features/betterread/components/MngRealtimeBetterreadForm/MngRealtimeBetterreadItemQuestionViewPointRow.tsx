'use client';

import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { useMemo } from 'react';
import { BetterReadItemView } from '../../schema';
import { updateBetterreadToggleViewPoints } from '../../services/actions';

type Props = {
  view_points: number[];
  betterreadItem: BetterReadItemView;
  handleUpdateToggleViewPoints: (view_points: number[]) => void;
};

const MngRealtimeBetterreadItemQuestionViewPointRow = ({
  view_points,
  betterreadItem,
  handleUpdateToggleViewPoints,
}: Props) => {
  const show = useMemo(
    () => view_points.includes(betterreadItem.question_id!),
    [view_points, betterreadItem.question_id]
  );
  const action = async () => {
    if (!betterreadItem.question_id) return;

    let cloned: number[] = [...view_points];

    if (cloned.includes(betterreadItem.question_id)) {
      cloned = cloned.filter((item) => item !== betterreadItem.question_id!);
    } else {
      cloned.push(betterreadItem.question_id);
    }
    // remote
    updateBetterreadToggleViewPoints(cloned);

    // local
    handleUpdateToggleViewPoints(cloned);
  };
  return (
    <div className='grid grid-cols-[auto,auto,1fr] gap-2 items-center'>
      <form action={action}>
        <Button
          size={'icon'}
          variant={'ghost'}
          className='w-5 h-5'
          type='submit'
        >
          {show ? <Eye /> : <EyeOff />}
        </Button>
      </form>
      <div>👀</div>
      <div className={show ? 'text-gray-700' : 'text-gray-400'}>
        {betterreadItem.view_point}
      </div>
    </div>
  );
};

export default MngRealtimeBetterreadItemQuestionViewPointRow;
