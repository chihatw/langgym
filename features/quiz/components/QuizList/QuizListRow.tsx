import QuizListAnswerRow from '@/features/answer/components/QuizListAnswerRow';
import { ArticlePitchQuizAnswerRowView } from '@/features/answer/schema';
import { Check } from 'lucide-react';
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
      <Link
        href={`/quiz/${quiz.id}`}
        className='flex gap-1 items-center hover:cursor-pointer'
      >
        <div>{quiz.title}</div>
        {!!answerRows.length ? <Check className='text-[#52a2aa]' /> : null}
      </Link>
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
    </div>
  );
};

export default QuizListRow;
