'use client';
import { Button, buttonVariants } from '@/components/ui/button';
import { AlignJustify, Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Article } from '../schema';
import { deleteArticle } from '../services/actions';

type Props = {
  display: string;
  article: Article;
  removeArticle: (id: number) => void;
};

const MngArticleListRow = ({ article, removeArticle, display }: Props) => {
  const action = () => {
    removeArticle(article.id);
    deleteArticle(article.id);
  };
  return (
    <div className='border-b border-black/20 px-2 py-1 text-sm grid grid-cols-[auto,1fr,auto] justify-between items-center gap-y-2'>
      <div className='pr-2 text-xs font-extralight text-gray-500'>
        {display}
      </div>
      <div>{article.title}</div>
      <div className='flex flex-nowrap'>
        <Link
          href={`/mng/article/${article.id}/edit`}
          className={buttonVariants({ size: 'icon', variant: 'ghost' })}
        >
          <Edit2 />
        </Link>
        <Link
          href={`/mng/article/${article.id}/batchInput`}
          className={buttonVariants({ size: 'icon', variant: 'ghost' })}
        >
          <AlignJustify />
        </Link>

        <form action={action}>
          <Button size={'icon'} variant={'ghost'} type='submit'>
            <Trash2 />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default MngArticleListRow;
