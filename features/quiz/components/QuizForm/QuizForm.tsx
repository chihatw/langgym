'use client';
import SubmitServerActionButton from '@/components/SubmitServerActionButton';
import { Input } from '@/components/ui/input';
import { Sentence } from '@/features/article/schema';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { ArticlePitchQuestion, ArticlePitchQuiz } from '../../schema';
import { updateQuiz_Questions } from '../../services/actions';
import QuizFormSentenceRow from './QuizFormSentenceRow';

type Props = {
  sentences: Sentence[];
  quiz: ArticlePitchQuiz;
  questions: ArticlePitchQuestion[];
};

export type QuizFormProps = {
  title: string;
  lockedIndexes: number[][];
  errMsg: string;
};

const INITIAL_STATE: QuizFormProps = {
  title: '',
  lockedIndexes: [],
  errMsg: '',
};

const QuizForm = ({ sentences, quiz, questions }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(INITIAL_STATE);

  useEffect(() => {
    const value: QuizFormProps = {
      title: quiz.title,
      lockedIndexes: questions.map((q) => q.lockedIndexes),
      errMsg: '',
    };
    setValue(value);
  }, [quiz, questions]);

  const action = async () => {
    startTransition(async () => {
      const updateQuestions: ArticlePitchQuestion[] = questions.map(
        (q, index) => ({
          ...q,
          lockedIndexes: value.lockedIndexes[index],
        })
      );

      const errMsg = await updateQuiz_Questions(
        quiz.id,
        value.title,
        updateQuestions,
        value.title !== quiz.title,
        JSON.stringify(value.lockedIndexes) !==
          JSON.stringify(questions.map((q) => q.lockedIndexes))
      );
      if (errMsg) {
        setValue((prev) => ({ ...prev, errMsg }));
      }

      router.push('/mng/quiz/list');
    });
  };

  return (
    <div className='space-y-8'>
      <div className='text-2xl font-extrabold'>Edit Quiz</div>
      <Input
        placeholder='title'
        value={value.title}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, title: e.target.value, errMsg: '' }))
        }
      />
      <div className='space-y-2'>
        {sentences.map((sentence, index) => (
          <QuizFormSentenceRow
            key={index}
            index={index}
            sentence={sentence}
            lockedIndexes={value.lockedIndexes[index]}
            setValue={setValue}
          />
        ))}
      </div>
      <SubmitServerActionButton
        action={action}
        errMsg={value.errMsg}
        isPending={isPending}
        disabled={
          !value.title ||
          isSameValue(
            {
              ...quiz,
              lockedIndexes: questions.map((q) => q.lockedIndexes),
            },
            { ...value }
          )
        }
      >
        Submit
      </SubmitServerActionButton>
    </div>
  );
};

export default QuizForm;

function isSameValue(
  original: Omit<QuizFormProps, 'errMsg'>,
  current: Omit<QuizFormProps, 'errMsg'>
) {
  return (
    original.title === current.title &&
    JSON.stringify(original.lockedIndexes) ===
      JSON.stringify(current.lockedIndexes)
  );
}
