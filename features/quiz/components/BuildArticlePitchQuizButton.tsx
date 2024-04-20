'use client';
import SubmitServerActionButton from '@/components/SubmitServerActionButton';
import { useRouter } from 'next/navigation';
import { useMemo, useState, useTransition } from 'react';
import { SentenceView } from '../../article/schema';
import { ArticlePitchQuestion, ArticlePitchQuiz } from '../schema';
import { insertQuiz } from '../services/actions';

type Props = {
  sentences: SentenceView[];
};

const BuildArticlePitchQuizButton = ({ sentences }: Props) => {
  const router = useRouter();
  const [errMsg, setErrMsg] = useState('');
  const [isPending, startTransition] = useTransition();

  const sentence = useMemo(() => sentences.at(0), [sentences]);

  const action = async () => {
    if (!sentence) return;
    const { articleId, title } = sentence;
    if (!articleId || !title) return;

    const quiz: Omit<
      ArticlePitchQuiz,
      'id' | 'created_at' | 'hasAudio' | 'isDev'
    > = {
      articleId,
      title: `${title} - アクセント`,
    };
    const questions: Omit<
      ArticlePitchQuestion,
      'id' | 'created_at' | 'quizId'
    >[] = sentences.map((_, index) => ({
      line: index,
      lockedIndexes: [],
    }));
    startTransition(async () => {
      const errMsg = await insertQuiz(quiz, questions);
      if (errMsg) {
        setErrMsg(errMsg);
        return;
      }
      router.push('/mng/quiz/list');
    });
  };

  return (
    <SubmitServerActionButton
      isPending={isPending}
      action={action}
      disabled={!sentences.length}
      errMsg={errMsg}
    >
      Create Pitch Quiz
    </SubmitServerActionButton>
  );
};

export default BuildArticlePitchQuizButton;
