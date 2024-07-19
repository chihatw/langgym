'use client';

import SubmitServerActionButton from '@/components/SubmitServerActionButton';
import { buttonVariants } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { BetterReadImagePathView } from '../../schema';
import { deleteBetterread } from '../../services/actions';

type Props = { item: BetterReadImagePathView; removeItem: () => void };

const MngBetterreadListRow = ({ item, removeItem }: Props) => {
  const action = async () => {
    // local
    removeItem();

    // remote
    deleteBetterread(item.betterreadId!);
  };
  return (
    <div className='border-slate-400 border-b grid grid-cols-[auto,1fr,auto] items-center gap-x-2'>
      <div className='text-xs text-slate-500'>{item.display}</div>
      <div>{item.title}</div>
      <div className='flex flex-nowrap'>
        <Link
          href={`/mng/betterread/${item.betterreadId}`}
          className={buttonVariants({ size: 'icon', variant: 'ghost' })}
        >
          <Edit2 />
        </Link>
        <SubmitServerActionButton size='icon' variant={'ghost'} action={action}>
          <Trash2 />
        </SubmitServerActionButton>
      </div>
    </div>
  );
};

export default MngBetterreadListRow;
