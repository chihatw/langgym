import { Button, buttonVariants } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Article } from '../schema';

type Props = {
  article: Article;
};

const MngArticleListRow = ({ article }: Props) => {
  return (
    <div className='border-b border-black/20 px-2 py-1 text-sm grid grid-cols-[1fr,auto,auto] justify-between items-center gap-y-2'>
      <div>{article.title}</div>

      <Link
        href={'/'}
        className={buttonVariants({ size: 'icon', variant: 'ghost' })}
      >
        <Edit2 />
      </Link>
      <form>
        <Button size={'icon'} variant={'ghost'} type='submit'>
          <Trash2 />
        </Button>
      </form>
    </div>
  );
};

export default MngArticleListRow;
