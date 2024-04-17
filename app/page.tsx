import ArticleList from '@/features/article/components/ArticleList/ArticleList';
import MngArticleListContainer from '@/features/article/components/MngArtileList/MngArticleListContainer';
import { getUserFromServerSide } from '@/features/auth/services/server';
import { getUserGroup } from '@/features/auth/services/utils';

export default async function Home() {
  const user = await getUserFromServerSide();

  if (!user) return <></>;

  const userGroup = getUserGroup(user.email!);

  switch (userGroup) {
    case 'admin':
      return <MngArticleListContainer />;
    default:
      return <ArticleList uid={user.id} />;
  }
}
