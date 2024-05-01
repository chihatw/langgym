'use client';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  AlignJustify,
  Edit2,
  Eye,
  EyeOff,
  FileVolume,
  Printer,
  Trash2,
  UploadCloud,
} from 'lucide-react';
import Link from 'next/link';
import { useOptimistic } from 'react';
import { ArticleView } from '../../schema';
import {
  deleteArticle,
  updateArticleIsShowAccents,
} from '../../services/actions';

type Props = {
  article: ArticleView;
  removeArticle: (id: number) => void;
};

const MngArticleListRow = ({ article, removeArticle }: Props) => {
  return (
    <div className='border-b border-black/20 px-2 py-1 text-sm grid grid-cols-[60px,1fr,auto] justify-between items-center gap-y-2'>
      <div className='pr-2 text-xs  text-gray-500 whitespace-nowrap overflow-hidden'>
        {article.display}
      </div>
      <div className='overflow-hidden whitespace-nowrap'>{article.title}</div>
      <div className='flex flex-nowrap'>
        <Link
          href={`/mng/article/${article.id}/edit`}
          className={buttonVariants({ size: 'icon', variant: 'ghost' })}
        >
          <Edit2 className='h-5 w-5' />
        </Link>
        <Link
          href={`/mng/article/${article.id}/sentences`}
          className={buttonVariants({ size: 'icon', variant: 'ghost' })}
        >
          <AlignJustify className='h-5 w-5' />
        </Link>
        <Link
          href={`/mng/article/${article.id}/upload`}
          className={buttonVariants({ size: 'icon', variant: 'ghost' })}
        >
          {article.audioPath ? (
            <FileVolume className='h-5 w-5' />
          ) : (
            <UploadCloud className='h-5 w-5' />
          )}
        </Link>
        <Link
          href={`/mng/article/${article.id}/print`}
          className={buttonVariants({ size: 'icon', variant: 'ghost' })}
        >
          <Printer className='h-5 w-5' />
        </Link>
        <ShowAccentsToggle article={article} />
        <RemoveArticleButton
          articleId={article.id!}
          removeArticle={removeArticle}
        />
      </div>
    </div>
  );
};

export default MngArticleListRow;

const ShowAccentsToggle = ({ article }: { article: ArticleView }) => {
  const [optValue, setOptValue] = useOptimistic<boolean, boolean>(
    article.isShowAccents!,
    (_, newValue) => newValue
  );

  const action = async () => {
    setOptValue(!optValue);
    updateArticleIsShowAccents(article.id!, !optValue);
  };
  return (
    <form action={action}>
      <Button size={'icon'} variant={'ghost'} type='submit'>
        {optValue ? (
          <Eye className='h-5 w-5' />
        ) : (
          <EyeOff className='h-5 w-5' />
        )}
      </Button>
    </form>
  );
};

const RemoveArticleButton = ({
  articleId,
  removeArticle,
}: {
  articleId: number;
  removeArticle: (value: number) => void;
}) => {
  const action = () => {
    // local
    removeArticle(articleId);

    // remote
    deleteArticle(articleId);
  };
  return (
    <form action={action}>
      <Button size={'icon'} variant={'ghost'} type='submit'>
        <Trash2 className='h-5 w-5' />
      </Button>
    </form>
  );
};
