'use client';
import SubmitServerActionButton from '@/components/SubmitServerActionButton';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Article, Sentence } from '../../article/schema';
import { ArticlePitchQuestion, ArticlePitchQuiz } from '../schema';
import { insertQuiz } from '../services/actions';

type Props = {
  article: Article;
  sentences: Sentence[];
};

const BuildArticlePitchQuizButton = ({ article, sentences }: Props) => {
  const router = useRouter();
  const [errMsg, setErrMsg] = useState('');
  const [isPending, startTransition] = useTransition();
  const action = async () => {
    const quiz: Omit<ArticlePitchQuiz, 'id' | 'created_at' | 'hasAudio'> = {
      articleId: article.id,
      title: article.title,
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
      router.push('/');
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
