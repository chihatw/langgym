import ArticleForm from '@/features/article/components/ArticleForm';
import { fetchArticleById } from '@/features/article/services/server';
import { fetchUsers } from '@/features/user/services/server';

type Props = {
  params: Promise<{ id: number }>;
};

const MngArticleEditPage = async (props: Props) => {
  const params = await props.params;

  const {
    id
  } = params;

  if (typeof id === undefined) {
    return null;
  }
  const users = await fetchUsers();
  const article = await fetchArticleById(id);

  if (!article) return null;
  return <ArticleForm article={article} users={users} title={'Edit Article'} />;
};

export default MngArticleEditPage;
