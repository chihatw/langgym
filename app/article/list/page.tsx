import BorderLabel from '@/components/BorderLabel';
import ArticleList from '@/features/article/components/ArticleList';
import { fetchArticlesByUid } from '@/features/article/services/server';
import { getUserFromServerSide } from '@/features/auth/services/server';

type Props = {};

const ArticleListPage = async (props: Props) => {
  const user = await getUserFromServerSide();
  console.log(user?.id);
  // debug use dummy uid
  const articles = await fetchArticlesByUid('dummy');

  return (
    <div className='space-y-4'>
      <BorderLabel label='最近の作文' />
      <ArticleList articles={articles} />
    </div>
  );
};

export default ArticleListPage;
