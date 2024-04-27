import BorderLabel from '@/components/BorderLabel';
import { fetchArticlesByUid } from '../../services/server';
import ArticleList from './ArticleList';

type Props = { uid: string };

const ArticleListContainer = async ({ uid }: Props) => {
  const articles = await fetchArticlesByUid(uid);
  if (!articles.length) return <></>;
  return (
    <div className='grid gap-4'>
      <BorderLabel label='作文' />
      <ArticleList articles={articles} />
    </div>
  );
};

export default ArticleListContainer;
