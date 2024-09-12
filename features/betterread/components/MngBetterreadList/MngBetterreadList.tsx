'use client';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { useOptimistic } from 'react';
import { BetterReadView } from '../../schema';
import MngBetterreadListRow from './MngBetterreadListRow';

type Props = { betterreads: BetterReadView[] };

const MngBetterreadList = ({ betterreads }: Props) => {
  const [opti_betterreads, removeBetterread] = useOptimistic<
    BetterReadView[],
    number
  >(betterreads, (state, id) => state.filter((item) => item.id !== id));
  return (
    <div className='grid gap-y-4'>
      <div className='text-2xl font-extrabold'>Betterread List</div>
      <div>
        <Link href={'/mng/betterread'} className={buttonVariants()}>
          Create New Item
        </Link>
      </div>
      <div className='grid'>
        {opti_betterreads.map((betterread, index) => {
          return (
            <MngBetterreadListRow
              key={index}
              betterread={betterread}
              removeBetterread={() => removeBetterread(betterread.id!)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MngBetterreadList;
