import {
  fetchArticleById,
  fetchArticleMarks,
} from '@/features/article/services/server';
import QuizForm from '@/features/quiz/components/QuizForm/QuizForm';
import { fetchArticlePitchQuiz } from '@/features/quiz/services/server';

type Props = {
  params: { id: number };
};

const QuizTestPlayPage = async ({ params: { id } }: Props) => {
  const { quiz, sentences, questions } = await fetchArticlePitchQuiz(id);

  if (!quiz) return <></>;
  const article = await fetchArticleById(quiz?.articleId);

  if (!article) return <></>;
  const articleMarks = await fetchArticleMarks(article.id);

  return (
    <QuizForm
      quiz={quiz}
      article={article}
      questions={questions}
      sentences={sentences}
      articleMarks={articleMarks}
    />
  );
};

export default QuizTestPlayPage;
