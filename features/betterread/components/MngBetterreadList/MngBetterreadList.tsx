'use client';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { useOptimistic } from 'react';
import { BetterReadImagePathView } from '../../schema';
import MngBetterreadListRow from './MngBetterreadListRow';

type Props = { items: BetterReadImagePathView[] };

const MngBetterreadList = ({ items }: Props) => {
  const [opti_items, removeItem] = useOptimistic<
    BetterReadImagePathView[],
    number
  >(items, (state, id) => state.filter((item) => item.betterreadId !== id));
  return (
    <div className='grid gap-y-4'>
      <div className='text-2xl font-extrabold'>Betterread List</div>
      <div>
        <Link href={'/mng/betterread'} className={buttonVariants()}>
          Create New Item
        </Link>
      </div>
      <div className='grid'>
        {opti_items.map((item, index) => (
          <MngBetterreadListRow
            key={index}
            item={item}
            removeItem={() => removeItem(item.betterreadId!)}
          />
        ))}
      </div>
    </div>
  );
};

export default MngBetterreadList;
