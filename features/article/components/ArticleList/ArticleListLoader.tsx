import BorderLabel from '@/components/BorderLabel';
import { Bird } from 'lucide-react';
import { fetchArticlesByUid } from '../../services/server';
import ArticleList from './ArticleList';

type Props = { uid: string };

const ArticleListLoader = async ({ uid }: Props) => {
  const articles = await fetchArticlesByUid(uid);
  if (!articles.length)
    return (
      <div className='grid items-center justify-center pt-32'>
        <Bird className='text-slate-300 h-80 w-80' />
      </div>
    );

  return (
    <div className='grid gap-4'>
      <BorderLabel label='作文' />
      <ArticleList articles={articles} />
    </div>
  );
};

export default ArticleListLoader;
