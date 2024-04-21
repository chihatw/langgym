'use client';

import { useOptimistic } from 'react';
import { ArticlePitchQuizView } from '../../schema';
import MngQuizListRow from './MngQuizListRow';

type Props = {
  quizzes: ArticlePitchQuizView[];
};

const MngQuizList = ({ quizzes }: Props) => {
  const [opti_quizzes, removeQuiz] = useOptimistic<
    ArticlePitchQuizView[],
    number
  >(quizzes, (state, id) => state.filter((item) => item.id !== id));
  return (
    <div className='grid gap-y-4'>
      <div className='text-2xl font-extrabold'>Quiz List</div>
      <div>
        {opti_quizzes.map((quiz) => {
          return (
            <MngQuizListRow key={quiz.id} quiz={quiz} removeQuiz={removeQuiz} />
          );
        })}
      </div>
    </div>
  );
};

export default MngQuizList;
