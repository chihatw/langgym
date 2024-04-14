import BorderLabel from '@/components/BorderLabel';
import ArticleList from '@/features/article/components/ArticleList/ArticleList';
import { fetchArticlesByUid } from '@/features/article/services/server';
import { getUserFromServerSide } from '@/features/auth/services/server';

export default async function Home() {
  const user = await getUserFromServerSide();

  if (!user) return <></>;

  const articles = await fetchArticlesByUid(user.id);

  return (
    <div className='space-y-4'>
      <BorderLabel label='最近の作文' />
      <ArticleList articles={articles} />
    </div>
  );
}
