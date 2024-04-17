'use client';
import SubmitServerActionButton from '@/components/SubmitServerActionButton';
import { buttonVariants } from '@/components/ui/button';
import { Edit2, ScrollText, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { ArticlePitchQuiz } from '../../schema';
import { deleteQuiz } from '../../services/actions';
import HasAudioToggle from './HasAudioToggle';
import IsDevToggle from './IsDevToggle';

type Props = {
  quiz: ArticlePitchQuiz;
  display: string;
  removeQuiz: (action: number) => void;
};

const QuizListRow = ({ quiz, display, removeQuiz }: Props) => {
  const action = async () => {
    // local
    removeQuiz(quiz.id);
    // remote
    deleteQuiz(quiz.id);
  };

  return (
    <div className='border-slate-400 border-b grid grid-cols-[auto,1fr,auto] items-center gap-x-2'>
      <div>{display}</div>
      <div>{quiz.title}</div>
      <div className='flex flex-nowrap'>
        <Link
          href={`/mng/quiz/${quiz.id}/edit`}
          className={buttonVariants({ size: 'icon', variant: 'ghost' })}
        >
          <Edit2 />
        </Link>
        <IsDevToggle isDev={quiz.isDev} quizId={quiz.id} />
        <HasAudioToggle hasAudio={quiz.hasAudio} quizId={quiz.id} />
        {/* todo test */}
        <Link
          href={`/mng/quiz/${quiz.id}/testplay`}
          className={buttonVariants({ size: 'icon', variant: 'ghost' })}
        >
          <ScrollText />
        </Link>
        <SubmitServerActionButton size='icon' variant={'ghost'} action={action}>
          <Trash2 />
        </SubmitServerActionButton>
      </div>
    </div>
  );
};

export default QuizListRow;
