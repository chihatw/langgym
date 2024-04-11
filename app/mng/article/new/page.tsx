import ArticleForm from '@/features/article/components/ArticleForm';
import { fetchUsers } from '@/features/user/services/server';

type Props = {};

const MngArticleCreatePage = async (props: Props) => {
  const users = await fetchUsers();
  return (
    <div className='space-y-8'>
      <div className='text-2xl font-extrabold'>Create New Article</div>
      <ArticleForm users={users} />
    </div>
  );
};

export default MngArticleCreatePage;
