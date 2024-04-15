import ArticleList from '@/features/article/components/ArticleList/ArticleList';
import { getUserFromServerSide } from '@/features/auth/services/server';

type Props = {};

const ArticleListPage = async (props: Props) => {
  const user = await getUserFromServerSide();
  if (!user) return <></>;
  return <ArticleList uid={user.id} />;
};

export default ArticleListPage;
