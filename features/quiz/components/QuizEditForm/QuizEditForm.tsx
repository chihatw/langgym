'use client';
import SubmitServerActionButton from '@/components/SubmitServerActionButton';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { ArticlePitchQuestion, ArticlePitchQuestionView } from '../../schema';
import { updateQuiz_Questions } from '../../services/actions';
import QuizEditFormSentenceRow from './QuizEditFormSentenceRow';

type Props = {
  questions: ArticlePitchQuestionView[];
};

export type QuizEditFormProps = {
  title: string;
  lockedIndexes: number[][];
  errMsg: string;
};

const INITIAL_STATE: QuizEditFormProps = {
  title: '',
  lockedIndexes: [],
  errMsg: '',
};

const QuizEditForm = ({ questions }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(INITIAL_STATE);

  useEffect(() => {
    const value: QuizEditFormProps = {
      title: questions.at(0)!.title!,
      lockedIndexes: questions.map((q) => q.lockedIndexes!),
      errMsg: '',
    };
    setValue(value);
  }, [questions]);

  const action = async () => {
    startTransition(async () => {
      const updateQuestions: Omit<ArticlePitchQuestion, 'created_at'>[] =
        questions.map((q, index) => ({
          id: q.id!,
          line: q.line!,
          quizId: q.quizId!,
          lockedIndexes: value.lockedIndexes[index],
        }));

      const errMsg = await updateQuiz_Questions(
        questions.at(0)!.quizId!,
        value.title,
        updateQuestions,
        value.title !== questions.at(0)!.title!,
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
        {questions.map((question, index) => (
          <QuizEditFormSentenceRow
            key={index}
            index={index}
            question={question}
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
              title: questions.at(0)!.title!,
              lockedIndexes: questions.map((q) => q.lockedIndexes!),
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

export default QuizEditForm;

function isSameValue(
  original: Omit<QuizEditFormProps, 'errMsg'>,
  current: Omit<QuizEditFormProps, 'errMsg'>
) {
  return (
    original.title === current.title &&
    JSON.stringify(original.lockedIndexes) ===
      JSON.stringify(current.lockedIndexes)
  );
}
