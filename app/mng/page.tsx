import { buttonVariants } from '@/components/ui/button';
import MngArticleList from '@/features/article/components/MngArticleList';
import { fetchArticles } from '@/features/article/services/server';
import { fetchUsers } from '@/features/user/services/server';
import Link from 'next/link';

type Props = {};

const ManagementPage = async (props: Props) => {
  const articles = await fetchArticles(10);
  const users = await fetchUsers();
  return (
    <div className='space-y-4'>
      <div className='text-2xl font-extrabold'>Article List</div>

      <Link href='/mng/article/new' className={buttonVariants()}>
        Create New Article
      </Link>

      <MngArticleList articles={articles} users={users} />
    </div>
  );
};

export default ManagementPage;
