'use client';
import { Button, buttonVariants } from '@/components/ui/button';

import TooltipWrapper from '@/components/TooltipWrapper';
import { cn } from '@/lib/utils';
import {
  AlignJustify,
  Archive,
  ArchiveRestore,
  Ear,
  EarOff,
  FileCheck,
  FileX,
  FlagTriangleRight,
  Headphones,
  Printer,
  Trash2,
  UploadCloud,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useOptimistic, useState } from 'react';
import { ArticleView, SentenceView } from '../../schema';
import { deleteArticle, updateArticleIsArchived } from '../../services/actions';

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

const MngArticleListRow = ({
  article,
  sentences,

  removeArticle,
}: Props) => {
  return (
    <div className='border-b border-black/20 px-2 py-1 text-sm grid grid-cols-[1fr_auto] items-center gap-2'>
      <Link href={`/mng/article/${article.id}/edit`}>
        <div className='grid grid-cols-[48px_1fr_auto] gap-2 items-center justify-between'>
          <UserDisplay display={article.display} />
          <ArticleTitle title={article.title} />
          <div className='flex items-center gap-1'>
            <IsArchived article={article} />
            <IsShowAccents article={article} />
            <PDFExists article={article} />
            <UploadAudioExists article={article} />
            <Assinments sentences={sentences} />
          </div>
        </div>
      </Link>
      <div className='flex flex-nowrap items-center gap-2'>
        {article.audioPath ? null : (
          <TooltipWrapper label='move to upload audio file page'>
            <Link
              href={`/mng/article/${article.id}/upload`}
              className={cn(buttonVariants({ variant: 'ghost' }), 'p-0 ')}
            >
              <UploadCloud className='h-5 w-5' />
            </Link>
          </TooltipWrapper>
        )}
        <TooltipWrapper label='show pitch lines'>
          <Link
            href={`/mng/article/${article.id}/print`}
            className={cn(buttonVariants({ variant: 'ghost' }), 'p-0 ')}
          >
            <Printer className='h-5 w-5' />
          </Link>
        </TooltipWrapper>
        <TooltipWrapper label='move to sentences batch input page'>
          <Link
            href={`/mng/article/${article.id}/sentences`}
            className={cn(buttonVariants({ variant: 'ghost' }), 'p-0 ')}
          >
            <AlignJustify className='h-5 w-5' />
          </Link>
        </TooltipWrapper>

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

const ArchiveToggle = ({ article }: { article: ArticleView }) => {
  const [optValue, setOptValue] = useOptimistic<boolean, boolean>(
    article.isArchived!,
    (_, newValue) => newValue
  );

  const action = async () => {
    setOptValue(!optValue);
    updateArticleIsArchived(article.id!, !optValue);
  };

  if (optValue) return <div className='w-5' />;

  return (
    <TooltipWrapper label='archive this article'>
      <form action={action}>
        <Button variant={'ghost'} type='submit' className='p-0'>
          <ArchiveRestore className='h-5 w-5' />
        </Button>
      </form>
    </TooltipWrapper>
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
    <TooltipWrapper label='delete this article'>
      <form action={action}>
        <Button variant={'ghost'} type='submit' className='p-0'>
          <Trash2 className='h-5 w-5' />
        </Button>
      </form>
    </TooltipWrapper>
  );
};

const UserDisplay = ({ display }: { display: string | null }) => {
  return (
    <div className='pr-2 text-xs  text-gray-500 whitespace-nowrap overflow-hidden'>
      {display}
    </div>
  );
};

const ArticleTitle = ({ title }: { title: string | null }) => {
  return <div className='overflow-hidden whitespace-nowrap'>{title}</div>;
};

const Assinments = ({ sentences }: { sentences: SentenceView[] }) => {
  return (
    <div className='text-xs text-end font-mono'>
      <span>
        {sentences.filter((s) => s.articleRecordedAssignmentId).length}
      </span>
      /<span>{sentences.length}</span>
    </div>
  );
};

const PDFExists = ({ article }: { article: ArticleView }) => {
  const [isExists, setIsExists] = useState(false);
  useEffect(() => {
    const path = `/assets/${article.id}.pdf`;

    (async () => {
      const response = await fetch(path);
      const isExistsFile = response.status === 200;
      setIsExists(isExistsFile);
    })();
  }, [article]);

  if (isExists)
    return (
      <TooltipWrapper label={`"/assets/${article.id}.pdf" IS exists`}>
        <FileCheck className='h-3 w-3 text-amber-500' />
      </TooltipWrapper>
    );

  return (
    <TooltipWrapper label={`"/assets/${article.id}.pdf" IS NOT exists`}>
      <FileX className='h-3 w-3 ' />
    </TooltipWrapper>
  );
};

const UploadAudioExists = ({ article }: { article: ArticleView }) => {
  if (!article.audioPath) return null;
  return (
    <TooltipWrapper label={`article audio file is uploaded`}>
      <Headphones className='h-3 w-3' />
    </TooltipWrapper>
  );
};

const IsArchived = ({ article }: { article: ArticleView }) => {
  if (!article.isArchived) return null;

  return (
    <TooltipWrapper label={`article is arhived`}>
      <Archive className='h-3 w-3' />
    </TooltipWrapper>
  );
};

const IsShowAccents = ({ article }: { article: ArticleView }) => {
  if (article.isShowAccents) {
    return (
      <TooltipWrapper label={'accents visible'}>
        <Ear className='h-3 w-3' />
      </TooltipWrapper>
    );
  }
  return (
    <TooltipWrapper label={'accents hidden'}>
      <EarOff className='h-3 w-3' />
    </TooltipWrapper>
  );
};

const HasAnswers = ({ hasAnswers }: { hasAnswers: boolean }) => {
  if (!hasAnswers) return null;
  return (
    <TooltipWrapper label={'has pitch quiz answers'}>
      <FlagTriangleRight className='w-3 h-3' />
    </TooltipWrapper>
  );
};
