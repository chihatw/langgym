import GroupATop from '@/components/GroupATop';
import MngArticleListContainer from '@/features/article/components/MngArtileList/MngArticleListContainer';
import { getUserFromServerSide } from '@/features/auth/services/server';
import { getUserGroup } from '@/features/auth/services/utils';

export default async function Home() {
  const user = await getUserFromServerSide();

  if (!user) return null;

  const userGroup = getUserGroup(user.email!);

  switch (userGroup) {
    case 'admin':
      return <MngArticleListContainer />;
    case 'a':
      // pathnamelog を設置
      return <GroupATop uid={user.id} />;
    default:
      return null;
  }
}
