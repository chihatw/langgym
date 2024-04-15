import ArticlePane from '@/features/article/components/ArticlePane/ArticlePane';
import {
  fetchArticleById_Uid,
  fetchArticleMarks,
  fetchSentencesByArticleId,
} from '@/features/article/services/server';
import { getUserFromServerSide } from '@/features/auth/services/server';

type Props = {
  params: { id: number };
};

const ArticlePage = async ({ params: { id } }: Props) => {
  const user = await getUserFromServerSide();
  if (!user) return <></>;

  const article = await fetchArticleById_Uid(id, user.id);
  if (!article) return <></>;

  const sentences = await fetchSentencesByArticleId(article.id);
  const articleMarks = await fetchArticleMarks(article.id);

  return (
    <div className='space-y-4 max-w-lg mx-auto pt-10 pb-40'>
      <ArticlePane
        article={article}
        sentences={sentences}
        articleMarks={articleMarks}
      />
    </div>
  );
};

export default ArticlePage;
