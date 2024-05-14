'use client';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ArticlePitchQuizAnswerView } from '@/features/answer/schema';
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
  answers: ArticlePitchQuizAnswerView[];
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
  answers,
  removeArticle,
}: Props) => {
  return (
    <div className='border-b border-black/20 px-2 py-1 text-sm grid grid-cols-[1fr,auto] items-center gap-2'>
      <Link href={`/mng/article/${article.id}/edit`}>
        <div className='grid grid-cols-[48px,1fr,auto] gap-2 items-center justify-between'>
          <UserDisplay display={article.display} />
          <ArticleTitle title={article.title} />
          <div className='flex items-center gap-1'>
            <IsArchived article={article} />
            <HasAnswers hasAnswers={!!answers.length} />
            <IsShowAccents article={article} />
            <PDFExists article={article} />
            <UploadAudioExists article={article} />
            <Assinments sentences={sentences} />
          </div>
        </div>
      </Link>
      <div className='flex flex-nowrap items-center gap-2'>
        {article.audioPath ? null : (
          <Link
            href={`/mng/article/${article.id}/upload`}
            className={cn(buttonVariants({ variant: 'ghost' }), 'p-0 ')}
          >
            <UploadCloud className='h-5 w-5' />
          </Link>
        )}
        <Link
          href={`/mng/article/${article.id}/print`}
          className={cn(buttonVariants({ variant: 'ghost' }), 'p-0 ')}
        >
          <Printer className='h-5 w-5' />
        </Link>

        <Link
          href={`/mng/article/${article.id}/sentences`}
          className={cn(buttonVariants({ variant: 'ghost' }), 'p-0 ')}
        >
          <AlignJustify className='h-5 w-5' />
        </Link>
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
    <form action={action}>
      <Button variant={'ghost'} type='submit' className='p-0'>
        <ArchiveRestore className='h-5 w-5' />
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
    <div className='text-xs text-end'>
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

  if (isExists) return <FileCheck className='h-5 w-5' />;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <FileX className='h-3 w-3 ' />
        </TooltipTrigger>
        <TooltipContent>
          <p className='text-xs'>{`"/assets/${article.id}.pdf" is not exists`}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const UploadAudioExists = ({ article }: { article: ArticleView }) => {
  if (!article.audioPath) return null;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Headphones className='h-3 w-3' />
        </TooltipTrigger>
        <TooltipContent>
          <p className='text-xs'>{`article audio file is uploaded`}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const IsArchived = ({ article }: { article: ArticleView }) => {
  if (!article.isArchived) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Archive className='h-3 w-3' />
        </TooltipTrigger>
        <TooltipContent>
          <p className='text-xs'>{`article is arhived`}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const IsShowAccents = ({ article }: { article: ArticleView }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {article.isShowAccents ? (
            <Ear className='h-3 w-3' />
          ) : (
            <EarOff className='h-3 w-3' />
          )}
        </TooltipTrigger>
        <TooltipContent>
          <p className='text-xs'>
            {article.isShowAccents ? 'show accents' : 'hide accents'}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const HasAnswers = ({ hasAnswers }: { hasAnswers: boolean }) => {
  if (!hasAnswers) return null;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <FlagTriangleRight className='w-3 h-3' />
        </TooltipTrigger>
        <TooltipContent>
          <p className='text-xs'>has answers</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
