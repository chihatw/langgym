import ArticleForm from '@/features/article/components/ArticleForm';
import { fetchUsers } from '@/features/user/services/server';

type Props = {};

const MngArticleCreatePage = async (props: Props) => {
  const users = await fetchUsers();
  return <ArticleForm users={users} title={'Create New Article'} />;
};

export default MngArticleCreatePage;
