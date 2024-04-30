'use client';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { useOptimistic } from 'react';
import { ArticleView } from '../../schema';
import MngArticleListRow from './MngArticleListRow';

type Props = {
  articles: ArticleView[];
};

const MngArticleList = ({ articles }: Props) => {
  const [opti_articles, removeArticle] = useOptimistic<ArticleView[], number>(
    articles,
    (state, id) => state.filter((item) => item.id !== id)
  );
  return (
    <div className='grid gap-4'>
      <div className='text-2xl font-extrabold'>Article List</div>
      <div>
        <Link href='/mng/article/new' className={buttonVariants()}>
          Create New Article
        </Link>
      </div>
      <div className='grid'>
        {opti_articles.map((article) => (
          <MngArticleListRow
            key={article.id}
            article={article}
            removeArticle={removeArticle}
          />
        ))}
      </div>
    </div>
  );
};

export default MngArticleList;
