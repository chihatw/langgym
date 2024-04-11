import ArticleForm from '@/features/article/components/ArticleForm';
import { fetchArticleById } from '@/features/article/services/server';
import { fetchUsers } from '@/features/user/services/server';

type Props = {
  params: { id: string };
};

const MngArticleEditPage = async ({ params: { id } }: Props) => {
  const article = await fetchArticleById(id);
  const users = await fetchUsers();

  if (!article) return <></>;
  return (
    <div className='space-y-8'>
      <div className='text-2xl font-extrabold'>Edit Article</div>
      <ArticleForm article={article} users={users} />
    </div>
  );
};

export default MngArticleEditPage;
