import { buttonVariants } from '@/components/ui/button';
import QuizListAnswerRow from '@/features/answer/components/QuizListAnswerRow';
import { ArticlePitchQuizAnswerRowView } from '@/features/answer/schema';
import { cn } from '@/lib/utils';
import { FileDown } from 'lucide-react';
import Link from 'next/link';
import { ArticlePitchQuizView } from '../../schema';

type Props = {
  quiz: ArticlePitchQuizView;
  answerRows: ArticlePitchQuizAnswerRowView[];
};

const QuizListRow = ({ quiz, answerRows }: Props) => {
  // 回答がある場合✅を表示

  const answers = Array.from(new Set(answerRows.map((item) => item.answerId)))
    .map((id) => ({
      id,
      created_at: answerRows.find((item) => item.answerId === id)!.created_at,
    }))
    .sort((a, b) => b.created_at!.getTime() - a.created_at!.getTime());

  return (
    <div className='p-5 bg-white/60 rounded-lg'>
      <Link href={`/quiz/${quiz.id}`} className='hover:cursor-pointer'>
        <div>{quiz.title}</div>
      </Link>
      {!!answers.length ? (
        <div className='grid gap-2'>
          <div className='grid gap-1'>
            {answers.map((answer) => (
              <QuizListAnswerRow
                key={answer.id!}
                answer={answer}
                answerRows={answerRows.filter(
                  (item) => item.answerId === answer.id
                )}
              />
            ))}
          </div>
          <a
            href={`/assets/${quiz.articleId}.pdf`}
            download={`${quiz.articleId}.pdf`}
            className={cn(
              buttonVariants(),
              'flex gap-2 items-center cursor-pointer'
            )}
          >
            <span>アクセント.pdf</span>
            <FileDown className='h-4 w-4' />
          </a>
        </div>
      ) : null}
    </div>
  );
};

export default QuizListRow;
