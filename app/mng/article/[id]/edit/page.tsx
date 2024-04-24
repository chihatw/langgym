import ArticleForm from '@/features/article/components/ArticleForm';
import { fetchArticleById } from '@/features/article/services/server';
import { fetchUsers } from '@/features/user/services/server';

type Props = {
  params: { id: number };
};

const MngArticleEditPage = async ({ params: { id } }: Props) => {
  if (typeof id === undefined) {
    return <></>;
  }
  const users = await fetchUsers();
  const article = await fetchArticleById(id);

  if (!article) return <></>;
  return <ArticleForm article={article} users={users} title={'Edit Article'} />;
};

export default MngArticleEditPage;
