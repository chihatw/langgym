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
      return <GroupATop uid={user.id} />;
    case 'b':
      return <div className='text-center pt-10'>到期了</div>;
    default:
      return null;
  }
}
