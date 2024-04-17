'use client';

import { Article } from '@/features/article/schema';
import { AppUser } from '@/features/user/schema';
import { useOptimistic } from 'react';
import { ArticlePitchQuiz } from '../schema';
import QuizListRow from './QuizListRow';

type Props = {
  users: AppUser[];
  quizzes: ArticlePitchQuiz[];
  articles: Article[];
};

const QuizList = ({ users, quizzes, articles }: Props) => {
  console.log(quizzes);
  const [opti_quizzes, removeQuiz] = useOptimistic<ArticlePitchQuiz[], number>(
    quizzes,
    (state, id) => state.filter((item) => item.id !== id)
  );
  return (
    <div className='grid gap-y-4'>
      <div className='text-2xl font-extrabold'>Quiz List</div>
      <div>
        {opti_quizzes.map((quiz) => {
          const uid = articles.find(
            (article) => article.id === quiz.articleId
          )?.uid;
          const display = users.find((user) => user.uid === uid)?.display || '';
          return (
            <QuizListRow
              key={quiz.id}
              quiz={quiz}
              display={display}
              removeQuiz={removeQuiz}
            />
          );
        })}
      </div>
    </div>
  );
};

export default QuizList;
