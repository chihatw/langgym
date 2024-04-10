import BorderLabel from '@/components/BorderLabel';
import ArticleList from '@/features/article/components/ArticleList';
import { fetchArticles } from '@/features/article/services/server';
import { getUserFromServerSide } from '@/features/auth/services/server';

export default async function Home() {
  const user = await getUserFromServerSide();
  console.log(user?.id);
  // debug use dummy uid
  const articles = await fetchArticles('dummy');

  return (
    <div className='space-y-4'>
      <BorderLabel label='最近の作文' />
      <ArticleList articles={articles} />
    </div>
  );
}
