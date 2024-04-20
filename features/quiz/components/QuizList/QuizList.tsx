import { ArticlePitchQuizAnswerRowView } from '@/features/answer/schema';
import { ArticlePitchQuizView } from '../../schema';
import QuizListRow from './QuizListRow';

type Props = {
  quizzes: ArticlePitchQuizView[];
  answerRows: ArticlePitchQuizAnswerRowView[];
};

const QuizList = ({ quizzes, answerRows }: Props) => {
  return (
    <div className='grid gap-4'>
      {quizzes.map((quiz, index) => (
        <QuizListRow
          key={index}
          quiz={quiz}
          answerRows={answerRows.filter((item) => item.quizId === quiz.id)}
        />
      ))}
    </div>
  );
};

export default QuizList;
