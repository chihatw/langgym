import BorderLabel from '@/components/BorderLabel';
import { fetchArticlesByUid } from '../../services/server';
import ArticleListRow from './ArticleListRow';

type Props = { uid: string };

const ArticleList = async ({ uid }: Props) => {
  const articles = await fetchArticlesByUid(uid);

  return (
    <div className='space-y-4 max-w-lg mx-auto pt-10 pb-40'>
      <BorderLabel label='最近の作文' />
      <div className='space-y-4'>
        {articles.map((article, index) => (
          <ArticleListRow key={index} article={article} />
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
