'use client';

import { useOptimistic } from 'react';
import {
  ArticlePitchQuizAnswerRowView,
  ArticlePitchQuizAnswerView,
} from '../schema';
import AnswerListRow from './AnswerListRow';

type Props = {
  answers: ArticlePitchQuizAnswerView[];
  answerRows: ArticlePitchQuizAnswerRowView[];
};

const AnswerList = ({ answers, answerRows }: Props) => {
  const [opti_answers, removeAnswer] = useOptimistic<
    ArticlePitchQuizAnswerView[],
    number
  >(answers, (state, id) => state.filter((item) => item.id !== id));
  return (
    <div className='grid gap-y-4'>
      <div className='text-2xl font-extrabold'>Answer List</div>
      <div>
        {opti_answers.map((answer) => (
          <AnswerListRow
            key={answer.id}
            answer={answer}
            removeAnswer={removeAnswer}
            answerRows={answerRows.filter(
              (item) => item.answerId === answer.id
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default AnswerList;
