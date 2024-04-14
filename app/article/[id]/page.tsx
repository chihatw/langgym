import ArticlePane from '@/features/article/components/ArticlePane/ArticlePane';
import {
  fetchArticleById,
  fetchArticleMarks,
  fetchSentencesByArticleId,
} from '@/features/article/services/server';

type Props = {
  params: { id: number };
};

const ArticlePage = async ({ params: { id } }: Props) => {
  const article = await fetchArticleById(id);
  if (!article) return <></>;
  const sentences = await fetchSentencesByArticleId(article.id);
  const articleMarks = await fetchArticleMarks(article.id);

  return (
    <ArticlePane
      article={article}
      sentences={sentences}
      articleMarks={articleMarks}
    />
  );
};

export default ArticlePage;
