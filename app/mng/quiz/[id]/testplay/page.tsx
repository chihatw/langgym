import { fetchArticleById } from '@/features/article/services/server';
import { fetchArticlePitchQuiz } from '@/features/quiz/services/server';

type Props = {
  params: { id: number };
};

const QuizTestPlayPage = async ({ params: { id } }: Props) => {
  const { quiz, sentences, questions } = await fetchArticlePitchQuiz(id);

  if (!quiz) return <></>;
  const article = await fetchArticleById(quiz?.articleId);

  if (!article) return <></>;

  return <div>QuizTestPlayPage</div>;
};

export default QuizTestPlayPage;
