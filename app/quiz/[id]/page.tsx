import { buttonVariants } from '@/components/ui/button';
import { getUserFromServerSide } from '@/features/auth/services/server';
import QuizForm from '@/features/quiz/components/QuizForm/QuizForm';
import { fetchArticlePitchQuizQuestions } from '@/features/quiz/services/server';
import { cn } from '@/lib/utils';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

type Props = { params: { id: number } };

const QuizPage = async ({ params: { id } }: Props) => {
  const user = await getUserFromServerSide();
  if (!user) return <></>;
  const questions = await fetchArticlePitchQuizQuestions(id);

  return (
    <div className='space-y-4 max-w-lg mx-auto pt-10 pb-40'>
      <div className={'flex items-center text-slate-500 font-extralight'}>
        <Link
          href={'/'}
          className={cn(buttonVariants({ variant: 'ghost' }), 'mx-0 px-0')}
        >
          <Home />
        </Link>
        <ChevronRight />
        <div className='text-xs '>アクセント問題</div>
      </div>
      <QuizForm questions={questions} redirectPath='/answer' />
    </div>
  );
};

export default QuizPage;
