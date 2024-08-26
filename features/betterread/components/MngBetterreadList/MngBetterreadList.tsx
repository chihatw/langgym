'use client';
import { buttonVariants } from '@/components/ui/button';
import { ArticleView } from '@/features/article/schema';
import Link from 'next/link';
import { useOptimistic } from 'react';
import { BetterRead } from '../../schema';
import MngBetterreadListRow from './MngBetterreadListRow';

type Props = { betterreads: BetterRead[]; articles: ArticleView[] };

const MngBetterreadList = ({ betterreads, articles }: Props) => {
  const [opti_betterreads, removeBetterread] = useOptimistic<
    BetterRead[],
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
          const article = articles.find(
            (item) => item.id === betterread.articleId
          );
          if (!article) return null;
          return (
            <MngBetterreadListRow
              key={index}
              article={article}
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
