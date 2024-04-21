import { fetchArticlesByUid } from '../../services/server';
import ArticleList from './ArticleList';

type Props = { uid: string };

const ArticleListContainer = async ({ uid }: Props) => {
  const articles = await fetchArticlesByUid(uid);
  return <ArticleList articles={articles} />;
};

export default ArticleListContainer;
