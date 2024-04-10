import MngArticleList from '@/features/article/components/MngArticleList';
import { fetchArticles } from '@/features/article/services/server';

type Props = {};

const MngArticleListPage = async (props: Props) => {
  const articles = await fetchArticles(10);
  return (
    <div className='space-y-4'>
      <div className='text-2xl font-extrabold'>Article List</div>
      <MngArticleList articles={articles} />
    </div>
  );
};

export default MngArticleListPage;
