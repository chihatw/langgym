'use client';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Edit2, FileText, Trash2 } from 'lucide-react';
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
    <div className='border-b border-black/20 px-2 py-1 text-sm grid grid-cols-[auto,1fr,auto,auto] justify-between items-center gap-y-2'>
      <div className='pr-2 text-xs font-extralight text-gray-500'>
        {display}
      </div>
      <Link
        href={'/'} // debug
        className={cn(buttonVariants({ variant: 'ghost' }), 'justify-start')}
      >
        {article.title}
        <FileText className='h-4 w-4 ml-2 opacity-80' />
      </Link>

      <Link
        href={'/'} // debug
        className={buttonVariants({ size: 'icon', variant: 'ghost' })}
      >
        <Edit2 />
      </Link>
      <form action={action}>
        <Button size={'icon'} variant={'ghost'} type='submit'>
          <Trash2 />
        </Button>
      </form>
    </div>
  );
};

export default MngArticleListRow;
