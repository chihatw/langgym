import ArticlePane from '@/features/article/components/ArticlePane/ArticlePane';
import {
  fetchArticleById,
  fetchArticleMarks,
  fetchArticleRecordedAssignments,
  fetchSentencesByArticleId,
} from '@/features/article/services/server';
import { getUserFromServerSide } from '@/features/auth/services/server';

type Props = {
  params: { id: number };
};

const ArticlePage = async ({ params: { id } }: Props) => {
  const user = await getUserFromServerSide();
  if (!user) return <></>;

  const article = await fetchArticleById(id);

  if (!article || article.uid !== user.id) return <></>;

  const sentences = await fetchSentencesByArticleId(article.id);
  const articleMarks = await fetchArticleMarks(article.id);
  const articleRecordedAssignments = await fetchArticleRecordedAssignments(
    article.id
  );

  return (
    <div className='space-y-4 max-w-lg mx-auto pt-10 pb-40'>
      <ArticlePane
        article={article}
        sentences={sentences}
        articleMarks={articleMarks}
        articleRecordedAssignments={articleRecordedAssignments}
      />
    </div>
  );
};

export default ArticlePage;
