import { Button, buttonVariants } from '@/components/ui/button';
import { Edit2, Trash2, Volume2 } from 'lucide-react';
import Link from 'next/link';
import { ArticlePitchQuiz } from '../schema';

type Props = {
  quiz: ArticlePitchQuiz;
  display: string;
  removeQuiz: (action: number) => void;
};

const QuizListRow = ({ quiz, display, removeQuiz }: Props) => {
  return (
    <div className='border-slate-400 border-b grid grid-cols-[auto,1fr,auto] items-center gap-x-2'>
      <div>{display}</div>
      <div>{quiz.title}</div>
      <div className='flex flex-nowrap'>
        <Link
          href={``}
          className={buttonVariants({ size: 'icon', variant: 'ghost' })}
        >
          <Edit2 />
        </Link>
        <Button size='icon' variant={'ghost'}>
          <Volume2 />
        </Button>
        <Button size='icon' variant={'ghost'}>
          <Trash2 />
        </Button>
      </div>
    </div>
  );
};

export default QuizListRow;
