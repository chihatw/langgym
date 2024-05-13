'use client';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  AlignJustify,
  Archive,
  Edit2,
  Eye,
  EyeOff,
  FileCheck,
  FileVolume,
  FileX,
  Printer,
  Trash2,
  UploadCloud,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useOptimistic, useState } from 'react';
import { ArticleView, SentenceView } from '../../schema';
import {
  deleteArticle,
  updateArticleIsArchived,
  updateArticleIsShowAccents,
} from '../../services/actions';

type Props = {
  article: ArticleView;
  sentences: SentenceView[];
  removeArticle: (id: number) => void;
};

type FormProps = {
  isExistsFile: boolean;
};

const INITIAL_STATE: FormProps = {
  isExistsFile: false,
};

const MngArticleListRow = ({ article, sentences, removeArticle }: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  useEffect(() => {
    const path = `/assets/${article.id}.pdf`;

    (async () => {
      const response = await fetch(path);

      const isExistsFile = response.status === 200;

      setValue((prev) => ({ ...prev, isExistsFile }));
    })();
  }, [article]);

  return (
    <div className='border-b border-black/20 px-2 py-1 text-sm grid grid-cols-[60px,1fr,auto] justify-between items-center gap-y-2'>
      <div className='pr-2 text-xs  text-gray-500 whitespace-nowrap overflow-hidden'>
        {article.display}
      </div>
      <div className='flex items-center justify-between pr-2'>
        <div className='overflow-hidden whitespace-nowrap'>{article.title}</div>
        <div className='text-xs'>
          <span>
            {sentences.filter((s) => s.articleRecordedAssignmentId).length}
          </span>
          /<span>{sentences.length}</span>
        </div>
      </div>
      <div className='flex flex-nowrap items-center gap-2'>
        {value.isExistsFile ? (
          <FileCheck className='h-5 w-5' />
        ) : (
          <FileX className='h-5 w-5 text-red-500' />
        )}
        <Link
          href={`/mng/article/${article.id}/edit`}
          className={cn(buttonVariants({ variant: 'ghost' }), 'p-0 ')}
        >
          <Edit2 className='h-5 w-5' />
        </Link>
        <Link
          href={`/mng/article/${article.id}/sentences`}
          className={cn(buttonVariants({ variant: 'ghost' }), 'p-0 ')}
        >
          <AlignJustify className='h-5 w-5' />
        </Link>
        <Link
          href={`/mng/article/${article.id}/upload`}
          className={cn(buttonVariants({ variant: 'ghost' }), 'p-0 ')}
        >
          {article.audioPath ? (
            <FileVolume className='h-5 w-5' />
          ) : (
            <UploadCloud className='h-5 w-5' />
          )}
        </Link>
        <Link
          href={`/mng/article/${article.id}/print`}
          className={cn(buttonVariants({ variant: 'ghost' }), 'p-0 ')}
        >
          <Printer className='h-5 w-5' />
        </Link>
        <ShowAccentsToggle article={article} />
        <ArchiveToggle article={article} />
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
      <Button variant={'ghost'} type='submit' className='p-0'>
        {optValue ? (
          <Eye className='h-5 w-5' />
        ) : (
          <EyeOff className='h-5 w-5' />
        )}
      </Button>
    </form>
  );
};

const ArchiveToggle = ({ article }: { article: ArticleView }) => {
  const [optValue, setOptValue] = useOptimistic<boolean, boolean>(
    article.isArchived!,
    (_, newValue) => newValue
  );

  const action = async () => {
    setOptValue(!optValue);
    updateArticleIsArchived(article.id!, !optValue);
  };

  return (
    <form action={action}>
      <Button variant={'ghost'} type='submit' className='p-0'>
        {optValue ? (
          <Archive className='h-5 w-5' />
        ) : (
          <Archive className='h-5 w-5 text-transparent' />
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
      <Button variant={'ghost'} type='submit' className='p-0'>
        <Trash2 className='h-5 w-5' />
      </Button>
    </form>
  );
};
