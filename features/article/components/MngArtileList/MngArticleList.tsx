import { buttonVariants } from '@/components/ui/button';
import MngHeader from '@/features/mng/components/MngHeader';
import { fetchUsers } from '@/features/user/services/server';
import Link from 'next/link';
import { fetchArticles } from '../../services/server';
import MngArticleListClientComponent from './MngArticleListClientComponent';

const MngArticleList = async () => {
  const articles = await fetchArticles(10);
  const users = await fetchUsers();
  return (
    <div className='space-y-4 max-w-lg mx-auto pb-40'>
      <MngHeader />
      <div className='text-2xl font-extrabold'>Article List</div>
      <Link href='/mng/article/new' className={buttonVariants()}>
        Create New Article
      </Link>
      <MngArticleListClientComponent articles={articles} users={users} />
    </div>
  );
};

export default MngArticleList;
