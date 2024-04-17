import MngHeader from '@/components/MngHeader';
import { fetchUsers } from '@/features/user/services/server';
import { fetchArticles } from '../../services/server';
import MngArticleList from './MngArticleList';

const MngArticleListContainer = async () => {
  const articles = await fetchArticles(10);
  const users = await fetchUsers();
  return (
    <div className='space-y-4 max-w-lg mx-auto pb-40'>
      <MngHeader />
      <MngArticleList articles={articles} users={users} />
    </div>
  );
};

export default MngArticleListContainer;
